import { Component, OnInit } from '@angular/core';
import { HttpReqService } from '../../services/http-req.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFormsService } from '../../services/validation-forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOption } from '../../partial/model/gridOption';
import { GlobalService } from './../../services/global.service';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {
  submitted = false;
  formErrors: any;
  roleArr: any = ['Admin',
    'Super Admin',
    'Scanner',
    'Intaller',
    'ScannerAndInstaller',
    'Resellers',
    'Organization Manager'];
  permissionForm: FormGroup;
  permissionArr: any = [{
    name: 'Add Device',
    slug: 'addDevice',
    checked: false
  }, {
    name: 'Device Allocation',
    slug: 'deviceAllocation',
    checked: false
  }, {
    name: 'New Organization',
    slug: 'newOrganization',
    checked: false
  }, {
    name: 'Add Organization Price',
    slug: 'addOrganizationPrice',
    checked: false
  }, {
    name: 'View Unique Organization Code',
    slug: 'viewOrgCode',
    checked: false
  }, {
    name: 'Approve Request For Join Organization',
    slug: 'approveReqForJoinOrg',
    checked: false
  }, {
    name: 'View Organization Scan',
    slug: 'viewScanOrg',
    checked: false
  }, {
    name: 'View Scan History',
    slug: 'viewScanHistory',
    checked: false
  }];
  allPermissionArr = [];
  role: any;
  permissions: any = [];
  selectedTemplateIndex: any;
  gridOption: GridOption = {
    allrecords: true,
    sortField: 'role',
    sortOrder: 'asc',
  };
  permissionList: any;
  constructor(
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService
  ) {
    this.httpReqService.clearMassage();
  }

  ngOnInit(): void {
    this.createForm();
    this.formErrors = this.vf.errorMessages;
    this.allPermissionArr = this.permissionArr.map(a => ({ ...a }));
  }

  /**
   * Create profile form
   */
  createForm() {
    this.permissionForm = this.fb.group(
      {
        role: [
          '',
          [
            Validators.required,
          ],
        ],
        permissions: ['', [
          // Validators.required,
        ]],
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.permissionForm.controls;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.permissionForm.status === 'VALID';
  }

  async changeRole() {
    this.permissionArr = this.allPermissionArr.map(a => ({ ...a }));
    const response: any = await this.httpReqService.post('rolePermission/roleWiseGetPermission', this.permissionForm.value, false);
    if (response && response.items) {
      this.permissionList = response.items.permissions;
      if (this.permissionList.length) {
        this.permissionArr.forEach((permission, i) => {
          if (this.permissionList.includes(permission.slug)) {
            permission.checked = true;
          }
        });
      }
    }
  }


  changeCheckbox(permission) {
    this.permissionArr[permission].checked = !this.permissionArr[permission].checked;
  }

  async save() {
    if (this.onValidate()) {
      this.permissions = [];
      this.permissionArr.forEach((permission, i) => {
        if (permission.checked) {
          this.permissions.push(permission.slug);
        }
      });
      const obj = {
        permissions: this.permissions,
        role: this.permissionForm.value.role
      };
      const response: any = await this.httpReqService.post('rolePermission/create', obj, true);
      if (response) {
        this.submitted = false;
        this.permissionForm.reset();
        this.permissionArr = this.allPermissionArr.map(a => ({ ...a }));
      }
    }
  }

  filterData(event, type) {
    const val = event.target.value;
    if (event.target.value) {
      this.role = val;
    }
  }

}
