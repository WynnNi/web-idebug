import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';
import { TreeGridComponentViewmodel } from './treegridcomponentviewmodel';
import { DetailFormComponentViewmodel } from './detailformcomponentviewmodel';

@Injectable()
export class RootViewmodel extends ViewModel {
  public bindingPath = '/';

  public dom = {};

  public treeGridComponentViewmodel: TreeGridComponentViewmodel;
  public detailFormComponentViewmodel: DetailFormComponentViewmodel;

  @NgCommand({
    name: 'Window1',
    params: {

    }
  })
  public Window1(): Observable<any> { return; }

}

