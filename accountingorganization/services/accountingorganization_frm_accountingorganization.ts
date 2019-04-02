import { Injectable } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { Repository, BindingData, FrameContext, Change, ChangeType} from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import {FormLoadingService, ListRepositoryService, TreeDataService, BindingDataService, SubListDataService, StateMachineService} from '@farris/command-services';
import { CardDataService , FormNotifyService} from '@farris/command-services';
import { MessagerService } from '@farris/ui';
import { templateJitUrl } from '@angular/compiler';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { FIAccountingOrganizationEntity } from '../models/entities/fiaccountingorganizationentity';
import { of } from 'rxjs/observable/of';
import { FIAccountingSetEntity } from '../models/entities/fiaccountingsetentity';

@Injectable()
export class AccOrgService extends ListRepositoryService {
    constructor(repository: Repository<any>, loadingService: FormLoadingService,
      public bindingData: BindingData,
      public cardDataService: CardDataService,
      public treeDataService: TreeDataService,
      public subListDataService: SubListDataService,
      public frameContext: FrameContext,
      public stateMachineService: StateMachineService,
      public formNotifyService: FormNotifyService,
      public bindingDataService: BindingDataService,
      public formMessageService: MessagerService) {
        super(repository, loadingService);
    }
    //公共变量
    public befRepository = <BefRepository<any>>this.repository;
    public restService = this.befRepository.restService;
    public baseUri = this.restService.baseUri;

    /* 更改主账簿名称 */
    updateMainLedgerName() {
      this.bindingData.changes.subscribe((change: Change) => {
        const state = this.frameContext.appContext.getFrameContext('root-component').stateMachine.context.state;
        const path = change.path;
        if (path[0] === 'name' && state === 'add') {
          const accOrgID = this.bindingData.getValue(['id']);
          const accOrg = this.befRepository.entityCollection.getEntityById(accOrgID) as FIAccountingOrganizationEntity;
          const accSets = accOrg.fiAccountingSets;
          for (let i = 0; i < accSets.count(); i++) {
            const accSet = accSets[i] as FIAccountingSetEntity;
            if (accSet.accProperty === 'MainAccSet') {
              accSet.name = change.value + '主账簿';
            }
          }
        }
      });
    }

    /* 新增子级 */
    addChildOrg(accOrgID: string) {
      const accOrg = this.befRepository.entityCollection.getEntityById(accOrgID) as FIAccountingOrganizationEntity;
      if (accOrg.treeInfo.layer - 9 >= 0) {
        this.formMessageService.warning('级数超过最大级（九级）限制，不允许新增子级！');
        return of(false);
      } else {
        return this.treeDataService.addChild(accOrgID).pipe(
          switchMap(() => {
            this.stateMachineService.transit('Create');
            return of(true);
          })
        );
      }
    }
    /* 停用/取消停用核算组织 */
    enableOrg(accOrgID: string) {
      const actionEnableUri = `${this.baseUri}/service/EnableOrg`;
      const methodType = 'PUT';
      const queryParams = {};
      const options = {
        body: {
          accOrgID: accOrgID
        }
      };
      const actionEnable$ = this.befRepository.restService.request(actionEnableUri, methodType,  queryParams, options);
      const accOrg = this.befRepository.entityCollection.getEntityById(accOrgID) as FIAccountingOrganizationEntity;
      let message = '';
      let info = '';
      if (accOrg.isDisable) {
        message = '确定要取消停用' + accOrg.code + ':' + accOrg.name + '核算组织及其全部核算账簿?';
        info = accOrg.code + ':' + accOrg.name + '核算组织及其全部核算账簿取消停用成功！';
      } else {
        message = '确定要停用' + accOrg.code + ':' + accOrg.name + '核算组织及其全部核算账簿?';
        info = accOrg.code + ':' + accOrg.name + '核算组织及其全部核算账簿停用成功！';
      }
      const s = confirm(message);
      if (s) {
        this.loadingService.show();
          return actionEnable$.catch((res: any) => {
            return this.catchError(res);
          }).pipe(
            switchMap(() => this.cardDataService.update()),
            tap(() => {
              this.loadingService.hide();
              this.formNotifyService.info(info);
            })
          );
      }
    }

