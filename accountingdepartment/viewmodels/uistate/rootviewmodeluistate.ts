import { Injectable } from '@angular/core';
import { UIState, NgParam } from '@farris/devkit';

@Injectable()
export class RootViewmodelUIState extends UIState {
  @NgParam()
  public departments: any = {};

  @NgParam()
  public newParent: any = {};

  @NgParam()
  public accOrg: any = {};

  @NgParam()
  public year: any = {};

  @NgParam()
  public accOrg_VO: string = '';

}
