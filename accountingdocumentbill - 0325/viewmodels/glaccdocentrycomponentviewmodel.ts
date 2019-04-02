import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';

@Injectable()
export class GLAccDocEntryComponentViewmodel extends ViewModel {
  public bindingPath = '/glAccDocEntrys';

  public dom = {
  "dataGrid_GLAccDocEntry": {
    "type": "DataGrid",
    "visible": true,
    "id": "dataGrid_GLAccDocEntry",
    "size": {
      "height": 180
    },
    "fields": [
      {
        "type": "GridField",
        "visible": true,
        "id": "gridField_abstract",
        "binding": {
          "type": "Form",
          "path": "abstract"
        },
        "dataField": "abstract",
        "dataType": "string",
        "caption": "摘要",
        "editor": {
          "type": "LookupEdit",
          "visible": true,
          "id": "gridFieldEditor_abstract",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "abstract"
          },
          "readonly": false,
          "require": true,
          "disable": false,
          "dataSource": {
            "uri": "GLAccDocEntry.abstract",
            "displayName": "摘要定义帮助",
            "idField": "id",
            "type": "ViewObject"
          },
          "valueField": "id",
          "textField": "content",
          "multiSelect": false,
          "mapFields": {
            "content": "abstract"
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
        "id": "gridField_accTitleID_AccountTitle_Code",
        "binding": {
          "type": "Form",
          "path": "accTitleID_AccountTitle_Code"
        },
        "dataField": "accTitleID.accTitleID_AccountTitle_Code",
        "dataType": "string",
        "caption": "科目编号",
        "editor": {
          "type": "LookupEdit",
          "visible": true,
          "id": "gridFieldEditor_accTitleID_AccountTitle_Code",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "accTitleID_AccountTitle_Code"
          },
          "readonly": false,
          "require": true,
          "disable": false,
          "dataSource": {
            "uri": "GLAccDocEntry.accTitleID_AccountTitle_Code",
            "displayName": "核算科目",
            "idField": "id",
            "type": "ViewObject"
          },
          "valueField": "id",
          "textField": "code",
          "multiSelect": false,
          "mapFields": {
            "id": "accTitleID.accTitleID",
            "code": "accTitleID.accTitleID_AccountTitle_Code",
            "name": "accTitleID.accTitleID_AccountTitle_Name",
            "fullName": "accTitleID.accTitleID_AccountTitle_FullName"
          },
          "displayType": "TreeList"
        },
        "lookupPicked" : "accTitleLookupPicked",
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
        "id": "gridField_accTitleID_AccountTitle_Name",
        "binding": {
          "type": "Form",
          "path": "accTitleID_AccountTitle_Name"
        },
        "dataField": "accTitleID.accTitleID_AccountTitle_Name",
        "dataType": "string",
        "caption": "科目名称",
        "editor": {
          "type": "TextBox",
          "visible": true,
          "id": "gridFieldEditor_accTitleID_AccountTitle_Name",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "accTitleID_AccountTitle_Name"
          },
          "readonly": true,
          "require": true,
          "disable": false,
          "maxLength": 1024
        },
        "readonly": true,
        "require": true,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      },
      {
        "type": "GridField",
        "visible": true,
        "id": "gridField_creditAmount",
        "binding": {
          "type": "Form",
          "path": "creditAmount"
        },
        "dataField": "creditAmount",
        "dataType": "number",
        "format": "n8",
        "caption": "借方金额",
        "editor": {
          "type": "NumericBox",
          "visible": true,
          "id": "gridFieldEditor_creditAmount",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "creditAmount"
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
        "visible": true,
        "id": "gridField_debitAmount",
        "binding": {
          "type": "Form",
          "path": "debitAmount"
        },
        "dataField": "debitAmount",
        "dataType": "number",
        "format": "n8",
        "caption": "贷方金额",
        "editor": {
          "type": "NumericBox",
          "visible": true,
          "id": "gridFieldEditor_debitAmount",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "debitAmount"
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
        "visible": true,
        "id": "gridField_lendingDirection",
        "binding": {
          "type": "Form",
          "path": "lendingDirection"
        },
        "dataField": "lendingDirection",
        "dataType": "enum",
        "caption": "记账方向",
        "editor": {
          "type": "EnumField",
          "visible": true,
          "id": "gridFieldEditor_lendingDirection",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "lendingDirection"
          },
          "readonly": true,
          "require": false,
          "disable": false,
          "enumData": [
            {
              "value": "Credit",
              "name": "借方"
            },
            {
              "value": "Debit",
              "name": "贷方"
            }
          ]
        },
        "readonly": true,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true,
        "enumData": [
          {
            "value": "Credit",
            "name": "借方"
          },
          {
            "value": "Debit",
            "name": "贷方"
          }
        ]
      }
    ],
    "editable": "viewModel.stateMachine['editable']"
  }
};


  @NgCommand({
    name: 'GLAccDocEntryAddItem1',
    params: {

    }
  })
  public GLAccDocEntryAddItem1(): Observable<any> { return; }

  @NgCommand({
    name: 'GLAccDocEntryRemoveItem1',
    params: {
      id: '{DATA~/glaccdocentry-component/glAccDocEntrys/id}'
    },
    paramDescriptions: {
      id: { type: 'string' }
    }
  })
  public GLAccDocEntryRemoveItem1(): Observable<any> { return; }

  @NgCommand({
    name: 'CreateAccDocEntry1',
    params: {
      year: '{UISTATE~/root-component/year}',
      accDocID: '{DATA~/basic-form-component/id}'
    },
    paramDescriptions: {
      year: { type: 'string' },
      accDocID: { type: 'string' }
    }
  })
  public CreateAccDocEntry1(): Observable<any> { return; }

  @NgCommand({
    name: 'DeleteEntryByID1',
    params: {
      year: '{UISTATE~/root-component/year}',
      accDocID: '{DATA~/basic-form-component/id}',
      entryID: '{DATA~/glaccdocentry-component/glAccDocEntrys/id}'
    },
    paramDescriptions: {
      year: { type: 'string' },
      accDocID: { type: 'string' },
      entryID: { type: 'string' }
    }
  })
  public DeleteEntryByID1(): Observable<any> { return; }

  @NgCommand({
    name: 'ChangeEntry1',
    params: {

    }
  })
  public ChangeEntry1(): Observable<any> { return; }

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
    name: 'AmountCanEdit1',
    params: {

    }
  })
  public AmountCanEdit1(): Observable<any> { return; }

}

