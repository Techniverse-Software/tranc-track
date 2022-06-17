import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AssignedGroupComponent } from './assigned-group/assigned-group.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ImgModule,
  SwitchModule,
  ModalModule,
  BadgeModule,
  TextMaskModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { MatSortModule } from '@angular/material/sort';



// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTableModule } from '@angular/material/table';


// Material
import { MatPaginatorModule } from '@angular/material/paginator';

import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { GoogleMapsModule } from '@angular/google-maps';

// Ng2-select
import { NgSelectModule } from '@ng-select/ng-select';
import { PartialModule } from '../../partial/partial.module';

const route = [
  {
    path: '',
    data: {
      title: 'Groups',
    },
    children: [
      {
        path: '',
        redirectTo: 'user',
      },
      
      
      {
        path: 'assinged',
        data: {
          title: 'Assigned Group',
        },
        component: AssignedGroupComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    AssignedGroupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    CardModule,
    GridModule,
    MatSortModule,
    IconModule,
    ButtonModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,


    ImgModule,
    MatPaginatorModule,
    SwitchModule,
    ModalModule,
    NgxTippyModule,
    GoogleMapsModule,
    NgSelectModule,
    BadgeModule,
    TextMaskModule,
    PartialModule
  ],
  providers: [
    DatePipe
  ]
})
export class GroupsModule { }
