import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Role } from "../../../services/role";
import { HttpReqService } from "../../../services/http-req.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import * as city_state_list from "./city_state.json";
import { GlobalService } from "../../../services/global.service";
// import * as city_list from './cities.json';
import * as state_list from './states.json';
import { HttpClient } from "@angular/common/http";
// import { Constant } from "src/app/services/constant";
@Component({
  selector: "app-organization-add-edit",
  templateUrl: "./organization-add-edit.component.html",
  styleUrls: ["./organization-add-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OrganizationAddEditComponent implements OnInit {
  loading: boolean = false;
  roles = Role;
  organizationForm: FormGroup;
  formErrors: any;
  submitted = false;
  tokenData: any;
  organizationId: any;
  resellerArr: any = [];
  registrationStatusArr = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  countryCode: any = 1;
  countryInitial: any = "in";
  countryCode1: any = 1;
  countryInitial1: any = "in";
  countryObj: any;
  countryObj1: any;
  data: any;
  country_list: any[] = [];
  city_list: any[] = [];
  state_list: any[] = [];
  permissionrArr: any = [];
  planArr: any = [];

  constructor(
    private httpClient: HttpClient,
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public gs: GlobalService,
    // public Constant: Constant
  ) {
    this.httpReqService.clearMassage();
  }

  ngOnInit(): void {
    this.loading = true;
    console.log("state_list")
    console.log(state_list)
    // var city_state_list = (city_state_list as any).default;
    
    for (var states of (state_list as any).default) {
      if ((states as any).country_code == "IN") {
        console.log((states as any).name);
        this.city_list.push(states);
        this.state_list.push((states as any).name);
      }
    }

    // for (var key in (city_state_list as any).default) {
    //   if ((city_state_list as any).default.hasOwnProperty(key)) {
    //     console.log(key + " -> " + key);
    //     this.city_list.push(key);
    //     this.state_list.push((city_state_list as any).default[key]);
    //   }
    // }
    // console.log(this.state_list)
    // this.country_list = (country_list as any).default
    this.formErrors = this.vf.errorMessages;
    this.tokenData = this.authService.decodeToken();
    this.createForm();
    console.log("tokenData:::", this.tokenData)
    this.organizationId = this.route.snapshot.params.id;
    this.organizationForm["controls"].billingAddress[
      "controls"
    ].country.setValue("India");
    this.country_chnage("India");
    // var index = this.country_list.findIndex((x) => x.name == 'United Kingdom');
    // if (index !== -1) {
    // }
    this.getPermissionList();
    if (this.organizationId) {
      this.getOrganizationDetail();
      this.authService.check_edit_url();
    } else {
      this.authService.check_add_url();
      if (!this.tokenData.user.organizationId) {
        this.getResellerList();
      } else {
        this.organizationForm.value.resellerId =
          this.tokenData.user.organizationId;
        this.organizationForm.controls.orgType.setValue("general");
        this.organizationForm.controls.resellerId.setValue(
          this.tokenData.user.organizationId
        );
        this.organizationForm.controls.resellerType.setValidators(null);
        this.organizationForm.controls.resellerId.setValidators(null);
      }
    }
  }

  async getPlansList() {
    this.loading = true;
    let obj = this.permissionrArr;
    // .find(
    //   (data) => data.name == "Reseller Permission"
    // );
    let permissionType = this.permissionrArr.find(ele => ele._id == this.tokenData.user.permissionId)
    let productType = "";
    if (permissionType.name == "Reseller Permission") {
      productType = "Reseller"
    } else {
      productType = "SuperUser";
    }
    const response: any = await this.httpReqService.get(
      `prices`,
      productType
    );
    if (response && response.items.length) {
      this.planArr = response.items;
    }
    this.loading = false;
  }

  async getUserDetail() {
    const response: any = await this.httpReqService.get('users', this.tokenData._id);
    // this.userName = response && response.items.length > 0 ? response.items[0].name : "";
  }

  async getPermissionList() {
    this.loading = true;
    var gridOption = {
      search: "",
      filter: {},
      allrecords: true,
      sortField: "",
      sortOrder: "",
    };
    gridOption.filter["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "permission/list",
      gridOption,
      false
    );
    if (response && response.items.length) {
      this.permissionrArr = response.items;
      if (this.tokenData.user.organizationId) {
        let obj = this.permissionrArr.find(
          (data) => data.name == "Organization Admin"
        );
        obj != null && obj != undefined
          ? this._personalDetailForm.permissionId.setValue(obj._id)
          : "";
      }
    }
    this.loading = false;
    this.getPlansList();
  }

  country_chnage(event) {
    // var filtered_state_list = (state_list as any).default;
    // this.httpClient.get("assets/states.json").subscribe(data => {
    //   this.state_list = (data as any).filter((x) => {
    //     if (x.country_id == 232) {
    //       return true;
    //     }
    //   })
    // });
    // this.httpClient.get("assets/cities.json").subscribe(data => {
    //   this.city_list = (data as any).filter((x) => {
    //     if (x.country_id == 232) {
    //       return true;
    //     }
    //   })
    // });
  }

  state_chnage(event) { }

  get _personalDetailForm() {
    return this.organizationForm["controls"].personDetail["controls"];
  }

  get _billingDetailForm() {
    return this.organizationForm["controls"].billingAddress["controls"];
  }

  /**
   * Create profile form
   */
  createForm() {
    this.organizationForm = this.fb.group({
      organizationName: ["", [Validators.required]],
      registrationNumber: [""],
      nfcEnabled: [true],
      billingAddress: this.fb.group({
        addressLine1: ["", [Validators.required]],
        addressLine2: [""],
        landmark: [""],
        town: [
          null,
          [Validators.pattern(this.vf.formRules.name), Validators.required],
        ],
        state: [null],
        country: [
          null,
          [Validators.pattern(this.vf.formRules.name), Validators.required],
        ],
        postCode: [
          "",
          [Validators.pattern(this.vf.formRules.postCode), Validators.required],
        ],
      }),
      status: [1],
      personDetail: this.fb.group({
        name: [
          "",
          [Validators.pattern(this.vf.formRules.name), Validators.required],
        ],
        email: [
          "",
          [Validators.required, Validators.pattern(this.vf.formRules.email)],
        ],
        primaryPhoneNo: ["", [Validators.required]],
        secondaryPhoneNo: [""],
        permissionId: [null, [Validators.required]],
      }),
      resellerId: [null],
      billingDetail: this.fb.group({
        viaReseller: [""],
        quotedPrice: [""],
        tracDiscPrice: [""],
        billingPlan: [""],
        vatRate: [""],
      }),
      orgType: [null, [Validators.required]],
      resellerType: [null, [Validators.required]],
      priceId: [null, [Validators.required]]
    });
  }

  changeType(event) {
    if (this.organizationForm.value.orgType === "reseller") {
      let obj = this.permissionrArr.find(
        (data) => data.name == "Reseller Permission"
      );
      obj != null && obj != undefined
        ? this._personalDetailForm.permissionId.setValue(obj._id)
        : "";
      this.organizationForm.controls.resellerType.setValidators([
        Validators.required,
      ]);
    } else {
      let obj = this.permissionrArr.find(
        (data) => data.name == "Organization Admin"
      );
      obj != null && obj != undefined
        ? this._personalDetailForm.permissionId.setValue(obj._id)
        : "";
      this.organizationForm.controls.resellerType.setValidators(null);
    }
    this.organizationForm.controls.resellerType.updateValueAndValidity();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.organizationForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.organizationForm.reset();
    this.organizationForm.controls.status.setValue(1);
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.organizationForm.status === "VALID";
  }

  async getOrganizationDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get(
      "organization",
      this.organizationId
    );
    if (response && response.items.length) {
      this.organizationForm.patchValue(response.items[0]);
      this.data = response.items[0];
      if (this.data.orgType === "reseller") {
        this.organizationForm.controls.resellerType.setValidators([
          Validators.required,
        ]);
      } else {
        this.organizationForm.controls.resellerType.setValidators(null);
      }
      this.organizationForm.controls.resellerType.updateValueAndValidity();
      if (
        this.data.personDetail?.primaryPhoneCountryCode &&
        this.data.personDetail?.secondaryPhoneCountryCode
      ) {
        this.countryObj.setCountry(
          this.data.personDetail.primaryPhoneCountryCode
        );
        this.countryObj1.setCountry(
          this.data.personDetail.secondaryPhoneCountryCode
        );
      }

      var index = this.country_list.findIndex(
        (x) => x.name == this.data.billingAddress.country
      );
      if (index !== -1) {
        this.country_chnage(this.country_list[index]);
      }

      if (!this.tokenData.user.organizationId) {
        this.getResellerList();
      } else {
        this.organizationForm.controls.orgType.setValue("general");
        let obj = this.permissionrArr.find(
          (data) => data.name == "Organization Admin"
        );
        obj != null && obj != undefined
          ? this._personalDetailForm.permissionId.setValue(obj._id)
          : "";
        this.organizationForm.controls.resellerType.setValidators(null);
        this.organizationForm.controls.resellerId.setValidators(null);
      }

      setTimeout(() => {
        var index = this.state_list.findIndex(
          (x) => x.name == this.data.billingAddress.state
        );
        if (index !== -1) {
          this.state_chnage(this.state_list[index]);
        }
      }, 500);
    }
    this.loading = false;
  }

  async save() {
    this.loading = true;
    if (this.onValidate()) {
      this.organizationForm.value.personDetail.primaryPhoneCountryCode =
        this.countryInitial;
      this.organizationForm.value.personDetail.secondaryPhoneCountryCode =
        this.countryInitial1;
      this.organizationForm.value.personDetail.role = this.roles.admin;
      this.organizationForm.value.personDetail.password = "Test@123";
      if (this.tokenData.user.organizationId) {
        this.organizationForm.value.resellerId =
          this.tokenData.user.organizationId;
      }
      const response: any = await this.httpReqService.post(
        "organization/create",
        this.organizationForm.value,
        true
      );
      if (response && response.status == 1) {
        this.gs.resMassage.massage = "Organization Added Successfully";
        this.gs.resMassage.message = "Organization Added Successfully";
        this.gs.resMassage.status = "success";
        this.httpReqService.hideMassege();
        let data = {
          email: this.organizationForm.value.personDetail.email,
          // address: response['items']['contentAfterAction']['billingAddress'],

          name: this.organizationForm.value.organizationName,
          phoneNo: this.organizationForm.value.personDetail.primaryPhoneNo,
          orgId: response['items']['organizationId'],
          priceId: this.organizationForm.value.priceId,
        }
        console.log(data);
        // const customerCreate: any = await this.httpReqService.post("create/stripecustomer", data, true)
        // if (customerCreate) {
        //   console.log("customerCreate::", customerCreate)
        // }
        setTimeout(() => {
          this.router.navigate(["organization"]);
        }, 1000);
      } else {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.status = "error";
        window.scroll(0, 0);
      }
    }
    this.loading = false;
  }

  async update() {
    this.loading = true;
    if (this.onValidate()) {
      const formValue = this.organizationForm.value;
      this.organizationForm.value._id = this.organizationId;
      this.organizationForm.value.personId = this.data.personId;
      if (
        this.data.personDetail?.email != formValue.personDetail.email ||
        this.data.personDetail?.name != formValue.personDetail.name ||
        this.data.personDetail?.primaryPhoneNo !=
        formValue.personDetail.primaryPhoneNo ||
        this.data.personDetail?.secondaryPhoneNo !=
        formValue.personDetail.secondaryPhoneNo
      ) {
        formValue["isUserChange"] = true;
      }
      if (!this.data.personId) {
        formValue.personDetail.role = this.roles.admin;
        formValue.personDetail.password = "Test@123";
        formValue.organizationId = this.data.organizationId;
      }
      const response: any = await this.httpReqService.put(
        "organization",
        formValue
      );
      if (response && response.status == 1) {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.status = "success";
        this.httpReqService.hideMassege();
        setTimeout(() => {
          this.router.navigate(["organization"]);
        }, 1000);
      } else {
        this.gs.resMassage.message = response.message;
        this.gs.resMassage.status = "error";
        window.scroll(0, 0);
      }
    }
    this.loading = false;
  }

  async getResellerList() {
    this.loading = true;
    const obj = {
      allrecords: true,
      sortField: "name",
      sortOrder: "asc",
      filter: { status: { $in: [1, 4] }, orgType: "reseller" },
    };
    obj.filter["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "organization/list",
      obj,
      false
    );
    if (response && response.items.length) {
      this.resellerArr = response.items;
    }
    this.loading = false;
  }

  hasError(event: any): void {
    if (
      !event &&
      this.organizationForm.value.personDetail.primaryPhoneNo !== ""
    ) {
      this.organizationForm
        .get("personDetail")
        .get("primaryPhoneNo")
        .setErrors(["invalid_cell_phone", true]);
    }
  }

  hasError1(event: any): void {
    if (
      !event &&
      this.organizationForm.value.personDetail.secondaryPhoneNo !== ""
    ) {
      this.organizationForm
        .get("personDetail")
        .get("secondaryPhoneNo")
        .setErrors(["invalid_cell_phone", true]);
    }
  }

  countryChange(country: any) {
    this.countryCode = country.dialCode;
    this.countryInitial = country.iso2;
  }
  countryChange1(country: any) {
    this.countryCode1 = country.dialCode;
    this.countryInitial1 = country.iso2;
  }
  telInputObject(obj) {
    this.countryObj = obj;
  }

  telInputObject1(obj) {
    this.countryObj1 = obj;
  }
}
