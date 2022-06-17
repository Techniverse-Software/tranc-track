import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { HttpReqService } from '../../../services/http-req.service';
import { ValidationFormsService } from '../../../services/validation-forms.service';
import { GlobalService } from '../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  cancleButtonText: string;
  deleteButtonText: string;
  url: string;
  title: any;
  positionForm: FormGroup;
  message: any;
  list: any;
  isRejectReq: any;
  is_device: boolean = false;
  public loading: boolean = false;
  is_status_change: boolean = false;
  passwordForm: FormGroup;
  isUser: boolean;
  isOrgAdminEmail: boolean;
  public response: Subject<boolean>;
  passwordIcon = 'fa fa-eye-slash';
  passwordType = 'password';
  formErrors: any;
  submitted = false;
  tokenData: any;
  color: string = 'danger';
  constructor(
    public modalRef: BsModalRef,
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private authService: AuthService,
    public gs: GlobalService,
    private router: Router,
  ) {
    this.httpReqService.clearMassage();
  }

  ngOnInit(): void {
    console.log(this.modalRef);

    this.response = new Subject();
    this.formErrors = this.vf.errorMessages;
    this.createForm();
    this.tokenData = this.authService.decodeToken();
  }

  cancle(): void {
    this.loading = true;
    this.response.next();
    this.modalRef.hide();
  }

  /**
 * Create profile form
 */
  createForm() {
    this.passwordForm = this.fb.group(
      {

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(this.vf.formRules.passwordMin),
            Validators.pattern(this.vf.formRules.passwordPattern),
          ],
        ],
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.passwordForm.controls;
  }
  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
  }

  async delete(isOrgAdminEmail?) {
    this.loading = true;
    let response: any;

    if (!this.is_status_change) {
      if (this.isRejectReq) {
        response = await this.httpReqService.put(this.url, this.list);
      } else if (this.is_device) {
        response = await this.httpReqService.post(this.url, { _id: this.list._id, user_id: this.tokenData.user._id }, false);
      } else {
        //   console.log(this.loading);
        if (isOrgAdminEmail) {
          let obj = {};
          obj["message"] =
            "You can not delete this user as it is main organization admin";
          obj["status"] = 0;
          response = obj;
        } else {
          response = await this.httpReqService.delete(this.url, this.list._id);
        }
        this.loading = true;
        // console.log(this.loading);
      }
      if (response && response.status == 1) {
        // console.log(this.loading)
        this.gs.resMassage.massage = response.message;
        this.gs.resMassage.status = "success";
        this.httpReqService.hideMassege();
        if (response.items && response.items.organizationId) {
          await this.updateSubscriptionCount(response.items.organizationId)
        }
        //await this.updateSubscriptionCount(response.)
        setTimeout(() => {
          this.response.next(true);
          this.modalRef.hide();
        }, 1000);
      } else {
        this.gs.resMassage.massage = response.message;
        this.gs.resMassage.status = "error";
        this.httpReqService.hideMassege();
        setTimeout(() => {
          this.response.next(true);
          this.modalRef.hide();
        }, 1000);
      }
    } else {
      // console.log(this.loading);
      this.response.next(true);
      this.modalRef.hide();
      // if(this.isUser){
      //   this.logOut();
      // }
    }
    this.loading = false;
  }

  onValidate() {
    this.submitted = true;
    // stop here if form is invalid
    return this.passwordForm.status === 'VALID';
  }

  async verifyPassword(isOrgAdminEmail) {
    this.loading = true;
    if (this.onValidate()) {
      this.passwordForm.value['_id'] = this.tokenData.user._id;
      const response: any = await this.httpReqService.post('users/verifyPassword', this.passwordForm.value, false);
      console.log(response)
      if (response && response.status) {
        this.delete(isOrgAdminEmail);
        // this.router.navigate(['user']);
      }
    }
    this.loading = false;
  }

  async logOut() {
    const response = await this.httpReqService.post('users/logOut', {}, false);
    if (response) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      this.authService.currentUserSubjet(null);
      this.router.navigate(['auth/login']);
    }
  }

  async updateSubscriptionCount(organizationId) {
    const response: any = await this.httpReqService.post('update/subscription/count', { organizationId: organizationId }, false);
    if (response && response.error) {
    }
    console.log("ressssssssss", response);
  }
}
