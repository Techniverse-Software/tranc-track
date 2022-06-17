import { DeleteModalComponent } from "../../../partial/modals/delete-modal/delete-modal.component";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  Renderer2,
} from "@angular/core";
import { Role } from "../../../services/role";
import { HttpReqService } from "../../../services/http-req.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { GoogleMapsLoaderService } from "../../../services/google-maps-loader.service";
import { DOCUMENT } from "@angular/common";
import { environment } from "../../../../environments/environment";
declare const google: any;
import { MatTableDataSource } from "@angular/material/table";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { GlobalService } from "../../../services/global.service";

@Component({
  selector: "app-permission-add-edit",
  templateUrl: "./permission-add-edit.component.html",
  styleUrls: ["./permission-add-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PermissionAddEditComponent implements OnInit {
  roles = Role;
  deviceForm: FormGroup;
  formErrors: any;
  submitted = false;
  tokenData: any;
  permissionId: any;
  data: any;
  oldOrganizationId: any;
  isUpdate: Boolean = false;
  isChange: Boolean = false;
  modalRef: BsModalRef;
  permission_error: boolean = false;
  show_mobile_permission: boolean = false;
  show_menu_permission: boolean = false;
  status: any;
  loading: boolean = false;
  public idMask = [/\w/, /\w/, "-", /\w/, /\w/, /\w/, /\w/];

  permission_list: any[] = [
    { title: "Use of Tracdisc app", for_use_tracdisc_app: true, is_can: false },
    { title: "Can Scan", for_scan: true, is_can: false },
    { title: "Can Install", for_install: true, is_can: false },
    {
      title: "Dashboard",
      url: "/dashboard",
      is_switch: true,
      is_view: true,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Users",
      url: "/user",
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Locations",
      url: "/locations",
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Devices",
      url: "/device",
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Organizations",
      url: "/organization",
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Approval Requests",
      url: "/approval-request",
      is_switch: true,
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Reports",
      url: "/report",
      is_switch: true,
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Settings",
      url: "/setting",
      is_switch: true,
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Permissions",
      url: "/permission",
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "Logs",
      url: "/logs",
      is_switch: true,
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
    {
      title: "App info",
      url: "/info",
      is_switch: true,
      is_view: false,
      is_add: false,
      is_edit: false,
      is_delete: false,
    },
  ];

  displayedColumns: string[] = [
    "title",
    "is_view",
    "is_add",
    "is_edit",
    "is_delete",
  ];
  displayedColumns1: string[] = ["title", "is_view"];
  field = ["title", "is_view", "is_add", "is_edit", "is_delete"];
  dataSource = new MatTableDataSource();

  constructor(
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private authService: AuthService,
    public gs: GlobalService
  ) {
    this.httpReqService.clearMassage();
  }

  ngOnInit(): void {
    this.loading = true;
    this.formErrors = this.vf.errorMessages;
    this.createForm();
    this.tokenData = this.authService.decodeToken();
    this.permissionId = this.route.snapshot.params.id;
    if (this.permissionId) {
      this.getDeviceDetail();
      this.authService.check_edit_url();
    } else {
      this.data = this.permission_list;
      this.dataSource = new MatTableDataSource(this.data);
      this.authService.check_add_url();
    }
    this.loading = false;
  }

  check_org_permission(title, type) {
    if (this.tokenData.user.organizationId) {
      var bool = this.authService.check_org_permission(title, type);
      return bool;
    } else {
      return false;
    }
  }

  /**
   * Create form
   */
  createForm() {
    this.deviceForm = this.fb.group({
      name: ["", [Validators.required]],
      type: [0, [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  change_permission(type, index) {
    this.permission_list[index][type] = !this.permission_list[index][type];

    if (type == "is_view" && !this.permission_list[index][type]) {
      this.permission_list[index].is_add = false;
      this.permission_list[index].is_edit = false;
      this.permission_list[index].is_delete = false;
    }

    if (type == "is_can" && index == 0 && !this.permission_list[index][type]) {
      this.permission_list[1].is_can = false;
      this.permission_list[2].is_can = false;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.deviceForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.deviceForm.reset();
    this.deviceForm.controls.registrationStatus.setValue(false);
    this.deviceForm.controls.organizationId.setValue(null);
    this.deviceForm.controls.status.setValue(0);
  }

  changeRegistrationtatus() {
    if (this.deviceForm.value.registrationStatus == "true") {
      this.deviceForm.controls.organizationId.setValidators([
        Validators.required,
      ]);
    } else {
      this.deviceForm.controls.organizationId.clearValidators();
      if (this.permissionId) {
        this.deviceForm.controls.organizationId.setValue(null);
      }
    }
    this.deviceForm.controls.organizationId.updateValueAndValidity();
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.deviceForm.status === "VALID";
  }

  async getDeviceDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get(
      "permission",
      this.permissionId
    );
    if (response && response.items.length) {
      this.data = response.items[0].permission_list;
      this.dataSource = new MatTableDataSource(this.data);
      this.permission_list = this.data;
      // this.permission_list.unshift({title: 'Use of Tracdisc app', for_use_tracdisc_app: true, is_can: false })
      // this.permission_list.unshift({title: 'Can Scan', for_scan: true, is_can: false})
      // this.permission_list.unshift({title: 'Can Install', for_install: true, is_can: false })
      this.status = this.data.status;
      this.deviceForm.patchValue(response.items[0]);
    }
    this.loading = false;
  }

  async save() {
    this.loading = true;
    const data = this.deviceForm.value;
    if (this.onValidate() && this.isPermissionSelected()) {
      if (this.tokenData.user.organizationId) {
        data["organizationId"] = this.tokenData.user.organizationId;
      } else {
        data["organizationId"] = "";
      }
      data.permission_list = this.permission_list;
      if(data.type==3){
        data.is_default = true;
      } else {
        data.is_default = false;
      }
      const response: any = await this.httpReqService.post(
        "permission/create",
        data,
        true
      );
      if (response && response.status == 1) {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "success";
        this.httpReqService.hideMassege();
        setTimeout(() => {
          window.location.href = "/#/permission";
        }, 1000);
      } else {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "error";
        window.scroll(0, 0);
      }
    }
    this.loading = false;
  }

  isPermissionSelected() {
    var index = this.permission_list.findIndex((x) => x.is_view == true);
    if (index == -1) {
      this.permission_error = true;
      return false;
    } else {
      this.permission_error = false;
      return true;
    }
  }

  async update() {
    this.loading = true;
    if (this.onValidate() && this.isPermissionSelected()) {
      const data = this.deviceForm.value;
      data.permission_list = this.permission_list;
      data["isUpdate"] = this.isUpdate;
      data["isChange"] = this.isChange;
      data._id = this.permissionId;
      if(data.type==3){
        data.is_default = true;
      } else {
        data.is_default = false;
      }
      const response: any = await this.httpReqService.put("permission", data);
      if (response && response.status == 1) {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "success";
        this.httpReqService.hideMassege();
        setTimeout(() => {
          window.location.href = "/#/permission";
        }, 1000);
      } else {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "error";
        window.scroll(0, 0);
      }
    }
    this.loading = false;
  }
}
