import { Component, HostBinding, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { HttpReqService } from "../../../services/http-req.service";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "../../../services/global.service";

@Component({
  selector: "app-verify-otp",
  templateUrl: "./verify-otp.component.html",
  styleUrls: ["./verify-otp.component.scss"],
})
export class VerifyOtpComponent implements OnInit {
  @HostBinding("class") cAppClass = "c-app flex-row align-items-center";
  otp: any;
  verifyOtpForm: FormGroup;
  formErrors: any;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private httpReqService: HttpReqService,
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService
  ) {
    this.httpReqService.clearMassage();
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit(): void {
    this.createForm();
    if (this.route.snapshot.params.id) {
      console.log(this.route.snapshot.params.id);
      var current_date = new Date(Date.now());
      var email_token = this.route.snapshot.params.id;
      var json = this.getIDFromEmailToken(email_token);

      var difference = current_date.getTime() - json.milli_seconds;
      difference = difference / (3600 * 60 * 24);
      if (difference > 5) {
        this.router.navigate(["auth/login"]);
      } else {
        this.check_valid_link(json);
      }
    }
  }

  getIDFromEmailToken(email_token) {
    var server_token = "",
      id = "",
      milli = "";
    var milli_seconds = 0;
    var length = 30; // 13 milli seconds so * 2 => 26

    var milli_token = email_token.substr(0, length);
    var id_token = email_token.substr(length);

    for (var i = 0; i < length; i++) {
      if (i % 2 == 0) {
        milli = milli + milli_token.charAt(i);
      } else {
        server_token = server_token + milli_token.charAt(i);
      }
    }

    milli = milli.split("").reverse().join("");
    milli_seconds = parseInt(milli);

    length = id_token.length;
    for (var i = 0; i < length; i++) {
      if (i % 2 == 0) {
        id = id + id_token.charAt(i);
      } else {
        server_token = server_token + id_token.charAt(i);
      }
    }
    return { id: id, server_token: server_token, milli_seconds: milli_seconds };
  }

  async check_valid_link(json) {
    const response: any = await this.httpReqService.post(
      "users/check_valid_detail",
      json,
      true
    );
    if (response.items && response.items.email) {
      this.gs.resMassage.massage = '';
      localStorage.setItem("email", JSON.stringify(response.items.email));

    } else {
      this.router.navigate(["auth/login"]);
    }
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  /**
   * Create Login Form
   */
  createForm() {
    this.verifyOtpForm = this.fb.group({
      otp: ["", [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.verifyOtpForm.controls;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.verifyOtpForm.status === "VALID";
  }

  async onSubmit() {
    if (!this.otp) {
      return;
    }
    const obj = {
      otp: this.otp,
      email: JSON.parse(localStorage.getItem("email")),
    };
    // if (this.onValidate()) {
    const response: any = await this.httpReqService.post(
      "users/verifyOtp",
      obj,
      true
    );
    if (response && response.status == 1) {
      this.gs.resMassage.message = response.message;
      this.gs.resMassage.message = "success";
      this.httpReqService.hideMassege();
      setTimeout(() => {
        this.router.navigate(["auth/reset-password"]);
      }, 1000);
      // localStorage.setItem('accessToken', response.items.token);
      // const decoded: any = jwt_decode(response.items.token);
      // const obj = {
      //   name: decoded.user.name
      // };
      // localStorage.setItem('currentUser', JSON.stringify(obj));
      // this.authService.currentUserSubjet(response.items.token);
    } else {
      this.gs.resMassage.message = response.message;
      this.gs.resMassage.message = "error";
      window.scroll(0, 0);
    }
    // }
  }

  resendOtp() {
    const obj = { email: JSON.parse(localStorage.getItem("email")) };
    const response: any = this.httpReqService.post(
      "users/forgotPassword",
      obj,
      true
    );
    if (response) {
      // this.router.navigate(['auth/reset-password']);
    }
  }
}
