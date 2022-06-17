(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-profile-profile-module"],{

/***/ "5exy":
/*!************************************************************!*\
  !*** ./src/app/views/profile/profile/profile.component.ts ***!
  \************************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_profile_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./profile.component.html */ "rAYq");
/* harmony import */ var _profile_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.component.scss */ "FZL2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/validation-forms.service */ "ElzS");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../environments/environment */ "AytR");
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/global.service */ "4WDQ");
/* harmony import */ var _profile_otp_profile_otp_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../profile-otp/profile-otp.component */ "CwNm");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap/modal */ "LqlI");












let ProfileComponent = class ProfileComponent {
    constructor(httpReqService, authService, fb, vf, gs, modalService) {
        this.httpReqService = httpReqService;
        this.authService = authService;
        this.fb = fb;
        this.vf = vf;
        this.gs = gs;
        this.modalService = modalService;
        this.tabs = [
            { header: "Update Account", icon: "cil-user" },
            { header: "Change Password", icon: "cil-lock-locked" },
            { header: "Payment Details", icon: "cil-lock-locked" },
        ];
        this.userData = {};
        this.submitted = false;
        this.mediaUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].mediaUrl;
        this.httpReqService.clearMassage();
        this.tokenData = this.authService.decodeToken();
        this.formErrors = this.vf.errorMessages;
        this.createForm();
    }
    ngOnInit() {
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
            email: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required]],
            name: [
                "",
                [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern(this.vf.formRules.name)],
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
    getUserDetail() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const response = yield this.httpReqService.get("users", this.tokenData.user._id);
            this.userData = response.items[0];
            this.profileForm.patchValue(this.userData);
        });
    }
    onValidate() {
        this.submitted = true;
        // stop here if form is invalid
        return this.profileForm.status === "VALID";
    }
    onSubmit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.onValidate()) {
                if (this.profileForm.value.email != this.userData.email ||
                    this.profileForm.value.name != this.userData.name ||
                    this.imgUrl) {
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
                    const response = yield this.httpReqService.post("users/editProfile", formData, true);
                    if (response) {
                        if (this.profileForm.value && this.userData.email !== this.profileForm.value.email) {
                            const initialState = {
                                title: "Profile OTP",
                            };
                            this.modalRef = this.modalService.show(_profile_otp_profile_otp_component__WEBPACK_IMPORTED_MODULE_10__["ProfileOtpComponent"], {
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
                }
                else {
                    this.gs.resMassage.massage = "Already up to date !!";
                    this.gs.resMassage.status = "success";
                    this.httpReqService.hideMassege();
                }
            }
        });
    }
};
ProfileComponent.ctorParameters = () => [
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_5__["HttpReqService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
    { type: _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_7__["ValidationFormsService"] },
    { type: _services_global_service__WEBPACK_IMPORTED_MODULE_9__["GlobalService"] },
    { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__["BsModalService"] }
];
ProfileComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-profile",
        template: _raw_loader_profile_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_profile_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProfileComponent);



/***/ }),

/***/ "5kjL":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/profile/payment-details/payment-details.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<c-card>\n    <c-card-body>\n        <c-row>\n            <c-col sm=\"12\" md=\"6\">\n                <label for=\"card-element\">Card</label>\n                <div id=\"card-element\"></div>\n            </c-col>\n        </c-row>\n    </c-card-body>\n    <c-card-footer>\n        <button cButton type=\"submit\" color=\"primary\" size=\"md\" class=\"mfe-1\" (click)=\"onClick()\">\n            <span> Save Card</span>\n        </button>\n        <button cButton type=\"reset\" color=\"secondary\" size=\"md\" class=\"mfe-1\" routerLink=\"/dashboard\">\n            <c-icon name=\"cil-x-circle\" size=\"sm\"></c-icon>\n            <span> Cancel</span>\n        </button>\n    </c-card-footer>\n</c-card>");

/***/ }),

/***/ "8r/t":
/*!*************************************************!*\
  !*** ./src/app/views/profile/profile.module.ts ***!
  \*************************************************/
