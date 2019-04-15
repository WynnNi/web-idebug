import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IntlModule } from '@progress/kendo-angular-intl';
import { MenuModule } from '@progress/kendo-angular-menu';
import '@progress/kendo-angular-intl/locales/zh/all';
import { FARRIS_DEVKIT_APP_PROVIDERS } from '@farris/devkit';
import { KendoBindingModule } from '@farris/kendo-binding';
import { FlexLayoutMoudle, LoadingModule, MessagerModule, NotifyModule, LookupModule, TreeTableModule, FieldGroupModule, InputModeModule, FResponseToolbarModule, FDropdownDirectiveTypeModule,FarrisDropdownModule} from '@farris/ui';
import { BE_SERVER_URI_TOKEN, FrameworkSessionService } from '@farris/bef';
import { LangPipe } from './lang/lang-pipe';
import { AccountingDocumentBillRoutingModule } from './routing';
import { GLAccountingDocumentRepository } from './models/glaccountingdocumentrepository';
import { EchartsModule } from '@qdp/ui';
import { RootComponent } from './components/root-component/rootcomponent';
import { BasicFormComponent } from './components/basic-form-component/basicformcomponent';
import { GLAccDocEntryComponent } from './components/glaccdocentry-component/glaccdocentrycomponent';
import { GLAccDocAssistanceComponent } from './components/glaccdocassistance-component/glaccdocassistancecomponent';
import { FDropdownDirective } from '../../../../node_modules0319/@farris/ui/dropdown-directive/f-dropdown.directive';

@NgModule({
  declarations: [
    LangPipe,
    RootComponent,
    BasicFormComponent,
    GLAccDocEntryComponent,
    GLAccDocAssistanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    DateInputsModule,
    DropDownsModule,
    ButtonsModule,
    InputsModule,
    LayoutModule,
    IntlModule,
    MenuModule,
    FDropdownDirectiveTypeModule,
    KendoBindingModule,
    FlexLayoutMoudle,
    LoadingModule.forRoot(),
    MessagerModule.forRoot(),
    NotifyModule.forRoot(),
    LookupModule,
    TreeTableModule,
    FieldGroupModule,
    InputModeModule,
    FResponseToolbarModule,
    AccountingDocumentBillRoutingModule,
    EchartsModule
  ],
  providers: [
    FARRIS_DEVKIT_APP_PROVIDERS,
    { provide: LOCALE_ID, useValue: 'zh' },
    FrameworkSessionService,
    {
      provide: BE_SERVER_URI_TOKEN,
	  //${window.location.port}
      useFactory: function () { return `${window.location.protocol}//${window.location.hostname}:5000`; }
    },
    GLAccountingDocumentRepository

  ]
})
export class AccountingDocumentBillModule {
  constructor() {}
}

