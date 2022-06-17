import { Component, HostBinding, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpReqService } from "../../../services/http-req.service";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { GlobalService } from "../../../services/global.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  @HostBinding("class") cAppClass = "c-app flex-row align-items-center";
  forgotPswForm: FormGroup;
  submitted = false;
  formErrors: any;
  constructor(
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private router: Router,
    private httpReqService: HttpReqService,
    public gs: GlobalService
  ) {
    this.httpReqService.clearMassage();
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }

  ngOnInit(): void {}

  /**
   * Create Login Form
   */
  createForm() {
    this.forgotPswForm = this.fb.group({
      email: [
        "",
        [Validators.required, Validators.pattern(this.vf.formRules.email)],
      ],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPswForm.controls;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.forgotPswForm.status === "VALID";
  }

  async onSubmit() {
    if (this.onValidate()) {
      const response: any = await this.httpReqService.post(
        "users/forgotPassword",
        this.forgotPswForm.value,
        true
      );
      if (response && response.status == 1) {
        localStorage.setItem(
          "email",
          JSON.stringify(this.forgotPswForm.value.email)
        );
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "success";
        this.httpReqService.hideMassege();
        setTimeout(() => {
          this.router.navigate(["auth/verify-otp"]);
        }, 1000);
      } else {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "error";
        window.scroll(0, 0);
      }
      // if (response) {
      // localStorage.setItem('accessToken', response.items.token);
      // const decoded: any = jwt_decode(response.items.token);
      // const obj = {
      //   name: decoded.user.name
      // };
      // this.authService.currentUserSubjet(response.items.token);
      // }
    }
  }
}