/*! exports provided: ProfileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile/profile.component */ "5exy");
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./change-password/change-password.component */ "JTQ2");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _coreui_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @coreui/angular */ "Iluq");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var ng_otp_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-otp-input */ "BstE");
/* harmony import */ var _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @coreui/icons-angular */ "rVqu");
/* harmony import */ var _profile_otp_profile_otp_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./profile-otp/profile-otp.component */ "CwNm");
/* harmony import */ var _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./payment-details/payment-details.component */ "oVnY");






// CoreUI Modules




// import { ReactiveFormsModule } from '@angular/forms';


const routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'update',
            },
            {
                path: 'update',
                data: {
                    title: 'Profile',
                },
                component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_3__["ProfileComponent"]
            },
            {
                path: 'change-password',
                component: _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_4__["ChangePasswordComponent"]
            }
        ]
    }
];
let ProfileModule = class ProfileModule {
};
ProfileModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _profile_profile_component__WEBPACK_IMPORTED_MODULE_3__["ProfileComponent"],
            _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_4__["ChangePasswordComponent"],
            _profile_otp_profile_otp_component__WEBPACK_IMPORTED_MODULE_10__["ProfileOtpComponent"],
            _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_11__["PaymentDetailsComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(routes),
            _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["TabsetModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["CardModule"],
            _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_9__["IconModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["GridModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["FormModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["ButtonModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["ImgModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
            ng_otp_input__WEBPACK_IMPORTED_MODULE_8__["NgOtpInputModule"]
        ]
    })
], ProfileModule);



/***/ }),

/***/ "CwNm":
/*!********************************************************************!*\
  !*** ./src/app/views/profile/profile-otp/profile-otp.component.ts ***!
  \********************************************************************/
/*! exports provided: ProfileOtpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileOtpComponent", function() { return ProfileOtpComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_profile_otp_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./profile-otp.component.html */ "UEpp");
/* harmony import */ var _profile_otp_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-otp.component.scss */ "pt8V");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "LqlI");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/global.service */ "4WDQ");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");
/* harmony import */ var _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/validation-forms.service */ "ElzS");











let ProfileOtpComponent = class ProfileOtpComponent {
    constructor(modalRef, fb, vf, authService, gs, httpReqService) {
        this.modalRef = modalRef;
        this.fb = fb;
        this.vf = vf;
        this.authService = authService;
        this.gs = gs;
        this.httpReqService = httpReqService;
        this.userData = {};
        this.submitted = false;
        this.httpReqService.clearMassage();
        this.formErrors = this.vf.errorMessages;
        this.tokenData = this.authService.decodeToken();
    }
    ngOnInit() {
        this.getUserDetail();
        this.response = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this.verifyOtpForm = this.fb.group({
            otp: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
        });
    }
    getUserDetail() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const response = yield this.httpReqService.get('users', this.tokenData.user._id);
            this.userData = response.items[0];
        });
    }
    onOtpChange(otp) {
        this.otp = otp;
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.verifyOtpForm.controls;
    }
    cancle() {
        this.response.next();
        this.modalRef.hide();
    }
    onValidate() {
        this.submitted = true;
        // stop here if form is invalid
        return this.verifyOtpForm.status === "VALID";
    }
    updateProfile() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.onValidate()) {
                const obj = {
                    otp: this.verifyOtpForm.value.otp,
                    email: this.userData.email
                };
                const response = yield this.httpReqService.post("users/verifyChangeReqOtp", obj, true);
                console.log(response);
            }
        });
    }
};
ProfileOtpComponent.ctorParameters = () => [
    { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["BsModalRef"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_10__["ValidationFormsService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"] },
    { type: _services_global_service__WEBPACK_IMPORTED_MODULE_8__["GlobalService"] },
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_9__["HttpReqService"] }
];
ProfileOtpComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-profile-otp',
        template: _raw_loader_profile_otp_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
        styles: [_profile_otp_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProfileOtpComponent);



/***/ }),

