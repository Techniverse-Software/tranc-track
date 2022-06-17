import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location-list/location-list.component';
import { LocationAddEditComponent } from './location-add-edit/location-add-edit.component';
import { RouterModule } from '@angular/router';

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
import { PartialModule } from '../../partial/partial.module';
const route = [
  {
    path: '',
    data: {
      title: 'Locations',
    },
    children: [
      {
        path: '',
        redirectTo: 'location',
      },
      {
        path: '',
        data: {
          title: '',
        },
        component: LocationComponent
      },
      {
        path: 'add',
        data: {
          title: 'Add'
        },
        component: LocationAddEditComponent
      },
      {
        path: 'update/:id',
        data: {
          title: 'Update'
        },
        component: LocationAddEditComponent
      },
    ]
  }
];


@NgModule({
  declarations: [
    LocationComponent,
    LocationAddEditComponent
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
    SpinkitModule,
  ]
})
export class LocationModule { }
