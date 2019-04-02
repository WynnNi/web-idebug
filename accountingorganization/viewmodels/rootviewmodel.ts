import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';
import { TreeGridComponentViewmodel } from './treegridcomponentviewmodel';
import { DetailFormComponentViewmodel } from './detailformcomponentviewmodel';
import { FIAccountingSetComponentViewmodel } from './fiaccountingsetcomponentviewmodel';

@Injectable()
export class RootViewmodel extends ViewModel {
  public bindingPath = '/';

  public dom = {};

  public treeGridComponentViewmodel: TreeGridComponentViewmodel;
  public detailFormComponentViewmodel: DetailFormComponentViewmodel;
  public fIAccountingSetComponentViewmodel: FIAccountingSetComponentViewmodel;

  @NgCommand({
    name: 'MainAccSetName1',
    params: {

    }
  })
  public MainAccSetName1(): Observable<any> { return; }

}

