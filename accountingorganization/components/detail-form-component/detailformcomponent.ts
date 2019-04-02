import { Component, OnInit, Injector, HostBinding, AfterViewInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { DetailFormComponentViewmodel } from '../../viewmodels/detailformcomponentviewmodel';
import { FIAccountingOrganizationRepository } from '../../models/fiaccountingorganizationrepository';
import { ServerSideToken } from '@farris/ui';
import { DetailFormComponentViewmodelForm } from '../../viewmodels/form/detailformcomponentviewmodelform';

import { DetailFormComponentViewmodelUIState } from '../../viewmodels/uistate/detailformcomponentviewmodeluistate';
import { Edit1Handler } from '../../viewmodels/handlers/edit1handler';
import { Save1Handler } from '../../viewmodels/handlers/save1handler';
import { Cancel1Handler } from '../../viewmodels/handlers/cancel1handler';
import { SaveAccOrg1Handler } from '../../viewmodels/handlers/saveaccorg1handler';
import { CancelAccOrg1Handler } from '../../viewmodels/handlers/cancelaccorg1handler';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Component({
  selector: 'app-detailformcomponent',
  templateUrl: './detailformcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Edit1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Save1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Cancel1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: SaveAccOrg1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CancelAccOrg1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'detail-form-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: FIAccountingOrganizationRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: Form, useClass: DetailFormComponentViewmodelForm },
    { provide: UIState, useClass: DetailFormComponentViewmodelUIState },
    AccOrgService1,
    { provide: ViewModel, useClass: DetailFormComponentViewmodel }
  ]
})
export class DetailFormComponent extends FrameComponent implements OnInit, AfterViewInit {
  @HostBinding('class')
  cls = 'd-block';
  public viewModel: DetailFormComponentViewmodel;
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

