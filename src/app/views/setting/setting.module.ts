import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import { SystemParameterComponent } from './system-parameter/system-parameter.component';
import { CustomParameterComponent } from './custom-parameter/custom-parameter.component';
import { OrganizationComponent } from './organization/organization.component';
import { RouterModule } from '@angular/router';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// CoreUI Modules
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ImgModule,
  SwitchModule,
  ModalModule,
  SpinkitModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ngx-Quill
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';

const route = [
  {
    path: '',
    data: {
      title: 'Settings',
    },
    children: [
      {
        path: 'organization',
        data: {
          title: 'Organization',
        },
        component: OrganizationComponent
      },
      {
        path: 'custom',
        data: {
          title: 'Custom Parameters'
        },
        component: CustomParameterComponent
      },
      {
        path: 'system',
        data: {
          title: 'System Parameters'
        },
        component: SystemParameterComponent
      },
      {
        path: 'template',
        data: {
          title: 'Mail Templates'
        },
        component: MailTemplateComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    MailTemplateComponent,
    SystemParameterComponent,
    CustomParameterComponent,
    OrganizationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    ImgModule,
    SwitchModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    IconModule,
    QuillModule.forRoot(),
    TimepickerModule.forRoot(),
    NgSelectModule,
    SpinkitModule
  ]
})
export class SettingModule { }
