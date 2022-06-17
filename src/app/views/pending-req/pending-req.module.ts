import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingReqListComponent } from './pending-req-list/pending-req-list.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CardModule, GridModule, ButtonModule, ImgModule, SwitchModule, ModalModule, BadgeModule, FormModule, TabsetModule, SpinkitModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { GoogleMapsModule } from '@angular/google-maps';

// Ng2-select
import { NgSelectModule } from '@ng-select/ng-select';

const route = [
  {
    path: '',
    data: {
      title: 'Alerts',
    },
    children: [
      {
        path: '',
        redirectTo: 'approval-req',
      },
      {
        path: '',
        data: {
          title: '',
        },
        component: PendingReqListComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    PendingReqListComponent
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
    MatTableModule,
    TabsetModule,
    MatPaginatorModule,
    MatSortModule,
    SwitchModule,
    ModalModule,
    NgxTippyModule,
    NgSelectModule,
    BadgeModule,
    SpinkitModule,
  ]
})
export class PendingReqModule { }
