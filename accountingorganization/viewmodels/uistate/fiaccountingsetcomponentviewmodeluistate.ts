import { Injectable } from '@angular/core';
import { UIState, NgParam } from '@farris/devkit';

@Injectable()
export class FIAccountingSetComponentViewmodelUIState extends UIState {
  @NgParam()
  public AccSetCanDel: boolean = false;

}
