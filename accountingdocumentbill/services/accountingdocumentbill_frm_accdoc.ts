import { Injectable } from '@angular/core';
import { tap, switchMap, map } from 'rxjs/operators';
import { Repository, BindingData, FrameContext, Change, ChangeType, ViewModel } from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import { FormLoadingService, ListRepositoryService, TreeDataService, BindingDataService, StateMachineService, CommandService } from '@farris/command-services';
import { CardDataService, FormNotifyService } from '@farris/command-services';
import { MessagerService } from '@farris/ui';
import { templateJitUrl } from '@angular/compiler';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { GLAccountingDocumentEntity } from '../models/entities/glaccountingdocumententity';
import { of } from 'rxjs/observable/of';
import { TreeViewLookupService } from '@progress/kendo-angular-treeview/dist/es2015/treeview-lookup.service';
import { GLAccDocEntryComponentViewmodel } from '../viewmodels/glaccdocentrycomponentviewmodel';
import { GLAccDocEntryEntity } from '../models/entities/glaccdocentryentity';
import { CommonService } from './commonservice';
import { ActivatedRoute } from '@angular/router';
import { GLAccDocAssistanceComponentViewmodel } from '../viewmodels/glaccdocassistancecomponentviewmodel';
import { LinkViewService } from './accounitngdocumentbill_frm_linkview';
import { AccDocCommonService } from './accountingdocumentbill_frm_commonservice';

@Injectable()
export class AccDocService extends ListRepositoryService {
    constructor(repository: Repository<any>,
        loadingService: FormLoadingService,
        public commonService: CommonService,
        public accDocCommonService: AccDocCommonService,
        public linkViewService: LinkViewService,
        public bindingData: BindingData,
        public cardDataService: CardDataService,
        public treeDataService: TreeDataService,
        public commandService: CommandService,
        public frameContext: FrameContext,
        public router: ActivatedRoute,
        public viewModel: ViewModel,
        public formNotifyService: FormNotifyService,
        public bindingDataService: BindingDataService,
        public stateMachineService: StateMachineService,
        public formMessageService: MessagerService) {
        super(repository, loadingService);
    }
    //公共变量
    public befRepository = <BefRepository<any>>this.repository;
    public restService = this.befRepository.restService;
    public baseUri = this.restService.baseUri;
    public rootStateMachine = this.frameContext.appContext.getFrameContext('root-component').stateMachine;
    public rootUistate = this.frameContext.appContext.getFrameContext('root-component').uiState;
    public debitAmount0;

    //监听借贷方金额的可编辑性,(这里可能要更改，当两个方向都不为0时，方向可选，选择后清空一个方向)
    amountCanEdit() {
        const glAccDocEntryViewModel =  this.viewModel as GLAccDocEntryComponentViewmodel;
        glAccDocEntryViewModel.dom.dataGrid_GLAccDocEntry.fields.forEach(ele => {
            // canEdit
            ele['editable'] = (params: any) => {
                const { dataItem, column, rowIndex, columnIndex } = params;
                if ((dataItem['creditAmount'] - 0 !== 0 && column.dataField === 'debitAmount') || (dataItem['debitAmount'] - 0 !== 0 && column.dataField === 'creditAmount')) {
                    return false;
                }
                if ((dataItem['creditAmount'] - 0 !== 0 || dataItem['debitAmount'] - 0 !== 0) && column.dataField === 'lendingDirection') {
                    return false;
                }
                return true;
            };
        });
    }


