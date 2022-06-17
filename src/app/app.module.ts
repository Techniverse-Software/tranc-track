import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { environment } from '../environments/environment';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { DefaultHeaderComponent } from './containers/default-layout/default-header/default-header.component';

import { ToastrModule } from 'ngx-toastr';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  DefaultHeaderComponent,
  DefaultHeaderDropdownAccountComponent,
  DefaultHeaderDropdownNotificationsComponent
];

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  BreadcrumbModule,
  CardModule,
  CalloutModule,
  ChartModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  LayoutModule,
  ListGroupModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  SwitchModule,
  TabsetModule,
  TogglerModule,
  ToastModule,
  SpinkitModule,
  SpinnerModule,
} from '@coreui/angular';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

// 3rd party
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';

// Import routing module
import { AppRoutingModule } from './app.routing';

import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './services/intercept.service';
import { LoginGuard } from './services/guard/auth.guard';
import { DefaultHeaderDropdownAccountComponent } from './containers/default-layout/default-header-dropdown/default-header-dropdown-account.component';
import { DefaultHeaderDropdownNotificationsComponent } from './containers/default-layout/default-header-dropdown/default-header-dropdown-notifications.component';
import { DeleteModalComponent } from './partial/modals/delete-modal/delete-modal.component';
import { LocationModalComponent } from './partial/modals/location-modal/location-modal.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImportFileComponent } from './partial/modals/import-file/import-file.component';
const config: SocketIoConfig = { url: environment.socketUrl, options: {} };
import { PartialModule } from './partial/partial.module';
import {  BsModalRef } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    AlertModule,
    BadgeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    BreadcrumbModule,
    CardModule,
    SocketIoModule.forRoot(config),
    CalloutModule,
    ChartModule,
    CollapseModule,
    DropdownModule,
    GridModule,
    IconModule,
    ModalModule.forRoot(),
    IconSetModule.forRoot(),
    SharedModule,
    LayoutModule,
    ListGroupModule,
    ProgressModule,
    SidebarModule,
    SwitchModule,
    TabsetModule,
    TogglerModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    FormModule,
    ToastModule,
    HttpClientModule,
    PartialModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      preventDuplicates: true,
    }),
    SpinkitModule,
    SpinnerModule,
    ModalModule.forRoot(),
    HttpClientJsonpModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule.forRoot(),
    NgSelectModule
  ],
  exports: [SharedModule],

  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    DeleteModalComponent,
    LocationModalComponent,
    ImportFileComponent
  ],
  entryComponents: [
    DeleteModalComponent,
    LocationModalComponent,
    ImportFileComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    BnNgIdleService,
    LoginGuard,
    DatePipe,
    IconSetService,
    DeleteModalComponent,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
