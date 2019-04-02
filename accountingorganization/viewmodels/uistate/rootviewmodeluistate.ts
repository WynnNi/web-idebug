import { Injectable } from '@angular/core';
import { UIState, NgParam } from '@farris/devkit';

@Injectable()
export class RootViewmodelUIState extends UIState {
  @NgParam()
  public adminOrgs: any = {};

  @NgParam()
  public newParent: any = {};

}
