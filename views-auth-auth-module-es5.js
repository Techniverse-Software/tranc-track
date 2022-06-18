(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-auth-auth-module"], {
    /***/
    "+aBe":
    /*!***********************************************************************!*\
      !*** ./src/app/views/auth/rest-password/rest-password.component.scss ***!
      \***********************************************************************/

    /*! exports provided: default */

    /***/
    function aBe(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXN0LXBhc3N3b3JkLmNvbXBvbmVudC5zY3NzIn0= */";
      /***/
    },

    /***/
    "/kjZ":
    /*!*****************************************************!*\
      !*** ./src/app/views/auth/login/login.component.ts ***!
      \*****************************************************/

    /*! exports provided: LoginComponent */

    /***/
    function kjZ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
        return LoginComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./login.component.html */
      "LUN3");
      /* harmony import */


      var _login_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./login.component.scss */
      "T7if");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "8Y7J");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "s7LF");
      /* harmony import */


      var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../services/auth.service */
      "lGQG");
      /* harmony import */


      var _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../services/validation-forms.service */
      "ElzS");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      "iInd");
      /* harmony import */


      var _services_http_req_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../services/http-req.service */
      "J+oG");
      /* harmony import */


      var _services_global_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../../services/global.service */
      "4WDQ");

      var LoginComponent = /*#__PURE__*/function () {
        function LoginComponent(fb, vf, authService, router, gs, httpReqService) {
          _classCallCheck(this, LoginComponent);

          this.fb = fb;
          this.vf = vf;
          this.authService = authService;
          this.router = router;
          this.gs = gs;
          this.httpReqService = httpReqService;
          this.cAppClass = "c-app flex-row align-items-center";
          this.submitted = false;
          this.passwordType = "password";
          this.passwordIcon = "fa fa-eye-slash";
          this.loading = false;
          this.response = null;
          this.httpReqService.clearMassage();
          this.formErrors = this.vf.errorMessages;
          this.createForm();
        }

        _createClass(LoginComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.gs.resMassage.massage = null;
          }
          /**
           * Create Login Form
           */

        }, {
          key: "createForm",
          value: function createForm() {
            this.loginForm = this.fb.group({
              email: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(this.vf.formRules.email)]],
              password: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]]
            });
          } // convenience getter for easy access to form fields

        }, {
          key: "f",
          get: function get() {
            return this.loginForm.controls;
          }
        }, {
          key: "onValidate",
          value: function onValidate() {
            this.submitted = true; // stop here if form is invalid

            return this.loginForm.status === "VALID";
          }
        }, {
          key: "togglePassword",
          value: function togglePassword() {
            this.passwordType = this.passwordType === "password" ? "text" : "password";
            this.passwordIcon = this.passwordIcon === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
          }
        }, {
          key: "onSubmit",
          value: function onSubmit() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this = this;

              var response, decoded, obj;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this.loading = true;
                      this.gs.resMassage.massage = '';

                      if (!this.onValidate()) {
                        _context.next = 8;
                        break;
                      }

                      _context.next = 5;
                      return this.httpReqService.post("users/login", this.loginForm.value, true);

                    case 5:
                      response = _context.sent;
                      //console.log(response);
                      this.response = response;

                      if (response && response.status === 1) {
                        localStorage.setItem("accessToken", response.items.token);
                        decoded = this.authService.decodeToken();
                        obj = {
                          name: decoded.user.name
                        };

                        if (response.items.image) {
                          obj["image"] = response.items.image;
                        }

                        localStorage.setItem("currentUser", JSON.stringify(obj));
                        this.authService.currentUserSubjet(response.items.token);
                        this.gs.resMassage.massage = response.message;
                        this.gs.resMassage.status = "success";
                        this.httpReqService.hideMassege();
                        setTimeout(function () {
                          _this.router.navigate(["dashboard"]);
                        }, 1000);
                      } else {
                        this.loading = false;
                        this.gs.resMassage.massage = response.message;
                        this.gs.resMassage.status = "error";
                      }

                    case 8:
                      this.loading = false;

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }]);

        return LoginComponent;
      }();

      LoginComponent.ctorParameters = function () {
        return [{
          type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
        }, {
          type: _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_6__["ValidationFormsService"]
        }, {
          type: _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]
        }, {
          type: _services_global_service__WEBPACK_IMPORTED_MODULE_9__["GlobalService"]
        }, {
          type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_8__["HttpReqService"]
        }];
      };

      LoginComponent.propDecorators = {
        cAppClass: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ["class"]
        }]
      };
      LoginComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-login",
        template: _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_login_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], LoginComponent);
      /***/
    },

    /***/
    "C4bi":
    /*!*************************************************************************!*\
      !*** ./src/app/views/auth/forgot-password/forgot-password.component.ts ***!
      \*************************************************************************/

    /*! exports provided: ForgotPasswordComponent */

    /***/
    function C4bi(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function () {
        return ForgotPasswordComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_forgot_password_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./forgot-password.component.html */
      "Elme");
      /* harmony import */


      var _forgot_password_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./forgot-password.component.scss */
      "T4Ux");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "8Y7J");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "s7LF");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      "iInd");
      /* harmony import */


      var _services_http_req_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../services/http-req.service */
      "J+oG");
      /* harmony import */


      var _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../services/validation-forms.service */
      "ElzS");
      /* harmony import */


      var _services_global_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../services/global.service */
      "4WDQ");

      var ForgotPasswordComponent = /*#__PURE__*/function () {
        function ForgotPasswordComponent(fb, vf, router, httpReqService, gs) {
          _classCallCheck(this, ForgotPasswordComponent);

          this.fb = fb;
          this.vf = vf;
          this.router = router;
          this.httpReqService = httpReqService;
          this.gs = gs;
          this.cAppClass = "c-app flex-row align-items-center";
          this.submitted = false;
          this.httpReqService.clearMassage();
          this.formErrors = this.vf.errorMessages;
          this.createForm();
        }

        _createClass(ForgotPasswordComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
          /**
           * Create Login Form
           */

        }, {
          key: "createForm",
          value: function createForm() {
            this.forgotPswForm = this.fb.group({
              email: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(this.vf.formRules.email)]]
            });
          } // convenience getter for easy access to form fields

        }, {
          key: "f",
          get: function get() {
            return this.forgotPswForm.controls;
          }
        }, {
          key: "onValidate",
          value: function onValidate() {
            this.submitted = true; // stop here if form is invalid

            return this.forgotPswForm.status === "VALID";
          }
        }, {
          key: "onSubmit",
          value: function onSubmit() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this2 = this;

              var response;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!this.onValidate()) {
                        _context2.next = 5;
                        break;
                      }

                      _context2.next = 3;
                      return this.httpReqService.post("users/forgotPassword", this.forgotPswForm.value, true);

                    case 3:
                      response = _context2.sent;

                      if (response && response.status == 1) {
                        localStorage.setItem("email", JSON.stringify(this.forgotPswForm.value.email));
                        this.gs.resMassage.message = response.message;
                        this.gs.resMassage.message = "success";
                        this.httpReqService.hideMassege();
                        setTimeout(function () {
                          _this2.router.navigate(["auth/verify-otp"]);
                        }, 1000);
                      } else {
                        this.gs.resMassage.message = response.message;
                        this.gs.resMassage.message = "error";
                        window.scroll(0, 0);
                      } // if (response) {
                      // localStorage.setItem('accessToken', response.items.token);
                      // const decoded: any = jwt_decode(response.items.token);
                      // const obj = {
                      //   name: decoded.user.name
                      // };
                      // this.authService.currentUserSubjet(response.items.token);
                      // }


                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }]);

        return ForgotPasswordComponent;
      }();

      ForgotPasswordComponent.ctorParameters = function () {
        return [{
          type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
        }, {
          type: _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_7__["ValidationFormsService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
        }, {
          type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_6__["HttpReqService"]
        }, {
          type: _services_global_service__WEBPACK_IMPORTED_MODULE_8__["GlobalService"]
        }];
      };

      ForgotPasswordComponent.propDecorators = {
        cAppClass: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ["class"]
        }]
      };
      ForgotPasswordComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-forgot-password",
        template: _raw_loader_forgot_password_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_forgot_password_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ForgotPasswordComponent);
      /***/
    },

    /***/
    "Elme":
    /*!*****************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/auth/forgot-password/forgot-password.component.html ***!
      \*****************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function Elme(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<c-container>\n  <c-row class=\"justify-content-center\">\n    <c-col md=\"6\">\n      <c-card-group>\n        <c-card class=\"p-4\">\n          <c-card-body>\n            <form [formGroup]=\"forgotPswForm\" novalidate (ngSubmit)=\"onSubmit()\" class=\"needs-validation\">\n              <h1>Forgot your password?</h1>\n              <p class=\"text-muted\">Enter your email below to receive a one-time 5 digit passcode. This will be needed to recover your password</p>\n              <div class=\"input-group mb-3\">\n                <!-- <div class=\"input-group-prepend\">\n                      <span class=\"input-group-text\">\n                        <c-icon name=\"cil-user\" size=\"sm\"></c-icon>\n                      </span>\n                    </div> -->\n                <input cInput placeholder=\"Email\" autocomplete=\"Email\" required formControlName=\"email\"\n                  [ngClass]=\"{ 'is-invalid':  (submitted || f.email.touched) && f.email.invalid, 'is-valid': f.email.touched && f.email.valid }\" />\n                <div *ngIf=\"submitted && f['email'].invalid\" class=\"invalid-feedback\">\n                  <div *ngIf=\"f['email'].errors.required\">{{formErrors.email.required}}</div>\n                  <div *ngIf=\"f['email'].errors.pattern\">{{formErrors.email.email}}</div>\n                </div>\n                \n              </div>\n              <c-row>\n                <c-col col=\"6\">\n                  <button cButton color=\"primary\" class=\"px-4\" type=\"submit\" [disabled]=\"false\">Send</button>\n                </c-col>\n                <c-col col=\"6\" class=\"text-right\">\n                  <button cButton color=\"link\" class=\"px-0\" routerLink=\"/auth/login\">Return to Login</button>\n                </c-col>\n              </c-row>\n            </form>\n            <div\n              [ngClass]=\"{'errorRes' : gs.resMassage.status == 'error', 'succassRes' : gs.resMassage.status == 'success'}\">\n              {{gs.resMassage.massage || ''}}\n            </div>\n          </c-card-body>\n        </c-card>\n      </c-card-group>\n    </c-col>\n  </c-row>\n</c-container>\n";
      /***/
    },

    /***/
    "FU3J":
    /*!*******************************************!*\
      !*** ./src/app/views/auth/auth.module.ts ***!
      \*******************************************/

    /*! exports provided: AuthModule */

    /***/
    function FU3J(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AuthModule", function () {
        return AuthModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "8Y7J");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "SVse");
      /* harmony import */


      var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./login/login.component */
      "/kjZ");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "iInd");
      /* harmony import */


      var ng_otp_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ng-otp-input */
      "BstE");
      /* harmony import */


      var _coreui_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @coreui/angular */
      "Iluq");
      /* harmony import */


      var _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @coreui/icons-angular */
      "rVqu");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      "s7LF");
      /* harmony import */


      var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./forgot-password/forgot-password.component */
      "C4bi");
      /* harmony import */


      var _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./verify-otp/verify-otp.component */
      "XcGI");
      /* harmony import */


      var _rest_password_rest_password_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./rest-password/rest-password.component */
      "KD9G"); // CoreUI


      var routes = [{
        path: "",
        data: {
          title: "Forms"
        },
        children: [{
          path: "",
          redirectTo: "login"
        }, {
          path: "login",
          component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
        }, {
          path: "forgot-password",
          component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_9__["ForgotPasswordComponent"]
        }, {
          path: "verify-otp",
          component: _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_10__["VerifyOtpComponent"]
        }, {
          path: "verify-otp/:id",
          component: _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_10__["VerifyOtpComponent"]
        }, {
          path: "reset-password",
          component: _rest_password_rest_password_component__WEBPACK_IMPORTED_MODULE_11__["RestPasswordComponent"]
        }]
      }];

      var AuthModule = function AuthModule() {
        _classCallCheck(this, AuthModule);
      };

      AuthModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_9__["ForgotPasswordComponent"], _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_10__["VerifyOtpComponent"], _rest_password_rest_password_component__WEBPACK_IMPORTED_MODULE_11__["RestPasswordComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes), _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["ButtonModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["CardModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["GridModule"], _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_7__["IconModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["SpinkitModule"], // ToastrModule.forRoot(),
        // ToastContainerModule,
        _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["FormModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"], ng_otp_input__WEBPACK_IMPORTED_MODULE_5__["NgOtpInputModule"]]
      })], AuthModule);
      /***/
    },

    /***/
    "JIXP":
    /*!*************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/auth/rest-password/rest-password.component.html ***!
      \*************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function JIXP(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<c-container>\n    <c-row class=\"justify-content-center\">\n        <c-col md=\"6\">\n            <c-card-group>\n                <c-card class=\"p-4\">\n                    <c-card-body>\n                        <form [formGroup]=\"resetPasswordForm\" novalidate class=\"needs-validation\">\n                            <h1>Create Password</h1>\n                            <div class=\"input-group mb-3\">\n                                <input cInput id=\"name\" formControlName=\"password\" [type]=\"passwordType\"\n                                    placeholder=\"New Password\"\n                                    [ngClass]=\"{ 'is-invalid':  (submitted || f.password.touched) && f.password.invalid, 'is-valid': f.password.touched && f.password.valid }\">\n\n                                <div class=\"input-group-append\">\n                                    <span class=\"input-group-text\">\n                                        <i [class]=\"passwordIcon\" aria-hidden=\"true\" (click)=\"togglePassword()\"></i>\n                                    </span>\n                                </div>\n                                <div *ngIf=\"submitted && f['password'].invalid\" class=\"invalid-feedback\">\n                                    <div *ngIf=\"f['password'].errors.required\">Password is required</div>\n                                    <div *ngIf=\"f['password'].errors.minlength\">\n                                        {{formErrors.password.minLength}}</div>\n                                    <div *ngIf=\"f['password'].errors.pattern\">\n                                        {{formErrors.password.pattern}}</div>\n                                </div>\n                            </div>\n\n                            <div class=\"input-group mb-3\">\n                                <input cInput id=\"cPassword\" formControlName=\"confirmPassword\" [type]=\"cPasswordType\"\n                                    placeholder=\"Confirm New Password\"\n                                    [ngClass]=\"{ 'is-invalid': submitted && resetPasswordForm.errors, 'is-valid': f.confirmPassword.touched && !resetPasswordForm.errors }\">\n\n                                <div class=\"input-group-append\">\n                                    <span class=\"input-group-text\">\n                                        <i [class]=\"cPasswordIcon\" aria-hidden=\"true\" (click)=\"cTogglePassword()\"></i>\n                                    </span>\n                                </div>\n                                <div *ngIf=\"submitted && resetPasswordForm.errors\" class=\"invalid-feedback d-block\">\n                                    <div *ngIf=\"resetPasswordForm.errors['passwordMismatch']\">\n                                        {{formErrors.confirmPassword.passwordMismatch}}</div>\n                                </div>\n                            </div>\n                            <c-row>\n                                <c-col col=\"6\">\n                                    <button cButton type=\"submit\" color=\"primary\" size=\"md\" class=\"mfe-1\"\n                                        (click)=\"onSubmit()\">\n                                        <span> Reset Password</span>\n                                    </button>\n                                </c-col>\n                            </c-row>\n                            <div\n                                [ngClass]=\"{'errorRes' : gs.resMassage.status == 'error', 'succassRes' : gs.resMassage.status == 'success'}\">\n                                {{gs.resMassage.massage || ''}}\n                            </div>\n                        </form>\n                    </c-card-body>\n                </c-card>\n            </c-card-group>\n        </c-col>\n    </c-row>\n</c-container>";
      /***/
    },

    /***/
    "KD9G":
    /*!*********************************************************************!*\
      !*** ./src/app/views/auth/rest-password/rest-password.component.ts ***!
      \*********************************************************************/

    /*! exports provided: confirmPasswordValidator, RestPasswordComponent */

    /***/
    function KD9G(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "confirmPasswordValidator", function () {
        return confirmPasswordValidator;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RestPasswordComponent", function () {
        return RestPasswordComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_rest_password_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./rest-password.component.html */
      "JIXP");
      /* harmony import */


      var _rest_password_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./rest-password.component.scss */
      "+aBe");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "8Y7J");
      /* harmony import */


      var _services_http_req_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../services/http-req.service */
      "J+oG");
      /* harmony import */


      var _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../services/validation-forms.service */
      "ElzS");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      "iInd");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/forms */
      "s7LF");
      /* harmony import */


      var _services_global_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../services/global.service */
      "4WDQ");
      /** passwords must match - custom validator */


      var confirmPasswordValidator = function confirmPasswordValidator(control) {
        var password = control.get("password");
        var confirm = control.get("confirmPassword");
        return password && confirm && password.value === confirm.value ? null : {
          passwordMismatch: true
        };
      };

      var RestPasswordComponent = /*#__PURE__*/function () {
        function RestPasswordComponent(fb, vf, httpReqService, router, gs) {
          _classCallCheck(this, RestPasswordComponent);

          this.fb = fb;
          this.vf = vf;
          this.httpReqService = httpReqService;
          this.router = router;
          this.gs = gs;
          this.cAppClass = "c-app flex-row align-items-center";
          this.submitted = false;
          this.passwordType = "password";
          this.passwordIcon = "fa fa-eye-slash";
          this.cPasswordType = "password";
          this.cPasswordIcon = "fa fa-eye-slash";
          this.httpReqService.clearMassage();
          this.formErrors = this.vf.errorMessages;
          this.createForm();
        }

        _createClass(RestPasswordComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "createForm",
          value: function createForm() {
            this.resetPasswordForm = this.fb.group({
              password: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].minLength(this.vf.formRules.passwordMin), _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].pattern(this.vf.formRules.passwordPattern)]],
              confirmPassword: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]]
            }, {
              validators: confirmPasswordValidator
            });
          } // convenience getter for easy access to form fields

        }, {
          key: "f",
          get: function get() {
            return this.resetPasswordForm.controls;
          }
        }, {
          key: "onValidate",
          value: function onValidate() {
            this.submitted = true; // stop here if form is invalid

            return this.resetPasswordForm.status === "VALID";
          }
        }, {
          key: "onSubmit",
          value: function onSubmit() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _this3 = this;

              var authData, response;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!this.onValidate()) {
                        _context3.next = 7;
                        break;
                      }

                      authData = {
                        password: this.resetPasswordForm.value.password,
                        confirmPassword: this.resetPasswordForm.value.confirmPassword,
                        email: JSON.parse(localStorage.getItem("email"))
                      };
                      this.resetPasswordForm.value.email = JSON.parse(localStorage.getItem("email"));
                      _context3.next = 5;
                      return this.httpReqService.post("users/resetPassword", this.resetPasswordForm.value, true);

                    case 5:
                      response = _context3.sent;

                      if (response && response.status == 1) {
                        this.gs.resMassage.message = response.message;
                        this.gs.resMassage.message = "success";
                        this.httpReqService.hideMassege();
                        this.resetPasswordForm.reset();
                        this.submitted = false;
                        localStorage.removeItem("email");
                        setTimeout(function () {
                          _this3.router.navigate(["auth/login"]);
                        }, 1000);
                      } else {
                        this.gs.resMassage.message = response.message;
                        this.gs.resMassage.message = "error";
                        window.scroll(0, 0);
                      } // this.resetPasswordForm.value.email = localStorage.getItem('email');
                      // const response: any = await this.httpReqService.post('users/changePassword', this.resetPasswordForm.value, true);
                      // if (response) {
                      //   this.resetPasswordForm.reset();
                      //   this.submitted = false;
                      // }


                    case 7:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "togglePassword",
          value: function togglePassword() {
            this.passwordType = this.passwordType === "password" ? "text" : "password";
            this.passwordIcon = this.passwordIcon === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
          }
        }, {
          key: "cTogglePassword",
          value: function cTogglePassword() {
            this.cPasswordType = this.cPasswordType === "password" ? "text" : "password";
            this.cPasswordIcon = this.cPasswordIcon === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
          }
        }]);

        return RestPasswordComponent;
      }();

      RestPasswordComponent.ctorParameters = function () {
        return [{
          type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"]
        }, {
          type: _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_5__["ValidationFormsService"]
        }, {
          type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_4__["HttpReqService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]
        }, {
          type: _services_global_service__WEBPACK_IMPORTED_MODULE_8__["GlobalService"]
        }];
      };

      RestPasswordComponent.propDecorators = {
        cAppClass: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ["class"]
        }]
      };
      RestPasswordComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-rest-password",
        template: _raw_loader_rest_password_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_rest_password_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], RestPasswordComponent);
      /***/
    },

    /***/
    "LLyo":
    /*!*******************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/auth/verify-otp/verify-otp.component.html ***!
      \*******************************************************************************************************/

    /*! exports provided: default */

    /***/
    function LLyo(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<c-container>\n  <c-row class=\"justify-content-center\">\n    <c-col md=\"6\">\n      <c-card-group>\n        <c-card class=\"p-4\">\n          <c-card-body>\n            <form\n              [formGroup]=\"verifyOtpForm\"\n              novalidate\n              (ngSubmit)=\"onSubmit()\"\n              class=\"needs-validation\"\n            >\n              <h3>Please enter 5 digit passcode that was sent to your mail</h3>\n              <div class=\"input-group mb-3\">\n                <ng-otp-input\n                  class=\"text-center\"\n                  (onInputChange)=\"onOtpChange($event)\"\n                  [config]=\"{ length: 5 }\"\n                >\n                </ng-otp-input>\n              </div>\n              <c-row>\n                <c-col col=\"6\">\n                  <button\n                    cButton\n                    color=\"primary\"\n                    class=\"px-4\"\n                    type=\"submit\"\n                    [disabled]=\"false\"\n                  >\n                    Verify\n                  </button>\n                </c-col>\n                <c-col col=\"6\" class=\"text-right\">\n                  <button\n                    cButton\n                    color=\"link\"\n                    class=\"px-0\"\n                    (click)=\"resendOtp()\"\n                  >\n                    Resend Passcode\n                  </button>\n                </c-col>\n              </c-row>\n              <div\n                [ngClass]=\"{\n                  errorRes: gs.resMassage.status == 'error',\n                  succassRes: gs.resMassage.status == 'success'\n                }\"\n              >\n                {{ gs.resMassage.massage || \"\" }}\n              </div>\n            </form>\n          </c-card-body>\n        </c-card>\n      </c-card-group>\n    </c-col>\n  </c-row>\n</c-container>\n";
      /***/
    },

    /***/
    "LUN3":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/auth/login/login.component.html ***!
      \*********************************************************************************************/

    /*! exports provided: default */

    /***/
    function LUN3(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<c-container>\n  <c-row class=\"justify-content-center\">\n    <c-col md=\"6\">\n      <c-card-group>\n        <c-card class=\"p-4\">\n          <c-card-body>\n            <form\n              [formGroup]=\"loginForm\"\n              novalidate\n              (ngSubmit)=\"onSubmit()\"\n              class=\"needs-validation\"\n            >\n              <h1>Welcome to Trace N Track!</h1>\n              <p class=\"text-muted\">Please login to your account</p>\n              <div class=\"input-group mb-3\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">\n                    <c-icon name=\"cil-envelope-closed\" size=\"sm\"></c-icon>\n                  </span>\n                </div>\n                <input\n                  cInput\n                  placeholder=\"Email\"\n                  autocomplete=\"Email\"\n                  required\n                  formControlName=\"email\"\n                  [ngClass]=\"{\n                    'is-invalid':\n                      (submitted || f.email.touched) && f.email.invalid,\n                    'is-valid': f.email.touched && f.email.valid\n                  }\"\n                />\n                <div\n                  *ngIf=\"submitted && f['email'].invalid\"\n                  class=\"invalid-feedback\"\n                >\n                  <div *ngIf=\"f['email'].errors.required\">\n                    {{ formErrors.email.required }}\n                  </div>\n                  <div *ngIf=\"f['email'].errors.pattern\">\n                    {{ formErrors.email.email }}\n                  </div>\n                </div>\n              </div>\n              <div class=\"input-group mb-4\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\">\n                    <c-icon name=\"cil-lock-locked\"></c-icon>\n                  </span>\n                </div>\n                <input\n                  cInput\n                  type=\"password\"\n                  [type]=\"passwordType\"\n                  placeholder=\"Password\"\n                  autocomplete=\"current-password\"\n                  required\n                  formControlName=\"password\"\n                  [ngClass]=\"{\n                    'is-invalid':\n                      ((submitted || f.password.touched) && f.password.invalid) || (response && gs.resMassage.massage && gs.resMassage.status == 'error')\n                  }\"\n                />\n                <div class=\"input-group-append\">\n                  <span class=\"input-group-text\">\n                    <i\n                      [class]=\"passwordIcon\"\n                      aria-hidden=\"true\"\n                      (click)=\"togglePassword()\"\n                    ></i>\n                  </span>\n                </div>\n                <div\n                  *ngIf=\"submitted && f['password'].invalid\"\n                  class=\"invalid-feedback\"\n                >\n                  <div *ngIf=\"f['password'].errors.required\">\n                    Password is required\n                  </div>\n                  <div *ngIf=\"f['password'].errors.minlength\">\n                    {{ formErrors.password.minLength }}\n                  </div>\n                  <div *ngIf=\"f['password'].errors.pattern\">\n                    {{ formErrors.password.pattern }}\n                  </div>\n                </div>\n              </div>\n              <c-row>\n                <c-col col=\"6\">\n                  <button\n                    cButton\n                    color=\"primary\"\n                    class=\"px-4\"\n                    type=\"submit\"\n                    [disabled]=\"false\"\n                  >\n                    Login\n                  </button>\n                </c-col>\n                <c-col col=\"6\" class=\"text-right\">\n                  <button\n                    cButton\n                    color=\"link\"\n                    class=\"px-0\"\n                    routerLink=\"/auth/forgot-password\"\n                  >\n                    Forgot password?\n                  </button>\n                </c-col>\n              </c-row>\n            </form>\n            <div\n              [ngClass]=\"{\n                errorRes: gs.resMassage.status == 'error',\n                succassRes: gs.resMassage.status == 'success'\n              }\"\n            >\n              {{ response ? gs.resMassage.massage : \"\" }}\n            </div>\n          </c-card-body>\n        </c-card>\n      </c-card-group>\n    </c-col>\n  </c-row>\n</c-container>\n\n<div class=\"loading-indicator\" *ngIf=\"loading\">\n  <c-spinkit [name]=\"'bounce'\"></c-spinkit>\n</div>\n";
      /***/
    },

    /***/
    "T4Ux":
    /*!***************************************************************************!*\
      !*** ./src/app/views/auth/forgot-password/forgot-password.component.scss ***!
      \***************************************************************************/

    /*! exports provided: default */

    /***/
    function T4Ux(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MifQ== */";
      /***/
    },

    /***/
    "T7if":
    /*!*******************************************************!*\
      !*** ./src/app/views/auth/login/login.component.scss ***!
      \*******************************************************/

    /*! exports provided: default */

    /***/
    function T7if(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuc2NzcyJ9 */";
      /***/
    },

    /***/
    "XcGI":
    /*!***************************************************************!*\
      !*** ./src/app/views/auth/verify-otp/verify-otp.component.ts ***!
      \***************************************************************/

    /*! exports provided: VerifyOtpComponent */

    /***/
    function XcGI(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "VerifyOtpComponent", function () {
        return VerifyOtpComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_verify_otp_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./verify-otp.component.html */
      "LLyo");
      /* harmony import */


      var _verify_otp_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./verify-otp.component.scss */
      "qnoQ");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "8Y7J");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "s7LF");
      /* harmony import */


      var _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../services/validation-forms.service */
      "ElzS");
      /* harmony import */


      var _services_http_req_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../services/http-req.service */
      "J+oG");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      "iInd");
      /* harmony import */


      var _services_global_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../services/global.service */
      "4WDQ");

      var VerifyOtpComponent = /*#__PURE__*/function () {
        function VerifyOtpComponent(fb, vf, httpReqService, router, route, gs) {
          _classCallCheck(this, VerifyOtpComponent);

          this.fb = fb;
          this.vf = vf;
          this.httpReqService = httpReqService;
          this.router = router;
          this.route = route;
          this.gs = gs;
          this.cAppClass = "c-app flex-row align-items-center";
          this.submitted = false;
          this.httpReqService.clearMassage();
          this.formErrors = this.vf.errorMessages;
        }

        _createClass(VerifyOtpComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.createForm();

            if (this.route.snapshot.params.id) {
              console.log(this.route.snapshot.params.id);
              var current_date = new Date(Date.now());
              var email_token = this.route.snapshot.params.id;
              var json = this.getIDFromEmailToken(email_token);
              var difference = current_date.getTime() - json.milli_seconds;
              difference = difference / (3600 * 60 * 24);

              if (difference > 5) {
                this.router.navigate(["auth/login"]);
              } else {
                this.check_valid_link(json);
              }
            }
          }
        }, {
          key: "getIDFromEmailToken",
          value: function getIDFromEmailToken(email_token) {
            var server_token = "",
                id = "",
                milli = "";
            var milli_seconds = 0;
            var length = 30; // 13 milli seconds so * 2 => 26

            var milli_token = email_token.substr(0, length);
            var id_token = email_token.substr(length);

            for (var i = 0; i < length; i++) {
              if (i % 2 == 0) {
                milli = milli + milli_token.charAt(i);
              } else {
                server_token = server_token + milli_token.charAt(i);
              }
            }

            milli = milli.split("").reverse().join("");
            milli_seconds = parseInt(milli);
            length = id_token.length;

            for (var i = 0; i < length; i++) {
              if (i % 2 == 0) {
                id = id + id_token.charAt(i);
              } else {
                server_token = server_token + id_token.charAt(i);
              }
            }

            return {
              id: id,
              server_token: server_token,
              milli_seconds: milli_seconds
            };
          }
        }, {
          key: "check_valid_link",
          value: function check_valid_link(json) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var response;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return this.httpReqService.post("users/check_valid_detail", json, true);

                    case 2:
                      response = _context4.sent;

                      if (response.items && response.items.email) {
                        this.gs.resMassage.massage = '';
                        localStorage.setItem("email", JSON.stringify(response.items.email));
                      } else {
                        this.router.navigate(["auth/login"]);
                      }

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "onOtpChange",
          value: function onOtpChange(otp) {
            this.otp = otp;
          }
          /**
           * Create Login Form
           */

        }, {
          key: "createForm",
          value: function createForm() {
            this.verifyOtpForm = this.fb.group({
              otp: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]]
            });
          } // convenience getter for easy access to form fields

        }, {
          key: "f",
          get: function get() {
            return this.verifyOtpForm.controls;
          }
        }, {
          key: "onValidate",
          value: function onValidate() {
            this.submitted = true; // stop here if form is invalid

            return this.verifyOtpForm.status === "VALID";
          }
        }, {
          key: "onSubmit",
          value: function onSubmit() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var _this4 = this;

              var obj, response;
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      if (this.otp) {
                        _context5.next = 2;
                        break;
                      }

                      return _context5.abrupt("return");

                    case 2:
                      obj = {
                        otp: this.otp,
                        email: JSON.parse(localStorage.getItem("email"))
                      }; // if (this.onValidate()) {

                      _context5.next = 5;
                      return this.httpReqService.post("users/verifyOtp", obj, true);

                    case 5:
                      response = _context5.sent;

                      if (response && response.status == 1) {
                        this.gs.resMassage.message = response.message;
                        this.gs.resMassage.message = "success";
                        this.httpReqService.hideMassege();
                        setTimeout(function () {
                          _this4.router.navigate(["auth/reset-password"]);
                        }, 1000); // localStorage.setItem('accessToken', response.items.token);
                        // const decoded: any = jwt_decode(response.items.token);
                        // const obj = {
                        //   name: decoded.user.name
                        // };
                        // localStorage.setItem('currentUser', JSON.stringify(obj));
                        // this.authService.currentUserSubjet(response.items.token);
                      } else {
                        this.gs.resMassage.message = response.message;
                        this.gs.resMassage.message = "error";
                        window.scroll(0, 0);
                      } // }


                    case 7:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));
          }
        }, {
          key: "resendOtp",
          value: function resendOtp() {
            var obj = {
              email: JSON.parse(localStorage.getItem("email"))
            };
            var response = this.httpReqService.post("users/forgotPassword", obj, true);

            if (response) {// this.router.navigate(['auth/reset-password']);
            }
          }
        }]);

        return VerifyOtpComponent;
      }();

      VerifyOtpComponent.ctorParameters = function () {
        return [{
          type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
        }, {
          type: _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_5__["ValidationFormsService"]
        }, {
          type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_6__["HttpReqService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"]
        }, {
          type: _services_global_service__WEBPACK_IMPORTED_MODULE_8__["GlobalService"]
        }];
      };

      VerifyOtpComponent.propDecorators = {
        cAppClass: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ["class"]
        }]
      };
      VerifyOtpComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-verify-otp",
        template: _raw_loader_verify_otp_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_verify_otp_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], VerifyOtpComponent);
      /***/
    },

    /***/
    "qnoQ":
    /*!*****************************************************************!*\
      !*** ./src/app/views/auth/verify-otp/verify-otp.component.scss ***!
      \*****************************************************************/

    /*! exports provided: default */

    /***/
    function qnoQ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2ZXJpZnktb3RwLmNvbXBvbmVudC5zY3NzIn0= */";
      /***/
    }
  }]);
})();
//# sourceMappingURL=views-auth-auth-module-es5.js.map