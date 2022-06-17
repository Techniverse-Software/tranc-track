(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-role-permission-role-permission-module"],{

/***/ "4n19":
/*!********************************************************************!*\
  !*** ./src/app/views/role-permission/role-permission.component.ts ***!
  \********************************************************************/
/*! exports provided: RolePermissionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolePermissionComponent", function() { return RolePermissionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_role_permission_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./role-permission.component.html */ "YHT1");
/* harmony import */ var _role_permission_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./role-permission.component.scss */ "lWQV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/http-req.service */ "J+oG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/validation-forms.service */ "ElzS");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../services/global.service */ "4WDQ");









let RolePermissionComponent = class RolePermissionComponent {
    constructor(httpReqService, fb, vf, router, route, gs) {
        this.httpReqService = httpReqService;
        this.fb = fb;
        this.vf = vf;
        this.router = router;
        this.route = route;
        this.gs = gs;
        this.submitted = false;
        this.roleArr = ['Admin',
            'Super Admin',
            'Scanner',
            'Intaller',
            'ScannerAndInstaller',
            'Resellers',
            'Organization Manager'];
        this.permissionArr = [{
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
        this.allPermissionArr = [];
        this.permissions = [];
        this.gridOption = {
            allrecords: true,
            sortField: 'role',
            sortOrder: 'asc',
        };
        this.httpReqService.clearMassage();
    }
    ngOnInit() {
        this.createForm();
        this.formErrors = this.vf.errorMessages;
        this.allPermissionArr = this.permissionArr.map(a => (Object.assign({}, a)));
    }
    /**
     * Create profile form
     */
    createForm() {
        this.permissionForm = this.fb.group({
            role: [
                '',
                [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required,
                ],
            ],
            permissions: ['', [
                // Validators.required,
                ]],
        });
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
    changeRole() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.permissionArr = this.allPermissionArr.map(a => (Object.assign({}, a)));
            const response = yield this.httpReqService.post('rolePermission/roleWiseGetPermission', this.permissionForm.value, false);
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
        });
    }
    changeCheckbox(permission) {
        this.permissionArr[permission].checked = !this.permissionArr[permission].checked;
    }
    save() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
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
                const response = yield this.httpReqService.post('rolePermission/create', obj, true);
                if (response) {
                    this.submitted = false;
                    this.permissionForm.reset();
                    this.permissionArr = this.allPermissionArr.map(a => (Object.assign({}, a)));
                }
            }
        });
    }
    filterData(event, type) {
        const val = event.target.value;
        if (event.target.value) {
            this.role = val;
        }
    }
};
RolePermissionComponent.ctorParameters = () => [
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_4__["HttpReqService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
    { type: _services_validation_forms_service__WEBPACK_IMPORTED_MODULE_6__["ValidationFormsService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
    { type: _services_global_service__WEBPACK_IMPORTED_MODULE_8__["GlobalService"] }
];
RolePermissionComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-role-permission',
        template: _raw_loader_role_permission_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_role_permission_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], RolePermissionComponent);



/***/ }),

/***/ "Y+/m":
/*!*****************************************************************!*\
  !*** ./src/app/views/role-permission/role-permission.module.ts ***!
  \*****************************************************************/
/*! exports provided: RolePermissionModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolePermissionModule", function() { return RolePermissionModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _role_permission_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./role-permission.component */ "4n19");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _coreui_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @coreui/angular */ "Iluq");
/* harmony import */ var _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @coreui/icons-angular */ "rVqu");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "s7LF");








const route = [
    {
        path: '',
        data: {
            title: 'Role-permission',
        },
        children: [
            {
                path: '',
                redirectTo: 'role-permission',
            },
            {
                path: '',
                data: {
                    title: '',
                },
                component: _role_permission_component__WEBPACK_IMPORTED_MODULE_3__["RolePermissionComponent"]
            },
        ]
    }
];
let RolePermissionModule = class RolePermissionModule {
};
RolePermissionModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _role_permission_component__WEBPACK_IMPORTED_MODULE_3__["RolePermissionComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(route),
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["CardModule"],
            _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_6__["IconModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["GridModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["ButtonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["FormModule"]
        ]
    })
], RolePermissionModule);



