import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard, LoginGuard } from './services/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'device',
        loadChildren: () => import('./views/device/device.module').then(m => m.DeviceModule)
      },
      {
        path: 'permission',
        loadChildren: () => import('./views/permission/permission.module').then(m => m.PermissionModule)
      },
      {
        path: 'organization',
        loadChildren: () => import('./views/organization/organization.module').then(m => m.OrganizationModule)
      },
      {
        path: 'approval-request',
        loadChildren: () => import('./views/pending-req/pending-req.module').then(m => m.PendingReqModule)
      },
      {
        path: 'logs',
        loadChildren: () => import('./views/logs/logs.module').then(m => m.LogsModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./views/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'locations',
        loadChildren: () => import('./views/location/location.module').then(m => m.LocationModule)
      },
      {
        path: 'group',
        loadChildren: () => import('./views/groups/groups.module').then(m => m.GroupsModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./views/setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: 'info',
        loadChildren: () => import('./views/app-info/app-info.module').then(m => m.AppInfoModule)
      },
      {
        path: 'role-permission',
        loadChildren: () => import('./views/role-permission/role-permission.module').then(m => m.RolePermissionModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'legacy',
      useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
