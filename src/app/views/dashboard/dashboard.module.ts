import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardModule, FormModule, GridModule, SpinkitModule, TabsetModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
// import { TimeAgoPipe } from 'time-ago-pipe';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { PartialModule } from '../../partial/partial.module';
import { RouterModule } from '@angular/router';
import { DashboardCountComponent } from './dashboard-count/dashboard-count.component';
import { TableViewComponent } from './table-view/table-view.component';
import { MapViewComponent } from './map-view/map-view.component';
const route = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
    },
  },
];
@NgModule({
  declarations: [DashboardComponent, DashboardCountComponent, TableViewComponent, MapViewComponent, ],
  // TimeAgoPipe
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TabsetModule,
    CardModule,
    IconModule,
    GridModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormModule,
    GoogleMapsModule,
    NgxTippyModule,
    SpinkitModule,
    PartialModule,
  ],

})
export class DashboardModule { }
