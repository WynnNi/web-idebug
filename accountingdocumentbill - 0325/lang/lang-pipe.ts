import { Pipe, PipeTransform } from '@angular/core';

export const lang = {"ch":{"button-add":"新增","button-edit":"编辑","button-cancel":"取消","button-save":"保存","button-close":"关闭","form_accOrgID_Name":"核算单位","form_accDocCode":"凭证编号","form_accDocTypeID_Name":"凭证类型","form_accDocTypeID_VoucherWord":"凭证编号","form_numberOfAttch":"附件张数","form_numberOfNote":"通知单张数","form_operatorID_Name":"经办人","form_dwVersion":"密级","form_accDocCodeDisplay":"凭证编号","form_accDocDateDisplay":"凭证日期","GLAccDocEntry-tab-page":"凭证分录","GLAccDocEntry-button-add":"新增","GLAccDocEntry-button-remove":"删除","dataGrid_GLAccDocEntry_norecord":"暂无数据","gridField_accTitleID_Code":"科目编号","gridField_accTitleID_Name":"科目名称","gridField_abstract":"摘要","gridField_lendingDirection":"记账方向","gridField_creditAmount":"借方金额","gridField_debitAmount":"贷方金额","GLAccDocAssistance-tab-page":"凭证辅助","GLAccDocAssistance-button-add":"新增","GLAccDocAssistance-button-remove":"删除","dataGrid_GLAccDocAssistance_norecord":"暂无数据","gridField_amount":"金额","gridField_bizDate":"业务日期","gridField_billNumber":"票据号","gridField_settlement":"结算方式","gridField_settlementNumber":"结算号","gridField_application":"用途","gridField_settlementDate":"结算日期","page-header-title":"凭证制单","dataGrid_GLAccDocEntry-norecord":"暂无数据","dataGrid_GLAccDocAssistance-norecord":"暂无数据","button-first":"第一张","button-previous":"上一张","button-next":"下一张","button-last":"最后一张","button-delete":"删除","total_jf":"借方金额","total_df":"贷方金额","total":"差","form_ledger":"核算账簿","form_mainLedgerName":"核算账簿","entry-header-title":"凭证分录","gridField_accTitleID_AccountTitle_Code":"科目编号","gridField_accTitleID_AccountTitle_Name":"科目名称","name_kjzg":"会计主管:","name_jz":"记账:","name_cn":"出纳:","name_sh":"审核:","name_pz":"批准:","name_zdr":"制单人:","assistant-header-title":"凭证辅助","total_total":"合计：","total_kjzg":"会计主管:","accSet":"核算账簿","year":"年度","accOrg":"核算组织","accDocType":"凭证类型","accDocDate":"财务日期","401b8838-5114-4d6d-b7e2-2e3f7620c46d":"单位-日期-编号","50b9249f-e523-470c-a1bb-a5fcc4bcbc99":"单位-日期-编号","form_accDwDisplay":"核算单位","button-look":"查看","button-confirm":"确定","accDoc":"凭证编号","gridField_relatedOrgID":"往来单位","gridField_deptID_Name":"部门","gridField_accEmployeeID_Name":"个人","gridField_relatedOrgID_Name_DFName":"往来单位","form_secretLevelID":"密级","gridField_foreignCurrencyID_Name_DFName":"币种","gridField_quantity":"数量","gridField_unitPrice":"单价","gridField_foreignCurrency":"外币","gridField_exchangeRate":"汇率","gridField_operator":"经办人","gridField_bizCode":"业务号","gridField_settlement_Name_DFName":"结算方式","gridField_bizDateDis":"业务日期"},"en":{}};

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