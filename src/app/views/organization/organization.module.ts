import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationAddEditComponent } from './organization-add-edit/organization-add-edit.component';
import { RouterModule } from '@angular/router';

// CoreUI Modules
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ImgModule,
  TabsetModule,
  SwitchModule,
  ModalModule,
  BadgeModule,
  SpinkitModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { GoogleMapsModule } from '@angular/google-maps';

// Ng2-select
import { NgSelectModule } from '@ng-select/ng-select';

import { Ng2TelInputModule } from 'ng2-tel-input';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';

const route = [
  {
    path: '',
    data: {
      title: 'Account',
    },
    children: [
      {
        path: '',
        redirectTo: 'organization',
      },
      {
        path: '',
        data: {
          title: '',
        },
        component: OrganizationListComponent
      },
      {
        path: 'add',
        data: {
          title: 'Add'
        },
        component: OrganizationAddEditComponent
      },
      {
        path: 'update/:id',
        data: {
          title: 'Update'
        },
        component: OrganizationAddEditComponent
      },
      {
        path: 'detail/:id',
        data: {
          title: 'Details'
        },
        component: OrganizationDetailComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationAddEditComponent,
    OrganizationDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    CardModule,
    IconModule,
    GridModule,
    FormModule,
    ButtonModule,
    ImgModule,
    ReactiveFormsModule,
    MatTableModule,
    TabsetModule,
    MatPaginatorModule,
    MatSortModule,
    SwitchModule,
    ModalModule,
    NgxTippyModule,
    GoogleMapsModule,
    NgSelectModule,
    Ng2TelInputModule,
    BadgeModule,
    SpinkitModule,
  ]
})
export class OrganizationModule { }
