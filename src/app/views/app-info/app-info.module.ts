import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInfoComponent } from './app-info/app-info.component';
import { RouterModule } from '@angular/router';

const route = [
  {
    path: '',
    data: {
      title: 'App Info',
    },
    component: AppInfoComponent
  }
];

@NgModule({
  declarations: [
    AppInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class AppInfoModule { }
