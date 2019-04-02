import { Component, OnInit, Injector, HostBinding, ViewChild } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { RootViewmodel } from '../../viewmodels/rootviewmodel';
import { GLAccountingDocumentRepository } from '../../models/glaccountingdocumentrepository';
import { ServerSideToken, LookupGridComponent } from '@farris/ui';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FrameworkService } from '@gsp-sys/rtf-common';
import { ApplicationParamService } from '@farris/command-services';import { RootViewmodelForm } from '../../viewmodels/form/rootviewmodelform';
import { RootViewmodelStateMachine } from '../../viewmodels/statemachine/rootviewmodelstatemachine';
import { RootViewmodelUIState } from '../../viewmodels/uistate/rootviewmodeluistate';
import { Load1Handler } from '../../viewmodels/handlers/load1handler';
import { LoadAndAdd1Handler } from '../../viewmodels/handlers/loadandadd1handler';
import { LoadAndView1Handler } from '../../viewmodels/handlers/loadandview1handler';
import { LoadAndEdit1Handler } from '../../viewmodels/handlers/loadandedit1handler';
import { Add1Handler } from '../../viewmodels/handlers/add1handler';
import { Edit1Handler } from '../../viewmodels/handlers/edit1handler';
import { Save1Handler } from '../../viewmodels/handlers/save1handler';
import { Cancel1Handler } from '../../viewmodels/handlers/cancel1handler';
import { Close1Handler } from '../../viewmodels/handlers/close1handler';
import { GetInitData1Handler } from '../../viewmodels/handlers/getinitdata1handler';
import { LinkViewLoad1Handler } from '../../viewmodels/handlers/linkviewload1handler';
import { LoadData1Handler } from '../../viewmodels/handlers/loaddata1handler';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';

@Component({
  selector: 'app-rootcomponent',
  templateUrl: './rootcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Load1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadAndAdd1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadAndView1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadAndEdit1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Add1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Edit1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Save1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Cancel1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Close1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: GetInitData1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LinkViewLoad1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadData1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'root-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: GLAccountingDocumentRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: Form, useClass: RootViewmodelForm },
    { provide: StateMachine, useClass: RootViewmodelStateMachine },
    { provide: UIState, useClass: RootViewmodelUIState },
    AccDocService1,
    AccDocEntryService1,
    { provide: ViewModel, useClass: RootViewmodel }
  ]
})
export class RootComponent extends FrameComponent implements OnInit {
  @HostBinding('class')
  cls = '';
  @ViewChild('accDocCode')
  view1: LookupGridComponent;
  public viewModel: RootViewmodel;
  lang: string;

  constructor(
    private route: ActivatedRoute,
    private frameworkService: FrameworkService,
    private applicationParamsService: ApplicationParamService,
    public injector: Injector
  ) {
    super(injector);
    this.lang = localStorage.getItem('languageCode');
  }

  ngOnInit() {
    this.applicationParamsService.parseParams(this.route, this.frameworkService, this.viewModel, () => {
      this.onFormLoad();
    })
  }

  public onFormLoad() {
    this.viewModel.LoadData1();
  }

  accDocLookupPicked = () => {
    this.viewModel.basicFormViewmodel.LookUp1();
    return of(true);
  }

  public LookUp() {
    this.view1.showDialog();
  }

}

