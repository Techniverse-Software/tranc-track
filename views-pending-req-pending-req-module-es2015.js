(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-pending-req-pending-req-module"],{

/***/ "0HRm":
/*!************************************************************************************!*\
  !*** ./src/app/views/pending-req/pending-req-list/pending-req-list.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-table {\n  width: 100%;\n}\n\ni {\n  height: 16px;\n  font-size: 22px;\n  cursor: pointer;\n}\n\n.ar-id {\n  min-width: 18% !important;\n}\n\n.o-id {\n  min-width: 8% !important;\n}\n\n.ar-email {\n  min-width: 30% !important;\n}\n\n.ar-name {\n  min-width: 19% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BlbmRpbmctcmVxLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0FBQ0o7O0FBQ0E7RUFDSSx3QkFBQTtBQUVKOztBQUFBO0VBQ0kseUJBQUE7QUFHSjs7QUFEQTtFQUNDLHlCQUFBO0FBSUQiLCJmaWxlIjoicGVuZGluZy1yZXEtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC10YWJsZSB7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbml7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hci1pZHtcbiAgICBtaW4td2lkdGg6IDE4JSAhaW1wb3J0YW50O1xufVxuLm8taWR7XG4gICAgbWluLXdpZHRoOiA4JSAhaW1wb3J0YW50O1xufVxuLmFyLWVtYWlse1xuICAgIG1pbi13aWR0aDogMzAlICFpbXBvcnRhbnQ7XG59XG4uYXItbmFtZXtcblx0bWluLXdpZHRoOiAxOSUgIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "ED+E":
/*!**********************************************************************************!*\
  !*** ./src/app/views/pending-req/pending-req-list/pending-req-list.component.ts ***!
  \**********************************************************************************/
/*! exports provided: PendingReqListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingReqListComponent", function() { return PendingReqListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pending_req_list_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pending-req-list.component.html */ "e+k3");
/* harmony import */ var _pending_req_list_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pending-req-list.component.scss */ "0HRm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/paginator */ "5QHs");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sort */ "LUZP");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/table */ "OaSA");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "LqlI");
/* harmony import */ var _partial_modals_delete_modal_delete_modal_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../partial/modals/delete-modal/delete-modal.component */ "6Jid");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-socket-io */ "RH9n");













