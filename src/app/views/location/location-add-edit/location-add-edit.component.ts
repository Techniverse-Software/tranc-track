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
import { GlobalService } from "../../../services/global.service";
declare const google: any;
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import * as city_state_list from "../../../../assets/city_state.json";
@Component({
  selector: "app-location-add-edit",
  templateUrl: "./location-add-edit.component.html",
  styleUrls: ["./location-add-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LocationAddEditComponent implements OnInit {
  roles = Role;
  deviceForm: FormGroup;
  formErrors: any;
  submitted = false;
  tokenData: any;
  deviceId: any;
  organizationArr: any = [];
  registrationStatusArr = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  isNFCEnabled;
  data: any;
  oldOrganizationId: any;
  isUpdate: Boolean = false;
  isChange: Boolean = false;
  modalRef: BsModalRef;
  status: any;
  loading: boolean = false;
  country_list: any[] = [];
  city_list: any[] = [];
  state_list: any[] = [];
  public idMask = [/\w/, /\w/, "-", /\w/, /\w/, /\w/, /\w/];
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
    for (var key in (city_state_list as any).default) {
      if ((city_state_list as any).default.hasOwnProperty(key)) {
        this.city_list.push(key);
        this.state_list.push((city_state_list as any).default[key]);
      }
    }
    this.formErrors = this.vf.errorMessages;
    this.createForm();
    this.deviceForm["controls"].country.setValue("India");
    this.tokenData = this.authService.decodeToken();
    this.deviceId = this.route.snapshot.params.id;
    if (this.deviceId) {
      this.getDeviceDetail();
      this.authService.check_edit_url();
    } else {
      this.authService.check_add_url();
    }
    this.loading = false;
    // this.getOrganizationList();
  }

  /**
   * Create form
   */
  createForm() {
    this.deviceForm = this.fb.group({
      name: ["", [Validators.required]],
      addressLineOne: ["", [Validators.required]],
      addressLineTwo: [""],
      country: ["", Validators.required],
      state: [null],
      town: [null, [Validators.required]],
      postCode: ["", [Validators.required]],
      status: [1],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.deviceForm ? this.deviceForm.controls : null;
  }

  onReset() {
    this.submitted = false;
    this.deviceForm.reset();
    // this.deviceForm.controls.registrationStatus.setValue(false);
    // this.deviceForm.controls.organizationId.setValue(null);
    this.deviceForm.controls.status.setValue(0);
  }

  changeRegistrationtatus() {
    if (this.deviceForm.value.registrationStatus == "true") {
      this.deviceForm.controls.organizationId.setValidators([
        Validators.required,
      ]);
    } else {
      this.deviceForm.controls.organizationId.clearValidators();
      if (this.deviceId) {
        this.deviceForm.controls.organizationId.setValue(null);
      }
    }
    this.deviceForm.controls.organizationId.updateValueAndValidity();
  }

  changeStatus() {
    // if (this.deviceForm.value.status === 1) {
    //   // this.deviceForm.controls.location.setValidators([Validators.required]);
    // } else {
    //   this.deviceForm.controls.location.clearValidators();
    //   if (this.deviceId) {
    //     this.deviceForm.controls.location.setValue('');
    //   }
    // }
    // this.deviceForm.controls.location.updateValueAndValidity();
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.deviceForm.status === "VALID";
  }

  state_chnage(event) {}

  async getDeviceDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get(
      "location",
      this.deviceId
    );
    if (response && response.items.length) {
      this.data = response.items[0];
      this.status = this.data.status;
      this.deviceForm.patchValue(response.items[0]);
      // const ids = this.data.id1.split('-');
      // this.deviceForm.controls.id1.setValue(ids[1] + '-' + ids[2]);
      // this.deviceForm.controls.registrationStatus.setValue(JSON.stringify(this.data.registrationStatus));
      // if (this.data.organizationDetail && Object.keys(this.data.organizationDetail).length) {
      //   this.isNFCEnabled = this.data.organizationDetail.nfcEnabled;
      //   this.oldOrganizationId = this.data.organizationId;
      // }
    }
    this.loading = false;
  }

  async save() {
    this.loading = true;
    const data = this.deviceForm.value;

    if (this.onValidate()) {
      data.id1 = "tracdisc" + "-" + data.id1;

      if (!data.location) {
        delete data.location;
      }
      // if (!this.isNFCEnabled) {
      //   data['disabledBySuperAdmin'] = true;
      //   data.status = 0;
      // }
      if (this.tokenData.user.organizationId) {
        data.organizationId = this.tokenData.user.organizationId;
      }
      const response: any = await this.httpReqService.post(
        "location/create",
        data,
        true
      );
      if (response && response.status == 1) {
        this.gs.resMassage.massage = "Location added successfully";
        this.gs.resMassage.status = "success";
        this.httpReqService.hideMassege();
        setTimeout(() => {
          this.router.navigate(["locations"]);
        }, 1000);
      } else {
        this.gs.resMassage.massage = response.message;
        this.gs.resMassage.stauts = "error";
        window.scroll(0, 0);
      }
    }
    this.loading = false;
  }

  async update() {
    this.loading = true;
    if (this.onValidate()) {
      const data = this.deviceForm.value;
      if (this.status == data.status) {
        data["oldOrganizationId"] = this.oldOrganizationId;
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
            data["disabledBySuperAdmin"] = false;
            data.status = data.status;
          }
        }
        data["isUpdate"] = this.isUpdate;
        data["isChange"] = this.isChange;
        data.id1 = data.id1 + "-" + data.id2;
        delete data.id2;
        data.id1 = "tracdisc" + "-" + data.id1;
        data._id = this.deviceId;
        if (data.organizationId && !this.isNFCEnabled) {
          data["disabledBySuperAdmin"] = true;
          data.status = 0;
        } else {
          data["disabledBySuperAdmin"] = false;
          data.status = data.status;
        }

        const response: any = await this.httpReqService.put("location", data);
        if (response && response.status == 1) {
          this.gs.resMassage.massage = "Location updated successfully";
          this.gs.resMassage.stauts = "success";
          this.httpReqService.hideMassege();
          setTimeout(() => {
            this.router.navigate(["locations"]);
          }, 1000);
        } else {
          this.gs.resMassage.massage = response.message;
          this.gs.resMassage.status = "error";
          window.scroll(0, 0);
        }
      } else {
        var title = data.status ? "enabled" : "disabled";
        const initialState = {
          title: "Do you want to " + title + " Device status?",
          message: "Are you sure you want to delete this user?",
          list: data,
        };
        this.modalRef = this.modalService.show(DeleteModalComponent, {
          class: "modal-xl modal-dialog-centered",
          initialState,
          backdrop: "static",
          keyboard: false,
        });
        this.modalRef.content.cancleButtonText = "Cancel";
        this.modalRef.content.deleteButtonText = "Continue";
        this.modalRef.content.is_status_change = true;

        this.modalRef.content.response.subscribe((result) => {
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
      sortField: "organizationName",
      sortOrder: "asc",
      filter: { status: 1, user_id: this.tokenData.user._id },
    };
    const response: any = await this.httpReqService.post(
      "organization/list",
      obj,
      false
    );
    if (response && response.items.length) {
      this.organizationArr = response.items;
    }
    this.loading = false;
  }

  selectOrganization(e) {
    this.isNFCEnabled = e.nfcEnabled;
  }
}
