import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';


// CoreUI Modules
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  BadgeModule,
  ImgModule,
  SwitchModule,
  ModalModule,
  SpinkitModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from '../../services/guard/auth.guard';
import { Role } from '../../services/role';
import { UserGroupComponent } from './user-group/user-group.component';

const route = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Users',
      // roles: [ Role.superAdmin]
    },
    children: [
      {
        path: '',
        redirectTo: 'user',
      },
      {
        path: '',
        data: {
          title: '',
        },
        component: UserListComponent
      },
      {
        path: 'add',
        data: {
          title: 'Add'
        },
        component: UserAddEditComponent
      },
      {
        path: 'update/:id',
        data: {
          title: 'Update'
        },
        component: UserAddEditComponent
      },
      {
        path: 'update/:id',
        data: {
          title: 'Update'
        },
        component: UserAddEditComponent
      },
      {
        path: 'group',
        data: {
          title: 'User Groups',
        },
        component: UserGroupComponent
      },
    ]
  }
];

import { NgxTippyModule } from 'ngx-tippy-wrapper';

@NgModule({
  declarations: [
    UserListComponent,
    UserAddEditComponent,
    UserGroupComponent
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
    BadgeModule,
    SwitchModule,
    ModalModule,
    NgSelectModule,
    FormsModule,
    NgxTippyModule,
    SpinkitModule,
  ]
})
export class UserModule { }
