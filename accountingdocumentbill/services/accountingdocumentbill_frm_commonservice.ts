import { Injectable } from '@angular/core';
import { tap, switchMap, map } from 'rxjs/operators';
import { Repository, BindingData, FrameContext, Change, ChangeType, ViewModel } from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import { FormLoadingService, ListRepositoryService, TreeDataService, BindingDataService, StateMachineService, CommandService } from '@farris/command-services';
import { CardDataService, FormNotifyService } from '@farris/command-services';
import { MessagerService } from '@farris/ui';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { GLAccountingDocumentEntity } from '../models/entities/glaccountingdocumententity';
import { of } from 'rxjs/observable/of';
import { CommonService } from './commonservice';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AccDocCommonService extends ListRepositoryService {
    constructor(repository: Repository<any>,
        loadingService: FormLoadingService,
        public commonService: CommonService,
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
        public formMessageService: MessagerService)
        {
        super(repository, loadingService);
    }
    //公共变量
    public befRepository = <BefRepository<any>>this.repository;
    public restService = this.befRepository.restService;
    public baseUri = this.restService.baseUri;
    public rootStateMachine = this.frameContext.appContext.getFrameContext('root-component').stateMachine;
    public rootUistate = this.frameContext.appContext.getFrameContext('root-component').uiState;
    public debitAmount0;


    /*****获取账簿、类型名称（解决了前端账簿、类型的展示问题） */
    getDataName() {
        const actionDataNameUri = `${this.baseUri}/service/GetDataName`;
        const queryParams1 = {};
        const methodType = 'PUT';
        const optionsName = {
            body: {
                year: this.rootUistate['year'].value,
                accSetID: this.rootUistate['AccSet'].key,
                accDocTypeID: this.rootUistate['AccDocType'].key
            }
        };
        const actionDataName$ = this.befRepository.restService.request(actionDataNameUri, methodType, queryParams1, optionsName);
        return actionDataName$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            map((data: any) => {
            this.rootUistate['AccSet'] = {key: this.rootUistate['AccSet'].key, value: data.accSetName};
            this.rootUistate['AccDocType'] = {key: this.rootUistate['AccDocType'].key, value: data.accDocTypeName};
            return of(true);
        }));
    }
    /******封装获取账簿、类型名称方法，用于其它方法调用 */
    getNowDataName() {
        const currentId = this.bindingData.list.currentId;
        if (currentId) {
            const newAccDocID = currentId.toString();
            const accDoc = this.befRepository.entityCollection.getEntityById(newAccDocID) as GLAccountingDocumentEntity;
            const accDocType = accDoc.accDocTypeID.accDocTypeID;
            this.rootUistate['AccDocType'].key = accDocType;
            return this.getDataName();
        }
    }

    /*******切换年度*/
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
            return this.commonService.catchError(res);
        }).pipe(
            tap(() => {
                this.loadingService.hide();
            })
        );
    }

    /* 外币、汇率、金额的联动计算    单价、数量、金额的联动计算*/
    //由金额往单价、数量、汇率、外币计算都加乘积和金额不相等的判断，相等不计算
    assistanceAmount() {
        const foreignCurrency = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrency']);
        const exchangeRate = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate']);
        const unitPrice = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'unitPrice']);
        const quantity = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'quantity']);
        const amount = this.bindingData.getValue(['glAccDocEntrys', 'glAccDocAssistances', 'amount']);
        const foreignCurrencyTo4 = Number(foreignCurrency.toFixed(4));
        const exchangeRateTo8 = Number((exchangeRate).toFixed(8));
        const amountTo2 = Number(Number(amount).toFixed(2));
        const unitPriceTo2 = Number(unitPrice.toFixed(2));
        const quantityTo2 = Number(quantity.toFixed(2));
        //汇率不为0，计算外币
        if (exchangeRateTo8 - 0 !== 0) {
            const a2 = Number((exchangeRateTo8 * foreignCurrencyTo4).toFixed(2));
            if (a2 - amountTo2 !== 0) {
                const f8 = Number((amountTo2 / exchangeRateTo8).toFixed(8));
                setTimeout(() => {
                    this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'foreignCurrency'], f8, true, true);
                }, 0);
            }
        } else if (foreignCurrencyTo4 - 0 !== 0) {//汇率为0，外币不为0，计算汇率
            const a2 = Number((exchangeRateTo8 * foreignCurrencyTo4).toFixed(2));
            if (a2 - amountTo2 !== 0) {
                const e4 = Number((amountTo2 / foreignCurrencyTo4).toFixed(4));
                setTimeout(() => {
                    this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'exchangeRate'], e4, true, true);
                }, 0);
            }
        }//汇率、外币都为0就不管了

        //数量不为0，计算单价
        if (quantityTo2 - 0 !== 0) {
            const a2 = Number((quantityTo2 * unitPriceTo2).toFixed(2));
            if (a2 - amountTo2 !== 0) {
                const u2 = Number((amountTo2 / quantityTo2).toFixed(2));
                setTimeout(() => {
                    this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'unitPrice'], u2, true, true);
                }, 0);
            }
        } else if (unitPriceTo2 - 0 !== 0) {//数量为0，单价不为0，计算数量
            const a2 = Number((quantityTo2 * unitPriceTo2).toFixed(2));
            if (a2 - amountTo2 !== 0) {
                const q2 = Number((amountTo2 / unitPriceTo2).toFixed(2));
                setTimeout(() => {
                    this.bindingData.setValue(['glAccDocEntrys', 'glAccDocAssistances', 'quantity'], q2, true, true);
                }, 0);
            }
        }//数量、单价都为0就不计算

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
                    sumDFFZ = this.commonService.plus(sumDFFZ, accDocAssistances[i].amount);
                } else if (accDocEntry.lendingDirection === 'Debit' || accDocEntry.debitAmount !== 0) {
                    sumJFFZ = this.commonService.plus(sumJFFZ, accDocAssistances[i].amount);
                }
            }
            setTimeout(() => {
                if (accDocEntry.creditAmount - sumDFFZ !== 0) {
                    accDocEntry.creditAmount = sumDFFZ;
                }
                if (accDocEntry.debitAmount - sumJFFZ !== 0) {
                    accDocEntry.debitAmount = sumJFFZ;
                }
            }, 0);
        }
    }

    /****合计分录金额（合计分录金额和制单人信息的更新） */
    total(accDocID: string): Observable<any> {
        if (!accDocID) {
            accDocID = this.bindingData.list.currentId.toString();
        }
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        //已记账审核不可编辑、删除
        if (!!accDoc.isBook || !!accDoc.isAudit) {
            this.rootUistate['CantEdit'] = true;
        } else {
            this.rootUistate['CantEdit'] = false;
        }
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
                sumDF = this.commonService.plus(sumDF, accDocEntrys[i].creditAmount);
            } else if (accDocEntrys[i].debitAmount - 0 !== 0) {
                sumJF = this.commonService.plus(sumJF, accDocEntrys[i].debitAmount);
            }
        }
        this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['TotalJF'] = this.commonService.thousand(sumJF.toFixed(2)) ;
        this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['TotalDF'] = this.commonService.thousand(sumDF.toFixed(2));
        this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['Difference'] = this.commonService.thousand((sumJF - sumDF).toFixed(2));
        this.rootUistate['AccManager'] = accDoc.accManagerName;
        this.rootUistate['Booker'] = accDoc.bookerName;
        this.rootUistate['Cashier'] = accDoc.cashierName;
        this.rootUistate['Auditor'] = accDoc.auditorName;
        this.rootUistate['Approver'] = accDoc.approverName;
        this.rootUistate['Maker'] = accDoc.makerName;
        if (Math.abs(sumJF) >= 99999999999) {
            //this.formMessageService.warning('金额超限，进行数据回滚！');
            setTimeout(() => {
                this.bindingData.setValue(['glAccDocEntrys', 'debitAmount'], 0, true, true);
            }, 0);
        } else {
            this.debitAmount0 = this.bindingData.getValue(['glAccDocEntrys', 'debitAmount']);
        }
        if (sumJF > 0) {
            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['Total'] = this.commonService.money2Amount(sumJF.toString());
        } else {
            this.frameContext.appContext.getFrameContext('glaccdocentry-component').uiState['Total'] = this.commonService.money2Amount((- sumJF).toString());
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
}
