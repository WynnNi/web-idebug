import { Component, OnInit, Injector, HostBinding, AfterViewInit, ViewChild } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Form, FrameEvent, FrameEventBus, FrameComponent, FARRIS_DEVKIT_FRAME_PROVIDERS, ViewModel, COMMAND_HANDLERS_TOKEN, FRAME_ID, StateMachine, BindingData, Repository, UIState } from '@farris/devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '@farris/command-services';
import { BefLookupRestService } from '@farris/bef';
import { RootViewmodel } from '../../viewmodels/rootviewmodel';
import { FIAccountingOrganizationRepository } from '../../models/fiaccountingorganizationrepository';
import { ServerSideToken, LookupGridComponent } from '@farris/ui';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FrameworkService } from '@gsp-sys/rtf-common';
import { ApplicationParamService } from '@farris/command-services';
import { RootViewmodelStateMachine } from '../../viewmodels/statemachine/rootviewmodelstatemachine';
import { RootViewmodelUIState } from '../../viewmodels/uistate/rootviewmodeluistate';
import { MainAccSetName1Handler } from '../../viewmodels/handlers/mainaccsetname1handler';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Component({
  selector: 'app-rootcomponent',
  templateUrl: './rootcomponent.html',
  providers: [
    { provide: COMMAND_HANDLERS_TOKEN, useClass: MainAccSetName1Handler, multi: true },
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    FARRIS_COMMAND_SERVICE_PROVIDERS,
    { provide: FRAME_ID, useValue: 'root-component' },
    { provide: BindingData, useClass: BindingData },
    { provide: Repository,   useExisting: FIAccountingOrganizationRepository },
    { provide: ServerSideToken,   useClass: BefLookupRestService },
    { provide: StateMachine, useClass: RootViewmodelStateMachine },
    { provide: UIState, useClass: RootViewmodelUIState },
    AccOrgService1,
    { provide: ViewModel, useClass: RootViewmodel }
  ]
})
export class RootComponent extends FrameComponent implements OnInit, AfterViewInit {
  @HostBinding('class')
  cls = '';
  @ViewChild('accOrg')
  view1: LookupGridComponent;
  @ViewChild('adminOrgs')
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
    this.viewModel.MainAccSetName1();
  }

  accOrgLookupPicked = () => {
    return this.viewModel.treeGridComponentViewmodel.ChangePosition1();
  }

  multiAdminOrgsLookupPicked = () => {
    return this.viewModel.treeGridComponentViewmodel.RefCopyAdminOrg1();
  }

  public changePosition() {
    this.view1.showDialog();
  }
  public refAdminOrgs() {
    this.view2.showDialog();
  }

}

