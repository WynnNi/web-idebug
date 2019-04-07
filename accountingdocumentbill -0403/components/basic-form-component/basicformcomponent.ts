import { Component, OnInit, Injector, HostBinding, AfterViewInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { BasicFormViewmodel } from '../../viewmodels/basicformviewmodel';
import { GLAccountingDocumentRepository } from '../../models/glaccountingdocumentrepository';
import { ServerSideToken } from '@farris/ui';
import { BasicFormViewmodelForm } from '../../viewmodels/form/basicformviewmodelform';

import { BasicFormViewmodelUIState } from '../../viewmodels/uistate/basicformviewmodeluistate';
import { AddByType1Handler } from '../../viewmodels/handlers/addbytype1handler';
import { InitAdd1Handler } from '../../viewmodels/handlers/initadd1handler';
import { ChangeAccDoc1Handler } from '../../viewmodels/handlers/changeaccdoc1handler';
import { ChangeAccDoc2Handler } from '../../viewmodels/handlers/changeaccdoc2handler';
import { ChangeAccDoc3Handler } from '../../viewmodels/handlers/changeaccdoc3handler';
import { ChangeAccDoc4Handler } from '../../viewmodels/handlers/changeaccdoc4handler';
import { DeleteAccDoc1Handler } from '../../viewmodels/handlers/deleteaccdoc1handler';
import { SaveAccDoc1Handler } from '../../viewmodels/handlers/saveaccdoc1handler';
import { AddAccDoc1Handler } from '../../viewmodels/handlers/addaccdoc1handler';
import { LookUp1Handler } from '../../viewmodels/handlers/lookup1handler';
import { CancelAccDoc1Handler } from '../../viewmodels/handlers/cancelaccdoc1handler';
import { SubscribeChange1Handler } from '../../viewmodels/handlers/subscribechange1handler';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';

@Component({
  selector: 'app-basicformcomponent',
  templateUrl: './basicformcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AddByType1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: InitAdd1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeAccDoc2Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeAccDoc3Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeAccDoc4Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: DeleteAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: SaveAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AddAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LookUp1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CancelAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: SubscribeChange1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'basic-form-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: GLAccountingDocumentRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: Form, useClass: BasicFormViewmodelForm },
    { provide: UIState, useClass: BasicFormViewmodelUIState },
    AccDocService1,
    AccDocEntryService1,
    { provide: ViewModel, useClass: BasicFormViewmodel }
  ]
})
export class BasicFormComponent extends FrameComponent implements OnInit, AfterViewInit {
  @HostBinding('class')
  cls = 'd-flex flex-wrap';
  public viewModel: BasicFormViewmodel;
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
    this.viewModel.SubscribeChange1();
  }



}

