import { Component, OnInit, Injector, HostBinding, AfterViewInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { GLAccDocEntryComponentViewmodel } from '../../viewmodels/glaccdocentrycomponentviewmodel';
import { GLAccountingDocumentRepository } from '../../models/glaccountingdocumentrepository';
import { ServerSideToken } from '@farris/ui';
import { GLAccDocEntryComponentViewmodelForm } from '../../viewmodels/form/glaccdocentrycomponentviewmodelform';

import { GLAccDocEntryComponentViewmodelUIState } from '../../viewmodels/uistate/glaccdocentrycomponentviewmodeluistate';
import { GLAccDocEntryAddItem1Handler } from '../../viewmodels/handlers/glaccdocentryadditem1handler';
import { GLAccDocEntryRemoveItem1Handler } from '../../viewmodels/handlers/glaccdocentryremoveitem1handler';
import { CreateAccDocEntry1Handler } from '../../viewmodels/handlers/createaccdocentry1handler';
import { DeleteEntryByID1Handler } from '../../viewmodels/handlers/deleteentrybyid1handler';
import { ChangeEntry1Handler } from '../../viewmodels/handlers/changeentry1handler';
import { CreateAccDocAssistant1Handler } from '../../viewmodels/handlers/createaccdocassistant1handler';
import { AmountCanEdit1Handler } from '../../viewmodels/handlers/amountcanedit1handler';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';
import { AccDocAssistanceService as AccDocAssistanceService1 } from '../../services/accountingdocumentbill_frm_accdocassistant';

@Component({
  selector: 'app-glaccdocentrycomponent',
  templateUrl: './glaccdocentrycomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: GLAccDocEntryAddItem1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: GLAccDocEntryRemoveItem1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CreateAccDocEntry1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: DeleteEntryByID1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeEntry1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CreateAccDocAssistant1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AmountCanEdit1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'glaccdocentry-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: GLAccountingDocumentRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: Form, useClass: GLAccDocEntryComponentViewmodelForm },
    { provide: UIState, useClass: GLAccDocEntryComponentViewmodelUIState },
    AccDocService1,
    AccDocEntryService1,
    AccDocAssistanceService1,
    { provide: ViewModel, useClass: GLAccDocEntryComponentViewmodel }
  ]
})
export class GLAccDocEntryComponent extends FrameComponent implements OnInit, AfterViewInit {
  @HostBinding('class')
  cls = 'd-flex';
  public viewModel: GLAccDocEntryComponentViewmodel;
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
    this.viewModel.AmountCanEdit1();
  }

  accTitleLookupPicked = () => {
    this.viewModel.CreateAccDocAssistant1();
    return of(true);
    }
    abstract() {
    return of(true);
    }

}

