import { Injectable } from '@angular/core';
import { Repository, BindingData, FrameContext, Change, ChangeType, ViewModel } from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import { FormLoadingService, ListRepositoryService, TreeDataService, BindingDataService, StateMachineService, CommandService } from '@farris/command-services';
import { CardDataService, FormNotifyService } from '@farris/command-services';
import { MessagerService } from '@farris/ui';
import { HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AccDocEntryService } from './accountingdocumentbill_frm_accdocentry';
import { CommonService } from './commonservice';
import { AccDocCommonService } from './accountingdocumentbill_frm_commonservice';

@Injectable()
export class LinkViewService extends ListRepositoryService {
    constructor(repository: Repository<any>,
        loadingService: FormLoadingService,
        public commonService: CommonService,
        public accDocCommonService: AccDocCommonService,
        public accDocEntryService: AccDocEntryService,
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
    public rootStateMachine = this.frameContext.appContext.getFrameContext('root-component').stateMachine;
    public rootUistate = this.frameContext.appContext.getFrameContext('root-component').uiState;


    //联查加载
    linkViewLoad() {
        const year = this.rootUistate['funcYear'];
        const accDocID = this.rootUistate['funcAccDocID'];
        this.loadingService.show();
        return this.accDocCommonService.changeYear(year).catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap(() => {
                return this.cardDataService.load(accDocID);
            }),
            switchMap(() => {
                this.stateMachineService.transit('Look');
                return of(true);
            }),
            switchMap(() => {
                return this.accDocCommonService.getNowDataName();
            }),
            switchMap(() => {
                this.accDocCommonService.entryAmount();
                return of(true);
            }),
            switchMap(() => {
                const entryID = this.bindingData.getValue(['glAccDocEntrys', 'id']);
                this.accDocEntryService.assistanceAmount(entryID);
                return of(true);
            })
        );
    }


