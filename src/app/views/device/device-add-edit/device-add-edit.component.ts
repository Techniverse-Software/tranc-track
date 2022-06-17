import { DeleteModalComponent } from '../../../partial/modals/delete-modal/delete-modal.component';
import { Component, OnInit, ViewEncapsulation, Inject, Renderer2 } from '@angular/core';
import { Role } from '../../../services/role';
import { HttpReqService } from '../../../services/http-req.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidationFormsService } from '../../../services/validation-forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { GoogleMapsLoaderService } from '../../../services/google-maps-loader.service';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../../environments/environment';
declare const google: any;
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddGroupModalComponent } from '../../../partial/modals/add-group-modal/add-group-modal.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-device-add-edit',
  templateUrl: './device-add-edit.component.html',
  styleUrls: ['./device-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeviceAddEditComponent implements OnInit {

  roles = Role;
  deviceForm: FormGroup;
  formErrors: any;
  submitted = false;
  tokenData: any;
  deviceId: any;
  organizationArr: any = [];
  registrationStatusArr = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ];
  isNFCEnabled:boolean=true;
  data: any;
  oldOrganizationId: any;
  isUpdate: Boolean = false;
  isChange: Boolean = false;
  modalRef: BsModalRef;
  status: any;
  public idMask = [/\w/, /\w/, '-', /\w/, /\w/, /\w/, /\w/];
  groupList;
  locationList;
  selectedGroups = [];
  removedGroups = [];
  public API_URL = environment.apiUrl;
  organizationData: any;
  loading : boolean = false;

  constructor(
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private router: Router,
    private route: ActivatedRoute, private modalService: BsModalService,
    public authService: AuthService,
    public http: HttpClient,
    public toastr: ToastrService,
    public gs: GlobalService,
    public toaster : ToastrService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.formErrors = this.vf.errorMessages;

    this.tokenData = this.authService.decodeToken();
    
    this.deviceId = this.route.snapshot.params.id;
    this.createForm();
    this.getAllGroups();
    this.getAllLocation();
    this.getOrganizationList();
    if (this.deviceId) {
      this.getDeviceDetail();
      this.authService.check_edit_url();
    } else {
      this.authService.check_add_url()
    }
   // this.loading = false;
  }

  async getAllLocation() {
    this.loading = true;
    const response: any = await this.httpReqService.post('location/list', { user_id: this.tokenData.user._id }, false);
    this.locationList = response.items;
    this.loading = false;
  }

  async getAllGroups() {
    this.loading = true;
    const obj = {
      groupType: 'device',
      user_id: this.tokenData.user._id
    };
    const response: any = await this.httpReqService.post('userDeviceGroup/list', obj, false);
    this.groupList = response.items;
    this.loading = false;
  }

  /**
   * Create form
   */
  createForm() {
    this.deviceForm = this.fb.group(
      {
        prefixName: ['tracdisc'],
        uid: ['',
          [
            Validators.required,
          ],
        ],
        id1: ['', [
          Validators.required,Validators.minLength(7) ,
          this.checkIdCustomValidators(),
        ]],
        organizationId: [''],
        description: [''],
        groups: [''],
        status: [4],
        registrationStatus: [false],
        location: [],
        locationId: [null, this.tokenData.user.is_org ? [Validators.required] : [] ],
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.deviceForm ? this.deviceForm.controls : null;
  }

  addGroupList() {
    const initialState = {
      title: 'Create Device Group',
      groupType: 'device',
    };
    this.modalRef = this.modalService.show(AddGroupModalComponent, { class: 'modal-xl modal-dialog-centered ', initialState, backdrop: 'static', keyboard: false });
    this.modalRef.content.cancleButtonText = 'Cancel';
    this.modalRef.content.submitButtonText = 'Submit';
    this.modalRef.content.response.subscribe(result => {
      this.getAllGroups();
      if (result) {
      }
    });
  }
  get _deviceForm() {
    return this.deviceForm ? this.deviceForm.controls : null;
  }
  checkIdCustomValidators(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      this.checkIdIsValid() ? null : { isInValidId: true };
  }

  checkIdIsValid() {
    if (
      this._deviceForm &&
      this._deviceForm.id1.value != null &&
      this._deviceForm.id1.value != ""
    ){
      var str =  this._deviceForm.id1.value;
      let checkVlaue = str.split("");
      if (checkVlaue && checkVlaue.includes("_")) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  onReset() {
    this.submitted = false;
    this.deviceForm.reset();
    this.deviceForm.controls.registrationStatus.setValue(false);
    this.deviceForm.controls.organizationId.setValue(null);
    this.deviceForm.controls.status.setValue(0);
  }

  changeRegistrationtatus() {
    if (this.deviceForm.value.registrationStatus == 'true') {
      this.deviceForm.controls.organizationId.setValidators([Validators.required]);
      if (this.deviceForm.value.status == 4) {
        this.deviceForm.value.status = 3
        this.deviceForm.controls.status.setValue(3);
      }
    } else {
      this.deviceForm.controls.organizationId.clearValidators();
      if (this.deviceId) {
        this.deviceForm.controls.organizationId.setValue(null);
      }
      if (this.deviceForm.value.status == 3) {
        this.deviceForm.value.status = 4
        this.deviceForm.controls.status.setValue(4);
      }
    }
    this.deviceForm.controls.organizationId.updateValueAndValidity();
    this.deviceForm.controls.status.updateValueAndValidity();
  }

  changeStatus() {
    if (this.deviceForm.value.status === 1) {
       this.deviceForm.controls.location.setValidators([Validators.required]);
    } else {
      this.deviceForm.controls.location.setErrors(null);
      this.deviceForm.controls.location.clearValidators();
      if (this.deviceId) {
         this.deviceForm.controls.location.setValue('');
      }
    }
    this.deviceForm.controls.location.updateValueAndValidity();
  }

  addGroup(event) {
    this.selectedGroups.push(event._id);
  }

  removeGroup(event) {
    this.removedGroups.push(event.value._id);
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.deviceForm.status === 'VALID';
  }

  async getDeviceDetail() {
    const response: any = await this.httpReqService.get('device', this.deviceId);
    if (response && response.items.length) {
      this.data = response.items[0];
      this.status = this.data.status;
      this.deviceForm.patchValue({
        groups: response.items[0]['group_ids']
      });
      this.deviceForm.patchValue(response.items[0]);
      const ids = this.data.id1.split('-');
      this.deviceForm.controls.prefixName.setValue(ids[0]);
      this.deviceForm.controls.id1.setValue(ids[1] + '-' + ids[2]);
      this.deviceForm.controls.registrationStatus.setValue(JSON.stringify(this.data.registrationStatus));
      if (this.data.organizationDetail && Object.keys(this.data.organizationDetail).length) {
        this.isNFCEnabled = this.data.organizationDetail.nfcEnabled;
        this.oldOrganizationId = this.data.organizationId;
      }
    }
  }

  async save() {
    this.loading = true;
    const data = this.deviceForm.value;
    if (this.onValidate()) {
      data.id1 = data.prefixName + '-' + data.id1;
      if (!data.organizationId) {
        delete data.organizationId;
      }
      if (!data.location) {
        delete data.location;
      }
      data['added_group_id'] = this.selectedGroups;
      delete data.groups;
      if (!this.isNFCEnabled) {
        data['disabledBySuperAdmin'] = true;
        data.status = 0;
      }
      if ((data.registrationStatus == false || data.registrationStatus == 'false') && this.authService.check_super_admin()) {
        data.status = 4;
      } else if (!data.location) {
        data.status = 3;
      }
      data.user_id = this.tokenData.user._id;
      this.http
        .post<any>(`${this.API_URL}device/create`, data)
        .subscribe((response) => {
          if (response && response.status === 1) {
            this.gs.resMassage.massage = response.message;
            this.gs.resMassage.status = "success";
            this.httpReqService.hideMassege();
            setTimeout(() => {
              this.router.navigate(['device']);
          } , 1000 );
          } else {
            if (response.message === 'Device ID already exists') {
              this.deviceForm.controls['id1'].setErrors({ 'incorrect': true });
            }
            if (response.message === 'Device UID already exists') {
              this.deviceForm.controls['uid'].setErrors({ 'incorrect': true });
            }
            this.gs.resMassage.massage = response.message;
            this.gs.resMassage.status = 'error';
            // this.toastr.error(response.message);
             window.scroll(0, 0);
          }
        }, (error) => {
          console.log(error)
        });

    }
    this.loading = false;
  }

  async update() {
    this.loading = true;
    if (this.onValidate()) {
      const data = this.deviceForm.value;
      if (this.status == data.status) {
        data['oldOrganizationId'] = this.oldOrganizationId;
        data['added_group_id'] = this.selectedGroups;
        delete data.groups;
        data['removed_group_id'] = this.removedGroups;
        data['locationId'] = data.locationId;

        if (this.deviceForm.value.organizationId) {
          if (this.oldOrganizationId !== this.deviceForm.value.organizationId) {
            this.isChange = true;
            this.isUpdate = true;
          }
          if (!this.oldOrganizationId) {
            this.isUpdate = true;
          }
        } else {
          if (this.oldOrganizationId) {
            this.isUpdate = true;
            data['disabledBySuperAdmin'] = false;
            data.status = data.status;
          }
        }
        data['isUpdate'] = this.isUpdate;
        data['isChange'] = this.isChange;
        // data.id1 = data.id1 + '-' + data.id2;
        // delete data.id2;
        data.id1 = data.prefixName + '-' + data.id1;
        data._id = this.deviceId;
        if (data.organizationId && !this.isNFCEnabled) {
          data['disabledBySuperAdmin'] = true;
          data.status = 0;
        } else {
          data['disabledBySuperAdmin'] = false;
          data.status = data.status;
        }
        if (data.registrationStatus == false || data.registrationStatus == 'false') {
          data.status = 4;
        } else if (!data.location) {
          data.status = 3;
        }
        const response: any = await this.httpReqService.put('device', data);
        if (response && response.status === 1) {
          this.gs.resMassage.massage = response.message;
          this.gs.resMassage.status = "success";
          this.httpReqService.hideMassege();
          setTimeout(() => {
            this.router.navigate(['device']);
        } , 1000 );
        } else {
          this.gs.resMassage.massage = response.message;
          this.gs.resMassage.status = "error";
        }
      } else {
        var title = data.status ? 'enabled' : 'disabled';
        const initialState = {
          title: 'Do you want to ' + title + ' Device status?',
          message: 'Are you sure you want to delete this user?',
          list: data
        };
        this.modalRef = this.modalService.show(DeleteModalComponent, { class: 'modal-xl modal-dialog-centered', initialState, backdrop: 'static', keyboard: false });
        this.modalRef.content.cancleButtonText = 'Cancel';
        this.modalRef.content.deleteButtonText = 'Continue';
        this.modalRef.content.is_status_change = true;

        this.modalRef.content.response.subscribe(result => {
          if (result) {
            this.status = data.status;
            this.update();
          } else {
          }
        });

      }
    }
    this.loading = false;
  }

  async getOrganizationList() {
    this.loading = true;
    const obj = {
      allrecords: true,
      sortField: 'organizationName',
      sortOrder: 'asc',
      filter: { status: 1, user_id: this.tokenData.user._id },
    };
    if (this.tokenData.user.organizationId) {
      obj['orgasnizationUniqueId'] = this.tokenData.user.organizationId;
    }
    const response: any = await this.httpReqService.post('organization/list', obj, false);
    if (response && response.items.length) {
      this.organizationArr = response.items;
    }
    this.loading = false;
  }

  async getOrganizationDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get('organizationByUniqueId', this.tokenData.user.organizationId);
    if (response && response.items.length) {
      this.organizationData = response.items[0];

    }
    this.loading = false;
  }

  selectOrganization(e) {
    this.isNFCEnabled = e.nfcEnabled;
  }

  successMsg(message , status){
    this.gs.resMassage.massage = message;
    this.gs.resMassage.status = status;
  }
}
