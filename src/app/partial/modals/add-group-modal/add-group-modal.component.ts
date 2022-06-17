import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { HttpReqService } from '../../../services/http-req.service';
import { ValidationFormsService } from '../../../services/validation-forms.service';
import { GridOption } from '../../model/gridOption';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddGroupModalComponent implements OnInit {

  groupList = [];
  cancleButtonText: string;
  groupData: any;
  isUpdate;
  submitButtonText: string;
  title: any;
  addGroupForm: FormGroup;
  public response: Subject<boolean>;
  groupType: string;
  formErrors: any;
  tokenData: any;
  organizationId: any;
  userList: any = [];
  deviceList: any = [];
  gridOption: GridOption = {
    allrecords: true,
    filter: {
    }
  };
  loading :boolean = false;
  gridOption1: GridOption = {
    allrecords: true,
    filter: {
      status: { $in: [1, 4] }
    }
  };
  submitted = false;
  selectedGroups = [];
  removedGroups = [];

  constructor(
    public modalRef: BsModalRef,
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private authService: AuthService,
    public gs: GlobalService
  ) {
    this.formErrors = this.vf.errorMessages;
    this.createForm();
    this.httpReqService.clearMassage();
  }

  ngOnInit(): void {
    this.loading = true;
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    this.response = new Subject();
    this.organizationId = this.tokenData.organizationId;
    this.addGroupForm.value.groupType = this.groupType;
    this.selectType()
    if (this.groupType === 'user') {
      this.getAllDeviceGroup();
    } else {
      this.getAllUserGroup();
    }
    if (this.groupData) {
      this.addGroupForm.patchValue({
        name: this.groupData.name
      });
    }
  }

  async getAllUserGroup() {
    this.loading = true;
    const obj = {
      groupType: 'user',
      user_id: this.tokenData._id
    };
    const response: any = await this.httpReqService.post('userDeviceGroup/list', obj, false);
    this.groupList = response.items;
    if (this.groupData) {
      this.addGroupForm.patchValue({
        groups: this.groupData.group_ids
      });
    }
    this.loading = false;
  }

  async getAllDeviceGroup() {
    this.loading = true;
    const obj = {
      groupType: 'device',
      user_id: this.tokenData._id
    };
    const response: any = await this.httpReqService.post('userDeviceGroup/list', obj, false);
    this.groupList = response.items;
    if (this.groupData) {
      this.addGroupForm.patchValue({
        groups: this.groupData.group_ids
      });
    }
    this.loading = false;
  }

  addGroup(event) {
    this.selectedGroups.push(event._id);
  }

  removeGroup(event) {
    this.removedGroups.push(event.value._id);
  }

  /**
   * Create form
   */
  createForm() {
    this.addGroupForm = this.fb.group(
      {
        name: ['', [
          Validators.required,
        ]],
        devices: ['', [Validators.required]],
        users: ['', [Validators.required]],
        groups: ['']
      }
    );
  }

  cancle(): void {
    this.response.next();
    this.modalRef.hide();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addGroupForm.controls;
  }

  async getOrganizationDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get('organizationByUniqueId', this.tokenData.organizationId);
    if (response.items.length) {
      this.organizationId = response.items[0]._id;
    }
    this.loading = false;
  }

  async getDevice() {
    this.gridOption.filter['user_id'] = this.tokenData._id;
    const response: any = await this.httpReqService.post('device/list', this.gridOption, false);
    this.deviceList = response.items;
    if (this.groupData) {
      this.addGroupForm.patchValue({
        devices: this.groupData.devices
      });
    }
  }

  async getUsers() {
    this.loading = true;
    this.gridOption1.filter['organizationUniqueId'] = this.tokenData.organizationId;
    this.gridOption1.filter['user_id'] = this.tokenData._id;
    const response: any = await this.httpReqService.post('users/list', this.gridOption1, false);
    this.userList = response.items;
    if (this.groupData) {
      this.addGroupForm.patchValue({
        users: this.groupData.users
      });
    }
    this.loading = false;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.addGroupForm.status === 'VALID';
  }

  async craeteGroup() {
    this.loading = true;
    if (this.onValidate()) {
      const data = this.addGroupForm.value;
      data.groupType = this.groupType;
      if (data.groupType === 'user') {
        delete data.devices;
      } else {
        delete data.users;
      }
      data.group_ids = data.groups;
      delete data.groups;
      if (this.tokenData.organizationId) {
        data.organizationId = this.tokenData.organizationId;
      }
      if (!data.group_ids) {
        delete data.group_ids;
      }
      const response: any = await this.httpReqService.post('userDeviceGroup/create', data, true);
      if (response && response.status === 1) {
        this.gs.resMassage.massage = response.message;
        this.gs.resMassage.status = 'success';
        this.httpReqService.hideMassege();  
        setTimeout(() => {
         this.response.next(true);
         this.modalRef.hide();
     } , 1000 );
      }
    }
    this.loading= false;
  }

  async updateGroup() {
    this.loading = true;
    if (this.onValidate()) {
      const data = this.addGroupForm.value;
      data.groupType = this.groupType;
      if (data.groupType === 'user') {
        delete data.devices;
      } else {
        delete data.users;
      }
      data.group_ids = data.groups;
      delete data.groups;
      data._id = this.groupData._id;
      const response: any = await this.httpReqService.put('userDeviceGroup', data);
      if (response && response.status === 1) {
        this.gs.resMassage.massage = response.message;
        this.gs.resMassage.status = 'success';
        this.httpReqService.hideMassege();  
        setTimeout(() => {
         this.response.next(true);
         this.modalRef.hide();
     } , 1000 );
      }
    }
    this.loading = false;
  }

  selectType() {
    this.loading = true;
    if (this.groupType && this.groupType === 'user') {
      if (!this.userList.length) {
        this.getUsers();
      }
      this.addGroupForm.controls.devices.setValue('');
      this.addGroupForm.controls.devices.setValidators(null);
      this.addGroupForm.controls.users.setValidators([Validators.required]);
      this.addGroupForm.controls.users.updateValueAndValidity();
      this.addGroupForm.controls.devices.updateValueAndValidity();
    } else if (this.groupType && this.groupType === 'device') {
      if (!this.deviceList.length) {
        this.getDevice();
      }
      this.addGroupForm.controls.users.setValue('');
      this.addGroupForm.controls.users.setValidators(null);
      this.addGroupForm.controls.devices.setValidators([Validators.required]);
      this.addGroupForm.controls.users.updateValueAndValidity();
      this.addGroupForm.controls.devices.updateValueAndValidity();
    }
    this.loading = false;
  }
  
}
