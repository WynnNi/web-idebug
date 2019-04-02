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
    name: 'Save2',
    params: {
      id: '{DATA~/tree-grid-component/id}'
    },
    paramDescriptions: {
      id: { type: 'string' }
    }
  })
  public Save2(): Observable<any> { return; }

  @NgCommand({
    name: 'CancelAccDept1',
    params: {

    }
  })
  public CancelAccDept1(): Observable<any> { return; }

  @NgCommand({
    name: 'UpdateFullName1',
    params: {

    }
  })
  public UpdateFullName1(): Observable<any> { return; }

}