let PendingReqListComponent = class PendingReqListComponent {
    constructor(httpReqService, modalService, authService, router, socket) {
        this.httpReqService = httpReqService;
        this.modalService = modalService;
        this.authService = authService;
        this.router = router;
        this.socket = socket;
        this.gridOption = {
            pagesize: 10,
            search: "",
            filter: {},
            skip: 0,
            limit: 10,
            allrecords: false,
            sortField: "",
            sortOrder: "",
        };
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
        this.dataSource1 = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
        this.dataSource2 = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
        this.dataSource3 = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
        this.dataSource4 = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
        this.logindisplayedColumns = [
            "userDetail.name",
            "userDetail.email",
            "status",
            "action",
        ];
        this.namedisplayedColumns = [
            "userDetail.name",
            "name",
            "status",
            "action",
        ];
        this.uniquedevicedisplayedColumns = [
            "userDetail.name",
            "uniqueDevice",
            "status",
            "action",
        ];
        this.emaildisplayedColumns = [
            "userDetail.email",
            "email",
            "status",
            "action",
        ];
        this.organizationdisplayedColumns = [
            "userDetail.organizationId",
            "userDetail.organizationname",
            "organizationId",
            "organizationname",
            "status",
            "action",
        ];
        this.permissionrArr = [];
        this.field = [
            "userDetail.name",
            "userDetail.email",
            "userDetail.organizationId",
        ];
        this.resellerArr = [];
        this.isSuperAdmin = false;
        this.activeTabNo = "0";
        this.loading = false;
        this.tabList = [
            { name: "User Sign-ups", tab: 1 },
            { name: "Name Changes", tab: 2 },
            { name: "Email Changes", tab: 3 },
            { name: "Organization Changes", tab: 4 },
            { name: "New Device Changes", tab: 5 },
        ];
        this.tab = 1;
    }
    ngOnInit() {
        this.loading = true;
        this.dataSource.sort = this.sort;
        this.dataSource1.sort = this.sort;
        this.dataSource2.sort = this.sort;
        this.dataSource3.sort = this.sort;
        this.dataSource4.sort = this.sort;
        this.gridOption.filter = {
            status: { $in: [0, 1, 2] },
            tab: {
                $and: [{ email: { $ne: null } }, { organizationId: { $ne: null } }],
            },
        };
        this.tokenData = this.authService.decodeToken();
        this.tokenData = this.tokenData.user;
        this.getPermissionList();
        this.socket.on("approval", (data) => {
            if (data) {
                this.getData();
            }
        });
    }
    onactive(tab) {
        this.tab = tab;
        this.paginator.pageIndex = 0;
        this.gridOption.skip = 0;
        this.gridOption.limit = 10;
        this.dataSource.paginator = this.paginator ? this.paginator : null;
        this.dataSource1.paginator = this.paginator ? this.paginator : null;
        this.dataSource2.paginator = this.paginator ? this.paginator : null;
        this.dataSource3.paginator = this.paginator ? this.paginator : null;
        this.dataSource4.paginator = this.paginator ? this.paginator : null;
        this.getData();
    }
    ngAfterContentInit() {
        this.dataSource.paginator = this.paginator ? this.paginator : null;
        this.dataSource1.paginator = this.paginator ? this.paginator : null;
        this.dataSource2.paginator = this.paginator ? this.paginator : null;
        this.dataSource3.paginator = this.paginator ? this.paginator : null;
        this.dataSource4.paginator = this.paginator ? this.paginator : null;
    }
    ngOnDestroy() {
        /* this.socket.removeListener('approval'); */
    }
    getData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            this.gridOption.sortField = this.sort ? this.sort.active : "";
            this.gridOption.sortOrder = this.sort ? this.sort.direction : "";
            this.gridOption.filter["user_id"] = this.tokenData._id;
            this.gridOption.filter["adminId"] = this.tokenData._id;
            if (this.tab == 1) {
                this.gridOption.filter.tab = {
                    $and: [{ email: { $ne: null } }, { organizationId: { $ne: null } }],
                };
            }
            else if (this.tab == 2) {
                this.gridOption.filter.tab = { $and: [{ name: { $ne: null } }] };
            }
            else if (this.tab == 3) {
                this.gridOption.filter.tab = {
                    $and: [{ email: { $ne: null } }, { organizationId: { $eq: null } }],
                };
            }
            else if (this.tab == 4) {
                this.gridOption.filter.tab = {
                    $and: [{ email: { $eq: null } }, { organizationId: { $ne: null } }],
                };
            }
            else if (this.tab == 5) {
                this.gridOption.filter.tab = { $and: [{ uniqueDevice: { $ne: null } }] };
            }
            const response = yield this.httpReqService.post("approval/list", this.gridOption, false);
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](response.items);
            this.dataSource1 = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](response.items);
            this.dataSource2 = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](response.items);
            this.dataSource3 = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](response.items);
            this.dataSource4 = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](response.items);
            this.resultsLength = response.totalCount;
            this.loading = false;
        });
    }
    sortChange() {
        this.gridOption.limit = this.paginator.pageSize;
        this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
        this.gridOption.sortField = this.sort.active;
        this.gridOption.sortOrder = this.sort.direction;
        this.paginator.pageIndex = 0;
        this.getData();
    }
    pageChange() {
        this.gridOption.limit = this.paginator.pageSize;
        this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
        this.getData();
    }
    search(event) {
        let filterValue = event.target.value;
        if (filterValue) {
            filterValue = filterValue.trim(); // Remove whitespace
            filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
            this.gridOption.searchfields = this.field;
        }
        else {
            delete this.gridOption.searchfields;
            filterValue = "";
        }
        this.gridOption.search = filterValue;
        this.pagesetUp();
        this.getData();
    }
    delete(data) {
        const initialState = {
            title: "Reject Request",
            message: "Are you sure you want to reject this request?",
            list: data,
        };
        this.modalRef = this.modalService.show(_partial_modals_delete_modal_delete_modal_component__WEBPACK_IMPORTED_MODULE_9__["DeleteModalComponent"], {
            class: "modal-xl modal-dialog-centered",
            initialState,
            backdrop: "static",
            keyboard: false,
        });
        this.modalRef.content.cancleButtonText = "Cancel";
        this.modalRef.content.deleteButtonText = "Reject";
        this.modalRef.content.url = "approval";
        this.modalRef.content.isRejectReq = true;
        this.modalRef.content.is_status_change = false;
        this.modalRef.content.response.subscribe((result) => {
            if (result) {
                this.getData();
            }
        });
    }
    pagesetUp() {
        this.paginator.pageIndex = 0;
        this.gridOption.limit = this.paginator.pageSize;
        this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
        this.gridOption.sortField = this.sort.active;
        this.gridOption.sortOrder = this.sort.direction;
    }
    changeStatus(e) {
        const statusValue = e.target.value;
        if (statusValue == 0 || statusValue == 1 || statusValue == 2) {
            this.gridOption.filter.status = Number(statusValue);
        }
        else {
            this.gridOption.filter.status = { $in: [0, 1, 2] };
        }
        this.pagesetUp();
        this.getData();
    }
    updateReqStatus(data, statusValue) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const obj = { _id: data._id, status: statusValue };
            if (statusValue === 2) {
                this.delete(obj);
            }
            else {
                const response = yield this.httpReqService.put("approval", obj);
                if (response) {
                    this.router.navigate(["/user/update", data.userId]);
                }
            }
        });
    }
    getPermissionList() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            let user = this.tokenData;
            if (user != null) {
                if (user.organizationId == null) {
                    this.tabList = [
                        { name: "Name Changes", tab: 2 },
                        { name: "Email Changes", tab: 3 },
                    ];
                    this.activeTabNo = "0";
                    this.isSuperAdmin = true;
                    this.tab = 2;
                }
            }
            this.loading = false;
            this.getData();
        });
    }
};
PendingReqListComponent.ctorParameters = () => [
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_11__["HttpReqService"] },
    { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["BsModalService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_10__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
    { type: ngx_socket_io__WEBPACK_IMPORTED_MODULE_12__["Socket"] }
];
PendingReqListComponent.propDecorators = {
    paginator: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"],] }],
    sort: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"],] }]
};
PendingReqListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-pending-req-list",
        template: _raw_loader_pending_req_list_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pending_req_list_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PendingReqListComponent);