    //监听凭证头基本信息和借贷方金额的值变化事件
    amountChange() {
        //辅助的视图模型的dom
        const glAssistanceViewModel = this.frameContext.appContext.getFrameContext('glaccdocassistance-component').viewModel as GLAccDocAssistanceComponentViewmodel;
        const fields = glAssistanceViewModel.dom.dataGrid_GLAccDocAssistance.fields;
        this.bindingData.changes.subscribe((change: Change) => {
            const path = change.path;
            //console.log(path);
            if (change.type === ChangeType.Append || change.type === ChangeType.ValueChanged) {
                if (path[0] === 'numberOfAttch') {
                    if (change.value < 0 || change.value === null) {
                        setTimeout(() => {
                            this.bindingData.setValue(['numberOfAttch'], 0, true, true);
                        }, 0);
                    } else if (change.value > 9999) {
                        setTimeout(() => {
                            this.bindingData.setValue(['numberOfAttch'], 9999, true, true);
                        }, 0);
                    }
                } else if (path[0] === 'numberOfNote') {
                    if (change.value < 0 || change.value === null ) {
                        setTimeout(() => {
                            this.bindingData.setValue(['numberOfNote'], 0, true, true);
                        }, 0);
                    } else if (change.value > 9999) {
                        setTimeout(() => {
                            this.bindingData.setValue(['numberOfNote'], 9999, true, true);
                        }, 0);
                    }
                } else if (path[0] === 'accDocDateDisplay') {
                    const date = this.commonService.dateTo8(change.value);
                    const beginDate = this.rootUistate['year'].value + this.rootUistate['beginDate_VO'];
                    const endDate = this.rootUistate['year'].value + this.rootUistate['endDate_VO'];
                    //凭证日期大于期间终止日期，赋终止日期
                    if (Number(date) > Number(endDate) ) {
                        setTimeout(() => {
                            this.bindingData.setValue(['accDocDateDisplay'], this.commonService.dateTo10(endDate), true, true);
                        }, 0);
                    //小于期间起始日期，赋起始日期
                    } else if (Number(date) < Number(beginDate)) {
                        setTimeout(() => {
                            this.bindingData.setValue(['accDocDateDisplay'], this.commonService.dateTo10(beginDate), true, true);
                        }, 0);
                    }
                    //分录金额发生变化，进行合计
                } else if (path[0] === 'glAccDocEntrys' && (path[1] === 'creditAmount' || path[1] === 'debitAmount')) {
                    //值为null赋值0
                    if (path[1] === 'creditAmount' && change.value === null) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'creditAmount'], 0, true, true);
                        }, 0);
                    } else if (path[1] === 'debitAmount' && change.value === null) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'debitAmount'], 0, true, true);
                        }, 0);
                    }
                    //只有一条辅助，将分录金额赋给辅助金额
                    const accDocID = this.bindingData.list.currentId.toString();
                    const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
                    const accDocEntryID = this.bindingData.getValue(['glAccDocEntrys', 'id']);
                    const accDocEntrys = accDoc.glAccDocEntrys;
                    const accDocEntry = accDocEntrys.get(accDocEntryID) as GLAccDocEntryEntity;
                    if (accDocEntry.glAccDocAssistances.count() === 1 && change.value - 0 !== 0) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], change.value, true, true);
                        }, 0);
                    }
                    return this.accDocCommonService.total('');
                    //外币变化，计算辅助金额，并合计分录金额
                } else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'foreignCurrency') {
                    //下面好多地方做了这个判断，为了跳出季老师监听值改变的bug
                    for (let i = 0; i < fields.length; i++) {
                        if (fields[i].id.split('_')[1] === 'foreignCurrency' && fields[i].visible === false) {
                            return of(false);
                        }
                    }
                    //值为null赋值0
                    if (change.value === null) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrency'], 0, true, true);
                        }, 0);
                    }
                    const exchangeRate = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate']);
                    const amountTo2 = Number(change.value * exchangeRate).toFixed(2);
                    setTimeout(() => {
                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], amountTo2, true, true);
                    }, 0);
                    //汇率变化，计算辅助金额(汇率不能为0)
                } else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'exchangeRate') {
                    for (let i = 0; i < fields.length; i++) {
                        if (fields[i].id.split('_')[1] === 'exchangeRate' && fields[i].visible === false) {
                            return of(false);
                        }
                    }
                    const foreignCurrency = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrency']);
                    const amountTo2 = Number((change.value * foreignCurrency).toFixed(2));
                    setTimeout(() => {
                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], amountTo2, true, true);
                    }, 0);
                    //单价变化，计算辅助金额
                }  else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'unitPrice') {
                    for (let i = 0; i < fields.length; i++) {
                        if (fields[i].id.split('_')[1] === 'unitPrice' && fields[i].visible === false) {
                            return of(false);
                        }
                    }
                    //值为null赋值0
                    if (change.value === null) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'unitPrice'], 0, true, true);
                        }, 0);
                    }
                    const quantity = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'quantity']);
                    const amountTo2 = Number((change.value * quantity).toFixed(2));
                    setTimeout(() => {
                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], amountTo2, true, true);
                    }, 0);
                    //数量变化，计算辅助金额
                } else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'quantity') {
                    for (let i = 0; i < fields.length; i++) {
                        if (fields[i].id.split('_')[1] === 'quantity' && fields[i].visible === false) {
                            return of(false);
                        }
                    }
                    //值为null赋值0
                    if (change.value === null) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'quantity'], 0, true, true);
                        }, 0);
                    }
                    const unitPrice = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'unitPrice']);
                    const amountTo2 = Number((change.value * unitPrice).toFixed(2));
                    setTimeout(() => {
                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], amountTo2, true, true);
                    }, 0);
                    //辅助金额发生变化，计算外币或单价，并合计分录金额(汇率为0不计算外币，数量为0不计算单价)
                } else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'amount') {
                    //const exchangeRate = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate']);
                    //const quantity = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'quantity']);
                    //值为null赋值0
                    if (change.value === null) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], 0, true, true);
                        }, 0);
                    }
                    /* if (exchangeRate - 0 !== 0 || quantity - 0 !== 0) {
                        this.assistanceAmount();
                    } */
                    //在下面方法进行控制
                    this.accDocCommonService.assistanceAmount();
                    return this.accDocCommonService.totalAssistance();
                }
            }
        });
    }
    /****解决了是制单还是通过联查进入此界面的问题 */
    loadData() {
        this.befRepository['variableManager']['innerValueMap'].clear();
        this.amountChange();
        const funcID = this.rootUistate['funcID'];
        if (funcID) {
            const accDocID = this.rootUistate['funcAccDocID'];
            const filter = this.rootUistate['filter'];
            if (funcID !== 'CheckAccountingDocument' || funcID !== 'ChargeAccountingDocument' || funcID !== 'ApprovedAccountingDocument' || funcID !== 'SignedAccountingDocument') {
                this.formMessageService.warning('非法跳转！');
                history.go(-1);
                return of(false);
            }
            if (!accDocID || !filter) {
                this.formMessageService.warning('参数传递错误！');
                history.go(-1);
                return of(false);
            }
            //下面是给财务session赋值操作
            const year = this.rootUistate['funcYear'];
            this.rootUistate['year_VO'] = year;
            this.rootUistate['period_VO'] = filter.accPeriodID;
            this.rootUistate['accOrg_VO'] = filter.accOrgID;
            this.rootUistate['AccSet'].key = filter.ledgerID;
            this.rootUistate['accSet_VO'] = filter.ledgerID;
            this.rootUistate['year'].value = year;
            this.rootUistate['beginDate_VO'] = filter.beginDate;
            this.rootUistate['endDate_VO'] = filter.endDate;
            return this.commandService.execute('LinkViewLoad1');
        } else {
            return this.commandService.execute('GetInitData1');
        }
    }


    /**获取默认数据（获取默认年度、账簿和凭证类型并展示） */
    getInitData() {
        this.loadingService.show();
        const actionUriInitData = `${this.baseUri}/service/GetInitData`;
        const methodType = 'PUT';
        const queryParams = {};
        const options = {};
        this.befRepository.entityCollection.clear();
        const actionInitData$ = this.befRepository.restService.request(actionUriInitData, methodType, queryParams, options);
        return actionInitData$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            map((data: any) => {
                this.rootUistate['year'].value = data.year;
                this.rootUistate['AccSet'].key = data.ledger;
                this.rootUistate['accSet_VO'] = data.ledger;
                this.rootUistate['AccDocType'].key = data.accDocType;
                return of(true);
            }),
            switchMap(() => {
                return this.createFISession();
            }),
            switchMap(() => {
                return this.accDocCommonService.getDataName();
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }

    //账簿帮助后事件
    accSetAfterLookUp() {
        const accSet = this.rootUistate['AccSet'].key;
        this.rootUistate['accSet_VO'] = accSet;

        const actionAccDocTypeUri = `${this.baseUri}/service/GetAccDocTypeByAccSet`;
        const methodType = 'PUT';
        const queryParams = {};
        const options = {
            body: {
                accSetID: this.rootUistate['AccSet'].key,
                year: this.rootUistate['year'].value
            }};
        const actionAccDocType$ = this.befRepository.restService.request(actionAccDocTypeUri, methodType, queryParams, options);
        return actionAccDocType$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                this.rootUistate['AccDocType'] = {key: data.id, value: data.name};
                return of(true);
            })
        );
    }

    /****获取财务session(这里主要解决了在前端存储年度和会计期间) */
    createFISession(): Observable<any> {
        const actionSessionUri = `${this.baseUri}/service/Cmp4CreateFISession`;
        const methodType = 'PUT';
        const queryParams1 = {};
        const date = this.rootUistate['AccDocDate'];
        const bizDate = this.commonService.factoryDateTo8(date);
        const optionsSession = {
            body: {
                accOrgID: '',
                ledger: this.rootUistate['AccSet'].key,
                bizDate: bizDate
            }};
        const actionSession$ = this.befRepository.restService.request(actionSessionUri, methodType, queryParams1, optionsSession);
        return actionSession$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            map((data: any) => {
                this.rootUistate['year_VO'] = data.FISession_AccYear;
                this.rootUistate['period_VO'] = data.FISession_PeriodID;
                this.rootUistate['accOrg_VO'] = data.FISession_AccOrgID;
                this.rootUistate['year'].value = data.FISession_AccYear;
                this.rootUistate['chartOfAccount_VO'] = data.FISession_ChartOfAccountID;
                this.rootUistate['standardCurrency_VO'] = data.FISession_StandardCurrencyID;
                this.rootUistate['bizDate_VO'] = data.FISession_BizDate;
                this.rootUistate['accCanlendar_VO'] = data.FISession_AccCalendarID;
                this.rootUistate['beginDate_VO'] = data.FISession_PeriodBeginDate;
                this.rootUistate['endDate_VO'] = data.FISession_PeriodEndDate;
                return data;
            })
        );
    }

    /*****按类型新增（通过传入不同的参数，解决了是按钮新增还是确定新增） */
    /*****抽离出的新增凭证方法 */
    createAccDoc(year: string, accOrgID: any, ledger: string, accDocTypeID: any, bizDate: any) {
        const actionUriCreate = `${this.baseUri}/service/CreateByAccDocType`;
        const methodType = 'PUT';
        const queryParams = {};
        if (bizDate) {
            bizDate = this.commonService.dateTo8(bizDate);
        }
        const options = {
            body: {
                year: year,
                accOrgID: accOrgID,
                ledger: ledger,
                bizDate: bizDate,
                accDocTypeID: accDocTypeID
            }
        };
        const actionCreate$ = this.befRepository.restService.request(actionUriCreate, methodType, queryParams, options);
        return actionCreate$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            map((data: any) => {
                const entity = this.befRepository.buildEntity(data);
                this.befRepository.entityCollection.addEntity(entity);
                return entity;
            }),
            switchMap(() => {
                return this.accDocCommonService.total('');
            } ),
        );
    }
    /**供外部调用的方法 */
    createByAccDocType(year: string, accOrgID: any, ledger: string, accDocTypeID: any, bizDate: any) {
        this.loadingService.show();
        return this.createAccDoc(year, accOrgID, ledger, accDocTypeID, bizDate).pipe(
            tap(() => {
            this.loadingService.hide();
        }));
    }


    /***加载数据（第一张、上一张、下一张、最后一张：上一张、下一张支持跨凭证类型，
     * 这里要解决跨凭证类型时凭证类型的切换展示问题）
     * 另外要解决第一张、最后一张继续点击上一张、下一张报错后停留在第一张和最后一张的数据状态*/

    /*******抽离出的查看凭证方法 */
    lookAccDoc(year: string, accDocID: string, queryFlag: string) {
        let actionUriLook = `${this.baseUri}/service/`;
        const methodType = 'PUT';
        const queryParams = {};
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const ledger = this.rootUistate['AccSet'].key;
        const accDocTypeID = this.rootUistate['AccDocType'].key;
        const periodID = this.rootUistate['period_VO'];
        let options;
        switch (queryFlag) {
            case '1':
                actionUriLook = actionUriLook + 'GetFirstID';
                options = {
                    headers: headers,
                    body: {
                        year: year,
                        accOrg: '',
                        accSet: ledger,
                        period: periodID,
                        accDocType: accDocTypeID
                    }
                };
                break;
            case '2':
                actionUriLook = actionUriLook + 'GetNextID';
                options = {
                    headers: headers,
                    body: {
                        year: year,
                        accDocID: accDocID
                    }
                };
                break;
            case '3':
                actionUriLook = actionUriLook + 'GetPreviousID';
                options = {
                    headers: headers,
                    body: {
                        year: year,
                        accDocID: accDocID
                    }
                };
                break;
            case '4':
                actionUriLook = actionUriLook + 'GetLastID';
                options = {
                    headers: headers,
                    body: {
                        year: year,
                        accOrg: '',
                        accSet: ledger,
                        period: periodID,
                        accDocType: accDocTypeID
                    }
                };
                break;
            default:
                this.formMessageService.error('不存在此操作！');
                break;
        }
        const actionLook$ = this.befRepository.restService.request(actionUriLook, methodType, queryParams, options);
        return actionLook$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                return this.cardDataService.load(data);
            }),
            switchMap(() => {
                return this.accDocCommonService.getNowDataName();
            }),
            switchMap(() => {
                return this.accDocCommonService.total('');
            } ),
        );
    }
    /**查看上一张凭证，供删除取消调用 */
    lookUpPreviousAccDoc(year: string, accDocID: string) {
        const funcID = this.rootUistate['funcID'];
        let actionUriLook = `${this.baseUri}/service/`;
        const methodType = 'PUT';
        const queryParams = {};
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        let options;
        //根据funcid判断是联查还是制单
        if (funcID) {
            actionUriLook = actionUriLook + 'GetAccDocOnLinkView';
            year = this.rootUistate['funcYear'];
            const filter = JSON.parse(this.rootUistate['funcFilter']);
            accDocID = this.bindingData.list.currentId;
            options = {
                headers: headers,
                body: {
                    accOrgID: filter.accOrgID,
                    ledgerID: filter.ledgerID,
                    accPeriodID: filter.accPeriodID,
                    beginDate: filter.beginDate,
                    endDate: filter.endDate,
                    accDocTypeID: filter.accDocTypeID,
                    beginCode: filter.beginCode,
                    endCode: filter.endCode,
                    queryFlag: '3',
                    year: year,
                    accDocID: accDocID,
                    makerID: filter.makerID
                }
            };
        } else {
            actionUriLook = actionUriLook + 'GetPreviousID';
            options = {
                headers: headers,
                body: {
                    year: year,
                    accDocID: accDocID
                }
            };
        }
        const actionLook$ = this.befRepository.restService.request(actionUriLook, methodType, queryParams, options);
        return actionLook$;
    }
    //二次封装查看，区分联查和制单
    lookAccDoc2(year: string, accDocID: string, queryFlag: string) {
        const funcID = this.rootUistate['funcID'];
        if (!funcID) {
            return this.lookAccDoc(year, accDocID, queryFlag);
        } else {
            return this.linkViewService.lookAccDocOnLinkView(queryFlag);
        }
    }
    /******供外部调用的查看 */
    loadAccDoc(year: string, accDocID: string, queryFlag: string) {
        const state = this.rootStateMachine.context.state;
        if (state === 'add' || state === 'edit') {
            let s;
            if (state === 'add') {
                s = confirm('新增凭证是否需要保存？');
            } else if (state === 'edit') {
                s = confirm('当前凭证已发生修改，是否需要保存？');
            }
            if (s) {
                this.loadingService.show();
                return this.cardDataService.save()/* .catch((res: any) => {
                    return this.catchError(res);
                }) */.pipe(
                    switchMap(() => {
                        return this.lookAccDoc2(year, accDocID, queryFlag);
                    }),
                    tap(() => {
                        this.loadingService.hide();
                    })
                );
            } else {
                //return this.cancelAccDoc(year, accDocID);
                //TODO：这部分代码是不是有问题
                this.loadingService.show();
                return this.lookAccDoc2(year, accDocID, queryFlag).pipe(
                    switchMap(() => {
                        return this.cardDataService.cancel();
                    }),
                    tap(() => {
                        this.loadingService.hide();
                    })
                );
            }
        } else {
            this.loadingService.show();
            return this.cardDataService.cancel().pipe(
                switchMap(() => {
                    return this.lookAccDoc2(year, accDocID, queryFlag);
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        }
    }


    /******按编号查找凭证后的载入事件 */
    /**********按编号查找抽出的方法 */
    lookUpAccDoc() {
        const year = this.rootUistate['year'].value;
        const accDocID = this.rootUistate['AccDocID'].key;
        const actionYear$ = this.accDocCommonService.changeYear(year);
        this.loadingService.show();
        return actionYear$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap(() => {
                return this.cardDataService.load(accDocID);
            } ),
            switchMap(() => {
                return  this.accDocCommonService.getNowDataName();
            }),
            switchMap(() => {
                this.stateMachineService.transit('Look');
                return of(true);
            })
        );
    }
    /***供外部调用的按编号查找方法 */
    lookUp() {
        const state = this.rootStateMachine.context.state;
        if (state === 'add' || state === 'edit') {
            let s;
            if (state === 'add') {
                s = confirm('新增凭证是否需要保存？');
            } else if (state === 'edit') {
                s = confirm('当前凭证已发生修改，是否需要保存？');
            }
            if (s) {
                return this.cardDataService.save()/* .catch((res: any) => {
                    return this.catchError(res);
                }) */.pipe(
                    switchMap(() => {
                        this.loadingService.show();
                        return this.lookUpAccDoc().pipe(
                            tap(() => {
                                this.loadingService.hide();
                            })
                        );
                    })
                );
            } else {
                return this.cardDataService.cancel().catch((res: any) => {
                    return this.commonService.catchError(res);
                }).pipe(
                    switchMap(() => {
                        this.loadingService.show();
                        return this.lookUpAccDoc().pipe(
                            switchMap(() => this.cardDataService.cancel()),
                            tap(() => {
                                this.loadingService.hide();
                            })
                        );
                    })
                );
            }
        } else {
            this.loadingService.show();
            return this.lookUpAccDoc().pipe(
                tap(() => {
                    this.loadingService.hide();
                })
            );
        }
    }


    /****取消操作 */
    cancelAccDoc(year: string, accDocID: string) {
        this.loadingService.show();
        const state = this.rootStateMachine.context.state;
        if (state === 'edit') {
            return this.cardDataService.cancel().pipe(
                switchMap(() => {
                    return this.cardDataService.reload();
                }),
                switchMap(() => {
                    this.stateMachineService.transit('Cancel');
                    return of(true);
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        } else if (state === 'add') {
            return this.lookUpPreviousAccDoc(year, accDocID).catch((res: any) => {
                if (res.status === 500 && res.error.Code === 'AccDoc_0006') {
                    return this.cardDataService.cancel().pipe(
                        switchMap(() => {
                            this.loadingService.hide();
                            this.befRepository.entityCollection.clear();
                            this.stateMachineService.transit('InitAction');
                            this.rootStateMachine['canAdd'] = true;
                            //重置数量
                            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['EntryAmount'] = '';
                            this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['AssistanceAmount'] = '';
                            //重置合计行
                            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['TotalJF'] = (0).toFixed(2).toString();
                            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['TotalDF'] =  (0).toFixed(2).toString();
                            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['Difference'] =  (0).toFixed(2).toString();
                            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['Total'] = this.commonService.money2Amount((0).toFixed(2).toString());
                            return Observable.throw(res);
                        })
                    );
                } else if (res.status === 500) {
                    this.formMessageService.error(res.error.Message);
                    this.loadingService.hide();
                } else if (res.status === 404) {
                    this.formMessageService.error('找不到该请求的URL！');
                    this.loadingService.hide();
                } else if (res.status === 502) {
                    this.formMessageService.error('网络异常！');
                    this.loadingService.hide();
                } else {
                    this.formMessageService.error('未知错误！');
                    this.loadingService.hide();
                }
                return Observable.throw(res);
            }).pipe(
                switchMap((data: any) => {
                    return this.cardDataService.load(data);
                }),
                switchMap(() => {
                    return this.accDocCommonService.getNowDataName();
                }),
                switchMap(() => {
                    return this.accDocCommonService.total('');
                } ),
                switchMap(() => {
                    return this.cardDataService.cancel();
                }),
                switchMap(() => {
                    this.stateMachineService.transit('Cancel');
                    return of(true);
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        }
    }


    /*******删除凭证（解决了删到最后一张默认新增一张的状态） */
    deleteAccDoc(year: string, accDocID: string) {
        accDocID = this.bindingData.list.currentId.toString();
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        const info = '确定要删除' + accDoc.accDocCode + '这张凭证吗？';
        const s = confirm(info);
        if (s) {
            this.loadingService.show();
            const actionUriDelete = `${this.baseUri}/service/Cmp4DeleteAccDocByID`;
            const methodType = 'PUT';
            const queryParams = {};
            const options = {
                body: {
                    year: year,
                    accDocID: accDocID,
                    RequestInfo: (this.befRepository).restService.buildRequestInfo()
                }
            };
            const actionDelete$ = this.befRepository.restService.request(actionUriDelete, methodType, queryParams, options);
            let nextAccDocID;
            return this.lookUpPreviousAccDoc(year, accDocID).catch((res: any) => {
                if (res.error.Code === 'AccDoc_0006') {
                return actionDelete$.catch((res: any) => {
                    return this.commonService.catchError(res);
                }).pipe(
                    switchMap(() => {
                        const accdoc = this.befRepository.entityCollection.getEntityById(accDocID);
                        return this.createByAccDocType(year, accdoc.accOrgID.accOrgID, accDoc.ledger, accDoc.accDocTypeID.accDocTypeID, accDoc.accDocDateDisplay).catch((res: any) => {
                            return this.commonService.catchError(res);
                        }).pipe(
                            switchMap(() => {
                                return this.accDocCommonService.getNowDataName();
                            }),
                            switchMap(() => {
                                this.stateMachineService.transit('Create');
                                this.loadingService.hide();
                                return Observable.throw(res);
                            }));
                        })
                    );
                } else if (res.status === 500) {
                    this.formMessageService.error(res.error.Message);
                    this.loadingService.hide();
                } else if (res.status === 404) {
                    this.formMessageService.error('找不到该请求的URL！');
                    this.loadingService.hide();
                } else if (res.status === 502) {
                    this.formMessageService.error('网络异常！');
                    this.loadingService.hide();
                } else {
                    this.formMessageService.error('未知错误！');
                    this.loadingService.hide();
                }
                return Observable.throw(res);
            }).pipe(
                    switchMap((data: any) => {
                        nextAccDocID = data;
                        return of(true);
                    }),
                    switchMap(() => {
                        return actionDelete$.catch((res: any) => {
                            return this.commonService.catchError(res);
                        });
                    }),
                    switchMap(() => {
                        return this.cardDataService.load(nextAccDocID);
                    }),
                    switchMap(() => {
                        return this.accDocCommonService.getNowDataName();
                    }),
                    switchMap(() => {
                        return this.accDocCommonService.total('');
                    }),
                    tap(() => {
                        this.loadingService.hide();
                    })
                );
        }
    }


    /*********保存凭证 */
    saveAccDoc(): Observable<any> {
        const accDocID = this.bindingData.list.currentId.toString();
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        if (!accDoc.accDocCodeDisplay) {
            this.formMessageService.warning('凭证编号不能为空！');
            return of(false);
        }
        const accDocEntrys = accDoc.glAccDocEntrys;
        for (let i = 0; i < accDocEntrys.count(); i++) {
            const accDocEntry = accDocEntrys[i] as GLAccDocEntryEntity;
            if (!accDocEntry.abstract && !!accDocEntry.accTitleID.accTitleID) {
                this.formMessageService.warning('分录摘要不能为空！');
                return of(false);
            }
        }
        this.loadingService.show();
        return this.cardDataService.save()/* .catch((res: any) => {
            return this.catchError(res);
        }) */.pipe(
            switchMap(() => {
                this.stateMachineService.transit('Cancel');
                return of(true);
            }),
            switchMap(() => {
                return this.cardDataService.update();
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }

    //消息提示
    messageShow() {
        this.formMessageService.info('客观别急，马上实现！');
    }



    //把业务处理相关放在最下面，以后可能单独放在一个文件里
    //复制本凭证
    copyThisAccDoc(year: string, accDocID: string, bizDate: string) {
        const actionUriCreate = `${this.baseUri}/service/cmp4copycurrentaccdoc`;
        const methodType = 'PUT';
        const queryParams = {};
        if (bizDate) {
            bizDate = this.commonService.dateTo8(bizDate);
        }
        const options = {
            body: {
                accYear: year,
                accDocID: accDocID,
                bizDate: bizDate
            }
        };
        const actionCreate$ = this.befRepository.restService.request(actionUriCreate, methodType, queryParams, options);
        return actionCreate$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            map((data: any) => {
                const entity = this.befRepository.buildEntity(data);
                this.befRepository.entityCollection.addEntity(entity);
                return entity;
            }),
            switchMap(() => {
                return this.accDocCommonService.total('');
            } ),
        );
    }

}