/***/ "FZL2":
/*!**************************************************************!*\
  !*** ./src/app/views/profile/profile/profile.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".image-section {\n  display: inline-grid !important;\n}\n.image-section img {\n  height: 256px;\n  width: 256px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwrQkFBQTtBQUNKO0FBQUk7RUFDSSxhQUFBO0VBQ0EsWUFBQTtBQUVSIiwiZmlsZSI6InByb2ZpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1hZ2Utc2VjdGlvbntcbiAgICBkaXNwbGF5OiBpbmxpbmUtZ3JpZCAhaW1wb3J0YW50O1xuICAgIGltZ3tcbiAgICAgICAgaGVpZ2h0OiAyNTZweDtcbiAgICAgICAgd2lkdGg6IDI1NnB4O1xuICAgIH1cbn0iXX0= */");

/***/ }),

/***/ "JTQ2":
/*!****************************************************************************!*\
  !*** ./src/app/views/profile/change-password/change-password.component.ts ***!
  \****************************************************************************/
/*! exports provided: confirmPasswordValidator, ChangePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "confirmPasswordValidator", function() { return confirmPasswordValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordComponent", function() { return ChangePasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_change_password_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./change-password.component.html */ "oUJS");
/* harmony import */ var _change_password_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./change-password.component.scss */ "o63j");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/validation-forms.service */ "ElzS");
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/global.service */ "4WDQ");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "iInd");










/** passwords must match - custom validator */
const confirmPasswordValidator = (control) => {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    return password && confirm && password.value === confirm.value
        ? null
        : { passwordMismatch: true };
};
let ChangePasswordComponent = class ChangePasswordComponent {
    constructor(httpReqService, fb, vf, gs, authService, router) {
        this.httpReqService = httpReqService;
        this.fb = fb;
        this.vf = vf;
        this.gs = gs;
        this.authService = authService;
        this.router = router;
        this.submitted = false;
        this.passwordType = 'password';
        this.passwordIcon = 'fa fa-eye-slash';
        this.oldPasswordType = 'password';
        this.oldPasswordIcon = 'fa fa-eye-slash';
        this.cPasswordType = 'password';
        this.cPasswordIcon = 'fa fa-eye-slash';
        this.httpReqService.clearMassage();
        this.formErrors = this.vf.errorMessages;
        this.createForm();
    }
    ngOnInit() {
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.changePasswordForm.controls;
    }
    /**
    * Create  form
    */
    createForm() {
        this.changePasswordForm = this.fb.group({
            oldPassword: ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required,
                ]],
            password: [
                '',
                [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(this.vf.formRules.passwordMin),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].pattern(this.vf.formRules.passwordPattern),
                ],
            ],
            confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]],
        }, { validators: confirmPasswordValidator });
    }
    onValidate() {
        this.submitted = true;
        // stop here if form is invalid
        return this.changePasswordForm.status === 'VALID';
    }
    onSubmit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.onValidate()) {
                const response = yield this.httpReqService.post('users/changePassword', this.changePasswordForm.value, true);
                if (response) {
                    this.changePasswordForm.reset();
                    this.submitted = false;
                    this.logOut();
                }
            }
        });
    }
    logOut() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const response = yield this.httpReqService.post('users/logOut', {}, false);
            if (response) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('currentUser');
                this.authService.currentUserSubjet(null);
                this.router.navigate(['auth/login']);
            }
        });
    }
    togglePassword() {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
        this.passwordIcon = this.passwordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
    }
    oldTogglePassword() {
        this.oldPasswordType = this.oldPasswordType === 'password' ? 'text' : 'password';
        this.oldPasswordIcon = this.oldPasswordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
    }
    cTogglePassword() {
        this.cPasswordType = this.cPasswordType === 'password' ? 'text' : 'password';
        this.cPasswordIcon = this.cPasswordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
    }
};
ChangePasswordComponent.ctorParameters = () => [
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_4__["HttpReqService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
    { type: _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_6__["ValidationFormsService"] },
    { type: _services_global_service__WEBPACK_IMPORTED_MODULE_7__["GlobalService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] }
];
ChangePasswordComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-change-password',
        template: _raw_loader_change_password_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_change_password_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ChangePasswordComponent);



/***/ }),

