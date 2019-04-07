import { Injectable } from '@angular/core';
import { Repository, BindingData, FrameContext, Change, ChangeType, ViewModel } from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import { FormLoadingService, ListRepositoryService, TreeDataService, BindingDataService, StateMachineService, CommandService } from '@farris/command-services';
import { CardDataService, FormNotifyService } from '@farris/command-services';
import { MessagerService } from '@farris/ui';
import { HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { AccDocService } from './accountingdocumentbill_frm_accdoc';
import { of } from 'rxjs/observable/of';
import { AccDocEntryService } from './accountingdocumentbill_frm_accdocentry';
import { CommonService } from './accdoccommonservice';

@Injectable()
export class LinkViewService extends ListRepositoryService {
    constructor(repository: Repository<any>,
        loadingService: FormLoadingService,
        public commonService: CommonService,
        public accDocEntryService: AccDocEntryService,
        public bindingData: BindingData,
        public accDocService: AccDocService,
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
        const accDocID = this.rootStateMachine['funcAccDocID'];
        this.loadingService.show();
        return this.accDocService.changeYear(year).catch((res: any) => {
            return this.commonService.catchError(res);
        }).pipe(
            switchMap(() => {
                return this.cardDataService.load(accDocID);
            }),
            switchMap(() => {
                this.stateMachineService.transit('InitAction');
                return of(true);
            }),
            switchMap(() => {
                this.accDocService.entryAmount();
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
        const options = {
            body: {
                year: year,
                accDocID: accDocID,
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
            tap(() => {
                this.loadingService.hide();
            })
        );
    }


    //查看上一张、下一张、第一张、最后一张凭证
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
                return this.accDocService.getNowDataName();
            }),
            switchMap(() => {
                return this.accDocService.total('');
            } ),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }


}
