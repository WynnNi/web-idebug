import { Pipe, PipeTransform } from '@angular/core';

export const lang = {"ch":{"button-addSibling":"新增同级","button-addChild":"新增子级","button-edit":"编辑","button-cancel":"取消","button-delete":"删除","button-save":"保存","treeGridField_code":"部门编号","treeGridField_name":"部门名称","treeGridField_isDisable":"停用","form_code":"部门编号","form_name":"部门名称","form_fullNameRole":"全称策略","form_fullName":"部门全称","form_mnemonicCode":"助记码","form_adminDeptID":"行政部门","form_isDisable":"是否停用","form_sortOrder":"排序号","form_remark":"备注","page-header-title":"核算部门","e35ce230-ab14-4b84-a7aa-b8ebcf284743":"核算部门信息","year":"年度","button-load":"加载数据","accOrg":"核算组织","button-changePosition":"调整位置","button-importAdmin":"引入行政部门","button-enable":"停用/取消停用","button-export":"导出","button-close":"关闭","form_adminDeptID_Name_DFName":"行政部门","button-confirm":"确定","newParent":"新上级","accDept":"核算部门","departments":"行政部门","multiDepartments":"行政部门"},"en":{}};

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