    /* 引入行政组织 */
    refCopyAdminOrg(adminOrgIDs: any) {
      const actionRefUri = `${this.baseUri}/service/RefCopyAdminOrg`;
      const methodType = 'PUT';
      const queryParams = {};
      const options = {
        body: {
          adminOrgIDs: [adminOrgIDs.key],
          RequestInfo: (this.befRepository).restService.buildRequestInfo()
        }
      };
      const actionRef$ = this.befRepository.restService.request(actionRefUri, methodType,  queryParams, options);
      this.loadingService.show();
        return actionRef$.catch((res: any) => {
          return this.catchError(res);
        }).pipe(
          switchMap((res: any) => {
            const data = res.returnValue;
            let report = '编号' + '\t' + '名称' + '\t' + '状态' + '\t' + '原因' + '<br>';
            for (let i = 0; i < data.length; i++) {
              report = report + data[i].code + '\t' + data[i].name + '\t' + data[i].state + '\t' + data[i].reason + '<br>';
            }
            report = '<pre>' + report + '<pre>';
            const options = {
              title: '引入行政组织报告',
              showMaxButton: true,
              width: 600,
              height: 400
            };
            this.formMessageService.show('引入行政组织报告', report, options);
            return of(true);
          }),
          switchMap(() => {
            this.befRepository.entityCollection.clear();
            return this.treeDataService.load();
          }),
          tap(() => {
            this.loadingService.hide();
          })
        );
    }

    /* 调整核算组织位置*/
    changeOrgPosition(accOrgID: string, newParentID: any) {
      const actionChangeUri = `${this.baseUri}/service/ChgOrgPosition`;
      const methodType = 'PUT';
      const queryParams = {};
      const options = {
        body: {
          orgID: accOrgID,
          newParentID: newParentID.key
        }
      };
      const actionChange$ = this.befRepository.restService.request(actionChangeUri, methodType,  queryParams, options);
      const accOrg = this.befRepository.entityCollection.getEntityById(accOrgID) as FIAccountingOrganizationEntity;
      let message = '';
      if (newParentID) {
        const parentAccOrg = this.befRepository.entityCollection.getEntityById(newParentID.key) as FIAccountingOrganizationEntity;
        message = '确定要将核算组织' + accOrg.code + ':' + accOrg.name + '及其下级移动到核算组织' + parentAccOrg.code + ':' + parentAccOrg.name + '下？';
      } else {
        message = '确定要将核算组织' + accOrg.code + ':' + accOrg.name + '及其下级移动到第一级？';
      }
      const s = confirm(message);
      if (s) {
        this.loadingService.show();
        return actionChange$.catch((res: any) => {
          return this.catchError(res);
        }).pipe(
            switchMap(() => {
              this.befRepository.entityCollection.clear();
              return this.treeDataService.load();
            }),
            tap(() => {
                this.loadingService.hide();
              this.formNotifyService.info('调整成功！');
          })
        );
      }
    }


    /* 停用/取消停用核算账簿 */
    enableAccSet(accOrgID: string, accSetID: string) {
        const actionEnableUri = `${this.baseUri}/service/EnableAccSet`;
        const methodType = 'PUT';
        const queryParams = {};
        const date = new Date();
        const nowYear = date.getFullYear().toString();
        const options = {
            body: {
                year: nowYear,
                accOrgID: accOrgID,
                accSetID: accSetID
            }
        };
        const actionEnable$ = this.befRepository.restService.request(actionEnableUri, methodType, queryParams, options);
        const accOrg = this.befRepository.entityCollection.getEntityById(accOrgID) as FIAccountingOrganizationEntity;
        const accSet = accOrg.fiAccountingSets.get(accSetID);
        let message = '';
        let info = '';
        if (accSet.isDisable) {
          message = '确定要取消停用' + accSet.code + ':' + accSet.name + '核算账簿?';
          info = '核算账簿' + accSet.code + ':' + accSet.name + '取消停用成功!';
        } else {
          message = '确定要停用' + accSet.code + ':' + accSet.name + '核算账簿?';
          info = '核算账簿' + accSet.code + ':' + accSet.name + '停用成功!';
        }
        const s = confirm(message);
        if (s) {
          this.loadingService.show();
            return actionEnable$.catch((res: any) => {
              return this.catchError(res);
            }).pipe(
              switchMap(() => this.cardDataService.update()),
              tap(() => {
                this.loadingService.hide();
                this.formNotifyService.info(info);
              })
            );
        }
    }

