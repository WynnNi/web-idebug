import { Injectable } from '@angular/core';
import { UIState } from '@farris/devkit';

@Injectable()
export class RootViewmodelUIState extends UIState {
  public PeriodEndDate: string = '';

  public PeriodBeginDate: string = '';

  public AccDocID: any = {};

  public Action2Button: boolean = false;

  public Period: string = '';

  public AccDocDate: Date = new Date();

  public AccDocType: any = {};

  public AccSet: any = {};

  public Maker: string = '';

  public Approver: string = '';

  public Auditor: string = '';

  public Cashier: string = '';

  public Booker: string = '';

  public AccManager: string = '';

  public year: any = {};

}