/***/ }),

/***/ "YHT1":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/role-permission/role-permission.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"fade-in\">\n    <c-row>\n        <c-col md=\"12\">\n            <c-card>\n                <c-card-header>\n                    <strong>Role Wise Permission</strong>\n                </c-card-header>\n                <c-card-body>\n                    <form class=\"form-horizontal needs-validation\" [formGroup]=\"permissionForm\" novalidate>\n                        <c-form-group cRow>\n                            <label cLabel=\"col\" cCol md=\"3\" for=\"text-input\">Role</label>\n                            <c-col md=\"9\">\n                                <select cSelect id=\"select1\" (change)=\"changeRole()\" formControlName=\"role\">\n                                    <option value='' selected>Choose Role</option>\n                                    <option [value]=\"role\" *ngFor=\"let role of roleArr\"> {{role}}\n                                    </option>\n                                </select>\n                                <div *ngIf=\"submitted && f['role'].invalid\" class=\"invalid-feedback d-block\">\n                                    <div *ngIf=\"f['role'].errors.required\">\n                                        {{formErrors.role.required}}\n                                    </div>\n                                </div>\n                            </c-col>\n                        </c-form-group>\n                        <c-form-group cRow class=\"text-editor\">\n                            <label cLabel=\"col\" cCol md=\"3\" for=\"text-input\">Permission</label>\n                            <c-col md=\"9\">\n                                <c-form-check inline custom variant=\"checkbox\" class=\"mfe-3\"\n                                    *ngFor=\"let permission of permissionArr; let i = index;\">\n                                    <!-- <c-col md=\"9\"> -->\n                                    <input cInput formControlName=\"permissions\" type=\"checkbox\"\n                                        id=\"permission{{permission.slug}}\" (change)=\"changeCheckbox(i)\" value=\"option1\"\n                                        name=\"permissionOptions\" [checked]=\"permission.checked\"\n                                        class=\"custom-control-input\">\n                                    <label class=\"custom-control-label\" for=\"permission{{permission.slug}}\">\n                                        {{permission.name}}</label>\n                                </c-form-check>\n                                <!-- <div *ngIf=\"submitted && f['permissions'].invalid\" class=\"invalid-feedback d-block\">\n                                    <div *ngIf=\"f['permissions'].errors.required\">\n                                        {{formErrors.permissions.required}}\n                                    </div>\n                                </div> -->\n                            </c-col>\n                        </c-form-group>\n                    </form>\n                </c-card-body>\n                <c-card-footer>\n                    <button cButton type=\"submit\" color=\"primary\" size=\"md\" class=\"mfe-1\" (click)=\"save()\">\n                        <c-icon name=\"cil-check-circle\" size=\"sm\"></c-icon>\n                        <span> Submit</span>\n                    </button>\n                </c-card-footer>\n                <div class=\"massegeCls\"\n                    [ngClass]=\"{'errorRes' : gs.resMassage.status == 'error', 'succassRes' : gs.resMassage.status == 'success'}\">\n                    {{gs.resMassage.massage || ''}}\n                </div>\n            </c-card>\n        </c-col>\n    </c-row>\n</div>");

/***/ }),

/***/ "lWQV":
/*!**********************************************************************!*\
  !*** ./src/app/views/role-permission/role-permission.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".form-check {\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3JvbGUtcGVybWlzc2lvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFBO0FBQ0oiLCJmaWxlIjoicm9sZS1wZXJtaXNzaW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tY2hlY2t7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi8vIC5mb3JtLWNoZWNrLWlucHV0e1xuLy8gICAgIG1hcmdpbjogNXB4O1xuLy8gfSJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=views-role-permission-role-permission-module-es2015.js.map