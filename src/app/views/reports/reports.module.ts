import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CheckInComponent } from './check-in/check-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule, SpinkitModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { MatSortModule } from '@angular/material/sort';

// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
const route = [
  {
    path: '',
    data: {
      title: 'Reports',
    },
    children: [
      {
        path: '',
        redirectTo: 'check-in',
      },
      {
        path: 'check-in',
        data: {
          title: 'Check-In',
        },
        component: CheckInComponent
      },
      {
        path: 'log-in',
        data: {
          title: 'Log-In',
        },
        component: LogInComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    CheckInComponent,
    LogInComponent
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
    MatPaginatorModule,
    IconModule,
    ButtonModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    SpinkitModule
  ],
  providers: [
    DatePipe
  ]
})
export class ReportsModule { }