    /*****编号名称校验 */
    checkCodeName(accOrgID: string) {
      const accOrgs = this.befRepository.entityCollection.toArray();
      const accOrg = this.befRepository.entityCollection.getEntityById(accOrgID);
      const accSets = accOrg.fiAccountingSets.items;
      //核算组织编号、名称校验
      if (accOrg.code === '' || accOrg.code == null) {
        this.formMessageService.error('核算组织编号不能为空！');
        return false;
      }
      if (accOrg.name === '' || accOrg.name == null) {
        this.formMessageService.error('核算组织名称不能为空！');
        return false;
      }
      const pattern1 = new RegExp('\\b[a-zA-Z0-9]');
      if (!pattern1.test(accOrg.code)) {
        this.formMessageService.error('非法字符！核算组织编号只能是字母数字！');
        return false;
      }
      const pattern2 = new RegExp('[0-9a-zA-Z_\u4e00-\u9fa5]+$');
      if (!pattern2.test(accOrg.name)) {
        this.formMessageService.error('非法字符！核算组织名称只能是字母数字汉字和下划线！');
        return false;
      }
      //核算组织编号、名称唯一性校验
      for (let i = 0; i < accOrgs.length; i++) {
        const accountOrg = accOrgs[i] as FIAccountingOrganizationEntity;
        if (accountOrg.id !== accOrgID) {
          if (accountOrg.code === accOrg.code) {
            this.formMessageService.error('核算组织编号不唯一！');
            return false;
          }
          if (accountOrg.name === accOrg.name) {
            this.formMessageService.error('核算组织名称不唯一！');
            return false;
          }
        }
      }
      //核算账簿编号、名称校验
      for (let i = 0; i < accSets.length; i++) {
        const accountSet = accSets[i] as FIAccountingSetEntity;
        if (!accountSet.code) {
          this.formMessageService.error('核算账簿编号不能为空！');
          return false;
        }
        if (!accountSet.name) {
          this.formMessageService.error('核算账簿名称不能为空！');
          return false;
        }
        if (!pattern1.test(accountSet.code)) {
          this.formMessageService.error('非法字符！核算账簿编号只能是字母数字！');
          return false;
        }
        if (!pattern2.test(accountSet.name)) {
          this.formMessageService.error('非法字符！核算账簿名称只能是字母数字汉字和下划线！');
          return false;
        }
        for (let j = 0; j < accSets.length; j++) {
          const accSet = accSets[j] as FIAccountingSetEntity;
          if (accountSet.id !== accSet.id) {
            if (accountSet.code === accSet.code) {
              this.formMessageService.error('核算账簿编号不唯一！');
              return false;
            }
            if (accountSet.name === accSet.name) {
              this.formMessageService.error('核算账簿名称不唯一！');
              return false;
            }
          }
        }
      }
      return true;
    }

    /*****默认年度当前年、默认编辑按钮可点击*/
    initData() {
      this.frameContext.appContext.getFrameContext('detail-form-component').uiState['canEdit'] = true;
    }

    /****更改编辑按钮的可点击性 */
    updateEdit(id: string) {
      if (id) {
      const accOrg = this.befRepository.entityCollection.getEntityById(id);
      this.frameContext.appContext.getFrameContext('detail-form-component').uiState['canEdit'] = !accOrg.isDisable;
      }
    }

    /* 更改删除账簿按钮的可点击性 */
    updateDelAccSet(accOrgID: string, accSetID: string) {
      if (accOrgID) {
        const accOrg = this.befRepository.entityCollection.getEntityById(accOrgID) as FIAccountingOrganizationEntity;
        const accSets = accOrg.fiAccountingSets;
        const accSet = accSets.get(accSetID) as FIAccountingSetEntity;
        if (accSet.accProperty === 'mainAccSet') {
          this.frameContext.appContext.getFrameContext('fiaccountingset-component').uiState['AccSetCanDel'] = false;
        } else {
          this.frameContext.appContext.getFrameContext('fiaccountingset-component').uiState['AccSetCanDel'] = !accOrg.isDisable;
        }
      }
    }