/***/ }),

/***/ "cmLA":
/*!*********************************************************!*\
  !*** ./src/app/views/pending-req/pending-req.module.ts ***!
  \*********************************************************/
/*! exports provided: PendingReqModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingReqModule", function() { return PendingReqModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _pending_req_list_pending_req_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pending-req-list/pending-req-list.component */ "ED+E");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/paginator */ "5QHs");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/sort */ "LUZP");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ "OaSA");
/* harmony import */ var _coreui_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @coreui/angular */ "Iluq");
/* harmony import */ var _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @coreui/icons-angular */ "rVqu");
/* harmony import */ var ngx_tippy_wrapper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-tippy-wrapper */ "xw+3");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ng-select/ng-select */ "wTG2");











// Ng2-select

const route = [
    {
        path: '',
        data: {
            title: 'Alerts',
        },
        children: [
            {
                path: '',
                redirectTo: 'approval-req',
            },
            {
                path: '',
                data: {
                    title: '',
                },
                component: _pending_req_list_pending_req_list_component__WEBPACK_IMPORTED_MODULE_3__["PendingReqListComponent"]
            },
        ]
    }
];
let PendingReqModule = class PendingReqModule {
};
PendingReqModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _pending_req_list_pending_req_list_component__WEBPACK_IMPORTED_MODULE_3__["PendingReqListComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(route),
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["CardModule"],
            _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_9__["IconModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["GridModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["FormModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["ButtonModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["ImgModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["TabsetModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"],
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_6__["MatSortModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["SwitchModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["ModalModule"],
            ngx_tippy_wrapper__WEBPACK_IMPORTED_MODULE_10__["NgxTippyModule"],
            _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_11__["NgSelectModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["BadgeModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_8__["SpinkitModule"],
        ]
    })
], PendingReqModule);



/***/ }),

