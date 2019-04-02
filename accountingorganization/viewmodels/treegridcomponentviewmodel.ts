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
    name: 'LoadData1',
    params: {

    }
  })
  public LoadData1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadChild1',
    params: {
      id: '{DATA~/tree-grid-component/id}',
      frameID: 'detail-form-component'
    },
    paramDescriptions: {
      id: { type: 'string' },
      frameID: { type: 'string' }
    }
  })
  public LoadChild1(): Observable<any> { return; }

  @NgCommand({
    name: 'EnableAccOrg1',
    params: {
      id: '{DATA~/tree-grid-component/id}'
    },
    paramDescriptions: {
      id: { type: 'string' }
    }
  })
  public EnableAccOrg1(): Observable<any> { return; }

  @NgCommand({
    name: 'ChangePosition1',
    params: {
      accOrg: '{DATA~/tree-grid-component/id}',
      newParent: ''
    },
    paramDescriptions: {
      accOrg: { type: 'string' },
      newParent: { type: 'string' }
    }
  })
  public ChangePosition1(): Observable<any> { return; }

  @NgCommand({
    name: 'RefCopyAdminOrg1',
    params: {
      adminOrg: ''
    },
    paramDescriptions: {
      adminOrg: { type: 'string' }
    }
  })
  public RefCopyAdminOrg1(): Observable<any> { return; }

  @NgCommand({
    name: 'DeleteAccOrg1',
    params: {
      id: '{DATA~/tree-grid-component/id}'
    },
    paramDescriptions: {
      id: { type: 'string' }
    }
  })
  public DeleteAccOrg1(): Observable<any> { return; }

  @NgCommand({
    name: 'MainAccSetName1',
    params: {

    }
  })
  public MainAccSetName1(): Observable<any> { return; }

  @NgCommand({
    name: 'AddChildOrg1',
    params: {

    }
  })
  public AddChildOrg1(): Observable<any> { return; }

}

