import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';

@Injectable()
export class GLAccDocAssistanceComponentViewmodel extends ViewModel {
  public bindingPath = '/glAccDocEntrys/glAccDocAssistances';

  public dom = {
  "dataGrid_GLAccDocAssistance": {
    "type": "DataGrid",
    "visible": true,
    "id": "dataGrid_GLAccDocAssistance",
    "size": {
      "height": 120
    },
    "fields": [
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_application",
        "binding": {
          "type": "Form",
          "path": "application"
        },
        "dataField": "application",
        "dataType": "string",
        "caption": "用途",
        "editor": {
          "type": "TextBox",
          "visible": true,
          "id": "gridFieldEditor_application",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "application"
          },
          "readonly": false,
          "require": true,
          "disable": false
        },
        "readonly": false,
        "require": true,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_deptID_Name",
        "binding": {
          "type": "Form",
          "path": "deptID_Name"
        },
        "dataField": "deptID.deptID_Name",
        "dataType": "string",
        "caption": "部门",
        "editor": {
          "type": "LookupEdit",
          "visible": true,
          "id": "gridFieldEditor_deptID_Name",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "deptID_Name"
          },
          "readonly": false,
          "require": true,
          "disable": false,
          "dataSource": {
            "uri": "GLAccDocAssistance.deptID_Name",
            "displayName": "核算部门",
            "idField": "id",
            "type": "ViewObject"
          },
          "valueField": "id",
          "textField": "name",
          "multiSelect": false,
          "mapFields": {
            "id": "deptID.deptID",
            "code": "deptID.deptID_Code",
            "name": "deptID.deptID_Name",
            "fullName": "deptID.deptID_FullName"
          },
          "displayType": "TreeList"
        },
        "readonly": false,
        "require": true,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_relatedOrgID_Name_DFName",
        "binding": {
          "type": "Form",
          "path": "relatedOrgID_Name_DFName"
        },
        "dataField": "relatedOrgID.relatedOrgID_Name.dfName",
        "dataType": "string",
        "caption": "往来单位",
        "editor": {
          "type": "LookupEdit",
          "visible": true,
          "id": "gridFieldEditor_relatedOrgID_Name_DFName",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "relatedOrgID_Name_DFName"
          },
          "readonly": false,
          "require": true,
          "disable": false,
          "dataSource": {
            "uri": "GLAccDocAssistance.dfName",
            "displayName": "Hlp_往来单位",
            "idField": "id",
            "type": "ViewObject"
          },
          "valueField": "id",
          "textField": "name.dfName",
          "multiSelect": false,
          "mapFields": {
            "id": "relatedOrgID.relatedOrgID",
            "code.dfCode": "relatedOrgID.relatedOrgID_Code.dfCode",
            "name.dfName": "relatedOrgID.relatedOrgID_Name.dfName"
          },
          "displayType": "List"
        },
        "readonly": false,
        "require": true,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": true,
        "id": "gridField_accEmployeeID_Name",
        "binding": {
          "type": "Form",
          "path": "accEmployeeID_Name"
        },
        "dataField": "accEmployeeID.accEmployeeID_Name",
        "dataType": "string",
        "caption": "个人",
        "editor": {
          "type": "LookupEdit",
          "visible": true,
          "id": "gridFieldEditor_accEmployeeID_Name",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "accEmployeeID_Name"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "dataSource": {
            "uri": "GLAccDocAssistance.accEmployeeID_Name",
            "displayName": "核算人员帮助",
            "idField": "id",
            "type": "ViewObject"
          },
          "valueField": "id",
          "textField": "name",
          "multiSelect": false,
          "mapFields": {
            "id": "accEmployeeID.accEmployeeID",
            "code": "accEmployeeID.accEmployeeID_Code",
            "name": "accEmployeeID.accEmployeeID_Name"
          },
          "displayType": "List"
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_foreignCurrencyID_Name_DFName",
        "binding": {
          "type": "Form",
          "path": "foreignCurrencyID_Name_DFName"
        },
        "dataField": "foreignCurrencyID.foreignCurrencyID_Name.dfName",
        "dataType": "string",
        "caption": "币种",
        "editor": {
          "type": "LookupEdit",
          "visible": true,
          "id": "gridFieldEditor_foreignCurrencyID_Name_DFName",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "foreignCurrencyID_Name_DFName"
          },
          "readonly": false,
          "require": true,
          "disable": false,
          "dataSource": {
            "uri": "GLAccDocAssistance.foreignCurrencyID_Name_DFName",
            "displayName": "Hlp_币种",
            "idField": "id",
            "type": "ViewObject"
          },
          "valueField": "id",
          "textField": "name.dfName",
          "multiSelect": false,
          "mapFields": {
            "id": "foreignCurrencyID.foreignCurrencyID",
            "code.dfCode": "foreignCurrencyID.foreignCurrencyID_Code.dfCode",
            "name.dfName": "foreignCurrencyID.foreignCurrencyID_Name.dfName"
          },
          "displayType": "List"
        },
        "lookupPicked" : "exchangeRateLookupPicked",
        "readonly": false,
        "require": true,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_quantity",
        "binding": {
          "type": "Form",
          "path": "quantity"
        },
        "dataField": "quantity",
        "dataType": "number",
        "format": "n8",
        "caption": "数量",
        "editor": {
          "type": "NumericBox",
          "visible": true,
          "id": "gridFieldEditor_quantity",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "quantity"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "format": "n8",
          "minValue": 0,
          "step": 1,
          "precision": 2
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_unitPrice",
        "binding": {
          "type": "Form",
          "path": "unitPrice"
        },
        "dataField": "unitPrice",
        "dataType": "number",
        "format": "n8",
        "caption": "单价",
        "editor": {
          "type": "NumericBox",
          "visible": true,
          "id": "gridFieldEditor_unitPrice",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "unitPrice"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "format": "n8",
          "minValue": 0,
          "step": 1,
          "precision": 2
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_foreignCurrency",
        "binding": {
          "type": "Form",
          "path": "foreignCurrency"
        },
        "dataField": "foreignCurrency",
        "dataType": "number",
        "format": "n8",
        "caption": "外币",
        "editor": {
          "type": "NumericBox",
          "visible": true,
          "id": "gridFieldEditor_foreignCurrency",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "foreignCurrency"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "format": "n8",
          "minValue": 0,
          "step": 1,
          "precision": 2
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_exchangeRate",
        "binding": {
          "type": "Form",
          "path": "exchangeRate"
        },
        "dataField": "exchangeRate",
        "dataType": "number",
        "format": "n8",
        "caption": "汇率",
        "editor": {
          "type": "NumericBox",
          "visible": true,
          "id": "gridFieldEditor_exchangeRate",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "exchangeRate"
          },
          "readonly": true,
          "require": false,
          "disable": false,
          "format": "n8",
          "minValue": 0,
          "step": 1,
          "precision": 4
        },
        "readonly": true,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_amount",
        "binding": {
          "type": "Form",
          "path": "amount"
        },
        "dataField": "amount",
        "dataType": "number",
        "format": "n8",
        "caption": "金额",
        "editor": {
          "type": "NumericBox",
          "visible": true,
          "id": "gridFieldEditor_amount",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "amount"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "format": "n8",
          "minValue": 0,
          "step": 1,
          "precision": 2
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_settlement_Name_DFName",
        "binding": {
          "type": "Form",
          "path": "settlement_Name_DFName"
        },
        "dataField": "settlement.settlement_Name.dfName",
        "dataType": "string",
        "caption": "结算方式",
        "editor": {
          "type": "LookupEdit",
          "visible": true,
          "id": "gridFieldEditor_settlement_Name_DFName",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "settlement_Name_DFName"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "dataSource": {
            "uri": "GLAccDocAssistance.settlement_Name_DFName",
            "displayName": "Hlp_结算方式",
            "idField": "id",
            "type": "ViewObject"
          },
          "valueField": "id",
          "textField": "name.dfName",
          "multiSelect": false,
          "mapFields": {
            "id": "settlement.settlement",
            "code.dfCode": "settlement.settlement_Code.dfCode",
            "name.dfName": "settlement.settlement_Name.dfName"
          },
          "displayType": "List"
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_settlementNumber",
        "binding": {
          "type": "Form",
          "path": "settlementNumber"
        },
        "dataField": "settlementNumber",
        "dataType": "string",
        "caption": "结算号",
        "editor": {
          "type": "TextBox",
          "visible": true,
          "id": "gridFieldEditor_settlementNumber",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "settlementNumber"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "maxLength": 20
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_billNumber",
        "binding": {
          "type": "Form",
          "path": "billNumber"
        },
        "dataField": "billNumber",
        "dataType": "string",
        "caption": "票据号",
        "editor": {
          "type": "TextBox",
          "visible": true,
          "id": "gridFieldEditor_billNumber",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "billNumber"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "maxLength": 60
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_bizCode",
        "binding": {
          "type": "Form",
          "path": "bizCode"
        },
        "dataField": "bizCode",
        "dataType": "string",
        "caption": "业务号",
        "editor": {
          "type": "TextBox",
          "visible": true,
          "id": "gridFieldEditor_bizCode",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "bizCode"
          },
          "readonly": false,
          "require": true,
          "disable": false,
          "maxLength": 60
        },
        "readonly": false,
        "require": true,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": false,
        "id": "gridField_bizDateDis",
        "binding": {
          "type": "Form",
          "path": "bizDateDis"
        },
        "dataField": "bizDateDis",
        "dataType": "date",
        "format": "yyyy-MM-dd",
        "caption": "业务日期",
        "editor": {
          "type": "DateBox",
          "visible": true,
          "id": "gridFieldEditor_bizDateDis",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "bizDateDis"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "format": "yyyy-MM-dd",
          "minValue": 0
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      }
    ],
    "editable": "viewModel.stateMachine['editable']"
  }
};


  @NgCommand({
    name: 'GLAccDocAssistanceAddItem1',
    params: {

    }
  })
  public GLAccDocAssistanceAddItem1(): Observable<any> { return; }

  @NgCommand({
    name: 'GLAccDocAssistanceRemoveItem1',
    params: {
      id: '{DATA~/glaccdocassistance-component/glAccDocAssistances/id}'
    },
    paramDescriptions: {
      id: { type: 'string' }
    }
  })
  public GLAccDocAssistanceRemoveItem1(): Observable<any> { return; }

  @NgCommand({
    name: 'CreateAccDocAssistant1',
    params: {
      accDocID: '{DATA~/basic-form-component/id}',
      entryID: '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
      accTitleID: '{DATA~/glaccdocentry-component/glAccDocEntrys/accTitleID}'
    },
    paramDescriptions: {
      accDocID: { type: 'string' },
      entryID: { type: 'string' },
      accTitleID: { type: 'string' }
    }
  })
  public CreateAccDocAssistant1(): Observable<any> { return; }

  @NgCommand({
    name: 'DeleteAccDocAssistant1',
    params: {
      accDocID: '{DATA~/basic-form-component/id}',
      entryID: '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
      assID: '{DATA~/glaccdocassistance-component/glAccDocEntrys/glAccDocAssistances/id}'
    },
    paramDescriptions: {
      accDocID: { type: 'string' },
      entryID: { type: 'string' },
      assID: { type: 'string' }
    }
  })
  public DeleteAccDocAssistant1(): Observable<any> { return; }

  @NgCommand({
    name: 'CreateAss1',
    params: {

    }
  })
  public CreateAss1(): Observable<any> { return; }

  @NgCommand({
    name: 'SubscribeChange1',
    params: {

    }
  })
  public SubscribeChange1(): Observable<any> { return; }

  @NgCommand({
    name: 'GetExchangeRate1',
    params: {

    }
  })
  public GetExchangeRate1(): Observable<any> { return; }

}

