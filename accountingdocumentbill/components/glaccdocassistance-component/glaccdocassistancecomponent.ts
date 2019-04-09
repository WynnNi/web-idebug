import { Component, OnInit, Injector, HostBinding, AfterViewInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { GLAccDocAssistanceComponentViewmodel } from '../../viewmodels/glaccdocassistancecomponentviewmodel';
import { GLAccountingDocumentRepository } from '../../models/glaccountingdocumentrepository';
import { ServerSideToken } from '@farris/ui';
import { GLAccDocAssistanceComponentViewmodelForm } from '../../viewmodels/form/glaccdocassistancecomponentviewmodelform';

import { GLAccDocAssistanceComponentViewmodelUIState } from '../../viewmodels/uistate/glaccdocassistancecomponentviewmodeluistate';
import { GLAccDocAssistanceAddItem1Handler } from '../../viewmodels/handlers/glaccdocassistanceadditem1handler';
import { GLAccDocAssistanceRemoveItem1Handler } from '../../viewmodels/handlers/glaccdocassistanceremoveitem1handler';
import { CreateAccDocAssistant1Handler } from '../../viewmodels/handlers/createaccdocassistant1handler';
import { DeleteAccDocAssistant1Handler } from '../../viewmodels/handlers/deleteaccdocassistant1handler';
import { CreateAss1Handler } from '../../viewmodels/handlers/createass1handler';
import { GetExchangeRate1Handler } from '../../viewmodels/handlers/getexchangerate1handler';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';
import { AccDocAssistanceService as AccDocAssistanceService1 } from '../../services/accountingdocumentbill_frm_accdocassistant';
import { CommonService } from '../../services/commonservice';
import { CopyAccDocAssistance1Handler } from '../../viewmodels/handlers/copyaccdocassistance1handler';
import { InsertAccDocAssistance1Handler } from '../../viewmodels/handlers/insertaccdocassistance1handler';
import { MoveUpAccDocAssistance1Handler } from '../../viewmodels/handlers/moveupaccdocassistance1handler';
import { MoveDownAccDocAssistance1Handler } from '../../viewmodels/handlers/movedownaccdocassistance1handler';
import { AccDocCommonService as AccDocCommonService1} from '../../services/accountingdocumentbill_frm_commonservice';

@Component({
  selector: 'app-glaccdocassistancecomponent',
  templateUrl: './glaccdocassistancecomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: GLAccDocAssistanceAddItem1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: GLAccDocAssistanceRemoveItem1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CreateAccDocAssistant1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: DeleteAccDocAssistant1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CopyAccDocAssistance1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: InsertAccDocAssistance1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: MoveUpAccDocAssistance1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: MoveDownAccDocAssistance1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CreateAss1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: GetExchangeRate1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'glaccdocassistance-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: GLAccountingDocumentRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: Form, useClass: GLAccDocAssistanceComponentViewmodelForm },
    { provide: UIState, useClass: GLAccDocAssistanceComponentViewmodelUIState },
    CommonService,
    AccDocCommonService1,
    AccDocService1,
    AccDocEntryService1,
    AccDocAssistanceService1,
    { provide: ViewModel, useClass: GLAccDocAssistanceComponentViewmodel }
  ]
})
export class GLAccDocAssistanceComponent extends FrameComponent implements OnInit, AfterViewInit {
  @HostBinding('class')
  cls = 'd-flex flex-column flex-fill';
  public viewModel: GLAccDocAssistanceComponentViewmodel;
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
  exchangeRateLookupPicked = () => {
    this.viewModel.GetExchangeRate1();
    return of(true);
  }
  other() {
    return of(true);
  }


}