    /*****删除核算账簿 */
    deleteAccSet(accSetID: string) {
      //注释掉的代码等平台完善
      /* const accOrgID = this.bindingData.list.currentId.toString();
      const accOrg = this.befRepository.entityCollection.getEntityById(accOrgID) as FIAccountingOrganizationEntity;
      const accSets = accOrg.fiAccountingSets.items;
      let info = '删除成功！';
      let confirmInfo = '确定要删除核算账簿';
      for (let i = 0; i < accSets.length; i++) {
        if (accSets[i].id === accSetID) {
          info = '核算账簿' + accSets[i]['code'] + ':' + accSets[i]['name'] + info;
          confirmInfo = confirmInfo + accSets[i]['code'] + ':' + accSets[i]['name'] + '?';
        }
      }
      const s = confirm(confirmInfo); */
      //if (s === true) {
        return this.subListDataService.removeAndSave(accSetID).catch((res: any) => {
          if (res.status === 500 && res.error.Code === 'Cef1004') {
              return this.cardDataService.cancel().pipe(
                switchMap(() => {
                  console.log(res.error.Message);
                  return this.treeDataService.load();
                })
              );
          }
          return Observable.throw(res);
        }).pipe(
        tap(() => {
          this.loadingService.hide();
          //this.formNotifyService.info(info);
        }));
      //}
    }

    /*******删除不再提示 */
    deleteAccOrg(id: string) {
      /* const accOrg = this.befRepository.entityCollection.getEntityById(id) as FIAccountingOrganizationEntity;
      const confirmInfo = '确定要删除核算组织' + accOrg.code + ':' + accOrg.name + '及其全部账簿';
      const s = confirm(confirmInfo);
      if (s === true) { */
        return this.treeDataService.remove(id).catch((res: any) => {
          if (res.status === 500 && res.error.Code === 'Cef1004') {
              return this.cardDataService.cancel().pipe(
                switchMap(() => {
                  console.log(res.error.Message);
                  return this.treeDataService.load();
                })
              );
          }
          return Observable.throw(res);
        }).pipe(
        //switchMap(() => this.cardDataService.save()),
        switchMap(() => this.treeDataService.load()),
        switchMap(() => {
          const currentId = this.bindingData.list.currentId;
          if (currentId) {
            this.bindingDataService.setCurrentId(currentId, 'detail-form-component');
          }
          return of(true);
        }),
        switchMap(() => {
          return  this.cardDataService.update();
        }),
        tap(() => {
          this.loadingService.hide();
          //this.formNotifyService.info('核算组织' + accOrg.code + ':' + accOrg.name + '删除成功！');
        }));
      //}
    }

    /*******保存异常不再处理 */
    saveAccOrg(accOrgID: string, accSetID: string) {
      const checkResult = this.checkCodeName(accOrgID);
      if (checkResult === true) {
        this.loadingService.show();
        return this.cardDataService.save()/* .catch((res: any) => {
          return this.catchError(res);
        }) */.pipe(
        switchMap(() => {
          this.stateMachineService.transit('Save');
          return of(true);
        }),
        tap(() => {
          this.loadingService.hide();
        })
      );
      }
    }

    /*******取消 */
    cancelAccOrg() {
      this.loadingService.show();
      const state = this.frameContext.appContext.getFrameContext('root-component').stateMachine.context.state;
      if (state === 'edit') {
        return this.cardDataService.cancel().pipe(
          switchMap(() => {
            const currentId = this.bindingData.list.currentId;
            if (currentId) {
              this.bindingDataService.setCurrentId(currentId, 'detail-form-component');
            }
            return  this.cardDataService.update();
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
        return this.cardDataService.cancel().pipe(
          switchMap(() => this.treeDataService.load()),
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

    //捕获异常
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
