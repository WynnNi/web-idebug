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
        //const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        if (!accDocID) {
            return of(false);
        }
        this.loadingService.show();
        const options = {
            body: {
                ledger: this.rootUistate['accSet_VO'],//filter.ledgerID,
                year: this.rootUistate['year'].value,//year,
                listAccDocID: [accDocID],
                periodID: this.rootUistate['period_VO'],//filter.accPeriodID,
                funcID: 'ZW006',//funcID,
                accOrgID: this.rootUistate['accOrg_VO'],//filter.accOrgID,

            }
        };
        const actionCheck$ = this.befRepository.restService.request(actionUriCheck, methodType, queryParams, options);
        return actionCheck$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                let report = '';
                if (flag === '1') {
                    report = '审核成功' + data[0] + '条；审核失败' + data[1] + '条。' + '<br>';
                } else {
                    report = '取消审核成功' + data[0] + '条；取消审核失败' + data[1] + '条。' + '<br>';
                }
                report = report + '失败原因：' + '<br>';
                for (let i = 2; i < data.length; i++) {
                    report = report + data[i] + '<br>';
                }
                report = '<pre>' + report + '<pre>';
                const options = {
                  title: '凭证审核报告',
                  showMaxButton: true,
                  width: 600,
                  height: 400
                };
                this.formMessageService.show('凭证审核报告', report, options);
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
        const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        if (!accDocID) {
            return of(false);
        }
        this.loadingService.show();
        const options = {
            body: {
                year: year,
                accDocID: [accDocID],
                flag: flag,
                accOrgID: filter.accOrgID,
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
                    report = '记账成功' + data[0] + '条；记账失败' + data[1] + '条。' + '<br>';
                } else {
                    report = '取消记账成功' + data[0] + '条；取消记账失败' + data[1] + '条。' + '<br>';
                }
                report = report + '失败原因：' + '<br>';
                for (let i = 2; i < data.length; i++) {
                    report = report + data[i] + '<br>';
                }
                report = '<pre>' + report + '<pre>';
                const options = {
                  title: '凭证记账报告',
                  showMaxButton: true,
                  width: 600,
                  height: 400
                };
                this.formMessageService.show('凭证记账报告', report, options);
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
        const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        if (!accDocID) {
            return of(false);
        }
        this.loadingService.show();
        const options = {
            body: {
                year: year,
                accDocID: [accDocID],
                flag: flag,
                accOrgID: filter.accOrgID,
                ledger: filter.ledgerID,
                accPeriodID: filter.accPeriodID
            }
        };
        const actionApprove$ = this.befRepository.restService.request(actionUriApprove, methodType, queryParams, options);
        return actionApprove$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                let report = '';
                if (flag === '1') {
                    report = '批准成功' + data[0] + '条；批准失败' + data[1] + '条。' + '<br>';
                } else {
                    report = '取消批准成功' + data[0] + '条；取消批准失败' + data[1] + '条。' + '<br>';
                }
                report = report + '失败原因：' + '<br>';
                for (let i = 2; i < data.length; i++) {
                    report = report + data[i] + '<br>';
                }
                report = '<pre>' + report + '<pre>';
                const options = {
                  title: '凭证批准报告',
                  showMaxButton: true,
                  width: 600,
                  height: 400
                };
                this.formMessageService.show('凭证批准报告', report, options);
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
        const filter = JSON.parse(this.rootUistate['funcFilter']);
        const accDocID = this.bindingData.list.currentId;
        if (!accDocID) {
            return of(false);
        }
        this.loadingService.show();
        const options = {
            body: {
                year: year,
                accDocID: [accDocID],
                flag: flag,
                accOrgID: filter.accOrgID,
                ledger: filter.ledgerID,
                accPeriodID: filter.accPeriodID
            }
        };
        const actionSignature$ = this.befRepository.restService.request(actionUriSignature , methodType, queryParams, options);
        return actionSignature$.catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap((data: any) => {
                let report = '';
                if (flag === '1') {
                    report = '出纳签字成功' + data[0] + '条；出纳签字失败' + data[1] + '条。' + '<br>';
                } else {
                    report = '取消出纳签字成功' + data[0] + '条；取消出纳签字失败' + data[1] + '条。' + '<br>';
                }
                report = report + '失败原因：' + '<br>';
                for (let i = 2; i < data.length; i++) {
                    report = report + data[i] + '<br>';
                }
                report = '<pre>' + report + '<pre>';
                const options = {
                  title: '出纳签字报告',
                  showMaxButton: true,
                  width: 600,
                  height: 400
                };
                this.formMessageService.show('出纳签字报告', report, options);
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
