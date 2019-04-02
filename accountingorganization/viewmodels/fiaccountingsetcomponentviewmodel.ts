import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';

@Injectable()
export class FIAccountingSetComponentViewmodel extends ViewModel {
  public bindingPath = '/fiAccountingSets';

  public dom = {
  "dataGrid_FIAccountingSet": {
    "type": "DataGrid",
    "visible": true,
    "id": "dataGrid_FIAccountingSet",
    "size": {},
    "fields": [
      {
        "type": "GridField",
        "visible": true,
        "id": "gridField_code",
        "binding": {
          "type": "Form",
          "path": "code"
        },
        "dataField": "code",
        "dataType": "string",
        "caption": "账簿编号",
        "editor": {
          "type": "TextBox",
          "visible": true,
          "id": "gridFieldEditor_code",
          "size": {
            "width": 180
          },
          "binding": {
            "type": "Form",
            "path": "code"
          },
          "readonly": false,
          "require": true,
          "disable": "!viewModel.stateMachine['editable']"
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
        "id": "gridField_name",
        "size": {
          "width": 180
        },
        "binding": {
          "type": "Form",
          "path": "name"
        },
        "dataField": "name",
        "dataType": "string",
        "caption": "账簿名称",
        "editor": {
          "type": "TextBox",
          "visible": true,
          "id": "gridFieldEditor_name",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "name"
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
        "visible": true,
        "id": "gridField_accProperty",
        "size": {
          "width": 100
        },
        "binding": {
          "type": "Form",
          "path": "accProperty"
        },
        "dataField": "accProperty",
        "dataType": "enum",
        "caption": "账簿性质",
        "editor": {
          "type": "EnumField",
          "visible": true,
          "id": "gridFieldEditor_accProperty",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "accProperty"
          },
          "readonly": true,
          "require": false,
          "disable": true,
          "enumData": [
            {
              "value": "MainAccSet",
              "name": "主账簿"
            },
            {
              "value": "AssistantAccSet",
              "name": "副账簿"
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
            "value": "MainAccSet",
            "name": "主账簿"
          },
          {
            "value": "AssistantAccSet",
            "name": "副账簿"
          }
        ]
      },
      {
        "type": "GridField",
        "visible": true,
        "id": "gridField_accType",
        "size": {
          "width": 100
        },
        "binding": {
          "type": "Form",
          "path": "accType"
        },
        "dataField": "accType",
        "dataType": "enum",
        "caption": "账簿类型",
        "editor": {
          "type": "EnumField",
          "visible": true,
          "id": "gridFieldEditor_accType",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "accType"
          },
          "readonly": false,
          "require": false,
          "disable": false,
          "enumData": [
            {
              "value": "MainAccSet",
              "name": "主账簿"
            },
            {
              "value": "MainAccSetEquals",
              "name": "主账簿平行账"
            },
            {
              "value": "MainAccSetChilds",
              "name": "主账簿分子账"
            }
          ]
        },
        "readonly": false,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true,
        "enumData": [
          {
            "value": "MainAccSet",
            "name": "主账簿"
          },
          {
            "value": "MainAccSetEquals",
            "name": "主账簿平行账"
          },
          {
            "value": "MainAccSetChilds",
            "name": "主账簿分子账"
          }
        ]
      },
      {
        "type": "GridField",
        "visible": true,
        "id": "gridField_isDisable",
        "size": {
          "width": 80
        },
        "binding": {
          "type": "Form",
          "path": "isDisable"
        },
        "dataField": "isDisable",
        "dataType": "boolean",
        "caption": "停用",
        "editor": {
          "type": "SwitchField",
          "visible": true,
          "id": "gridFieldEditor_isDisable",
          "size": {},
          "binding": {
            "type": "Form",
            "path": "isDisable"
          },
          "readonly": true,
          "require": false,
          "disable": false
        },
        "readonly": true,
        "require": false,
        "draggable": false,
        "frozen": false,
        "sortable": false,
        "resizeable": true
      }
    ],
    "editable": false
  }
};


  @NgCommand({
    name: 'FIAccountingSetAddItem1',
    params: {

    }
  })
  public FIAccountingSetAddItem1(): Observable<any> { return; }

  @NgCommand({
    name: 'FIAccountingSetRemoveItem1',
    params: {
      id: '{DATA~/fiaccountingset-component/fiAccountingSets/id}'
    },
    paramDescriptions: {
      id: { type: 'string' }
    }
  })
  public FIAccountingSetRemoveItem1(): Observable<any> { return; }

  @NgCommand({
    name: 'DeleteAccSet1',
    params: {
      id: '{DATA~/fiaccountingset-component/fiAccountingSets/id}'
    },
    paramDescriptions: {
      id: { type: 'string' }
    }
  })
  public DeleteAccSet1(): Observable<any> { return; }

  @NgCommand({
    name: 'EnableAccSet1',
    params: {
      accOrgID: '{DATA~/tree-grid-component/id}',
      accSetID: '{DATA~/fiaccountingset-component/fiAccountingSets/id}'
    },
    paramDescriptions: {
      accOrgID: { type: 'string' },
      accSetID: { type: 'string' }
    }
  })
  public EnableAccSet1(): Observable<any> { return; }

}

