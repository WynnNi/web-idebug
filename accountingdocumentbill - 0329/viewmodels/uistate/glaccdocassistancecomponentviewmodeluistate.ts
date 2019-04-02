import { Injectable } from '@angular/core';
import { UIState, NgParam } from '@farris/devkit';

@Injectable()
export class GLAccDocAssistanceComponentViewmodelUIState extends UIState {
  @NgParam()
  public Currency1: boolean = false;

  @NgParam()
  public AssistanceAmount: string = '';

}
