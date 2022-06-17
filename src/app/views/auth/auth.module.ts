import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { NgOtpInputModule } from "ng-otp-input";

// CoreUI
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  SpinkitModule,
} from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyOtpComponent } from "./verify-otp/verify-otp.component";
import { RestPasswordComponent } from "./rest-password/rest-password.component";

const routes = [
  {
    path: "",
    data: {
      title: "Forms",
    },
    children: [
      {
        path: "",
        redirectTo: "login",
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
      },
      {
        path: "verify-otp",
        component: VerifyOtpComponent,
      },
      {
        path: "verify-otp/:id",
        component: VerifyOtpComponent,
      },
      {
        path: "reset-password",
        component: RestPasswordComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    RestPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CardModule,
    GridModule,
    IconModule,
    SpinkitModule,
    // ToastrModule.forRoot(),
    // ToastContainerModule,
    FormModule,
    ReactiveFormsModule,
    NgOtpInputModule,
  ],
})
export class AuthModule {}
