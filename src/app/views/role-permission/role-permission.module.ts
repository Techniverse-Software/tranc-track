import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionComponent } from './role-permission.component';
import { RouterModule } from '@angular/router';
import { ButtonModule, CardModule, FormModule, GridModule, TabsetModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route = [
  {
    path: '',
    data: {
      title: 'Role-permission',
    },
    children: [
      {
        path: '',
        redirectTo: 'role-permission',
      },
      {
        path: '',
        data: {
          title: '',
        },
        component: RolePermissionComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    RolePermissionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    CardModule,
    IconModule,
    GridModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    FormModule
  ]
})
export class RolePermissionModule { }
