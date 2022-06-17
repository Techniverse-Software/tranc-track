import { Component, HostBinding, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { Router } from "@angular/router";
import { HttpReqService } from "../../../services/http-req.service";
import { GlobalService } from "../../../services/global.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @HostBinding("class") cAppClass = "c-app flex-row align-items-center";
  loginForm: FormGroup;
  submitted = false;
  passwordType = "password";
  passwordIcon = "fa fa-eye-slash";
  formErrors: any;
  loading: boolean = false;
  response: any = null;
  constructor(
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private authService: AuthService,
    private router: Router,
    public gs: GlobalService,
    private httpReqService: HttpReqService
  ) {
    this.httpReqService.clearMassage();
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }

  ngOnInit(): void {
    this.gs.resMassage.massage = null;
  }

  /**
   * Create Login Form
   */
  createForm() {
    this.loginForm = this.fb.group({
      email: [
        "",
        [Validators.required, Validators.pattern(this.vf.formRules.email)],
      ],
      password: [
        "",
        [
          Validators.required,
          // Validators.minLength(this.vf.formRules.passwordMin),
          // Validators.pattern(this.vf.formRules.passwordPattern),
        ],
      ],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.loginForm.status === "VALID";
  }

  togglePassword() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
    this.passwordIcon =
      this.passwordIcon === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
  }

  async onSubmit() {
    this.loading = true;
    this.gs.resMassage.massage = '';
    if (this.onValidate()) {
      const response: any = await this.httpReqService.post(
        "users/login",
        this.loginForm.value,
        true
      );
      //console.log(response);
      this.response = response;
      if (response && response.status === 1) {
        localStorage.setItem("accessToken", response.items.token);
        const decoded: any = this.authService.decodeToken();
        const obj = {
          name: decoded.user.name,
          // permissionId: decoded.user.permissionId
        };
        if (response.items.image) {
          obj["image"] = response.items.image;
        }
        localStorage.setItem("currentUser", JSON.stringify(obj));
        this.authService.currentUserSubjet(response.items.token);
        this.gs.resMassage.massage = response.message;
        this.gs.resMassage.status = "success";
        this.httpReqService.hideMassege();
        setTimeout(() => {
          this.router.navigate(["dashboard"]);
        }, 1000);
      } else {
        this.loading = false;
        this.gs.resMassage.massage = response.message;
        this.gs.resMassage.status = "error";
      }
    }
    this.loading = false;
  }
}
