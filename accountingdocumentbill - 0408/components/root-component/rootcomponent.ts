import { Component, OnInit, Injector, HostBinding, AfterViewInit, ViewChild } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { RootViewmodel } from '../../viewmodels/rootviewmodel';
import { GLAccountingDocumentRepository } from '../../models/glaccountingdocumentrepository';
import { ServerSideToken, LookupGridComponent } from '@farris/ui';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FrameworkService } from '@gsp-sys/rtf-common';
import { ApplicationParamService } from '@farris/command-services';
import { RootViewmodelForm } from '../../viewmodels/form/rootviewmodelform';
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
import { AccSetAfterLookUp1Handler } from '../../viewmodels/handlers/accsetafterlookup1handler';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';
import { CheckAccDoc1Handler } from '../../viewmodels/handlers/checkaccdoc1handler';
import { CancelCheckAccDoc1Handler } from '../../viewmodels/handlers/cancelcheckaccdoc1handler';
import { AccountAccDoc1Handler } from '../../viewmodels/handlers/accountaccdoc1handler';
import { CancelAccountAccDoc1Handler } from '../../viewmodels/handlers/cancelaccountaccdoc1';
import { LinkViewService as LinkViewService1} from '../../services/accounitngdocumentbill_frm_linkview';
import { CommonService } from '../../services/accdoccommonservice';
import { MessageShow1Handler } from '../../viewmodels/handlers/messageshow1handler';
import { CopyThisAccDoc1Handler } from '../../viewmodels/handlers/copythisaccdoc1handler';
import { ApproveAccDoc1Handler } from '../../viewmodels/handlers/approveaccdoc1handler';
import { CancelApproveAccDoc1Handler } from '../../viewmodels/handlers/cancelapproveaccdoc1handler';
import { SignatureAccDoc1Handler } from '../../viewmodels/handlers/signatureaccdoc1handler';
import { CancelSignatureAccDoc1Handler } from '../../viewmodels/handlers/cancelsignature1handler';
import { ChangeAccDocOnLinkView3Handler } from '../../viewmodels/handlers/changeaccdoconlinkview3handler';
import { ChangeAccDocOnLinkView4Handler } from '../../viewmodels/handlers/ChangeAccDocOnLinkView4Handler';
import { ChangeAccDocOnLinkView1Handler } from '../../viewmodels/handlers/changeaccdoconlinkview1handler';
import { ChangeAccDocOnLinkView2Handler } from '../../viewmodels/handlers/changeaccdoconlinkview2handler';

@Component({
  selector: 'app-rootcomponent',
  templateUrl: './rootcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: MessageShow1Handler, multi: true },
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
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadData1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AccSetAfterLookUp1Handler, multi: true },

    { provide: COMMAND_HANDLERS_TOKEN, useClass: CopyThisAccDoc1Handler, multi: true },

    { provide: COMMAND_HANDLERS_TOKEN, useClass: LinkViewLoad1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeAccDocOnLinkView1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeAccDocOnLinkView2Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeAccDocOnLinkView3Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeAccDocOnLinkView4Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CheckAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CancelCheckAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AccountAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CancelAccountAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ApproveAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CancelApproveAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: SignatureAccDoc1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CancelSignatureAccDoc1Handler, multi: true },
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
    LinkViewService1,
    CommonService,
    { provide: ViewModel, useClass: RootViewmodel }
  ]
})
export class RootComponent extends FrameComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit(): void {
  }

  public onFormLoad() {
    this.viewModel.LoadData1();
  }

  accSetLookupPicked = () => {
    return this.viewModel.AccSetAfterLookUp1();
  }

  accDocLookupPicked = () => {
    return this.viewModel.basicFormViewmodel.LookUp1();
  }

  public LookUp() {
    this.view1.showDialog();
  }

}

