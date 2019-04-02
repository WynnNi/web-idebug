import { Component, OnInit, Injector, HostBinding, AfterViewInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { TreeGridComponentViewmodel } from '../../viewmodels/treegridcomponentviewmodel';
import { FIAccountingDepartmentRepository } from '../../models/fiaccountingdepartmentrepository';
import { ServerSideToken } from '@farris/ui';
import { TreeGridComponentViewmodelForm } from '../../viewmodels/form/treegridcomponentviewmodelform';

import { TreeGridComponentViewmodelUIState } from '../../viewmodels/uistate/treegridcomponentviewmodeluistate';
import { LoadTree1Handler } from '../../viewmodels/handlers/loadtree1handler';
import { LoadCard1Handler } from '../../viewmodels/handlers/loadcard1handler';
import { AddSibling1Handler } from '../../viewmodels/handlers/addsibling1handler';
import { AddChild1Handler } from '../../viewmodels/handlers/addchild1handler';
import { Remove1Handler } from '../../viewmodels/handlers/remove1handler';
import { RefCopyAdminDepartment1Handler } from '../../viewmodels/handlers/refcopyadmindepartment1handler';
import { LoadData1Handler } from '../../viewmodels/handlers/loaddata1handler';
import { ChangeDepartmentPosition1Handler } from '../../viewmodels/handlers/changedepartmentposition1handler';
import { EnableAccDept1Handler } from '../../viewmodels/handlers/enableaccdept1handler';
import { LoadCard2Handler } from '../../viewmodels/handlers/loadcard2handler';
import { Delete1Handler } from '../../viewmodels/handlers/delete1handler';
import { LoadInitData1Handler } from '../../viewmodels/handlers/loadinitdata1handler';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Component({
  selector: 'app-treegridcomponent',
  templateUrl: './treegridcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadTree1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadCard1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AddSibling1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AddChild1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Remove1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: RefCopyAdminDepartment1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadData1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: ChangeDepartmentPosition1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: EnableAccDept1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadCard2Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Delete1Handler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadInitData1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'tree-grid-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: FIAccountingDepartmentRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: Form, useClass: TreeGridComponentViewmodelForm },
    { provide: UIState, useClass: TreeGridComponentViewmodelUIState },
    AccDeptService1,
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

