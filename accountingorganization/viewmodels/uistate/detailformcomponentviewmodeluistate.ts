import { Injectable } from '@angular/core';
import { UIState, NgParam } from '@farris/devkit';

@Injectable()
export class DetailFormComponentViewmodelUIState extends UIState {
  @NgParam()
  public canEdit: boolean = false;

}