    //审核、取消审核
    checkAccDoc(flag: string) {
        let actionUriCheck = '';
        if (flag === '1') {
            actionUriCheck = `${this.baseUri}/service/CheckAccDoc`;
        } else {
            actionUriCheck = `${this.baseUri}/service/CancelCheckAccDoc`;
        }
        const methodType = 'PUT';
        const queryParams = {};
        const year = this.rootUistate['funcYear'];
        const funcID = this.rootUistate['funcID'];
        const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        if (!accDocID) {
            return of(false);
        }
        this.loadingService.show();
        const options = {
            body: {
                ledger: filter.ledgerID,
                year: year,
                listAccDocID: [accDocID],
                periodID: filter.accPeriodID,
                funcID: funcID,
                accOrgID: filter.accOrgID,

            }
        };
        const actionCheck$ = this.befRepository.restService.request(actionUriCheck, methodType, queryParams, options);
        return actionCheck$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                let report = '';
                if (flag === '1') {
                    if (data[0] - 0 > 0) {
                        report = '审核成功！';
                    } else {
                        report = '审核失败！'  + '<br>';
                        report = report + '失败原因：' + '<br>';
                        report = report + data[2] + '<br>';
                    }
                    report = '<pre>' + report + '<pre>';
                } else {
                    if (data[0] - 0 > 0) {
                        report = '取消审核成功！';
                    } else {
                        report = '取消审核失败！'  + '<br>';
                        report = report + '失败原因：' + '<br>';
                        report = report + data[2] + '<br>';
                    }
                    report = '<pre>' + report + '<pre>';
                }
                report = '<pre>' + report + '<pre>';
                this.formMessageService.info(report);
                return of(true);
            }),
            switchMap(() => {
                return  this.cardDataService.update();
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }


    //记账、取消记账
    accountAccDoc(flag: string) {
        const actionUriAccount = `${this.baseUri}/service/AccountAccDoc`;
        const methodType = 'PUT';
        const queryParams = {};
        const year = this.rootUistate['funcYear'];
        const funcID = this.rootUistate['funcID'];
        const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        if (!accDocID) {
            return of(false);
        }
        this.loadingService.show();
        const options = {
            body: {
                year: year,
                accDocID: accDocID,
                flag: flag,
                accOrgID: filter.accOrgID,
                funcID: funcID,
                ledger: filter.ledgerID,
                accPeriodID: filter.accPeriodID
            }
        };
        const actionAccount$ = this.befRepository.restService.request(actionUriAccount, methodType, queryParams, options);
        return actionAccount$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                let report = '';
                if (flag === '1') {
                    if (data[0] - 0 > 0) {
                        report = '记账成功！';
                    } else {
                        report = '记账失败！'  + '<br>';
                        report = report + '失败原因：' + '<br>';
                        report = report + data[2] + '<br>';
                    }
                    report = '<pre>' + report + '<pre>';
                } else {
                    if (data[0] - 0 > 0) {
                        report = '取消记账成功！';
                    } else {
                        report = '取消记账失败！'  + '<br>';
                        report = report + '失败原因：' + '<br>';
                        report = report + data[2] + '<br>';
                    }
                    report = '<pre>' + report + '<pre>';
                }
                report = '<pre>' + report + '<pre>';
                this.formMessageService.info(report);
                return of(true);
            }),
            switchMap(() => {
                return  this.cardDataService.update();
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }


    //批准、取消批准
    approveAccDoc(flag: string) {
        let actionUriApprove = '';
        if (flag === '1') {
            actionUriApprove = `${this.baseUri}/service/approvedaccdoc`;
        } else {
            actionUriApprove = `${this.baseUri}/service/cancelapprovedaccdoc`;
        }
        const methodType = 'PUT';
        const queryParams = {};
        const year = this.rootUistate['funcYear'];
        const funcID = this.rootUistate['funcID'];
        const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        if (!accDocID) {
            return of(false);
        }
        this.loadingService.show();
        const options = {
            body: {
                year: year,
                listAaccDocID: [accDocID],
                funcID: funcID,
                accOrgID: filter.accOrgID,
                ledger: filter.ledgerID,
                periodID: filter.accPeriodID
            }
        };
        const actionApprove$ = this.befRepository.restService.request(actionUriApprove, methodType, queryParams, options);
        return actionApprove$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                let report = '';
                if (flag === '1') {
                    if (data[0] - 0 > 0) {
                        report = '批准成功！';
                    } else {
                        report = '批准失败！'  + '<br>';
                        report = report + '失败原因：' + '<br>';
                        report = report + data[2] + '<br>';
                    }
                    report = '<pre>' + report + '<pre>';
                } else {
                    if (data[0] - 0 > 0) {
                        report = '取消批准成功！';
                    } else {
                        report = '取消批准失败！'  + '<br>';
                        report = report + '失败原因：' + '<br>';
                        report = report + data[2] + '<br>';
                    }
                    report = '<pre>' + report + '<pre>';
                }
                report = '<pre>' + report + '<pre>';
                this.formMessageService.info(report);
                return of(true);
            }),
            switchMap(() => {
                return  this.cardDataService.update();
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }


    //出纳签字、取消出纳签字
    signatureAccDoc(flag: string) {
        let actionUriSignature  = '';
        if (flag === '1') {
            actionUriSignature = `${this.baseUri}/service/signedaccdocbycashier`;
        } else {
            actionUriSignature  = `${this.baseUri}/service/canclesignedaccdocbycashier`;
        }
        const methodType = 'PUT';
        const queryParams = {};
        const year = this.rootUistate['funcYear'];
        const funcID = this.rootUistate['funcID'];
        const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        if (!accDocID) {
            return of(false);
        }
        this.loadingService.show();
        const options = {
            body: {
                year: year,
                listAccDocID: [accDocID],
                funcID: funcID,
                accOrgID: filter.accOrgID,
                ledger: filter.ledgerID,
                periodID: filter.accPeriodID
            }
        };
        const actionSignature$ = this.befRepository.restService.request(actionUriSignature , methodType, queryParams, options);
        return actionSignature$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                let report = '';
                if (flag === '1') {
                    if (data[0] - 0 > 0) {
                        report = '出纳签字成功！';
                    } else {
                        report = '出纳签字失败！'  + '<br>';
                        report = report + '失败原因：' + '<br>';
                        report = report + data[2] + '<br>';
                    }
                    report = '<pre>' + report + '<pre>';
                } else {
                    if (data[0] - 0 > 0) {
                        report = '取消出纳签字成功！';
                    } else {
                        report = '取消出纳签字失败！'  + '<br>';
                        report = report + '失败原因：' + '<br>';
                        report = report + data[2] + '<br>';
                    }
                    report = '<pre>' + report + '<pre>';
                }
                report = '<pre>' + report + '<pre>';
                this.formMessageService.info(report);
                return of(true);
            }),
            switchMap(() => {
                return  this.cardDataService.update();
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }


    //查看上一张(3)、下一张(2)、第一张(1)、最后一张凭证(4)
    lookAccDocOnLinkView(queryFlag: string) {
        const actionUriLook = `${this.baseUri}/service/GetAccDocOnLinkView`;
        const methodType = 'PUT';
        const queryParams = {};
        const year = this.rootUistate['funcYear'];
        const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        const headers = new HttpHeaders({ 'Accept': 'application/json' });
        const options = {
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
                queryFlag: queryFlag,
                year: year,
                accDocID: accDocID,
                makerID: filter.makerID
            }
        };
        this.loadingService.show();
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
            tap(() => {
                this.loadingService.hide();
            })
        );
    }


}
