import { Injectable } from '@angular/core';
import { UIState } from '@farris/devkit';

@Injectable()
export class GLAccDocEntryComponentViewmodelUIState extends UIState {
  public Difference: string = '';

  public TotalDF: string = '';

  public TotalJF: string = '';

  public Total: string = '';

  public EntryAmount: string = '';

}
