import { Injectable } from '@angular/core';
import { tap, switchMap, map } from 'rxjs/operators';
import { Repository, BindingData, FrameContext, EntityFactory, ViewModel } from '@farris/devkit';
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

@Injectable()
export class AccDocAssistanceService extends ListRepositoryService {
    constructor(repository: Repository<any>,
        loadingService: FormLoadingService,
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

    /**新增辅助---选择科目时调用*/
    createAssistance(year: string, accDocID: string, accDocEntryID: string, accTitleID: string) {
        //切科目时先清空原先的辅助项
        this.deleteAllAss(accDocID, accDocEntryID);
        //币种、汇率前端赋值
        let currencyShow: any;
        let exchangeRate: number;
        const ledger = this.frameContext.appContext.getFrameContext('root-component').uiState['AccSet'].key;
        this.loadingService.show();
        const methodType = 'PUT';
        const queryParams = {};
        const glAssistanceViewModel = this.frameContext.appContext.getFrameContext('glaccdocassistance-component').viewModel as GLAccDocAssistanceComponentViewmodel;
        const fields = glAssistanceViewModel.dom.dataGrid_GLAccDocAssistance.fields;
        for (let i = 0; i < fields.length; i++) {
            fields[i].visible = false;
        }
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
                return this.catchError(res);
            }).pipe(
                switchMap((data: any) => {
                    if (data.existsAss) {
                        const assColumnInfoList = data.assColumnInfoList;
                        for (let i = 0; i < fields.length; i++) {
                            const bingdingID = fields[i].id.split('_');
                            for (let j = 0; j < assColumnInfoList.length; j++) {
                                const dataProp = assColumnInfoList[j].refColCode as string;
                                const prop = dataProp.slice(0, 1).toLowerCase() + dataProp.substring(1, dataProp.length);
                                if (bingdingID[1] === prop) {
                                    fields[i].visible = true;
                                    if (prop === 'foreignCurrencyID') {
                                        if (assColumnInfoList[j].other) {
                                            fields[i].readonly = true;
                                            fields[i].editor.readonly = true;
                                            const other = assColumnInfoList[j].other.split(',');
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
                                        }
                                    } else if (prop === 'exchangeRate') {
                                        if (assColumnInfoList[j].other) {
                                            fields[i].readonly = true;
                                            fields[i].editor.readonly = true;
                                            exchangeRate = Number(assColumnInfoList[j].other);
                                        }
                                    }
                                }
                            }
                        }
                        this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['CanAdd'] = true;
                        return this.createAss(year, accDocID, accDocEntryID).pipe(
                            switchMap(() => {
                                if (currencyShow) {
                                    setTimeout(() => {
                                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID'], currencyShow.foreignCurrencyID, true);
                                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID_Code', 'dfCode'], currencyShow.foreignCurrencyID_Code.dfCode, true);
                                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrencyID', 'foreignCurrencyID_Name', 'dfName'], currencyShow.foreignCurrencyID_Name.dfName, true);
                                    }, 0);
                                    if (exchangeRate) {
                                        setTimeout(() => {
                                            this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate'], exchangeRate, true);
                                            return of(true);
                                        }, 0);
                                    } else {
                                        return of(true);
                                    }
                                } else if (exchangeRate) {
                                    setTimeout(() => {
                                        this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate'], exchangeRate, true);
                                        return of(true);
                                    }, 0);
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
                })
            );
        } else {
            this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['CanAdd'] = false;
        }
    }


    //新增辅助--内部调用及新增按钮的调用
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
            return this.catchError(res);
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
            return this.catchError(res);
        }).pipe(
            tap(() => {
                this.loadingService.hide();
            })
        );
    }

    //删除该分录下的所有辅助，切换分录科目时调用
    deleteAllAss(accDocID: string, entryID: string) {
        const accDoc = this.repository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        const accDocEntry = accDoc.glAccDocEntrys.get(entryID) as GLAccDocEntryEntity;
        const accDocAssistances = accDocEntry.glAccDocAssistances;
        for (let i = 0; i < accDocAssistances.count(); i++) {
            const accDocAss = accDocAssistances[i] as GLAccDocAssistanceEntity;
            accDocEntry.glAccDocAssistances.remove(accDocAss.id);
        }
    }

    //展示辅助列（切换分录）
    displayAssistance(year: string, ledger: string, accTitleID: string) {
        //先把所有列隐藏
        const glAssistanceViewModel = this.frameContext.appContext.getFrameContext('glaccdocassistance-component').viewModel as GLAccDocAssistanceComponentViewmodel;
        const fields = glAssistanceViewModel.dom.dataGrid_GLAccDocAssistance.fields;
        for (let i = 0; i < fields.length; i++) {
            fields[i].visible = false;
        }
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
                return this.catchError(res);
            }).pipe(
                map((data: any) => {
                    if (data.existsAss) {
                        const assColumnInfoList = data.assColumnInfoList;
                        for (let i = 0; i < fields.length; i++) {
                            const bingdingID = fields[i].id.split('_');
                            for (let j = 0; j < assColumnInfoList.length; j++) {
                                const dataProp = assColumnInfoList[j].refColCode as string;
                                const prop = dataProp.slice(0, 1).toLowerCase() + dataProp.substring(1, dataProp.length);
                                if (bingdingID[1] === prop) {
                                    fields[i].visible = true;
                                    if (prop === 'foreignCurrencyID') {
                                        if (assColumnInfoList[j].other) {
                                            fields[i].readonly = true;
                                            fields[i].editor.readonly = true;
                                        }
                                    }
                                }
                            }
                        }
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
        const options = {
            headers: headers,
            body: {
                originalCurrencyID: accDocAssistance.foreignCurrencyID.foreignCurrencyID,
                bizDate: this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['AccDocDate'],
                RequestInfo: (this.befRepository).restService.buildRequestInfo()
            }
        };
        const actionExchangeRate$ = this.befRepository.restService.request(actionUriExchangeRate, methodType, queryParams, options);
        return actionExchangeRate$.catch((res: any) => {
            return this.catchError(res);
        }).pipe(
            map((data: any) => {
                const exchangeRate = data.returnValue;
                accDocAssistance.exchangeRate = Number(exchangeRate);
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
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
}
