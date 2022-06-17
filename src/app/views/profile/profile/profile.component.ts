import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { HttpReqService } from "../../../services/http-req.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { environment } from "../../../../environments/environment";
import { GlobalService } from "../../../services/global.service";
import { ProfileOtpComponent } from "../profile-otp/profile-otp.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  tabs: any[] = [
    { header: "Update Account", icon: "cil-user" },
    { header: "Change Password", icon: "cil-lock-locked" },
    { header: "Payment Details", icon: "cil-lock-locked" },
  ];
  file: any;
  imgUrl: any;
  tokenData: any;
  userData: any = {};
  profileForm: FormGroup;
  formErrors: any;
  submitted = false;
  modalRef: BsModalRef;
  mediaUrl = environment.mediaUrl;
  constructor(
    private httpReqService: HttpReqService,
    private authService: AuthService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    public gs: GlobalService,
    private modalService: BsModalService
  ) {
    this.httpReqService.clearMassage();
    this.tokenData = this.authService.decodeToken();
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }

  ngOnInit(): void {
    this.getUserDetail();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }

  /**
   * Create profile form
   */
  createForm() {
    this.profileForm = this.fb.group({
      email: ["", [Validators.required]],
      name: [
        "",
        [Validators.required, Validators.pattern(this.vf.formRules.name)],
      ],
    });
  }

  selectProfile(e) {
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    };
  }

  async getUserDetail() {
    const response: any = await this.httpReqService.get(
      "users",
      this.tokenData.user._id
    );
    this.userData = response.items[0];
    this.profileForm.patchValue(this.userData);
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.profileForm.status === "VALID";
  }

  async onSubmit() {
    if (this.onValidate()) {
      if (
        this.profileForm.value.email != this.userData.email ||
        this.profileForm.value.name != this.userData.name ||
        this.imgUrl
      ) {
        this.profileForm.value._id = this.userData._id;
        if (this.profileForm.value.email == this.userData.email) {
          delete this.profileForm.value.email;
        }
        if (this.profileForm.value.name == this.userData.name) {
          delete this.profileForm.value.name;
        }
        const formData = new FormData();
        formData.append("data", JSON.stringify(this.profileForm.value));
        if (this.file) {
          formData.append("image", this.file);
        }
        const response: any = await this.httpReqService.post(
          "users/editProfile",
          formData,
          true
        );
        if (response) {
          if (this.profileForm.value && this.userData.email !== this.profileForm.value.email) {
            const initialState = {
              title: "Profile OTP",
            };
            this.modalRef = this.modalService.show(ProfileOtpComponent, {
              class: "modal-xl modal-dialog-centered ",
              initialState,
              backdrop: "static",
              keyboard: false,
            });
            this.modalRef.content.cancleButtonText = "Cancel";
            this.modalRef.content.submitButtonText = "Submit";
            this.modalRef.content.response.subscribe((result) => {
              if (result) {
              }
            });
          }
          this.userData = response.items;
          const obj = {
            name: response.items.name,
            email: response.items.email,
            image: response.items.image,
          };
          localStorage.setItem("currentUser", JSON.stringify(obj));
          this.authService.profileSubject(obj);
        }
      } else {
        this.gs.resMassage.massage = "Already up to date !!";
        this.gs.resMassage.status = "success";
        this.httpReqService.hideMassege();
      }
    }
  }
}