/***/ "R+ml":
/*!******************************************************************************!*\
  !*** ./src/app/views/profile/payment-details/payment-details.component.scss ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXltZW50LWRldGFpbHMuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "UEpp":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/profile/profile-otp/profile-otp.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"modal-content\">\n    <div class=\"modal-header\">\n        <h5 class=\"modal-title custom-title\" id=\"exampleModalLabel\">{{title}}</h5>\n    </div>\n    <div class=\"modal-body\">\n        <form [formGroup]=\"verifyOtpForm\" novalidate (ngSubmit)=\"updateProfile()\" class=\"needs-validation\">\n            <h3>Please enter 5 digit passcode that was sent to your mail</h3>\n            <div class=\"input-group mb-3\">\n                <c-form-group cRow>\n                    <label cLabel=\"col\" cCol md=\"4\">OTP</label>\n                    <c-col md=\"8\">\n                        <input cInput type=\"text\" maxlength=\"5\" formControlName=\"otp\" placeholder=\"Enter otp\">\n                        <div *ngIf=\"submitted && f['otp'].invalid\" class=\"invalid-feedback d-block\">\n                            <div *ngIf=\"f['otp'].errors.required\">\n                                Please enter OTP.\n                            </div>\n                        </div>\n                    </c-col>\n                </c-form-group>\n            </div>\n            <div class=\"massegeCls\" [ngClass]=\"{\n                errorRes: gs.resMassage.status == 'error',\n                succassRes: gs.resMassage.status == 'success'\n              }\">\n                {{ gs.resMassage.massage || \"\" }}\n            </div>\n        </form>\n    </div>\n    <div class=\"modal-footer\">\n        <button cButton color=\"primary\" (click)=\"updateProfile()\">{{submitButtonText}}</button>\n        <button cButton color=\"secondary\" (click)=\"cancle()\">{{cancleButtonText}}</button>\n    </div>\n</div>");

/***/ }),

/***/ "o63j":
/*!******************************************************************************!*\
  !*** ./src/app/views/profile/change-password/change-password.component.scss ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGFuZ2UtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "oUJS":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/profile/change-password/change-password.component.html ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<c-card>\n    <c-card-body>\n        <form [formGroup]=\"changePasswordForm\" novalidate class=\"needs-validation\">\n            <c-row>\n                <c-col sm=\"12\" md=\"6\">\n                    <c-form-group>\n                        <label for=\"ccnumber\">Current Password</label>\n                        <c-input-group>\n                            <input cInput id=\"ccnumber\" [type]=\"oldPasswordType\" formControlName=\"oldPassword\"\n                                [ngClass]=\"{ 'is-invalid':  (submitted || f.oldPassword.touched) && f.oldPassword.invalid, 'is-valid': f.oldPassword.touched && f.oldPassword.valid }\">\n                            <c-input-group-append>\n                                <c-input-group-text>\n                                    <i [class]=\"oldPasswordIcon\" aria-hidden=\"true\" (click)=\"oldTogglePassword()\"></i>\n                                </c-input-group-text>\n                            </c-input-group-append>\n                            <div *ngIf=\"submitted && f['oldPassword'].invalid\" class=\"invalid-feedback\">\n                                <div *ngIf=\"f['oldPassword'].errors.required\">Current Password is required</div>\n                                <!--<div *ngIf=\"f['oldPassword'].errors.minlength\">{{formErrors.password.minLength}}</div>\n                                <div *ngIf=\"f['oldPassword'].errors.pattern\">{{formErrors.password.pattern}}</div>-->\n                            </div>\n                        </c-input-group>\n                    </c-form-group>\n                </c-col>\n            </c-row>\n            <c-row>\n                <c-col sm=\"12\" md=\"6\">\n                    <c-form-group>\n                        <label cLabel for=\"name\">New Password</label>\n                        <c-input-group>\n                            <input cInput id=\"name\" formControlName=\"password\" [type]=\"passwordType\"\n                                [ngClass]=\"{ 'is-invalid':  (submitted || f.password.touched) && f.password.invalid, 'is-valid': f.password.touched && f.password.valid }\">\n                            <c-input-group-append>\n                                <c-input-group-text>\n                                    <i [class]=\"passwordIcon\" aria-hidden=\"true\" (click)=\"togglePassword()\"></i>\n                                </c-input-group-text>\n                            </c-input-group-append>\n                            <div *ngIf=\"submitted && f['password'].invalid\" class=\"invalid-feedback\">\n                                <div *ngIf=\"f['password'].errors.required\">Password is required</div>\n                                <div *ngIf=\"f['password'].errors.minlength\">{{formErrors.password.minLength}}</div>\n                                <div *ngIf=\"f['password'].errors.pattern\">{{formErrors.password.pattern}}</div>\n                            </div>\n                        </c-input-group>\n                    </c-form-group>\n                </c-col>\n            </c-row>\n            <c-row>\n                <c-col sm=\"12\" md=\"6\">\n                    <c-form-group class=\"image-section\">\n                        <label cLabel for=\"name\">Confirm New Password</label>\n                        <c-input-group>\n                            <input cInput [type]=\"cPasswordType\" formControlName=\"confirmPassword\" required\n                                [ngClass]=\"{ 'is-invalid': submitted && changePasswordForm.errors, 'is-valid': f.confirmPassword.touched && !changePasswordForm.errors }\">\n                            <c-input-group-append>\n                                <c-input-group-text>\n                                    <i [class]=\"cPasswordIcon\" aria-hidden=\"true\" (click)=\"cTogglePassword()\"></i>\n                                </c-input-group-text>\n                            </c-input-group-append>\n                            <div *ngIf=\"submitted && changePasswordForm.errors\" class=\"invalid-feedback\">\n                                <div *ngIf=\"changePasswordForm.errors['passwordMismatch']\">\n                                    {{formErrors.confirmPassword.passwordMismatch}}</div>\n                            </div>\n                        </c-input-group>\n                    </c-form-group>\n                </c-col>\n            </c-row>\n        </form>\n    </c-card-body>\n    <c-card-footer>\n        <button cButton type=\"submit\" color=\"primary\" size=\"md\" class=\"mfe-1\" (click)=\"onSubmit()\">\n            <span> Change Password</span>\n        </button>\n        <button cButton type=\"reset\" color=\"secondary\" size=\"md\" class=\"mfe-1\" routerLink=\"/dashboard\">\n            <c-icon name=\"cil-x-circle\" size=\"sm\"></c-icon>\n            <span> Cancel</span>\n        </button>\n    </c-card-footer>\n    <div class=\"massegeCls\"\n        [ngClass]=\"{'errorRes' : gs.resMassage.status == 'error', 'succassRes' : gs.resMassage.status == 'success'}\">\n        {{gs.resMassage.massage || ''}}\n    </div>\n</c-card>");

/***/ }),

