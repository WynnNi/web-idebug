import { Injectable } from '@angular/core';
import { UIState } from '@farris/devkit';

@Injectable()
export class GLAccDocAssistanceComponentViewmodelUIState extends UIState {
  public Currency1: boolean = false;

  public AssistanceAmount: string = '';

}
