import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';

@Injectable()
export class TreeGridComponentViewmodel extends ViewModel {
  public bindingPath = '/';

  public dom = {};


  @NgCommand({
    name: 'LoadTree1',
    params: {

    }
  })
  public LoadTree1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadCard1',
    params: {

    }
  })
  public LoadCard1(): Observable<any> { return; }

  @NgCommand({
    name: 'AddSibling1',
    params: {

    }
  })
  public AddSibling1(): Observable<any> { return; }

  @NgCommand({
    name: 'AddChild1',
    params: {

    }
  })
  public AddChild1(): Observable<any> { return; }

  @NgCommand({
    name: 'Remove1',
    params: {

    }
  })
  public Remove1(): Observable<any> { return; }

  @NgCommand({
    name: 'RefCopyAdminDepartment1',
    params: {
      adminOrgIDs: '',
      year: '{UISTATE~/root-component/year}'
    },
    paramDescriptions: {
      adminOrgIDs: { type: 'string' },
      year: { type: 'string' }
    }
  })
  public RefCopyAdminDepartment1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadData1',
    params: {
      accOrg: '{UISTATE~/root-component/accOrg}',
      year: '{UISTATE~/root-component/year}'
    },
    paramDescriptions: {
      accOrg: { type: 'string' },
      year: { type: 'string' }
    }
  })
  public LoadData1(): Observable<any> { return; }

  @NgCommand({
    name: 'ChangeDepartmentPosition1',
    params: {
      accOrg: '{UISTATE~/root-component/accOrg}',
      year: '{UISTATE~/root-component/year}',
      newParent: '',
      accDept: '{DATA~/tree-grid-component/id}'
    },
    paramDescriptions: {
      accOrg: { type: 'string' },
      year: { type: 'string' },
      newParent: { type: 'string' },
      accDept: { type: 'string' }
    }
  })
  public ChangeDepartmentPosition1(): Observable<any> { return; }

  @NgCommand({
    name: 'EnableAccDept1',
    params: {
      accOrg: '{UISTATE~/root-component/accOrg}',
      year: '{UISTATE~/root-component/year}',
      accDept: '{DATA~/tree-grid-component/id}'
    },
    paramDescriptions: {
      accOrg: { type: 'string' },
      year: { type: 'string' },
      accDept: { type: 'string' }
    }
  })
  public EnableAccDept1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadCard2',
    params: {
      id: '{DATA~/tree-grid-component/id}',
      frameID: 'detail-form-component'
    },
    paramDescriptions: {
      id: { type: 'string' },
      frameID: { type: 'string' }
    }
  })
  public LoadCard2(): Observable<any> { return; }

  @NgCommand({
    name: 'Delete1',
    params: {
      id: '{DATA~/tree-grid-component/id}',
      accOrg: '{UISTATE~/root-component/accOrg}',
      year: '{UISTATE~/root-component/year}'
    },
    paramDescriptions: {
      id: { type: 'string' },
      accOrg: { type: 'string' },
      year: { type: 'string' }
    }
  })
  public Delete1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadInitData1',
    params: {
      accOrg: '{UISTATE~/root-component/accOrg}',
      year: '{UISTATE~/root-component/year}'
    },
    paramDescriptions: {
      accOrg: { type: 'string' },
      year: { type: 'string' }
    }
  })
  public LoadInitData1(): Observable<any> { return; }

}