/***/ "oVnY":
/*!****************************************************************************!*\
  !*** ./src/app/views/profile/payment-details/payment-details.component.ts ***!
  \****************************************************************************/
/*! exports provided: PaymentDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentDetailsComponent", function() { return PaymentDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_payment_details_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./payment-details.component.html */ "5kjL");
/* harmony import */ var _payment_details_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payment-details.component.scss */ "R+ml");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @stripe/stripe-js */ "v4r+");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");








let PaymentDetailsComponent = class PaymentDetailsComponent {
    constructor(httpClient, httpReqService, authService) {
        this.httpClient = httpClient;
        this.httpReqService = httpReqService;
        this.authService = authService;
        this.styleCard = {
            'style': {
                'base': {
                    'fontFamily': 'Arial, sans-serif',
                    'fontSize': '8px',
                    'color': '#C1C7CD',
                },
                'Invalid': { 'color': 'red', },
            }
        };
    }
    ngOnInit() {
        this.tokenData = this.authService.decodeToken();
        this.initStripe();
    }
    initStripe() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.stripe = yield Object(_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_5__["loadStripe"])('pk_test_51JCS4KSJu2s95RzqVBt3GG75J1GwBJ1HfwqqrI0ty5F0yxTlIf5V8AAgfbGiM2DGVEi6w7JNM742fat5Lr4i40AM00rhzDcuHt');
            this.createElements();
        });
    }
    createElements() {
        this.elements = this.stripe.elements();
        this.cardElement = this.elements.create('card');
        this.cardElement = this.elements.getElement('card');
        this.cardElement.mount('#card-element');
        this.cardElement.on('change', function (event) {
            if (event.complete) {
                console.log('Complete', event);
                // enable payment button
            }
            else if (event.error) {
                // show validation to customer
                console.log('Error', event);
            }
        });
    }
    onClick() {
        let _this = this;
        var resultContainer = document.getElementById('card-result');
        this.stripe.createPaymentMethod({
            type: 'card',
            card: this.cardElement,
            billing_details: {
                name: "SomeOne",
            },
        }).then(function (result) {
            if (result.error) {
                // Display error.message in your UI
                resultContainer.textContent = result.error.message;
            }
            else {
                // You have successfully created a new PaymentMethod
                // resultContainer.textContent = "Created payment method: " + result.paymentMethod.id;
                _this.attachPaymentMethod(result.paymentMethod.id);
            }
        });
    }
    attachPaymentMethod(paymentMethodId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const response = this.httpReqService.post("attachpaymentmethod", {
                orgId: this.tokenData && this.tokenData.user && this.tokenData.user.organizationId ? this.tokenData.user.organizationId : '',
                paymentMethodId: paymentMethodId,
            }, false);
        });
    }
};
PaymentDetailsComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_6__["HttpReqService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"] }
];
PaymentDetailsComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
        selector: 'app-payment-details',
        template: _raw_loader_payment_details_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_payment_details_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PaymentDetailsComponent);



