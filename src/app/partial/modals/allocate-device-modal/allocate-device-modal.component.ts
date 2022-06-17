import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ValidationFormsService } from '../../../services/validation-forms.service';
import { HttpReqService } from '../../../services/http-req.service';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-allocate-device-modal',
  templateUrl: './allocate-device-modal.component.html',
  styleUrls: ['./allocate-device-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AllocateDeviceModalComponent implements OnInit {
  cancleButtonText: string;
  submitButtonText: string;
  title: any;
  public response: Subject<boolean>;
  deviceGroupList: any = [];
  userGroupList: any = [];
  allocateForm: FormGroup;
  submitted = false;
  formErrors: any;
  selectedDeviceData: any = [];
  tokenData: any;
  selectedUserData: any = [];
  constructor(
    public modalRef: BsModalRef,
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    private authService: AuthService,
    private vf: ValidationFormsService,
    public gs: GlobalService
  ) {
    this.httpReqService.clearMassage();
  }

  ngOnInit(): void {
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    this.response = new Subject();
    this.formErrors = this.vf.errorMessages;
    this.getDeviceGroup();
    this.createForm();
  }

  cancle(): void {
    this.response.next();
    this.modalRef.hide();
  }

  /**
 * Create form
 */
  createForm() {
    this.allocateForm = this.fb.group(
      {
        devices: [, [Validators.required]],
        users: [, [Validators.required]]
      }
    );
  }

  async getDeviceGroup() {
    const result: any = await this.httpReqService.post('userDeviceGroup/list', {
      groupType: 'device',
      user_id: this.tokenData._id
    }, true)
    this.deviceGroupList = result.items;
    this.getUserGroup();
  }

  async getUserGroup() {
    const result: any = await this.httpReqService.post('userDeviceGroup/list', {
      groupType: 'user',
      user_id: this.tokenData._id
    }, true)

    this.userGroupList = result.items;
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.allocateForm.controls;
  }
  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.allocateForm.status === 'VALID';
  }

  async allocate() {
    if (this.onValidate()) {
      const data = this.allocateForm.value;
      const response: any = await this.httpReqService.put('userDeviceGroup/allocate', data);
      if (response) {
        this.response.next();
        this.modalRef.hide();
      }
    }
  }

  changeEvent(event, type) {
    if (type) {
      this.selectedDeviceData = event.deviceDetails;
    } else {
      this.selectedUserData = event.usrDetails;
    }
  }
}
