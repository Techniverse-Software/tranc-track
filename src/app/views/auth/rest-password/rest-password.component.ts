import { Component, HostBinding, OnInit } from "@angular/core";
import { HttpReqService } from "../../../services/http-req.service";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { GlobalService } from "../../../services/global.service";

/** passwords must match - custom validator */
export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("password");
  const confirm = control.get("confirmPassword");
  return password && confirm && password.value === confirm.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: "app-rest-password",
  templateUrl: "./rest-password.component.html",
  styleUrls: ["./rest-password.component.scss"],
})
export class RestPasswordComponent implements OnInit {
  @HostBinding("class") cAppClass = "c-app flex-row align-items-center";
  resetPasswordForm: FormGroup;
  formErrors: any;
  submitted = false;
  passwordType = "password";
  passwordIcon = "fa fa-eye-slash";
  cPasswordType = "password";
  cPasswordIcon = "fa fa-eye-slash";
  constructor(
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private httpReqService: HttpReqService,
    private router: Router,
    public gs: GlobalService
  ) {
    this.httpReqService.clearMassage();
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.resetPasswordForm = this.fb.group(
      {
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(this.vf.formRules.passwordMin),
            Validators.pattern(this.vf.formRules.passwordPattern),
          ],
        ],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: confirmPasswordValidator }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  onValidate() {
    this.submitted = true;
    // stop here if form is invalid
    return this.resetPasswordForm.status === "VALID";
  }

  async onSubmit() {
    if (this.onValidate()) {
      const authData = {
        password: this.resetPasswordForm.value.password,
        confirmPassword: this.resetPasswordForm.value.confirmPassword,
        email: JSON.parse(localStorage.getItem("email")),
      };
      this.resetPasswordForm.value.email = JSON.parse(
        localStorage.getItem("email")
      );
      const response: any = await this.httpReqService.post(
        "users/resetPassword",
        this.resetPasswordForm.value,
        true
      );
      if (response && response.status == 1) {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "success";
        this.httpReqService.hideMassege();
        this.resetPasswordForm.reset();
        this.submitted = false;
        localStorage.removeItem("email");
        setTimeout(() => {
          this.router.navigate(["auth/login"]);
        }, 1000);
      } else {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "error";
        window.scroll(0, 0);
      }
      // this.resetPasswordForm.value.email = localStorage.getItem('email');
      // const response: any = await this.httpReqService.post('users/changePassword', this.resetPasswordForm.value, true);
      // if (response) {
      //   this.resetPasswordForm.reset();
      //   this.submitted = false;
      // }
    }
  }

  togglePassword() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
    this.passwordIcon =
      this.passwordIcon === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
  }

  cTogglePassword() {
    this.cPasswordType =
      this.cPasswordType === "password" ? "text" : "password";
    this.cPasswordIcon =
      this.cPasswordIcon === "fa fa-eye-slash"
        ? "fa fa-eye"
        : "fa fa-eye-slash";
  }

  // submit() {
  //   this.submitted = true;
  //   if (this.onValidate()) {
  //     const authData = {
  //       password: this.resetPasswordForm.value.password,
  //       confirm_password: this.resetPasswordForm.value.confirmPassword,
  //       email: localStorage.getItem('email'),
  //     };
  //     const response: any = this.httpReqService.post('users/resetPassword', authData, true);
  //     if (response) {
  //       this.router.navigate(['auth/login']);
  //     }
  //   }
  // }
}
