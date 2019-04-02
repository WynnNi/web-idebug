import { Injectable } from '@angular/core';
import { tap, switchMap, map } from 'rxjs/operators';
import { Repository, BindingData, FrameContext, Change, ChangeType} from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import {FormLoadingService, ListRepositoryService, TreeDataService, BindingDataService, StateMachineService, FormErrorService} from '@farris/command-services';
import { CardDataService , FormNotifyService} from '@farris/command-services';
import { MessagerService } from '@farris/ui';
import { templateJitUrl } from '@angular/compiler';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { FIAccountingDepartmentEntity } from '../models/entities/fiaccountingdepartmententity';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AccDeptService extends ListRepositoryService {
    constructor(repository: Repository<any>, loadingService: FormLoadingService,
      public bindingData: BindingData,
      public cardDataService: CardDataService,
      public treeDataService: TreeDataService,
      public stateMachineService: StateMachineService,
      public frameContext: FrameContext,
      public formNotifyService: FormNotifyService,
      public formErrorService: FormErrorService,
      public bindingDataService: BindingDataService,
      public formMessageService: MessagerService) {
        super(repository, loadingService);
    }
    //公共变量
    public befRepository = <BefRepository<any>>this.repository;
    public restService = this.befRepository.restService;
    public baseUri = this.restService.baseUri;

    /* 监听名称值改变 (暂留）*/
    nameChange() {
      this.bindingData.changes.subscribe((change: Change) => {
        const path = change.path;
        if (change.type === ChangeType.Append || change.type === ChangeType.ValueChanged) {
          if (path[0] === 'name') {
            return this.updateDeptFullName(this.bindingData.getValue(['id']));
          }
        }
      });
    }

    /******获取该年度该组织下的全部核算部门 */
    getAllDepartment(accOrg: any, year: any): Observable<any> {
      const fiYear = this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value;
      const fiAccOrg = this.frameContext.appContext.getFrameContext('root-component').uiState['accOrg'].key;
      this.loadingService.show();
      const actionGetDataUri = `${this.baseUri}/service/GetAllDepartment`;
      const methodType = 'PUT';
      const queryParams = {};
      const options = {
        body: {
          year: this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value,
          accOrg: this.frameContext.appContext.getFrameContext('root-component').uiState['accOrg'].key,
        }
      };
      const actionGetData$ = this.befRepository.restService.request(actionGetDataUri, methodType,  queryParams, options);
      return actionGetData$.catch((res: any) => {
        return this.catchError(res);
      }).pipe(
        map((datas: any) => {
          const accDepts = datas.accDepts;
          this.frameContext.appContext.getFrameContext('root-component').uiState['accOrg'] = {key: datas.accOrg, value: datas.accOrgName};
          this.frameContext.appContext.getFrameContext('root-component').uiState['year'] = {key: datas.yearKey, value: datas.yearName};
          this.frameContext.appContext.getFrameContext('root-component').uiState['accOrg_VO'] = datas.accOrg;
          const entities = [];
          accDepts.forEach((accDept) => {
              const entity = this.repository.buildEntity(accDept);
              entities.push(entity);
          });
          this.repository.entityCollection.loadEntities(entities);
          return entities;
          }),
        tap(() => {
            this.loadingService.hide();
        })
      );
    }

    /* 部门全称的修改 */
    updateDeptFullName(accDeptID: string) {
      return this.befRepository.updateChangesById(accDeptID).pipe(
        switchMap(() => this.cardDataService.update()),
        switchMap(() => {
          this.updateEdit(accDeptID);
          return of(true);
        }),
      );
    }

    /* 停用/取消停用核算部门 */
    enableDepartment(accOrgID: any, year: any, accDepartmentID: string) {
      const actionEnableUri = `${this.baseUri}/service/EnableDepartment`;
      const methodType = 'PUT';
      const queryParams = {};
      const options = {
        body: {
          year: year.value,
          accOrgID: accOrgID.key,
          accDepartmentID: accDepartmentID,
          RequestInfo: (this.befRepository).restService.buildRequestInfo()
        }
      };
      const actionEnable$ = this.befRepository.restService.request(actionEnableUri, methodType,  queryParams, options);
      const accDept = this.befRepository.entityCollection.getEntityById(accDepartmentID);

      let message = '';
      let info = '';
      if (accDept.isDisable) {
        message = '确定要取消停用' + accDept.code + ':' + accDept.name + '核算部门及其下级部门?';
        info = accDept.code + ':' + accDept.name + '核算部门及其下级部门取消停用成功！';
      } else {
        message = '确定要停用' + accDept.code + ':' + accDept.name + '核算部门及其下级部门?';
        info = accDept.code + ':' + accDept.name + '核算部门及其下级部门停用成功！';
      }
      const s = confirm(message);
      if (s) {
        this.loadingService.show();
          return actionEnable$.catch((res: any) => {
            return this.catchError(res);
          }).pipe(
            switchMap(() => {
              this.befRepository.entityCollection.clear();
              return this.getAllDepartment(year, accOrgID).catch((res: any) => {
                return this.catchError(res);
            })}
            ),
            tap(() => {
              this.loadingService.hide();
              this.formNotifyService.info(info);
            })
          );
      }
    }


    /* 引入行政部门 */
    refCopyAdminDepartment(adminDeptIDs: any, accOrgID: any, year: any) {
      const actionRefUri = `${this.baseUri}/service/RefCopyAdminDepartment`;
      const methodType = 'PUT';
      const queryParams = {};
      const options = {
        body: {
          year: year.value,
          accOrgID: accOrgID.key,
          refAdminDepts: [adminDeptIDs.key]
        }
      };
      this.loadingService.show();
      const actionRef$ = this.befRepository.restService.request(actionRefUri, methodType,  queryParams, options);
      return actionRef$.catch((res: any) => {
        return this.catchError(res);
      }).pipe(
        switchMap((data: any) => {
          let report = '编号' + '\t' + '名称' + '\t' + '状态' + '\t' + '原因' + '<br>';
          for (let i = 0; i < data.length; i++) {
            report = report + data[i].code + '\t' + data[i].name + '\t' + data[i].state + '\t' + data[i].reason + '<br>';
          }
          report = '<pre>' + report + '<pre>';
          const options = {
            title: '引入行政部门报告',
            showMaxButton: true,
            width: 600,
            height: 400
          };
          this.formMessageService.show('引入行政部门报告', report, options);
          return of(true);
        }),
        switchMap(() =>  {
          this.befRepository.entityCollection.clear();
          return this.getAllDepartment(year, accOrgID).catch((res: any) => {
            return this.catchError(res);
        })}),
        tap(() => {
          this.loadingService.hide();
        })
      );
    }

    /* 调整核算部门位置*/
    changeDepartmentPosition(accOrgID: any, year: any, newParentID: string, accDepartmentID: string) {
      const actionChangeUri = `${this.baseUri}/service/ChgDepartmentPosition`;
      const methodType = 'PUT';
      const queryParams = {};
      const options = {
        body: {
          year: year.value,
          accOrgID: accOrgID.key,
          accDepartmentID: accDepartmentID,
          newParentID: newParentID
        }
      };
      const actionChange$ = this.befRepository.restService.request(actionChangeUri, methodType,  queryParams, options);
      const accDept = this.befRepository.entityCollection.getEntityById(accDepartmentID);
      let message = '';
      if (newParentID) {
        const parentAccDept = this.befRepository.entityCollection.getEntityById(newParentID);
        message = '确定要将核算部门' + accDept.code + ':' + accDept.name + '及其下级移动到核算部门' + parentAccDept.code + ':' + parentAccDept.name + '下?';
      } else {
        message = '确定要将核算部门' + accDept.code + ':' + accDept.name + '及其下级移动到第一级?';
      }
      const s = confirm(message);
      if (s) {
        this.loadingService.show();
        return actionChange$.catch((res: any) => {
          return this.catchError(res);
        }).pipe(
            switchMap(() => {
              this.befRepository.entityCollection.clear();
              return this.getAllDepartment(year, accOrgID).catch((res: any) => {
                return this.catchError(res);
            });
          }),
            tap(() => {
              this.loadingService.hide();
              this.formNotifyService.info('调整成功！');
          })
        );
      }
    }


    /* 新增子级部门 */
    addChildAccDept(accDeptID: string) {
      const accDept = this.befRepository.entityCollection.getEntityById(accDeptID) as FIAccountingDepartmentEntity;
      if (accDept.treeInfo.layer - 9 >= 0) {
        this.formMessageService.warning('级数超过最大级（九级）限制，不允许新增子级！');
        return of(false);
      } else {
        return this.treeDataService.addChild(accDeptID).pipe(
          switchMap(() => {
            this.stateMachineService.transit('Create');
            return of(true);
          })
        );
      }
    }


    /*****编号名称校验 */
    checkCodeName(id: string) {
      const accDepts = this.befRepository.entityCollection.toArray();
      const accDept = this.befRepository.entityCollection.getEntityById(id) as FIAccountingDepartmentEntity;
      if (!accDept.code) {
        this.formMessageService.error('核算部门编号不能为空！');
        return false;
      }
      if (!accDept.name) {
        this.formMessageService.error('核算部门名称不能为空！');
        return false;
      }
      if (accDept.code.length > 30) {
        this.formMessageService.error('核算部门编号长度不能超过30个字符！');
        return false;
      }
      if (accDept.name.length > 60) {
        this.formMessageService.error('核算部门名称长度不能超过60个字符！');
        return false;
      }
      const pattern1 = new RegExp('\\b[a-zA-Z0-9]');
      if (!pattern1.test(accDept.code)) {
        this.formMessageService.error('非法字符！核算部门编号只能是字母数字！');
        return false;
      }
      const pattern2 = new RegExp('[0-9a-zA-Z_\u4e00-\u9fa5]+$');
      if (!pattern2.test(accDept.name)) {
        this.formMessageService.error('非法字符！核算部门名称只能是字母数字汉字和下划线！');
        return false;
      }
      for (let i = 0; i < accDepts.length; i++) {
        const accountDept = accDepts[i] as FIAccountingDepartmentEntity;
        if (accountDept.id !== accDept.id) {
          if (accountDept.code === accDept.code) {
            this.formMessageService.error('该核算组织下核算部门编号不唯一！');
            return false;
          }
        }
        //核算部门名称唯一性校验
        if (accountDept.id !== accDept.id) {
          const accountDeptPath = accountDept.treeInfo.path;
          const accDeptPath = accDept.treeInfo.path;
          //核算部门名称不能与上级重复
          for (let j = 0; j < accDept.treeInfo.layer; j++) {
            if (accountDeptPath === accDeptPath.substr(0, accDeptPath.length - 4 * j)) {
              if (accountDept.name === accDept.name) {
                this.formMessageService.error('核算部门名称不能与上级重复！');
                return false;
              }
            }
          }
          //编辑的时候核算部门名称不能与下级重复
          const state = this.frameContext.appContext.getFrameContext('root-component').stateMachine.context.state;
          if (state === 'edit') {
            if (accountDeptPath.startsWith(accDeptPath)) {
              if (accountDept.name === accDept.name) {
                this.formMessageService.error('核算部门名称不能与其下级核算部门名称重复！');
                return false;
              }
            }
          }
          //同级内兄弟核算部门名称不能重复
          if (accountDeptPath.substr(0, accountDeptPath.length - 4) === accDeptPath.substr(0, accDeptPath.length - 4)) {
            if (accountDept.name === accDept.name) {
              if (accDept.treeInfo.layer - 1 === 0) {
                this.formMessageService.error('一级核算部门名称不能重复！');
                return false;
              } else {
                this.formMessageService.error('同一核算部门下核算部门名称不能重复！');
                return false;
              }
            }
          }
        }
      }
      return true;
    }

    /*****默认年度当前年、默认编辑按钮可点击*/
    initData() {/*
      const year = this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value;
      if (!year) {
        const date = new Date();
        this.frameContext.appContext.getFrameContext('root-component').uiState['year'] = {key: '', value: date.getFullYear()};
      } */
      this.frameContext.appContext.getFrameContext('detail-form-component').uiState['canEdit'] = true;
      this.frameContext.appContext.getFrameContext('detail-form-component').uiState['fullNameEdit'] = false;
    }

    /****更改编辑按钮的可点击性 */
    updateEdit(id: string) {
      if (id) {
      const accDept = this.befRepository.entityCollection.getEntityById(id) as FIAccountingDepartmentEntity;
      this.frameContext.appContext.getFrameContext('detail-form-component').uiState['canEdit'] = !accDept.isDisable;
      if (accDept.fullNameRole === 'InputManually') {
        this.frameContext.appContext.getFrameContext('detail-form-component').uiState['fullNameEdit'] = true;
      } else {
        this.frameContext.appContext.getFrameContext('detail-form-component').uiState['fullNameEdit'] = false;
      }
      }
    }


    /******删除部门，不再提示和抛异常 */
    deleteAccDept(id: string) {
      const year = this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value ;
      const accOrg = this.frameContext.appContext.getFrameContext('root-component').uiState['accOrg'].key;
      const accDept = this.befRepository.entityCollection.getEntityById(id) as FIAccountingDepartmentEntity;
      /* const confirmInfo = '确定要删除核算部门' + accDept.code + ':' + accDept.name + '?';
      const s = confirm(confirmInfo);
      if (s === true) { */
        return this.treeDataService.remove(id).catch((res: any) => {
          if (res.status === 500 && res.error.Code === 'Cef1004') {
            return this.cardDataService.cancel().pipe(
              switchMap(() => {
                console.log(res.error.Message);
                return this.getAllDepartment(accOrg, year).catch((res: any) => {
                  return this.catchError(res);
                });
              })
            );
          }
          return Observable.throw(res);
        }).pipe(
        switchMap(() => this.getAllDepartment(accOrg, year).catch((res: any) => {
          return this.catchError(res);
        })),
        tap(() => {
          this.loadingService.hide();
          //this.formNotifyService.info('核算部门' + accDept.code + ':' + accDept.name + '删除成功！');
        }));
      //}
    }

    /********保存部门（不再抛异常信息 */
    saveAccDept(id: string) {
      const checkResult = this.checkCodeName(id);
      if (checkResult === true) {
        this.loadingService.show();
        return this.cardDataService.save()/* .catch((res: any) => {
          return this.catchError(res);
      }) */.pipe(
        switchMap(() => this.cardDataService.update()),
        switchMap(() => this.cardDataService.cancel()),
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

    //取消
    cancelAccDept() {
      const year = this.frameContext.appContext.getFrameContext('root-component').uiState['year'].value ;
      const accOrg = this.frameContext.appContext.getFrameContext('root-component').uiState['accOrg'].key;
      this.loadingService.show();
      return this.cardDataService.cancel().pipe(
        switchMap(() => this.getAllDepartment(accOrg, year).catch((res: any) => {
          return this.catchError(res);
      })),
        switchMap(() => {
          this.stateMachineService.transit('Cancel');
          return of(true);
        }),
        tap(() => {
          this.loadingService.hide();
        })
      );
    }


    //临时窗口
    showWindow() {
      this.formMessageService.info('暂未开放此功能！');
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
