import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceAddEditComponent } from './device-add-edit/device-add-edit.component';
import { RouterModule } from '@angular/router';
import { DeviceGroupComponent } from './device-group/device-group.component';

// CoreUI Modules
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ImgModule,
  SwitchModule,
  ModalModule,
  BadgeModule,
  TextMaskModule,
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
import { DeviceHistoryComponent } from './device-history/device-history.component';
import { PartialModule } from '../../partial/partial.module';
const route = [
  {
    path: '',
    data: {
      title: 'Devices',
    },
    children: [
      {
        path: '',
        redirectTo: 'device',
      },
      {
        path: '',
        data: {
          title: '',
        },
        component: DeviceListComponent
      },
      {
        path: 'add',
        data: {
          title: 'Add'
        },
        component: DeviceAddEditComponent
      },
      {
        path: 'update/:id',
        data: {
          title: 'Update'
        },
        component: DeviceAddEditComponent
      },
      {
        path: 'group',
        data: {
          title: 'Device Groups',
        },
        component: DeviceGroupComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceAddEditComponent,
    DeviceHistoryComponent,
    DeviceGroupComponent
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
    MatPaginatorModule,
    MatSortModule,
    SwitchModule,
    ModalModule,
    NgxTippyModule,
    GoogleMapsModule,
    NgSelectModule,
    BadgeModule,
    TextMaskModule,
    PartialModule,
    SpinkitModule

  ]
})
export class DeviceModule { }
