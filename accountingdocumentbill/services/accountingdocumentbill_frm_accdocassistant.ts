import { Injectable } from '@angular/core';
import { tap, switchMap, map } from 'rxjs/operators';
import { Repository, BindingData, FrameContext, EntityFactory, ViewModel, EntityList } from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import { FormLoadingService, ListRepositoryService, TreeDataService, BindingDataService, StateMachineService, SubListDataService } from '@farris/command-services';
import { CardDataService, FormNotifyService } from '@farris/command-services';
import { MessagerService } from '@farris/ui';
import { Observable } from 'rxjs';
import { GLAccountingDocumentEntity } from '../models/entities/glaccountingdocumententity';
import { GLAccDocEntryEntity } from '../models/entities/glaccdocentryentity';
import { GLAccDocAssistanceEntity } from '../models/entities/glaccdocassistanceentity';
import { GLAccDocAssistanceComponentViewmodel } from '../viewmodels/glaccdocassistancecomponentviewmodel';
import { of } from 'rxjs/observable/of';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from './commonservice';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AccDocAssistanceService extends ListRepositoryService {
    constructor(repository: Repository<any>,
        loadingService: FormLoadingService,
        public commonService: CommonService,
        public bindingData: BindingData,
        public cardDataService: CardDataService,
        public treeDataService: TreeDataService,
        public subListDataService: SubListDataService,
        public viewModel: ViewModel,
        public frameContext: FrameContext,
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

    /**新增辅助*/
    createAssistance(year: string, accDocID: string, accDocEntryID: string, accTitleID: string) {
        //币种、汇率前端赋值
        let currencyShow: any;
        let exchangeRate: number;
        const ledger = this.rootUistate['AccSet'].key;
        this.loadingService.show();
        const methodType = 'PUT';
        const queryParams = {};
        //辅助的视图模型的dom
        const glAssistanceViewModel = this.frameContext.appContext.getFrameContext('glaccdocassistance-component').viewModel as GLAccDocAssistanceComponentViewmodel;
        const fields = glAssistanceViewModel.dom.dataGrid_GLAccDocAssistance.fields;
        fields.forEach(field => {
            field.visible = false;
            field.require = false;
            field.readonly = false;
            field.editor.readonly = false;
        });
        const actionUriDisplay = `${this.baseUri}/service/Mgrcmp4GetAccTitleDisPlayCol`;
        const optionsDisplay = {
            body: {
                year: year,
                ledger: ledger,
                acctitleID: accTitleID
            }
        };
        if (accTitleID) {
            this.loadingService.show();
            const actionDisplay$ = this.befRepository.restService.request(actionUriDisplay, methodType, queryParams, optionsDisplay);
            return actionDisplay$.catch((res: any) => {
                //选择科目后报错，清空科目
                setTimeout(() => {
                    this.bindingData.setValue(['glAccDocEntrys', 'accTitleID', 'accTitleID'], null, true);
                    this.bindingData.setValue(['glAccDocEntrys', 'accTitleID', 'accTitleID_AccountTitle_Code'], null, true);
                    this.bindingData.setValue(['glAccDocEntrys', 'accTitleID', 'accTitleID_AccountTitle_Name'], null, true);
                    this.bindingData.setValue(['glAccDocEntrys', 'accTitleID', 'accTitleID_AccountTitle_FullName'], null, true);
                }, 0);
                return this.commonService.catchError(res);
            }).pipe(
                switchMap((data: any) => {
                    if (data.existsAss) {
                        //存在辅助项，根据返回信息进行动态展示
                        //辅助列的信息，包括：标题、是否必填、顺序号、字段编号、字段类型。币种列还放着单一币种信息
                        const assColumnInfoList = data.assColumnInfoList;
                        fields.forEach(field => {
                            const bingdingID = field.id.split('_'); //辅助列视图模型ID
                            for (let j = 0; j < assColumnInfoList.length; j++) {
                                const dataProp = assColumnInfoList[j].refColCode as string;
                                //列ID取字段编号部分
                                const prop = dataProp.slice(0, 1).toLowerCase() + dataProp.substring(1, dataProp.length);
                                //字段编号与列ID匹配，显示该列
                                if (bingdingID[1] === prop) {
                                    field.visible = true;
                                    //设置必填列
                                    if (assColumnInfoList[j].isNotNull === true) {
                                        field.require = true;
                                    }
                                    if (prop === 'foreignCurrencyID') {
                                        //币种列是否可以编辑，单一外币不可编辑
                                        if (assColumnInfoList[j].other) {
                                            field.readonly = true;
                                            field.editor.readonly = true;
                                            const other = assColumnInfoList[j].other.split(',');
                                            //币种关联属性
                                            currencyShow = {
                                                foreignCurrencyID: other[0],
                                                foreignCurrencyID_Accuracy: 0,
                                                foreignCurrencyID_Code: {
                                                    dfCode: other[1]
                                                },
                                                foreignCurrencyID_Name: {
                                                    dfName: other[2]
                                                }
                                            };
                                        } else {
                                            field.readonly = false;
                                            field.editor.readonly = false;
                                        }
                                    } else if (prop === 'exchangeRate') {
                                        field.readonly = true;
                                        field.editor.readonly = true;
                                        //汇率不可编辑
                                        if (assColumnInfoList[j].other) {
                                            //汇率值
                                            exchangeRate = Number(assColumnInfoList[j].other);
                                        }
                                    }
                                }
                            }
                        });
                        //辅助核算时新增按钮可以点击
                        this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['CanAdd'] = true;
                        return this.createAss(year, accDocID, accDocEntryID).pipe(
                            switchMap(() => {
                                //给汇率和单一币种赋值
                                if (currencyShow) {
                                    setTimeout(() => {
                                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID'], currencyShow.foreignCurrencyID, true);
                                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID_Code', 'dfCode'], currencyShow.foreignCurrencyID_Code.dfCode, true);
                                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID_Name', 'dfName'], currencyShow.foreignCurrencyID_Name.dfName, true);
                                    }, 0);
                                    if (exchangeRate) {
                                        setTimeout(() => {
                                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate'], exchangeRate, true);
                                        }, 0);
                                        return of(true);
                                    } else {
                                        return of(true);
                                    }
                                } else if (exchangeRate) {
                                    setTimeout(() => {
                                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate'], exchangeRate, true);
                                    }, 0);
                                    return of(true);
                                } else {
                                    return of(false);
                                }
                            }),
                            tap(() => {
                                this.loadingService.hide();
                            })
                        );
                    } else {
                        this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['CanAdd'] = false;
                        this.loadingService.hide();
                        return of(false);
                    }
                }),
                //switchMap(() => this.cardDataService.update()),
            );
        } else {
            this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['CanAdd'] = false;
        }
    }

    //新增辅助--内部调用
    createAss(year: string, accDocID: string, accDocEntryID: string) {
        const actionUriCreate = `${this.baseUri}/service/CreateAccDocAssistance`;
        const methodType = 'PUT';
        const queryParams = {};
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        const accDocEntry = accDoc.glAccDocEntrys.get(accDocEntryID) as GLAccDocEntryEntity;
        const accDocAssistances = accDocEntry.glAccDocAssistances;
        let index = 0;
        for (let i = 0; i < accDocAssistances.count(); i++) {
            if (Number(accDocAssistances[i].accAssCode) > index) {
                index = Number(accDocAssistances[i].accAssCode);
            }
        }
        const optionsCreate = {
            body: {
                year: year,
                accDocID: accDocID,
                accDocEntryID: accDocEntryID,
                index: (index + 1).toString(),
                RequestInfo: (this.befRepository).restService.buildRequestInfo()
            }
        };
        const actionCreate$ = this.befRepository.restService.request(actionUriCreate, methodType, queryParams, optionsCreate);
        return actionCreate$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            map((data: any) => {
                const returnValue = data['returnValue'];
                const entity = EntityFactory<GLAccDocAssistanceEntity>(GLAccDocAssistanceEntity, returnValue);
                accDocEntry.glAccDocAssistances.appendNew(entity);
                return entity;
            })
        );

    }

    /* 删除辅助 */
    deleteAssistance(year: string, accDocID: string, entryID: string, assID: string) {
        if (assID !== undefined && assID !== 'undefined') {
            this.loadingService.show();
            const actionUriDelete = `${this.baseUri}/service/Cmp4DeleteAccDocAss`;
            const methodType = 'PUT';
            const queryParams = {};
            const options = {
                body: {
                    year: year,
                    accDocID: accDocID,
                    entryID: entryID,
                    assIDs: [assID],
                    RequestInfo: (this.befRepository).restService.buildRequestInfo()
                }
            };
            const actionDelete$ = this.befRepository.restService.request(actionUriDelete, methodType, queryParams, options);
            return actionDelete$.catch((res: any) => {
                return this.commonService.catchError(res);
            }).pipe(
                tap(() => {
                    this.loadingService.hide();
                })
            );
        } else {
            this.formMessageService.warning('不存在辅助数据，无需删除！');
        }
    }

    //复制辅助
    copyAccDocAssistance(year: string, accDocID: string, entryID: string, assID: string) {
        if (assID !== undefined && assID !== 'undefined') {
            this.loadingService.show();
            const actionUriCopy = `${this.baseUri}/service/Cmp4DeleteAccDocAss`;
            const methodType = 'PUT';
            const queryParams = {};
            const options = {
                body: {
                    year: year,
                    accDocID: accDocID,
                    entryID: entryID,
                    assID: assID
                }
            };
            const actionCopy$ = this.befRepository.restService.request(actionUriCopy, methodType, queryParams, options);
            return actionCopy$.catch((res: any) => {
                return this.commonService.catchError(res);
            }).pipe(
                switchMap(() => {
                    return  this.cardDataService.update();
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        }
    }

    //插入辅助
    insertAccDocAssistance(year: string, accDocID: string, entryID: string, assID: string) {
        if (assID !== undefined && assID !== 'undefined') {
            this.loadingService.show();
            const actionUriInsert = `${this.baseUri}/service/Cmp4DeleteAccDocAss`;
            const methodType = 'PUT';
            const queryParams = {};
            const options = {
                body: {
                    year: year,
                    accDocID: accDocID,
                    entryID: entryID,
                    assID: assID
                }
            };
            const actionInsert$ = this.befRepository.restService.request(actionUriInsert, methodType, queryParams, options);
            return actionInsert$.catch((res: any) => {
                return this.commonService.catchError(res);
            }).pipe(
                switchMap(() => {
                    return  this.cardDataService.update();
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        }
    }

    //上移辅助
    moveUpAccDocAssistance(year: string, accDocID: string, entryID: string, assID: string) {
        if (assID !== undefined && assID !== 'undefined') {
            this.loadingService.show();
            const actionUriMoveUp = `${this.baseUri}/service/Cmp4DeleteAccDocAss`;
            const methodType = 'PUT';
            const queryParams = {};
            const options = {
                body: {
                    year: year,
                    accDocID: accDocID,
                    entryID: entryID,
                    assID: assID
                }
            };
            const actionMoveUp$ = this.befRepository.restService.request(actionUriMoveUp, methodType, queryParams, options);
            return actionMoveUp$.catch((res: any) => {
                return this.commonService.catchError(res);
            }).pipe(
                switchMap(() => {
                    return  this.cardDataService.update();
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        }
    }

    //下移辅助
    moveDownAccDocAssistance(year: string, accDocID: string, entryID: string, assID: string) {
        if (assID !== undefined && assID !== 'undefined') {
            this.loadingService.show();
            const actionUriMoveDown = `${this.baseUri}/service/Cmp4DeleteAccDocAss`;
            const methodType = 'PUT';
            const queryParams = {};
            const options = {
                body: {
                    year: year,
                    accDocID: accDocID,
                    entryID: entryID,
                    assID: assID
                }
            };
            const actionMoveDown$ = this.befRepository.restService.request(actionUriMoveDown, methodType, queryParams, options);
            return actionMoveDown$.catch((res: any) => {
                return this.commonService.catchError(res);
            }).pipe(
                switchMap(() => {
                    return  this.cardDataService.update();
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        }
    }

    //删除该分录下的所有辅助，切换分录科目时调用
    deleteAllAss(accDocID: string, entryID: string) {
        const accDoc = this.repository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        const accDocEntry = accDoc.glAccDocEntrys.get(entryID) as GLAccDocEntryEntity;
        const accDocAssistances = accDocEntry.glAccDocAssistances;
        const accDocAssList = [];
        for (let i = 0; i < accDocAssistances.count(); i++) {
            const accDocAss = accDocAssistances[i] as GLAccDocAssistanceEntity;
            accDocEntry.glAccDocAssistances.remove(accDocAss.id);
            accDocAssList.push(accDocAss.id);
        }
        this.loadingService.show();
        const actionUriDelete = `${this.baseUri}/service/Cmp4DeleteAccDocAss`;
        const methodType = 'PUT';
        const queryParams = {};
        const options = {
            body: {
                year: this.rootUistate['year'].value,
                accDocID: accDocID,
                entryID: entryID,
                assIDs: accDocAssList,
                RequestInfo: (this.befRepository).restService.buildRequestInfo()
            }
        };
        const actionDelete$ = this.befRepository.restService.request(actionUriDelete, methodType, queryParams, options);
        return actionDelete$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap(() => {
                return this.cardDataService.update();
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }

    //展示辅助列（切换分录）
    displayAssistance(year: string, ledger: string, accTitleID: string) {
        //先把所有列隐藏
        const glAssistanceViewModel = this.frameContext.appContext.getFrameContext('glaccdocassistance-component').viewModel as GLAccDocAssistanceComponentViewmodel;
        const fields = glAssistanceViewModel.dom.dataGrid_GLAccDocAssistance.fields;
        fields.forEach(field => {
            field.visible = false;
            field.require = false;
            field.readonly = false;
            field.editor.readonly = false;
        });
        const actionUriDisplay = `${this.baseUri}/service/Mgrcmp4GetAccTitleDisPlayCol`;
        const methodType = 'PUT';
        const queryParams = {};
        const options = {
            body: {
                year: year,
                ledger: ledger,
                acctitleID: accTitleID
            }
        };
        if (accTitleID) {
            this.loadingService.show();
            const actionDisplay$ = this.befRepository.restService.request(actionUriDisplay, methodType, queryParams, options);
            return actionDisplay$.catch((res: any) => {
                return this.commonService.catchError(res);
            }).pipe(
                map((data: any) => {
                    //存在辅助核算
                    if (data.existsAss) {
                        const assColumnInfoList = data.assColumnInfoList;
                        fields.forEach(field => {
                            const bingdingID = field.id.split('_');
                            for (let j = 0; j < assColumnInfoList.length; j++) {
                                const dataProp = assColumnInfoList[j].refColCode as string;
                                const prop = dataProp.slice(0, 1).toLowerCase() + dataProp.substring(1, dataProp.length);
                                if (bingdingID[1] === prop) {
                                    field.visible = true;
                                    //设置必填
                                    if (assColumnInfoList[j].isNotNull === true) {
                                        field.require = true;
                                    }
                                    if (prop === 'foreignCurrencyID') {
                                        //币种列是否可以编辑，单一外币不可编辑
                                        if (assColumnInfoList[j].other) {
                                            field.readonly = true;
                                            field.editor.readonly = true;
                                        } else {
                                            field.readonly = false;
                                            field.editor.readonly = false;
                                        }
                                    } else if (prop === 'exchangeRate') {
                                        //汇率不可编辑
                                        field.readonly = true;
                                        field.editor.readonly = true;
                                    }
                                }
                            }
                        });
                        //存在辅助核算，辅助按钮可以点击
                        this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['CanAdd'] = true;
                        return of(true);
                    } else {
                        this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['CanAdd'] = false;
                        return of(false);
                    }
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        } else {
            this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['CanAdd'] = false;
        }
    }

    //获取汇率
    getExchangeRate(accDocEntryID: string, accDocAssistanceID: string) {
        this.loadingService.show();
        const accDocID = this.bindingData.list.currentId.toString();
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        const accDocEntry = accDoc.glAccDocEntrys.get(accDocEntryID) as GLAccDocEntryEntity;
        const accDocAssistance = accDocEntry.glAccDocAssistances.get(accDocAssistanceID);
        const actionUriExchangeRate = `${this.baseUri}/service/Mgrcmp4GetExchangeRate`;
        const methodType = 'PUT';
        const queryParams = {};
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const bizDate = this.commonService.factoryDateTo8(this.frameContext.appContext.getFrameContext('root-component').uiState['AccDocDate']);
        const options = {
            headers: headers,
            body: {
                originalCurrencyID: accDocAssistance.foreignCurrencyID.foreignCurrencyID,
                bizDate: bizDate,
                RequestInfo: (this.befRepository).restService.buildRequestInfo()
            }
        };
        const actionExchangeRate$ = this.befRepository.restService.request(actionUriExchangeRate, methodType, queryParams, options);
        return actionExchangeRate$.catch((res: any) => {
            //选择币种后报错,清空币种和汇率
            setTimeout(() => {
                this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID'], null, true);
                this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID_Code', 'dfCode'], null, true);
                this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID_Name', 'dfName'], null, true);
                this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID_Accuracy'], null, true);
                this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate'], 0, true);
            }, 0);
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                const glAssistanceViewModel = this.frameContext.appContext.getFrameContext('glaccdocassistance-component').viewModel as GLAccDocAssistanceComponentViewmodel;
                const fields = glAssistanceViewModel.dom.dataGrid_GLAccDocAssistance.fields;
                //根据币种精度动态设置外币精度
                fields.forEach(field => {
                    if (field.id === 'gridField_foreignCurrency' && field.editor.type === 'NumericBox') {
                        const fPrecision = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID_Accuracy']) as number;
                        field.editor['precision'] = fPrecision;
                    }
                });
                const exchangeRate = data.returnValue;
                accDocAssistance.exchangeRate = Number(exchangeRate);
                return of(true);
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }

}