/***/ }),

/***/ "pt8V":
/*!**********************************************************************!*\
  !*** ./src/app/views/profile/profile-otp/profile-otp.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLW90cC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "rAYq":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/profile/profile/profile.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"fade-in\">\n    <c-card>\n        <c-card-header>\n            Update Profile\n        </c-card-header>\n        <c-card-body>\n            <c-tabset boxed=\"true\" [activeTab]=\"'0'\">\n                <c-tablist>\n                    <c-tab *ngFor=\"let tab of tabs\">\n                        <c-icon [name]=\"tab.icon\" class=\"pb-1\"></c-icon>\n                        {{tab.header}}\n                    </c-tab>\n                </c-tablist>\n                <c-tab-content>\n                    <c-tab-pane>\n                        <c-card>\n                            <c-card-body>\n                                <form [formGroup]=\"profileForm\" novalidate class=\"needs-validation\">\n                                    <c-row>\n                                        <c-col sm=\"12\" md=\"6\">\n                                            <c-form-group>\n                                                <label for=\"ccnumber\">Email</label>\n                                                <input cInput id=\"ccnumber\" placeholder=\"Email\"\n                                                    formControlName=\"email\">\n                                                <p class=\"errorRes\"\n                                                    *ngIf=\"userData && userData.status == 5 || userData.status == 6\">\n                                                    Your email update request is under review\n                                                </p>\n                                            </c-form-group>\n                                        </c-col>\n                                        <c-col sm=\"12\" md=\"6\">\n                                            <c-form-group>\n                                                <label cLabel for=\"name\">Name</label>\n                                                <input cInput id=\"name\" placeholder=\"Name\" formControlName=\"name\" [readonly]=\"userData.status == 4 || userData.status == 6\"\n                                                    [ngClass]=\"{ 'is-invalid':  (submitted || f.name.touched) && f.name.invalid, 'is-valid': f.name.touched && f.name.valid }\">\n                                                <div *ngIf=\"submitted && f['name'].invalid\" class=\"invalid-feedback\">\n                                                    <div *ngIf=\"f['name'].errors.required\">\n                                                        {{formErrors.name.required}}\n                                                    </div>\n                                                    <div *ngIf=\"f['name'].errors.pattern\">{{formErrors.name.pattern}}\n                                                    </div>\n                                                </div>\n                                                <p class=\"errorRes\"\n                                                    *ngIf=\"userData && userData.status == 4 || userData.status == 6\">\n                                                    Your name update request is under review\n                                                </p>\n                                            </c-form-group>\n                                        </c-col>\n                                    </c-row>\n                                    <c-row>\n                                        <c-col sm=\"12\" md=\"6\">\n                                            <c-form-group class=\"image-section\">\n                                                <label cLabel for=\"name\">Profile Picture</label>\n                                                <input cInput type=\"file\" #file name=\"file-input\" accept=\"image/*\"\n                                                    hidden (change)=\"selectProfile($event)\">\n                                                <button cButton type=\"submit\" color=\"primary\" size=\"md\" class=\"mfe-1\"\n                                                    (click)=\"file.click()\">\n                                                    <span> Choose Profile</span>\n                                                </button>\n                                                <img cImg [fluid]=\"true\" align=\"right\" shape=\"rounded-lg\" width=\"256\"\n                                                    height=\"256\" loading=\"lazy\" [src]=\"imgUrl\" class=\"mb-2\"\n                                                    *ngIf=\"imgUrl\" class=\"mt-2\" />\n                                                <img cImg [fluid]=\"true\" align=\"right\" shape=\"rounded-lg\" width=\"256\"\n                                                    height=\"256\" loading=\"lazy\" [src]=\"mediaUrl + userData.image\"\n                                                    class=\"mb-2\" *ngIf=\"userData && userData.image && !imgUrl\"\n                                                    class=\"mt-2\" />\n                                            </c-form-group>\n                                        </c-col>\n                                    </c-row>\n                                </form>\n                            </c-card-body>\n                            <c-card-footer>\n                                <button cButton type=\"submit\" color=\"primary\" size=\"md\" class=\"mfe-1\"\n                                    (click)=\"onSubmit()\">\n                                    <c-icon name=\"cil-check-circle\" size=\"sm\"></c-icon>\n                                    <span> Save</span>\n                                </button>\n                                <button cButton type=\"reset\" color=\"secondary\" size=\"md\" class=\"mfe-1\"\n                                    routerLink=\"/dashboard\">\n                                    <c-icon name=\"cil-x-circle\" size=\"sm\"></c-icon>\n                                    <span> Cancel</span>\n                                </button>\n                            </c-card-footer>\n                            <div class=\"massegeCls\"\n                                [ngClass]=\"{'errorRes' : gs.resMassage.status == 'error', 'succassRes' : gs.resMassage.status == 'success'}\">\n                                {{gs.resMassage.massage || ''}}\n                            </div>\n                        </c-card>\n                    </c-tab-pane>\n                    <c-tab-pane>\n                        <app-change-password></app-change-password>\n                    </c-tab-pane>\n                    <c-tab-pane>\n                        <app-payment-details></app-payment-details>\n                    </c-tab-pane>\n                </c-tab-content>\n            </c-tabset>\n        </c-card-body>\n    </c-card>\n</div>");

/***/ }),

