import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { timeZone } from "../../../../assets/timezone";
import { AuthService } from "../../../services/auth.service";
import { HttpReqService } from "../../../services/http-req.service";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { environment } from "../../../../environments/environment";
import { GlobalService } from "../../../services/global.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-custom-parameter",
  templateUrl: "./custom-parameter.component.html",
  styleUrls: ["./custom-parameter.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomParameterComponent implements OnInit {
  loading: boolean = false;
  file: any;
  imgUrl: any;
  organizationForm: FormGroup;
  organiZationData: any;
  tokenData: any;
  submitted = false;
  formErrors: any;
  mytime: Date = new Date();
  valid = true;
  timeZones: any = timeZone;
  organizationArr: any[] = [];
  organizationId: string = "";
  mediaUrl = environment.mediaUrl;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private httpReqService: HttpReqService,
    public vf: ValidationFormsService,
    public gs: GlobalService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loading = true;
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    // this.getOrganizationDetail();
    this.formErrors = this.vf.errorMessages;
    this.getOrganizationList();
  }

  async getOrganizationList() {
    this.loading = true;
    const obj = {
      allrecords: true,
      sortField: "organizationName",
      sortOrder: "asc",
      filter: { status: 1 },
    };
    if (this.tokenData.organizationId) {
      obj["orgasnizationUniqueId"] = this.tokenData.organizationId;
    }
    obj.filter["user_id"] = this.tokenData._id;
    const response: any = await this.httpReqService.post(
      "organization/list",
      obj,
      false
    );
    if (response && response.items.length) {
      this.organizationArr = response.items;
      if (this.tokenData.organizationId) {
        this.organizationId = this.organizationArr[0]._id;
        this.getData(this.organizationArr[0]._id);
      }
    }
    this.loading = false;
  }

  filterData(event, type) {
    this.organizationId = event.target.value;
    this.getData(event.target.value);
  }

  selectProfile(e) {
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    };
  }

  async getData(organizationId) {
    this.loading = true;
    const response: any = await this.httpReqService.get(
      "organization/custom_parameter",
      organizationId
    );

    this.organizationForm.get("customParameters").patchValue(response.items);
    const time = new Date();
    const mapTime = response.items.map_flush_time.split(":");
    time.setHours(mapTime[0]);
    time.setMinutes(mapTime[1]);

    this.mytime = time;
    this.loading = false;
  }

  /**
   * Create profile form
   */
  createForm() {
    this.organizationForm = this.fb.group({
      customParameters: this.fb.group({
        time_delay: ["", [Validators.pattern(this.vf.formRules.phone)]],
        map_flush_time: [""],
        nfc_button_text: [""],
        update_device_cordnate_text: [""],
        map_flush_timezone: [null],
      }),
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.organizationForm.controls;
  }

  async getOrganizationDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get(
      "organizationByUniqueId",
      this.tokenData.organizationId
    );
    if (response.items.length) {
      this.organiZationData = response.items[0];
      this.organizationForm.patchValue(this.organiZationData);
      // this.organizationForm.controls.timezone.setValue(8);
      this.organizationForm
        .get("customParameters")
        ["controls"].map_flush_timezone.setValue(
          Number(this.organiZationData.customParameters.map_flush_timezone)
        );
      const time = new Date();
      const mapTime =
        this.organiZationData.customParameters.map_flush_time.split(":");
      time.setHours(mapTime[0]);
      time.setMinutes(mapTime[1]);

      this.mytime = time;
    }
    this.loading = false;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.organizationForm.status === "VALID";
  }

  async update() {
    this.loading = true;
    if (this.onValidate()) {
      if (!this.valid) {
        return;
      }
      this.organizationForm.value.customParameters.map_flush_time =
        this.mytime.getHours() + ":" + this.mytime.getMinutes();
      this.organizationForm.value.customParameters._id = this.organizationId;
      const response: any = await this.httpReqService.put(
        "organization/custom_parameter",
        this.organizationForm.value.customParameters
      );
      if (response && response.status == 1) {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "success";
        this.httpReqService.hideMassege();
        //   setTimeout(() => {
        //     this.router.navigate(['user']);
        // } , 1000 );
      } else {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.message = "error";
        window.scroll(0, 0);
      }
    }
    this.loading = false;
  }

  isValid(event: boolean): void {
    this.valid = event;
  }
}