/***/ "e+k3":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/pending-req/pending-req-list/pending-req-list.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"loading-indicator\" *ngIf=\"loading\">\n    <c-spinkit [name]=\"'bounce'\"></c-spinkit>\n</div>\n<div class=\"fade-in\">\n    <c-card class=\"p-0\">\n        <c-card-body class=\"p-0\">\n            <c-tabset boxed=\"true\" [activeTab]='activeTabNo'>\n\n                <c-tablist class=\"pt-2 px-2\">\n                    <c-tab *ngFor=\"let tab of tabList;let index=index;\" (click)=\"onactive(tab.tab)\" >\n                        {{ tab.name }}\n                    </c-tab>\n                </c-tablist>\n\n                <c-tab-content>\n                    <ng-container *ngIf=\"!isSuperAdmin\">\n                        <c-tab-pane>\n                            <c-row class=\"mb-3\">\n                                <c-col md=\"4\">\n                                    <div class=\"input-group\">\n                                        <div class=\"input-group-prepend\">\n                                            <span class=\"input-group-text\"><i class=\"cil-search\"></i></span>\n                                        </div>\n                                        <input cInput placeholder=\"Search here...\" (input)=\"search($event)\" />\n                                    </div>\n                                </c-col>\n                                <c-col md=\"4\">\n                                    <div class=\"input-group d-flex align-items-center\">\n                                        <label class=\"mb-0\"> Status: &nbsp;</label>\n                                        <select cSelect id=\"select1\" (change)=\"changeStatus($event)\">\n                                            <option [value]=\"'all'\" selected>All</option>\n                                            <option [value]=\"0\"> Pending</option>\n                                            <option [value]=\"1\"> Approved</option>\n                                            <option [value]=\"2\"> Rejected</option>\n                                        </select>\n                                    </div>\n                                </c-col>\n                            </c-row>\n                            <mat-table #table mat-table [dataSource]=\"dataSource\" matSort matSortActive=\"createdAt\"\n                                matSortDisableClear matSortDirection=\"desc\" class=\"mat-elevation-z8\"\n                                (matSortChange)=\"sortChange()\">\n\n                                <ng-container matColumnDef=\"userDetail.name\">\n                                    <mat-header-cell [ngClass]=\"'ar-name'\" *matHeaderCellDef mat-sort-header>Name\n                                    </mat-header-cell>\n                                    <mat-cell [ngClass]=\"'ar-name'\" *matCellDef=\"let element\">\n                                        {{element.name? element.name:element.userDetail.name |titlecase}}\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"userDetail.email\">\n                                    <mat-header-cell [ngClass]=\"'ar-email'\" *matHeaderCellDef >Email</mat-header-cell>\n                                    <mat-cell [ngClass]=\"'ar-email'\" *matCellDef=\"let element\">\n                                        {{element.email?element.email:element.userDetail.email}}\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"status\">\n                                    <mat-header-cell *matHeaderCellDef > Status </mat-header-cell>\n                                    <mat-cell *matCellDef=\"let element\" class=\"status-icon\">\n                                        <c-badge [color]=\"'success'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 1\">\n                                            Approved</c-badge>\n                                        <c-badge [color]=\"'danger'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 2\">\n                                            Rejected</c-badge>\n                                        <c-badge [color]=\"'warning'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 0\">\n                                            Pending</c-badge>\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"action\">\n                                    <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n                                    <mat-cell *matCellDef=\"let element\">\n                                        <button class=\"btn btn-sm btn-success\" *ngIf=\"element.status == 0\"\n                                            (click)=\"updateReqStatus(element,1)\">Approve</button>\n                                        <button class=\"btn btn-sm btn-danger\" style=\"margin-left: 20px;\"\n                                            *ngIf=\"element.status == 0\"\n                                            (click)=\"updateReqStatus(element,2)\">Reject</button>\n                                    </mat-cell>\n                                </ng-container>\n\n                                <mat-header-row *matHeaderRowDef=\"logindisplayedColumns\"></mat-header-row>\n                            \n                                <mat-row *matRowDef=\"let row; columns: logindisplayedColumns;\"\n                                   ></mat-row>\n                            </mat-table>\n                            \n                            <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">No records found\n                            </div>\n\n                            <div class=\"mat-table__bottom\">\n                                <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\"\n                                    [showFirstLastButtons] (page)=\"pageChange()\">\n                                </mat-paginator>\n                            </div>\n                        </c-tab-pane>\n                    </ng-container>\n\n                    <c-tab-pane>\n                        <c-row class=\"mb-3\">\n                            <c-col md=\"4\">\n                                <div class=\"input-group\">\n                                    <div class=\"input-group-prepend\">\n                                        <span class=\"input-group-text\"><i class=\"cil-search\"></i></span>\n                                    </div>\n                                    <input cInput placeholder=\"Search here...\" (input)=\"search($event)\" />\n                                </div>\n                            </c-col>\n                            <c-col md=\"4\">\n                                <div class=\"input-group d-flex align-items-center\">\n                                    <label class=\"mb-0\"> Status: &nbsp;</label>\n                                    <select cSelect id=\"select1\" (change)=\"changeStatus($event)\">\n                                        <option [value]=\"'all'\" selected>All</option>\n                                        <option [value]=\"0\"> Pending</option>\n                                        <option [value]=\"1\"> Approved</option>\n                                        <option [value]=\"2\"> Rejected</option>\n                                    </select>\n                                </div>\n                            </c-col>\n                        </c-row>\n                        \n                        <mat-table #table mat-table [dataSource]=\"dataSource1\" matSort matSortActive=\"createdAt\"\n                            matSortDisableClear matSortDirection=\"desc\" class=\"mat-elevation-z8\"\n                            (matSortChange)=\"sortChange()\">\n\n                            <ng-container matColumnDef=\"userDetail.name\">\n                                <mat-header-cell [ngClass]=\"'ar-name'\" *matHeaderCellDef mat-sort-header>Previous Name\n                                </mat-header-cell>\n                                <mat-cell [ngClass]=\"'ar-name'\" *matCellDef=\"let element\">\n                                    {{element.userDetail?element.old_name: '-' |titlecase}}\n                                </mat-cell>\n                            </ng-container>\n\n                            <ng-container matColumnDef=\"name\">\n                                <mat-header-cell [ngClass]=\"'ar-name'\" *matHeaderCellDef>Updated Name</mat-header-cell>\n                                <mat-cell [ngClass]=\"'ar-name'\" *matCellDef=\"let element\">\n                                    {{element.name? element.name:'-' |titlecase}}\n                                </mat-cell>\n                            </ng-container>\n\n                            <ng-container matColumnDef=\"status\">\n                                <mat-header-cell *matHeaderCellDef> Status </mat-header-cell>\n                                <mat-cell *matCellDef=\"let element\" class=\"status-icon\">\n                                    <c-badge [color]=\"'success'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 1\">\n                                        Approved</c-badge>\n                                    <c-badge [color]=\"'danger'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 2\">\n                                        Rejected</c-badge>\n                                    <c-badge [color]=\"'warning'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 0\">\n                                        Pending</c-badge>\n                                </mat-cell>\n                            </ng-container>\n\n                            <ng-container matColumnDef=\"action\">\n                                <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n                                <mat-cell *matCellDef=\"let element\">\n                                    <button class=\"btn btn-sm btn-success\" *ngIf=\"element.status == 0\"\n                                        (click)=\"updateReqStatus(element,1)\">Approve</button>\n                                    <button class=\"btn btn-sm btn-danger\" style=\"margin-left: 20px;\"\n                                        *ngIf=\"element.status == 0\" (click)=\"updateReqStatus(element,2)\">Reject</button>\n                                </mat-cell>\n                            </ng-container>\n\n                            <mat-header-row *matHeaderRowDef=\"namedisplayedColumns\"></mat-header-row>\n                            <mat-row *matRowDef=\"let row; columns: namedisplayedColumns;\" >\n                            </mat-row>\n                        </mat-table>\n                        <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">No records found</div>\n                        <div class=\"mat-table__bottom\">\n                            <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\"\n                                [showFirstLastButtons] (page)=\"pageChange()\">\n                            </mat-paginator>\n                        </div>\n                    </c-tab-pane>\n\n                    <c-tab-pane>\n                        <c-row class=\"mb-3\">\n                            <c-col md=\"4\">\n                                <div class=\"input-group\">\n                                    <div class=\"input-group-prepend\">\n                                        <span class=\"input-group-text\"><i class=\"cil-search\"></i></span>\n                                    </div>\n                                    <input cInput placeholder=\"Search here...\" (input)=\"search($event)\" />\n                                </div>\n                            </c-col>\n                            <c-col md=\"4\">\n                                <div class=\"input-group d-flex align-items-center\">\n                                    <label class=\"mb-0\"> Status: &nbsp;</label>\n                                    <select cSelect id=\"select1\" (change)=\"changeStatus($event)\">\n                                        <option [value]=\"'all'\" selected>All</option>\n                                        <option [value]=\"0\"> Pending</option>\n                                        <option [value]=\"1\"> Approved</option>\n                                        <option [value]=\"2\"> Rejected</option>\n                                    </select>\n                                </div>\n                            </c-col>\n                        </c-row>\n                        <mat-table #table mat-table [dataSource]=\"dataSource2\" matSort matSortActive=\"createdAt\"\n                            matSortDisableClear matSortDirection=\"desc\" class=\"mat-elevation-z8\"\n                            (matSortChange)=\"sortChange()\">\n\n                            <ng-container matColumnDef=\"userDetail.email\">\n                                <mat-header-cell [ngClass]=\"'ar-email'\" *matHeaderCellDef>Previous Email ID\n                                </mat-header-cell>\n                                <mat-cell [ngClass]=\"'ar-email'\" *matCellDef=\"let element\">\n                                    {{element.userDetail?element.old_email:'-'}}\n                                </mat-cell>\n                            </ng-container>\n\n                            <ng-container matColumnDef=\"email\">\n                                <mat-header-cell [ngClass]=\"'ar-email'\" *matHeaderCellDef mat-sort-header>Updated Email\n                                    ID </mat-header-cell>\n                                <mat-cell [ngClass]=\"'ar-email'\" *matCellDef=\"let element\">\n                                    {{element.email?element.email:'-'}}\n                                </mat-cell>\n                            </ng-container>\n\n                            <ng-container matColumnDef=\"status\">\n                                <mat-header-cell *matHeaderCellDef> Status </mat-header-cell>\n                                <mat-cell *matCellDef=\"let element\" class=\"status-icon\">\n                                    <c-badge [color]=\"'success'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 1\">\n                                        Approved</c-badge>\n                                    <c-badge [color]=\"'danger'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 2\">\n                                        Rejected</c-badge>\n                                    <c-badge [color]=\"'warning'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 0\">\n                                        Pending</c-badge>\n                                </mat-cell>\n                            </ng-container>\n\n                            <ng-container matColumnDef=\"action\">\n                                <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n                                <mat-cell *matCellDef=\"let element\">\n                                    <button class=\"btn btn-sm btn-success\" *ngIf=\"element.status == 0\"\n                                        (click)=\"updateReqStatus(element,1)\">Approve</button>\n                                    <button class=\"btn btn-sm btn-danger\" style=\"margin-left: 20px;\"\n                                        *ngIf=\"element.status == 0\" (click)=\"updateReqStatus(element,2)\">Reject</button>\n                                </mat-cell>\n                            </ng-container>\n\n                            <mat-header-row *matHeaderRowDef=\"emaildisplayedColumns\"></mat-header-row>\n                            <mat-row *matRowDef=\"let row; columns: emaildisplayedColumns;\"\n                                ></mat-row>\n                        </mat-table>\n                        <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">No records found</div>\n                        <div class=\"mat-table__bottom\">\n                            <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\"\n                                [showFirstLastButtons] (page)=\"pageChange()\">\n                            </mat-paginator>\n                        </div>\n                    </c-tab-pane>\n\n                    <ng-container *ngIf=\"!isSuperAdmin\">\n                        <c-tab-pane>\n                            <c-row class=\"mb-3\">\n                                <c-col md=\"4\">\n                                    <div class=\"input-group\">\n                                        <div class=\"input-group-prepend\">\n                                            <span class=\"input-group-text\"><i class=\"cil-search\"></i></span>\n                                        </div>\n                                        <input cInput placeholder=\"Search here...\" (input)=\"search($event)\" />\n                                    </div>\n                                </c-col>\n                                <c-col md=\"4\">\n                                    <div class=\"input-group d-flex align-items-center\">\n                                        <label class=\"mb-0\"> Status: &nbsp;</label>\n                                        <select cSelect id=\"select1\" (change)=\"changeStatus($event)\">\n                                            <option [value]=\"'all'\" selected>All</option>\n                                            <option [value]=\"0\"> Pending</option>\n                                            <option [value]=\"1\"> Approved</option>\n                                            <option [value]=\"2\"> Rejected</option>\n                                        </select>\n                                    </div>\n                                </c-col>\n                            </c-row>\n                            <mat-table #table mat-table [dataSource]=\"dataSource3\" matSort matSortActive=\"createdAt\"\n                                matSortDisableClear matSortDirection=\"desc\" class=\"mat-elevation-z8\"\n                                (matSortChange)=\"sortChange()\">\n\n                                <ng-container matColumnDef=\"userDetail.organizationId\">\n                                    <mat-header-cell [ngClass]=\"'o-id'\" *matHeaderCellDef mat-sort-header>Previous ID\n                                    </mat-header-cell>\n                                    <mat-cell [ngClass]=\"'o-id'\" *matCellDef=\"let element\">\n                                        {{element.userDetail?element.old_organizationId:'-'}}\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"userDetail.organizationname\">\n                                    <mat-header-cell [ngClass]=\"'ar-name'\" *matHeaderCellDef>Previous Organization\n                                    </mat-header-cell>\n                                    <mat-cell [ngClass]=\"'ar-name'\" *matCellDef=\"let element\">\n\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"organizationId\">\n                                    <mat-header-cell [ngClass]=\"'o-id'\" *matHeaderCellDef mat-sort-header>Updated ID\n                                    </mat-header-cell>\n                                    <mat-cell [ngClass]=\"'o-id'\" *matCellDef=\"let element\">\n                                        {{element.organizationId?element.organizationId:'-'}}\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"organizationname\">\n                                    <mat-header-cell [ngClass]=\"'ar-name'\" *matHeaderCellDef mat-sort-header>Updated\n                                        Organization</mat-header-cell>\n                                    <mat-cell [ngClass]=\"'ar-name'\" *matCellDef=\"let element\">\n\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"status\">\n                                    <mat-header-cell *matHeaderCellDef> Status </mat-header-cell>\n                                    <mat-cell *matCellDef=\"let element\" class=\"status-icon\">\n                                        <c-badge [color]=\"'success'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 1\">\n                                            Approved</c-badge>\n                                        <c-badge [color]=\"'danger'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 2\">\n                                            Rejected</c-badge>\n                                        <c-badge [color]=\"'warning'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 0\">\n                                            Pending</c-badge>\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"action\">\n                                    <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n                                    <mat-cell *matCellDef=\"let element\">\n                                        <button class=\"btn btn-sm btn-success\" *ngIf=\"element.status == 0\"\n                                            (click)=\"updateReqStatus(element,1)\">Approve</button>\n                                        <button class=\"btn btn-sm btn-danger\" style=\"margin-left: 20px;\"\n                                            *ngIf=\"element.status == 0\"\n                                            (click)=\"updateReqStatus(element,2)\">Reject</button>\n                                    </mat-cell>\n                                </ng-container>\n\n                                <mat-header-row *matHeaderRowDef=\"organizationdisplayedColumns\"></mat-header-row>\n                                <mat-row *matRowDef=\"let row; columns: organizationdisplayedColumns;\"\n                                    ></mat-row>\n                            </mat-table>\n                            <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">No records found\n                            </div>\n                            <div class=\"mat-table__bottom\">\n                                <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\"\n                                    [showFirstLastButtons] (page)=\"pageChange()\">\n                                </mat-paginator>\n                            </div>\n                        </c-tab-pane>\n\n                        <c-tab-pane>\n                            <c-row class=\"mb-3\">\n                                <c-col md=\"4\">\n                                    <div class=\"input-group\">\n                                        <div class=\"input-group-prepend\">\n                                            <span class=\"input-group-text\"><i class=\"cil-search\"></i></span>\n                                        </div>\n                                        <input cInput placeholder=\"Search here...\" (input)=\"search($event)\" />\n                                    </div>\n                                </c-col>\n                                <c-col md=\"4\">\n                                    <div class=\"input-group d-flex align-items-center\">\n                                        <label class=\"mb-0\"> Status: &nbsp;</label>\n                                        <select cSelect id=\"select1\" (change)=\"changeStatus($event)\">\n                                            <option [value]=\"'all'\" selected>All</option>\n                                            <option [value]=\"0\"> Pending</option>\n                                            <option [value]=\"1\"> Approved</option>\n                                            <option [value]=\"2\"> Rejected</option>\n                                        </select>\n                                    </div>\n                                </c-col>\n                            </c-row>\n                            <mat-table #table mat-table [dataSource]=\"dataSource4\" matSort matSortActive=\"createdAt\"\n                                matSortDisableClear matSortDirection=\"desc\" class=\"mat-elevation-z8\"\n                                (matSortChange)=\"sortChange()\">\n\n                                <ng-container matColumnDef=\"userDetail.name\">\n                                    <mat-header-cell [ngClass]=\"'ar-name'\" *matHeaderCellDef mat-sort-header>Name\n                                    </mat-header-cell>\n                                    <mat-cell [ngClass]=\"'ar-name'\" *matCellDef=\"let element\">\n                                        {{element.name? element.name:element.userDetail.name |titlecase}}\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"uniqueDevice\">\n                                    <mat-header-cell [ngClass]=\"'ar-name'\" *matHeaderCellDef>Unique Device\n                                    </mat-header-cell>\n                                    <mat-cell [ngClass]=\"'ar-name'\" *matCellDef=\"let element\">\n                                        {{element.uniqueDevice? element.uniqueDevice:'-'}}\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"status\">\n                                    <mat-header-cell *matHeaderCellDef> Status </mat-header-cell>\n                                    <mat-cell *matCellDef=\"let element\" class=\"status-icon\">\n                                        <c-badge [color]=\"'success'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 1\">\n                                            Approved</c-badge>\n                                        <c-badge [color]=\"'danger'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 2\">\n                                            Rejected</c-badge>\n                                        <c-badge [color]=\"'warning'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 0\">\n                                            Pending</c-badge>\n                                    </mat-cell>\n                                </ng-container>\n\n                                <ng-container matColumnDef=\"action\">\n                                    <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n                                    <mat-cell *matCellDef=\"let element\">\n                                        <button class=\"btn btn-sm btn-success\" *ngIf=\"element.status == 0\"\n                                            (click)=\"updateReqStatus(element,1)\">Approve</button>\n                                        <button class=\"btn btn-sm btn-danger\" style=\"margin-left: 20px;\"\n                                            *ngIf=\"element.status == 0\"\n                                            (click)=\"updateReqStatus(element,2)\">Reject</button>\n                                    </mat-cell>\n                                </ng-container>\n\n                                <mat-header-row *matHeaderRowDef=\"uniquedevicedisplayedColumns\"></mat-header-row>\n                                <mat-row *matRowDef=\"let row; columns: uniquedevicedisplayedColumns;\"\n                                    ></mat-row>\n                            </mat-table>\n                            <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">No records found\n                            </div>\n                            <div class=\"mat-table__bottom\">\n                                <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\"\n                                    [showFirstLastButtons] (page)=\"pageChange()\">\n                                </mat-paginator>\n                            </div>\n                        </c-tab-pane>\n                    </ng-container>\n\n                </c-tab-content>\n            </c-tabset>\n        </c-card-body>\n    </c-card>\n</div>\n\n<!--<div class=\"fade-in\">\n    <c-card>\n        <c-card-header class=\"d-flex align-items-center\">\n            <h4 class=\"mb-0\">Approval Requests List</h4>\n        </c-card-header>\n        <c-card-body>\n            <c-row class=\"mb-3\">\n                <c-col md=\"4\">\n                    <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                            <span class=\"input-group-text\"><i class=\"cil-search\"></i></span>\n                        </div>\n                        <input cInput placeholder=\"Search here...\" (input)=\"search($event)\" />\n                    </div>\n                </c-col>\n                <c-col md=\"4\">\n                    <div class=\"input-group d-flex align-items-center\">\n                        <label class=\"mb-0\"> Status: &nbsp;</label>\n                        <select cSelect id=\"select1\" (change)=\"changeStatus($event)\">\n                            <option [value]=\"'all'\" selected>All</option>\n                            <option [value]=\"0\"> Pending</option>\n                            <option [value]=\"1\"> Approved</option>\n                            <option [value]=\"2\"> Rejected</option>\n                        </select>\n                    </div>\n                </c-col>\n            </c-row>\n            <mat-table #table mat-table [dataSource]=\"dataSource\" matSort matSortActive=\"createdAt\" matSortDisableClear\n                matSortDirection=\"desc\" class=\"mat-elevation-z8\" (matSortChange)=\"sortChange()\">\n\n                <ng-container matColumnDef=\"userDetail.name\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>Old Name </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\">\n                        {{element.userDetail?element.userDetail.name: '-' |titlecase}}\n                    </mat-cell>\n                </ng-container>\n\n\n                <ng-container matColumnDef=\"userDetail.email\">\n                    <mat-header-cell *matHeaderCellDef>Old Email </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\">\n                        {{element.userDetail?element.userDetail.email:'-'}}\n                    </mat-cell>\n                </ng-container>\n\n\n                <ng-container matColumnDef=\"userDetail.organizationId\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>Old Organization Id</mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> {{element.userDetail?element.userDetail.organizationId:'-'}}\n                    </mat-cell>\n                </ng-container>\n\n                <ng-container matColumnDef=\"name\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>Name </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> {{element.name? element.name:'-' |titlecase}}\n                    </mat-cell>\n                </ng-container>\n                <ng-container matColumnDef=\"email\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>Email </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> {{element.email?element.email:'-'}}\n                    </mat-cell>\n                </ng-container>\n                <ng-container matColumnDef=\"organizationId\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>Organization Id </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> {{element.organizationId?element.organizationId:'-'}}\n                    </mat-cell>\n                </ng-container>\n\n                <ng-container matColumnDef=\"status\">\n                    <mat-header-cell *matHeaderCellDef> Status </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\" class=\"status-icon\">\n                        <c-badge [color]=\"'success'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 1\">\n                            Approved</c-badge>\n                        <c-badge [color]=\"'danger'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 2\">\n                            Rejected</c-badge>\n                        <c-badge [color]=\"'warning'\" class=\"mx-1 px-2 py-1\" *ngIf=\"element.status == 0\">\n                            Pending</c-badge>\n                    </mat-cell>\n                </ng-container>\n\n                <ng-container matColumnDef=\"action\">\n                    <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\">\n                        <button class=\"btn btn-block btn-sm btn-success\" *ngIf=\"element.status == 0\"\n                            (click)=\"updateReqStatus(element,1)\">Approve</button>\n                        <button class=\"btn btn-block btn-sm btn-danger\" *ngIf=\"element.status == 0\"\n                            (click)=\"updateReqStatus(element,2)\">Reject</button>\n                    </mat-cell>\n                </ng-container>\n\n                <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n            </mat-table>\n            <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">No records found</div>\n            <div class=\"mat-table__bottom\">\n                <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\" [showFirstLastButtons]\n                    (page)=\"pageChange()\">\n                </mat-paginator>\n            </div>\n        </c-card-body>\n    </c-card>\n</div>-->");

/***/ })

}]);
//# sourceMappingURL=views-pending-req-pending-req-module-es2015.js.map