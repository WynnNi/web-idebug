import { Injectable } from '@angular/core';
import { tap, switchMap, map } from 'rxjs/operators';
import { Repository, BindingData, FrameContext, EntityFactory} from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import {FormLoadingService, ListRepositoryService, TreeDataService, BindingDataService} from '@farris/command-services';
import { CardDataService , FormNotifyService} from '@farris/command-services';
import { MessagerService } from '@farris/ui';
import { GLAccountingDocumentEntity } from '../models/entities/glaccountingdocumententity';
import { GLAccDocEntryEntity } from '../models/entities/glaccdocentryentity';
import { of } from 'rxjs/observable/of';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccDocService } from './accountingdocumentbill_frm_accdoc';


@Injectable()
export class AccDocEntryService extends ListRepositoryService {
    constructor(repository: Repository<any>, loadingService: FormLoadingService,
        public bindingData: BindingData,
        public accDocService: AccDocService,
        public cardDataService: CardDataService,
        public treeDataService: TreeDataService,
        public frameContext: FrameContext,
        public formNotifyService: FormNotifyService,
        public bindingDataService: BindingDataService,
        public formMessageService: MessagerService) {
        super(repository, loadingService);
    }

    //公共变量
    public befRepository = <BefRepository<any>>this.repository;
    public restService = this.befRepository.restService;
    public baseUri = this.restService.baseUri;

    /**新增分录 */
    createAccDocEntry(year: string, accDocID: string) {
        this.loadingService.show();
        const actionUriCreate = `${this.baseUri}/service/CreateAccDocEntry`;
        const methodType = 'PUT';
        const queryParams = {};
        const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
        const accDocEntrys = accDoc.glAccDocEntrys;
        let index = 0;
        for (let i = 0; i < accDocEntrys.count(); i++) {
            if (Number(accDocEntrys[i].accEntryCode) > index) {
                index = Number(accDocEntrys[i].accEntryCode);
            }
        }
        const options = {
            body: {
                year: year,
                accDocID: accDocID,
                index: (index + 1).toString(),
                RequestInfo: (this.befRepository).restService.buildRequestInfo()
            }
        };
        const actionCreate$ = this.befRepository.restService.request(actionUriCreate, methodType, queryParams, options);
        return actionCreate$.catch((res: any) => {
            return this.accDocService.catchError(res);
        }).pipe(
            map((data: any) => {
                const returnValue = data['returnValue'];
                const entity = EntityFactory<GLAccDocEntryEntity>(GLAccDocEntryEntity, returnValue);
                accDoc.glAccDocEntrys.appendNew(entity);
            }),
            switchMap(() => {
                return this.accDocService.total(accDocID);
            }),
            tap(() => {
                this.loadingService.hide();
            })
        );
    }

    /**********删除分录 */
    deleteEntryByID(year: string, accDocID: string, entryID: string) {
        if (entryID !== undefined && entryID !== 'undefined') {
            this.loadingService.show();
            const actionUriDelete = `${this.baseUri}/service/DeleteEntryByID`;
            const methodType = 'PUT';
            const queryParams = {};
            const headers = new HttpHeaders({'Accept': 'application/json'});
            const entityIDs: Array<string> = [entryID];
            const options = {
                headers: headers,
                body: {
                    year: year,
                    accDocID: accDocID,
                    entryIDList: entityIDs,
                    RequestInfo: (this.befRepository).restService.buildRequestInfo()
                }
            };
            const actionDelete$ = this.befRepository.restService.request(actionUriDelete, methodType, queryParams, options);
            return actionDelete$.catch((res: any) => {
                return this.accDocService.catchError(res);
            }).pipe(
                switchMap((data: any) => {
                    const returnValue = data['returnValue'];
                    if (returnValue) {
                    this.formMessageService.info(returnValue);
                    }
                    return of(true);
                }),
                switchMap(() => {
                    return this.accDocService.total(accDocID);
                }),
                tap(() => {
                    this.loadingService.hide();
                })
            );
        } else {
            this.formMessageService.warning('不存在分录数据，无需删除！');
        }
    }


    /******合计辅助数量 */
    assistanceAmount(entryID: string) {
        if (entryID !== undefined && entryID !== 'undefined') {
            const accDocID = this.bindingData.list.currentId.toString();
            const accDoc = this.befRepository.entityCollection.getEntityById(accDocID) as GLAccountingDocumentEntity;
            const accDocEntrys = accDoc.glAccDocEntrys;
            const accDocEntry = accDocEntrys.get(entryID) as GLAccDocEntryEntity;
            const accDocAssistances = accDocEntry.glAccDocAssistances;
            this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['AssistanceAmount'] = '(' + accDocAssistances.count().toString() + ')';
        } else {
            this.frameContext.appContext.getFrameContext('glaccdocassistance-component').uiState['AssistanceAmount'] = '';
        }
    }
}
