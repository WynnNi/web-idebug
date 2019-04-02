import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';

@Injectable()
export class DetailFormComponentViewmodel extends ViewModel {
  public bindingPath = '/';

  public dom = {};


  @NgCommand({
    name: 'Edit1',
    params: {

    }
  })
  public Edit1(): Observable<any> { return; }

  @NgCommand({
    name: 'Save1',
    params: {

    }
  })
  public Save1(): Observable<any> { return; }

  @NgCommand({
    name: 'Cancel1',
    params: {

    }
  })
  public Cancel1(): Observable<any> { return; }

  @NgCommand({
    name: 'SaveAccOrg1',
    params: {
      id: '{DATA~/tree-grid-component/id}'
    },
    paramDescriptions: {
      id: { type: 'string' }
    }
  })
  public SaveAccOrg1(): Observable<any> { return; }

  @NgCommand({
    name: 'CancelAccOrg1',
    params: {

    }
  })
  public CancelAccOrg1(): Observable<any> { return; }

}

