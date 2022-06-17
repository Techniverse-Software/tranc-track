import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/global.service';
import { HttpReqService } from '../../../services/http-req.service';
import { ValidationFormsService } from '../../../services/validation-forms.service';

@Component({
  selector: 'app-profile-otp',
  templateUrl: './profile-otp.component.html',
  styleUrls: ['./profile-otp.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileOtpComponent implements OnInit {

  title: any;
  cancleButtonText: string;
  submitButtonText: string;
  public response: Subject<boolean>;
  verifyOtpForm: FormGroup;
  otp: any;
  formErrors: any;
  userData: any = {};
  submitted = false;
  tokenData: any;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    public authService: AuthService,
    public gs: GlobalService,
    private httpReqService: HttpReqService,
  ) {
    this.httpReqService.clearMassage();
    this.formErrors = this.vf.errorMessages;
    this.tokenData = this.authService.decodeToken();
  }

  ngOnInit(): void {
    this.getUserDetail();
    this.response = new Subject();
    this.verifyOtpForm = this.fb.group({
      otp: ["", [Validators.required]],
    });
  }

  async getUserDetail() {
    const response: any = await this.httpReqService.get('users', this.tokenData.user._id);
    this.userData = response.items[0];
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.verifyOtpForm.controls;
  }

  cancle(): void {
    this.response.next();
    this.modalRef.hide();
  }

  onValidate() {
    this.submitted = true;
    // stop here if form is invalid
    return this.verifyOtpForm.status === "VALID";
  }

  async updateProfile() {
    if (this.onValidate()) {

      const obj = {
        otp: this.verifyOtpForm.value.otp,
        email: this.userData.email
      };

      const response: any = await this.httpReqService.post(
        "users/verifyChangeReqOtp",
        obj,
        true
      );
      console.log(response)
    }
  }


}