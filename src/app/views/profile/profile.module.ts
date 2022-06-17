import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';

// CoreUI Modules
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ImgModule,
  TabsetModule,
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { IconModule } from '@coreui/icons-angular';
// import { ReactiveFormsModule } from '@angular/forms';
import { ProfileOtpComponent } from './profile-otp/profile-otp.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

const routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'update',
      },
      {
        path: 'update',
        data: {
          title: 'Profile',
        },
        component: ProfileComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    ProfileOtpComponent,
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsetModule,
    CardModule,
    IconModule,
    GridModule,
    FormModule,
    ButtonModule,
    ImgModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule
  ]
})
export class ProfileModule { }
