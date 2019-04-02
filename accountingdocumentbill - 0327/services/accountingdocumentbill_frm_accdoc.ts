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

@Injectable()
export class AccDocService extends ListRepositoryService {
    constructor(repository: Repository<any>,
        loadingService: FormLoadingService,
        public bindingData: BindingData,
        public cardDataService: CardDataService,
        public treeDataService: TreeDataService,
        public commandService: CommandService,
        public frameContext: FrameContext,
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
    public rootUistate = this.frameContext.appContext.getFrameContext('root-component').uiState;
    public creditAmount0;

    //监听借贷方金额的可编辑性
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
        //监听分录金额的变化
        this.bindingData.changes.subscribe((change: Change) => {
            const path = change.path;
            //console.log(path);
            if (change.type === ChangeType.Append || change.type === ChangeType.ValueChanged) {
                if (path[0] === 'numberOfAttch') {
                    if (change.value < 0 ) {
                        setTimeout(() => {
                            this.bindingData.setValue(['numberOfAttch'], 0, true, true);
                        }, 0);
                    } else if (change.value > 9999) {
                        setTimeout(() => {
                            this.bindingData.setValue(['numberOfAttch'], 9999, true, true);
                        }, 0);
                    }
                } else if (path[0] === 'numberOfNote') {
                    if (change.value < 0 ) {
                        setTimeout(() => {
                            this.bindingData.setValue(['numberOfNote'], 0, true, true);
                        }, 0);
                        //return this.bindingData.setValue(['numberOfNote'], 0, true, true);
                    } else if (change.value > 9999) {
                        setTimeout(() => {
                            this.bindingData.setValue(['numberOfNote'], 9999, true, true);
                        }, 0);
                        //return this.bindingData.setValue(['numberOfNote'], 9999, true, true);
                    }
                } else if (path[0] === 'accDocDateDisplay') {
                    const date = this.dateTo8(change.value);
                    const beginDate = this.rootUistate['year'].value + this.rootUistate['PeriodBeginDate'];
                    const endDate = this.rootUistate['year'].value + this.rootUistate['PeriodEndDate'];
                    //凭证日期大于期间终止日期，赋终止日期
                    if (Number(date) > Number(endDate) ) {
                        setTimeout(() => {
                            this.bindingData.setValue(['accDocDateDisplay'], this.dateTo10(endDate), true, true);
                        }, 0);
                    //小于期间起始日期，赋起始日期
                    } else if (Number(date) < Number(beginDate)) {
                        setTimeout(() => {
                            this.bindingData.setValue(['accDocDateDisplay'], this.dateTo10(beginDate), true, true);
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
                    return this.total('');
                    //外币变化，计算辅助金额，并合计分录金额
                } else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'foreignCurrency') {
                    if (change.value - 0 !== 0) {
                        const exchangeRate = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate']);
                        setTimeout(() => {
                            const amountTo2 = Number(change.value * exchangeRate).toFixed(2);
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], amountTo2, true, true);
                        }, 0);
                    }
                    //汇率变化，计算辅助金额(汇率不能为0)
                } else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'exchangeRate') {
                    if (change.value - 0 === 0) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate'], 1, true, true);
                        }, 0);
                    }
                    const foreignCurrency = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrency']);
                    setTimeout(() => {
                        const amountTo2 = Number((change.value * foreignCurrency).toFixed(2));
                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], amountTo2, true, true);
                    }, 0);
                    //单价变化，计算辅助金额
                }  else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'unitPrice') {
                    if (change.value - 0 !== 0) {
                        const quantity = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'quantity']);
                        setTimeout(() => {
                            const amountTo2 = Number((change.value * quantity).toFixed(2));
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], amountTo2, true, true);
                        }, 0);
                    }
                    //数量变化，计算辅助金额
                } else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'quantity') {
                    if (change.value - 0 !== 0) {
                        const unitPrice = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'unitPrice']);
                        setTimeout(() => {
                            const amountTo2 = Number((change.value * unitPrice).toFixed(2));
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], amountTo2, true, true);
                        }, 0);
                    }
                    //辅助金额发生变化，计算外币或单价，并合计分录金额(汇率为0不计算外币，数量为0不计算单价)
                } else if (path[0] === 'glAccDocEntrys' && path[1] === 'glAccDocAssistances' && path[2] === 'amount') {
                    const exchangeRate = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate']);
                    const quantity = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'quantity']);
                    if (exchangeRate.toString() !== '0' && quantity.toString() !== '0') {
                        this.assistanceAmount();
                    }
                    //值为null赋值0
                    if (change.value === null) {
                        setTimeout(() => {
                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'], 0, true, true);
                        }, 0);
                    }
                    return this.totalAssistance();
                }
            }
        });
    }
    /****解决了是制单还是通过联查进入此界面的问题 */
    loadData() {
        this.befRepository['variableManager']['innerValueMap'].clear();
        this.amountChange();
        const action = this.frameContext.appContext.getFrameContext('root-component').uiState['action'];
        if (action) {
            this.commandService.execute(action);
            this.frameContext.appContext.getFrameContext('root-component').uiState['Action2Button'] = false;
        } else {
            this.commandService.execute('GetInitData1');
            this.frameContext.appContext.getFrameContext('root-component').uiState['Action2Button'] = true;
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
            return this.catchError(res);
        }).pipe(
            map((data: any) => {
                this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value = data.year;
                this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].key = data.ledger;
                this.frameContext.appContext.getFrameContext('root-component').uiState['accSet_VO'] = data.ledger;
                this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocType'].key = data.accDocType;
                return of(true);
            }),
            switchMap(() => {
                return this.createFISession();
            }),
            switchMap(() => {
                return this.getDataName();
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }


    accSetAfterLookUp() {
        const accSet = this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].key;
        this.frameContext.appContext.getFrameContext('root-component').uiState['accSet_VO'] = accSet;

        const actionAccDocTypeUri = `${this.baseUri}/service/GetAccDocTypeByAccSet`;
        const methodType = 'PUT';
        const queryParams = {};
        const options = {
            body: {
                accSetID: this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].key,
                year: this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value
            }};
        const actionAccDocType$ = this.befRepository.restService.request(actionAccDocTypeUri, methodType, queryParams, options);
        return actionAccDocType$.catch((res: any) => {
            return this.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocType'] = {key: data.id, value: data.name};
                return of(true);
            })
        );
    }
    /****获取财务session(这里主要解决了在前端存储年度和会计期间) */
    createFISession(): Observable<any> {
        const actionSessionUri = `${this.baseUri}/service/Cmp4CreateFISession`;
        const methodType = 'PUT';
        const queryParams1 = {};
        const date = this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocDate'];
        const bizDate = this.factoryDateTo8(date);
        const optionsSession = {
            body: {
                accOrgID: '',
                ledger: this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].key,
                bizDate: bizDate
            }};
        const actionSession$ = this.befRepository.restService.request(actionSessionUri, methodType, queryParams1, optionsSession);
        return actionSession$.catch((res: any) => {
            return this.catchError(res);
        }).pipe(
            map((data: any) => {
                this.frameContext.appContext.getFrameContext('root-component').uiState['year_VO'] = data.FISession_AccYear;
                this.frameContext.appContext.getFrameContext('root-component').uiState['period_VO'] = data.FISession_PeriodID;
                this.frameContext.appContext.getFrameContext('root-component').uiState['accOrg_VO'] = data.FISession_AccOrgID;
                this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value = data.FISession_AccYear;
                this.frameContext.appContext.getFrameContext('root-component').uiState['chartOfAccount_VO'] = data.FISession_ChartOfAccountID;
                this.frameContext.appContext.getFrameContext('root-component').uiState['standardCurrency_VO'] = data.FISession_StandardCurrencyID;
                this.frameContext.appContext.getFrameContext('root-component').uiState['bizDate_VO'] = data.FISession_BizDate;
                this.frameContext.appContext.getFrameContext('root-component').uiState['accCanlendar_VO'] = data.FISession_AccCalendarID;
                this.frameContext.appContext.getFrameContext('root-component').uiState['beginDate_VO'] = data.FISession_PeriodBeginDate;
                this.frameContext.appContext.getFrameContext('root-component').uiState['endDateccSet_VO'] = data.FISession_PeriodEndDate;
                this.frameContext.appContext.getFrameContext('root-component').uiState['Period'] = data.FISession_PeriodID;
                this.frameContext.appContext.getFrameContext('root-component').uiState['PeriodBeginDate'] = data.FISession_PeriodBeginDate;
                this.frameContext.appContext.getFrameContext('root-component').uiState['PeriodEndDate'] = data.FISession_PeriodEndDate;
                return data;
            })
        );
    }
    /**初始新增 (暂时buyong)*/
    initData() {
        this.loadingService.show();
        const actionUriInitAdd = `${this.baseUri}/service/cmpAccountingDocumentInitAddAccDoc`;
        const methodType = 'PUT';
        const queryParams = {};
        const options = {};
        const year = new Date().getFullYear().toString();
        this.frameContext.appContext.getFrameContext('root-component').uiState['year'] = year;
        const actionInitAdd$ = this.befRepository.restService.request(actionUriInitAdd, methodType, queryParams, options);
        return actionInitAdd$.catch((res: any) => {
            return this.catchError(res);
        }).pipe(
            map((data: any) => {
                const entity = this.befRepository.buildEntity(data);
                this.befRepository.entityCollection.addEntity(entity);
                this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].value = data.mainLedgerName;
                this.total(data.id);
                return entity;
            }),
            tap(() => {
                this.loadingService.hide();
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
            bizDate = this.dateTo8(bizDate);
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
            return this.catchError(res);
        }).pipe(
            map((data: any) => {
                const entity = this.befRepository.buildEntity(data);
                this.befRepository.entityCollection.addEntity(entity);
                return entity;
            }),
            switchMap(() => this.total(''))
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
        const ledger = this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].key;
        const accDocTypeID = this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocType'].key;
        const periodID = this.frameContext.appContext.getFrameContext('root-component').uiState['Period'];
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
            return this.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                return this.cardDataService.load(data);
            }),
            switchMap(() => {
                return this.getNowDataName();
            }),
            switchMap(() => this.total(''))
        );
    }
    /**查看上一张凭证，供删除取消调用 */
    lookUpPreviousAccDoc(year: string, accDocID: string) {
        let actionUriLook = `${this.baseUri}/service/`;
        const methodType = 'PUT';
        const queryParams = {};
        actionUriLook = actionUriLook + 'GetPreviousID';
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = {
            headers: headers,
            body: {
                year: year,
                accDocID: accDocID
            }
        };
        const actionLook$ = this.befRepository.restService.request(actionUriLook, methodType, queryParams, options);
        return actionLook$;
    }
    /******供外部调用的查看 */
    loadAccDoc(year: string, accDocID: string, queryFlag: string) {
        const state = this.frameContext.appContext.getFrameContext('root-component').stateMachine.context.state;
        if (state === 'add' || state === 'edit') {
            let s;
            if (state === 'add') {
                s = confirm('新增凭证是否需要保存？');
            } else if (state === 'edit') {
                s = confirm('当前凭证已发生修改，是否需要保存？');
            }
            if (s) {
                this.loadingService.show();
                return this.cardDataService.save().catch((res: any) => {
                    return this.catchError(res);
                }).pipe(
                    switchMap(() => {
                        return this.lookAccDoc(year, accDocID, queryFlag);
                    }),
                    tap(() => {
                        this.loadingService.hide();
                    })
                );
            } else {
                return this.cancelAccDoc(year, accDocID);
                //这部分代码是不是有问题
                /* this.loadingService.show();
                return this.lookAccDoc(year, accDocID, queryFlag).pipe(
                    switchMap(() => {
                        return this.cardDataService.cancel();
                    }),
                    tap(() => {
                        this.loadingService.hide();
                    })
                ); */
            }
        } else {
            this.loadingService.show();
            return this.cardDataService.cancel().pipe(
                switchMap(() => {
                    return this.lookAccDoc(year, accDocID, queryFlag);
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
        const year = this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value;
        const accDocID = this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocID'].key;
        const actionYear$ = this.changeYear(year);
        this.loadingService.show();
        return actionYear$.catch((res: any) => {
            return this.catchError(res);
        }).pipe(
            switchMap(() => this.cardDataService.load(accDocID)),
            switchMap(() => this.getNowDataName()),
            switchMap(() => {
                this.stateMachineService.transit('Look');
                return of(true);
            })
        );
    }
    /***供外部调用的按编号查找方法 */
    lookUp() {
        const state = this.frameContext.appContext.getFrameContext('root-component').stateMachine.context.state;
        if (state === 'add' || state === 'edit') {
            let s;
            if (state === 'add') {
                s = confirm('新增凭证是否需要保存？');
            } else if (state === 'edit') {
                s = confirm('当前凭证已发生修改，是否需要保存？');
            }
            if (s) {
                return this.cardDataService.save().catch((res: any) => {
                    return this.catchError(res);
                }).pipe(
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
                    return this.catchError(res);
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
        const state = this.frameContext.appContext.getFrameContext('root-component').stateMachine.context.state;
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
                            this.frameContext.appContext.getFrameContext('root-component').stateMachine['canAdd'] = true;
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
                    return this.getNowDataName();
                }),
                switchMap(() => this.total('')),
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
                    return this.catchError(res);
                }).pipe(
                    switchMap(() => {
                        const accdoc = this.befRepository.entityCollection.getEntityById(accDocID);
                        return this.createByAccDocType(year, accdoc.accOrgID.accOrgID, accDoc.ledger, accDoc.accDocTypeID.accDocTypeID, accDoc.accDocDateDisplay).catch((res: any) => {
                            return this.catchError(res);
                        }).pipe(
                            switchMap(() => {
                                return this.getNowDataName();
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
                            return this.catchError(res);
                        });
                    }),
                    switchMap(() => {
                        return this.cardDataService.load(nextAccDocID);
                    }),
                    switchMap(() => {
                        return this.getNowDataName();
                    }),
                    switchMap(() => {
                        return this.total('');
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


    /*****获取账簿、类型名称（解决了前端账簿、类型的展示问题） */
    getDataName() {
        const actionDataNameUri = `${this.baseUri}/service/GetDataName`;
        const queryParams1 = {};
        const methodType = 'PUT';
        const optionsName = {
            body: {
                year: this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value,
                accSetID: this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].key,
                accDocTypeID: this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocType'].key
            }
        };
        const actionDataName$ = this.befRepository.restService.request(actionDataNameUri, methodType, queryParams1, optionsName);
        return actionDataName$.catch((res: any) => {
            return this.catchError(res);
        }).pipe(
            map((data: any) => {
            this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'] = {key: this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].key, value: data.accSetName};
            this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocType'] = {key: this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocType'].key, value: data.accDocTypeName};
        }));
    }
    /******封装获取账簿、类型名称方法，用于其它方法调用 */
    getNowDataName() {
        const currentId = this.bindingData.list.currentId;
        if (currentId) {
            const newAccDocID = currentId.toString();
            const accDoc = this.befRepository.entityCollection.getEntityById(newAccDocID) as GLAccountingDocumentEntity;
            const accDocType = accDoc.accDocTypeID.accDocTypeID;
            this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocType'].key = accDocType;
            return this.getDataName();
        }
    }


    /*******切换年度 */
    changeYear(year: string) {
        this.loadingService.show();
        const actionUriInitData = `${this.baseUri}/service/cmpAccountingDocumentBillChangeYearVM`;
        const methodType = 'PUT';
        const queryParams = {};
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = {
          headers: headers,
          body: {
              year: year,
              RequestInfo: (this.befRepository).restService.buildRequestInfo()
          }
        };
        this.befRepository.entityCollection.clear();
        const actionInitData$ = this.befRepository.restService.request(actionUriInitData, methodType, queryParams, options);
        return actionInitData$.catch((res: any) => {
            return this.catchError(res);
        }).pipe(
            tap(() => {
                this.loadingService.hide();
            })
        );
    }

    /* 外币、汇率、金额的联动计算    单价、数量、金额的联动计算*/
    assistanceAmount() {
        const foreignCurrency = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrency']);
        const exchangeRate = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate']);
        const unitPrice = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'unitPrice']);
        const quantity = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'quantity']);
        let foreignCurrencyTo4;
        let unitPriceTo2;
        //计算外币
        if (foreignCurrency.toString() !== '0' || exchangeRate.toString() !== '0') {
            if (foreignCurrency.toString() !== '0') {
                foreignCurrencyTo4 = Number(foreignCurrency.toFixed(4));
            }
            const exchangeRateTo8 = Number((exchangeRate).toFixed(8));
            const amount = (this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'])).toString();
            const amountTo2 = ((exchangeRateTo8 * foreignCurrencyTo4).toFixed(2)).toString();
            if (amountTo2 !== amount) {
                foreignCurrencyTo4 = Number((amount / exchangeRateTo8).toFixed(4));
                setTimeout(() => {
                    this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrency'], foreignCurrencyTo4, true, true);
                }, 0);
            }
            //计算单价
        } else if (unitPrice.toString() !== '0' || quantity.toString() !== '0') {
            if (unitPrice.toString() !== '0') {
                unitPriceTo2 = Number(unitPrice.toFixed(2));
            }
            const quantityTo2 = Number((quantity).toFixed(2));
            const amount = (this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount'])).toString();
            const amountTo2 = ((quantityTo2 * unitPriceTo2).toFixed(2)).toString();
            if (amountTo2 !== amount) {
                unitPriceTo2 = Number((amount / quantityTo2).toFixed(4));
                setTimeout(() => {
                    this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'unitPrice'], unitPriceTo2, true, true);
                }, 0);
            }
        }
    }


    /* 合计辅助 */
    totalAssistance() {
        const accDocID = this.bindingData.list.currentId.toString();
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        //由辅助合计分录
        const accDocEntryID = this.bindingData.getValue(['glAccDocEntrys', 'id']);
        const accDocEntrys = accDoc.glAccDocEntrys;
        const accDocEntry = accDocEntrys.get(accDocEntryID);
        const accDocAssistances = accDocEntry.glAccDocAssistances;
        if (accDocAssistances.count() > 0) {
            let sumJFFZ = 0;
            let sumDFFZ = 0;
            for (let i = 0; i < accDocAssistances.count(); i++) {
                if (accDocEntry.lendingDirection === 'Credit' || accDocEntry.creditAmount !== 0) {
                    sumJFFZ = this.plus(sumJFFZ, accDocAssistances[i].amount);
                } else if (accDocEntry.lendingDirection === 'Debit' || accDocEntry.debitAmount !== 0) {
                    sumDFFZ = this.plus(sumDFFZ, accDocAssistances[i].amount);
                }
            }
            setTimeout(() => {
                accDocEntry.creditAmount = sumJFFZ;
                accDocEntry.debitAmount = sumDFFZ;
                /* this.bindingData.setValue(['glAccDocEntrys', 'creditAmount'], sumJFFZ, true, true);
                this.bindingData.setValue(['glAccDocEntrys', 'debitAmount'], sumDFFZ, true, true); */
            }, 0);
        }
    }

    /****合计分录金额（合计分录金额和制单人信息的更新） */
    total(accDocID: string): Observable<any> {
        if (!accDocID) {
            accDocID = this.bindingData.list.currentId.toString();
        }
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        //由辅助合计分录
        const accDocEntrys = accDoc.glAccDocEntrys;
        let sumJF = 0;
        let sumDF = 0;
        for (let i = 0; i < accDocEntrys.count(); i++) {
            if (accDocEntrys[i].creditAmount - 0 === 0 && accDocEntrys[i].debitAmount - 0 !== 0) {
                setTimeout(() => {
                    accDocEntrys[i].lendingDirection = 'Debit';
                }, 0);
            } else if (accDocEntrys[i].creditAmount - 0 !== 0 && accDocEntrys[i].debitAmount - 0 === 0) {
                setTimeout(() => {
                    accDocEntrys[i].lendingDirection = 'Credit';
                }, 0);
            }
            if (accDocEntrys[i].creditAmount - 0 !== 0) {
                sumJF = this.plus(sumJF, accDocEntrys[i].creditAmount);
            } else if (accDocEntrys[i].debitAmount - 0 !== 0) {
                sumDF = this.plus(sumDF, accDocEntrys[i].debitAmount);
            }
        }
        this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['TotalJF'] = this.thousand(sumJF.toFixed(2)) ;
        this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['TotalDF'] = this.thousand(sumDF.toFixed(2));
        this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['Difference'] = this.thousand((sumJF - sumDF).toFixed(2));
        this.frameContext.appContext.getFrameContext('root-component').uiState['AccManager'] = accDoc.accManagerName;
        this.frameContext.appContext.getFrameContext('root-component').uiState['Booker'] = accDoc.bookerName;
        this.frameContext.appContext.getFrameContext('root-component').uiState['Cashier'] = accDoc.cashierName;
        this.frameContext.appContext.getFrameContext('root-component').uiState['Auditor'] = accDoc.auditorName;
        this.frameContext.appContext.getFrameContext('root-component').uiState['Approver'] = accDoc.approverName;
        this.frameContext.appContext.getFrameContext('root-component').uiState['Maker'] = accDoc.makerName;
        if (Math.abs(sumJF) >= 99999999999) {
            //this.formMessageService.warning('金额超限，进行数据回滚！');
            setTimeout(() => {
                this.bindingData.setValue(['glAccDocEntrys', 'creditAmount'], 0, true, true);
            }, 0);
        } else {
            this.creditAmount0 = this.bindingData.getValue(['glAccDocEntrys', 'creditAmount']);
        }
        if (sumJF > 0) {
            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['Total'] = this.money2Amount(sumJF.toString());
        } else {
            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['Total'] = this.money2Amount((- sumJF).toString());
        }
        return of(true);
    }


    /******合计分录数量 */
    entryAmount() {
        const accDocID = this.bindingData.list.currentId.toString();
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        const accDocEntrys = accDoc.glAccDocEntrys;
        this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['EntryAmount'] = '(' + accDocEntrys.count().toString() + ')';
    }


    /*******更新展示组织账簿 */
    updateInfo() {
        /* const currentId = this.bindingData.list.currentId;
        if (currentId) {
            const accDocID = currentId.toString();
            const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
            const accSet = this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].value;
            accDoc.accDwDisplay = accDoc.accOrgID.accOrgID_Name + '-' + accSet;
            this.frameContext.appContext.getFrameContext('root-component').uiState['Period'] = accDoc.accPeriodID;
        } */
    }


    /* //捕获异常 */
    catchError(res: any) {
        switch (res.status) {
            case 500:
                this.formMessageService.error(res.error.Message);
                this.loadingService.hide();
                break;
            case 404:
                this.formMessageService.error('找不到该请求的URL！');
                this.loadingService.hide();
                break;
            case 502:
                this.formMessageService.error('网络异常！');
                break;
            default:
                break;
        }
        return Observable.throw(res);
    }


    //格式化日期8位字符串
    factoryDateTo8(date): string {
        const dateyear = date.getFullYear();
        let datemonth = (date.getMonth() + 1).toString();
        if (Number(datemonth) < 10) {
            datemonth = '0' + datemonth;
            }
        let dateday = date.getDate();
        if (Number(dateday) < 10) {
            dateday = '0' + dateday;
        }
        const bizDate = dateyear + datemonth + dateday;
        return bizDate;
    }


    //日期十位转八位
    dateTo8(datestring: string) {
        const dateyear = datestring.substr(0, 4);
        const datemonth = datestring.substr(5, 2);
        const dateday = datestring.substr(8, 2);
        const date = dateyear + datemonth + dateday;
        return date;
    }
    //日期八位转十位
    dateTo10(datestring: string) {
        const dateyear = datestring.substr(0, 4);
        const datemonth = datestring.substr(4, 2);
        const dateday = datestring.substr(6, 2);
        const date = dateyear + '-' + datemonth + '-' + dateday;
        return date;
    }


    /***金额转大写 */
    money2Amount(numOrString: any) {
        let currencyDigits = numOrString.toString().replace('￥', ''); //替换掉可能出现的￥字符
        //最大值
        const MAXIMUM_NUMBER = 99999999999.99; //九百九十九亿九千九百九十九万九千九百九十九元九角九分
        //定义中文字符
        const CN_ZERO = '零';
        const CN_ONE = '壹';
        const CN_TWO = '贰';
        const CN_THREE = '叁';
        const CN_FOUR = '肆';
        const CN_FIVE = '伍';
        const CN_SIX = '陆';
        const CN_SEVEN = '柒';
        const CN_EIGHT = '捌';
        const CN_NINE = '玖';
        const CN_TEN = '拾';
        const CN_HUNDRED = '佰';
        const CN_THOUSAND = '仟';
        const CN_TEN_THOUSAND = '万';
        const CN_HUNDRED_MILLION = '亿';
        const CN_DOLLAR = '元';
        const CN_TEN_CENT = '角';
        const CN_CENT = '分';
        const CN_INTEGER = '整';

        //私有变量
        let integral; //整数部分
        let decimal; // 小数部分
        let outputCharacters; // 返回值
        let parts;
        let digits, radices, bigRadices, decimals;
        let zeroCount;
        let i, p, d;
        let quotient, modulus;

        //判断空值
        if (currencyDigits === '') {
            return '';
        }
        //判断是否有非法字符
        if (currencyDigits.match(/[^,.\d]/) != null) {
            this.formMessageService.error('存在非法字符');
            return '';
        }
        //判断是否符合格式，全数字或.三位分割
        if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
            this.formMessageService.error('不符合要求的格式');
            return '';
        }

        //标准化
        currencyDigits = currencyDigits.replace(/,/g, ''); // 去，分隔符
        currencyDigits = currencyDigits.replace(/^0+/, ''); // 去开始处的0

        //判断是否超过最大值
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            this.formMessageService.error('超出能转换的最大值99999999999.99');
            return '';
        }

        //分割整数和小数
        parts = currencyDigits.split('.');
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            //取两位小数
            decimal = decimal.substr(0, 2);
        } else {
            integral = parts[0];
            decimal = '';
        }

        digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
        radices = new Array('', CN_TEN, CN_HUNDRED, CN_THOUSAND);
        bigRadices = new Array('', CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
        decimals = new Array(CN_TEN_CENT, CN_CENT);

        outputCharacters = '';
        //替换整数部分
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d === '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus === 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                }
            }
            outputCharacters += CN_DOLLAR;
        }
        //替换小数部分
        if (decimal !== '') {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                if (d !== '0') {
                    outputCharacters += digits[Number(d)] + decimals[i];
                } else {
                    if (i === 0) {  // 1.03 改为 壹元零叁分 2017/07/24 lucas
                        outputCharacters += CN_ZERO;
                    }
                }
            }
        }
        //若是空字符串，则返回0
        if (outputCharacters == '') {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        //若小数部分为空
        if (decimal === '') {
            outputCharacters += CN_INTEGER;
        }
        return outputCharacters;
    }

    //加法
    plus(arg1: number, arg2: number) {
        let r1, r2, m;
		try { r1 = arg1.toString().split('.')[1].length; } catch (e) { r1 = 0; }
		try { r2 = arg2.toString().split('.')[1].length; } catch (e) { r2 = 0; }
		m = Math.pow(10, Math.max(r1, r2));
		const s1 = Math.round(arg1 * m);
		const s2 = Math.round(arg2 * m);
		return (s1 + s2) / m;
    }

    /* 千分位 */
    thousand(amount: string) {
        let result = '';
        if (Number(amount) < 0) {
            amount = amount.substring(1, amount.length);
            result = '-';
        }
        const amountInt = amount.split('.')[0];
        const amountDeciaml = amount.split('.')[1];
        let str = ''; //字符串累加
        for (let i = amountInt.length - 1, j = 1; i >= 0; i--, j++) {
            if (j % 3 === 0 && i !== 0) {//每隔三位加逗号，过滤正好在第一个数字的情况
                str += amountInt[i] + ','; //加千分位逗号
                continue;
            }
            str += amountInt[i]; //倒着累加数字
        }
        result = result + str.split('').reverse().join('') + '.' + amountDeciaml; //字符串=>数组=>反转=>字符串
        return result;
    }

}
