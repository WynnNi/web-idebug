import { Component, OnInit, Injector, HostBinding, AfterViewInit, ViewChild } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { RootViewmodel } from '../../viewmodels/rootviewmodel';
import { FIAccountingDepartmentRepository } from '../../models/fiaccountingdepartmentrepository';
import { ServerSideToken, LookupGridComponent } from '@farris/ui';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FrameworkService } from '@gsp-sys/rtf-common';
import { ApplicationParamService } from '@farris/command-services';
import { RootViewmodelStateMachine } from '../../viewmodels/statemachine/rootviewmodelstatemachine';
import { RootViewmodelUIState } from '../../viewmodels/uistate/rootviewmodeluistate';
import { Window1Handler } from '../../viewmodels/handlers/window1handler';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Component({
  selector: 'app-rootcomponent',
  templateUrl: './rootcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: Window1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'root-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: FIAccountingDepartmentRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: StateMachine, useClass: RootViewmodelStateMachine },
    { provide: UIState, useClass: RootViewmodelUIState },
    AccDeptService1,
    { provide: ViewModel, useClass: RootViewmodel }
  ]
})
export class RootComponent extends FrameComponent implements OnInit, AfterViewInit {
  @HostBinding('class')
  cls = '';
  @ViewChild('accDept')
  view1: LookupGridComponent;
  @ViewChild('department')
  view2: LookupGridComponent;
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
  }

  accDeptLookupPicked = () => {
    return this.viewModel.treeGridComponentViewmodel.ChangeDepartmentPosition1();
  }

  multiDepartmentsLookupPicked = () => {
    return this.viewModel.treeGridComponentViewmodel.RefCopyAdminDepartment1();
  }
  public changePosition() {
    this.view1.showDialog();
  }
  public refDepts() {
    this.view2.showDialog();
  }


}

