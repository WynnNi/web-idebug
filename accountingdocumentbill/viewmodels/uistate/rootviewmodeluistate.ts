import { Injectable } from '@angular/core';
import { UIState, NgParam } from '@farris/devkit';

@Injectable()
export class RootViewmodelUIState extends UIState {
  @NgParam()
  public CantEdit: boolean = false;

  @NgParam()
  public AccDocID: any = {};

  @NgParam()
  public Action2Button: boolean = false;

  @NgParam()
  public AccDocDate: Date = new Date();

  @NgParam()
  public AccDocType: any = {};

  @NgParam()
  public AccSet: any = {};

  @NgParam()
  public Maker: string = '';

  @NgParam()
  public Approver: string = '';

  @NgParam()
  public Auditor: string = '';

  @NgParam()
  public Cashier: string = '';

  @NgParam()
  public Booker: string = '';

  @NgParam()
  public AccManager: string = '';

  @NgParam()
  public year: any = {};

  @NgParam()
  public accSet_VO: string = '';

  @NgParam()
  public period_VO: string = '';

  @NgParam()
  public year_VO: string = '';

  @NgParam()
  public accOrg_VO: string = '';

  @NgParam()
  public chartOfAccount_VO: string = '';

  @NgParam()
  public standardCurrency_VO: string = '';

  @NgParam()
  public fiSets_VO: string = '';

  @NgParam()
  public bizDate_VO: string = '';

  @NgParam()
  public accCanlendar_VO: string = '';

  @NgParam()
  public begainDate_VO: string = '';

  @NgParam()
  public endDate_VO: string = '';

}
