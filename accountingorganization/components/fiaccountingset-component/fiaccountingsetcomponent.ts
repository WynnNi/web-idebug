import { Component, OnInit, Injector, HostBinding, AfterViewInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { FIAccountingSetComponentViewmodel } from '../../viewmodels/fiaccountingsetcomponentviewmodel';
import { FIAccountingOrganizationRepository } from '../../models/fiaccountingorganizationrepository';
import { ServerSideToken } from '@farris/ui';
import { FIAccountingSetComponentViewmodelForm } from '../../viewmodels/form/fiaccountingsetcomponentviewmodelform';

import { FIAccountingSetComponentViewmodelUIState } from '../../viewmodels/uistate/fiaccountingsetcomponentviewmodeluistate';
import { FIAccountingSetAddItem1Handler } from '../../viewmodels/handlers/fiaccountingsetadditem1handler';
import { FIAccountingSetRemoveItem1Handler } from '../../viewmodels/handlers/fiaccountingsetremoveitem1handler';
import { DeleteAccSet1Handler } from '../../viewmodels/handlers/deleteaccset1handler';
import { EnableAccSet1Handler } from '../../viewmodels/handlers/enableaccset1handler';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Component({
  selector: 'app-fiaccountingsetcomponent',
  templateUrl: './fiaccountingsetcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: FIAccountingSetAddItem1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: FIAccountingSetRemoveItem1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: DeleteAccSet1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: EnableAccSet1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'fiaccountingset-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: FIAccountingOrganizationRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: Form, useClass: FIAccountingSetComponentViewmodelForm },
    { provide: UIState, useClass: FIAccountingSetComponentViewmodelUIState },
    AccOrgService1,
    { provide: ViewModel, useClass: FIAccountingSetComponentViewmodel }
  ]
})
export class FIAccountingSetComponent extends FrameComponent implements OnInit, AfterViewInit {
  @HostBinding('class')
  cls = 'flex-fill d-flex flex-column ng-star-inserted';
  public viewModel: FIAccountingSetComponentViewmodel;
  lang: string;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.lang = localStorage.getItem('languageCode');
  }

  ngOnInit() {
   this.onFormLoad();
  }

  ngAfterViewInit(): void {
  }

  public onFormLoad() {
  }



}