/***/ "v4r+":
/*!***********************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/dist/stripe.esm.js ***!
  \***********************************************************/
/*! exports provided: loadStripe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStripe", function() { return loadStripe; });
var V3_URL = 'https://js.stripe.com/v3';
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var findScript = function findScript() {
  var scripts = document.querySelectorAll("script[src^=\"".concat(V3_URL, "\"]"));

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];

    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

var injectScript = function injectScript(params) {
  var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  var script = document.createElement('script');
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
  }

  headOrBody.appendChild(script);
  return script;
};

var registerWrapper = function registerWrapper(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }

  stripe._registerWrapper({
    name: 'stripe-js',
    version: "1.16.0",
    startTime: startTime
  });
};

var stripePromise = null;
var loadScript = function loadScript(params) {
  // Ensure that we only attempt to load Stripe.js at most once
  if (stripePromise !== null) {
    return stripePromise;
  }

  stripePromise = new Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }

    try {
      var script = findScript();

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }

      script.addEventListener('load', function () {
        if (window.Stripe) {
          resolve(window.Stripe);
        } else {
          reject(new Error('Stripe.js not available'));
        }
      });
      script.addEventListener('error', function () {
        reject(new Error('Failed to load Stripe.js'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise;
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }

  var stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
};

// own script injection.

var stripePromise$1 = Promise.resolve().then(function () {
  return loadScript(null);
});
var loadCalled = false;
stripePromise$1["catch"](function (err) {
  if (!loadCalled) {
    console.warn(err);
  }
});
var loadStripe = function loadStripe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  loadCalled = true;
  var startTime = Date.now();
  return stripePromise$1.then(function (maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};




/***/ })

}]);
//# sourceMappingURL=views-profile-profile-module-es2015.js.map