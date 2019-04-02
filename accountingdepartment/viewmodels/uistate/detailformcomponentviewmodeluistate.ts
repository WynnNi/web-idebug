import { Injectable } from '@angular/core';
import { UIState, NgParam } from '@farris/devkit';

@Injectable()
export class DetailFormComponentViewmodelUIState extends UIState {
  @NgParam()
  public fullNameEdit: boolean = false;

  @NgParam()
  public canEdit: boolean = false;

}
