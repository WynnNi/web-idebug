import { Pipe, PipeTransform } from '@angular/core';

export const lang = {"ch":{"button-addSibling":"新增同级","button-addChild":"新增子级","button-edit":"编辑","button-cancel":"取消","button-delete":"删除","button-save":"保存","treeGridField_code":"组织编号","treeGridField_name":"组织名称","treeGridField_isDisable":"停用","form_code":"组织编号","form_name":"组织名称","form_shortName":"组织简称","form_adminOrgID":"行政组织","form_sortOrder":"排序号","form_isDisable":"停用标志","FIAccountingSet-tab-page":"核算账簿","FIAccountingSet-button-add":"新增账簿","FIAccountingSet-button-remove":"删除账簿","dataGrid_FIAccountingSet_norecord":"暂无数据","gridField_code":"账簿编号","gridField_name":"账簿名称","gridField_accProperty":"账簿性质","gridField_accType":"账簿类型","gridField_isDisable":"停用","page-header-title":"核算组织","dataGrid_FIAccountingSet-norecord":"暂无数据","button-enable":"停用/取消停用","button-export":"导出","button-close":"关闭","button-changePosition":"调整位置","button-importAdmin":"引入行政组织","FIAccountingSet-button-enable":"停用/取消停用","854dfedf-c4db-4162-a914-9698d5bffdf7":"组织信息","form_remark":"备注","year":"年度","button-load":"切换年度","80251b7f-a90d-430d-9f70-3681af234ae8":"核算组织信息","5fddf30a-5230-4aa3-832b-c86952d908b8":"核算组织信息","form_adminOrgID_Name_DFName":"行政组织","multiAdminOrg":"行政组织","accOrg":"核算组织","adminOrgs":"行政组织","multiAdminOrgs":"行政组织"},"en":{}};

@Pipe({name: 'lang'})
export class LangPipe implements PipeTransform {
  transform(key: string, langCode: string) {
    if (langCode && lang[langCode] && lang[langCode][key]) {
      return lang[langCode][key];
    } else {
      return lang['ch'][key];
    }
  }
}