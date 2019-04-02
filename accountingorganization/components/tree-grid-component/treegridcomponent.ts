import { Component, OnInit, Injector, HostBinding, AfterViewInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { TreeGridComponentViewmodel } from '../../viewmodels/treegridcomponentviewmodel';
import { FIAccountingOrganizationRepository } from '../../models/fiaccountingorganizationrepository';
import { ServerSideToken } from '@farris/ui';
import { TreeGridComponentViewmodelForm } from '../../viewmodels/form/treegridcomponentviewmodelform';

import { TreeGridComponentViewmodelUIState } from '../../viewmodels/uistate/treegridcomponentviewmodeluistate';
import { LoadTree1Handler } from '../../viewmodels/handlers/loadtree1handler';
import { LoadCard1Handler } from '../../viewmodels/handlers/loadcard1handler';
import { AddSibling1Handler } from '../../viewmodels/handlers/addsibling1handler';
import { AddChild1Handler } from '../../viewmodels/handlers/addchild1handler';
import { Remove1Handler } from '../../viewmodels/handlers/remove1handler';
import { LoadData1Handler } from '../../viewmodels/handlers/loaddata1handler';
import { LoadChild1Handler } from '../../viewmodels/handlers/loadchild1handler';
import { EnableAccOrg1Handler } from '../../viewmodels/handlers/enableaccorg1handler';
import { ChangePosition1Handler } from '../../viewmodels/handlers/changeposition1handler';
import { RefCopyAdminOrg1Handler } from '../../viewmodels/handlers/refcopyadminorg1handler';
import { DeleteAccOrg1Handler } from '../../viewmodels/handlers/deleteaccorg1handler';
import { MainAccSetName1Handler } from '../../viewmodels/handlers/mainaccsetname1handler';
import { AddChildOrg1Handler } from '../../viewmodels/handlers/addchildorg1handler';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Component({
  selector: 'app-treegridcomponent',
  templateUrl: './treegridcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadTree1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadCard1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AddSibling1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AddChild1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Remove1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadData1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadChild1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: EnableAccOrg1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangePosition1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: RefCopyAdminOrg1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: DeleteAccOrg1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: MainAccSetName1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AddChildOrg1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'tree-grid-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: FIAccountingOrganizationRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: Form, useClass: TreeGridComponentViewmodelForm },
    { provide: UIState, useClass: TreeGridComponentViewmodelUIState },
    AccOrgService1,
    { provide: ViewModel, useClass: TreeGridComponentViewmodel }
  ]
})
export class TreeGridComponent extends FrameComponent implements OnInit, AfterViewInit {
  @HostBinding('class')
  cls = 'flex-fill flex-column d-flex';
  public viewModel: TreeGridComponentViewmodel;
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
    this.viewModel.LoadData1();
  }



}

