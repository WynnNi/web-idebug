import { Injectable } from '@angular/core';
import { UIState, NgParam } from '@farris/devkit';

@Injectable()
export class GLAccDocEntryComponentViewmodelUIState extends UIState {
  @NgParam()
  public Difference: string = '';

  @NgParam()
  public TotalDF: string = '';

  @NgParam()
  public TotalJF: string = '';

  @NgParam()
  public Total: string = '';

  @NgParam()
  public EntryAmount: string = '';

}
