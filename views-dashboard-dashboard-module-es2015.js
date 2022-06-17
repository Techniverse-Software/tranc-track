(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-dashboard-dashboard-module"],{

/***/ "6dU7":
/*!*****************************************************!*\
  !*** ./src/app/views/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.component */ "l70X");
/* harmony import */ var _coreui_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @coreui/angular */ "Iluq");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @coreui/icons-angular */ "rVqu");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/paginator */ "5QHs");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sort */ "LUZP");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ "OaSA");
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/google-maps */ "MIJf");
/* harmony import */ var ngx_tippy_wrapper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-tippy-wrapper */ "xw+3");
/* harmony import */ var _partial_partial_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../partial/partial.module */ "a0rN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _dashboard_count_dashboard_count_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dashboard-count/dashboard-count.component */ "IUv7");
/* harmony import */ var _table_view_table_view_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./table-view/table-view.component */ "934o");
/* harmony import */ var _map_view_map_view_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./map-view/map-view.component */ "H6Rb");









// import { TimeAgoPipe } from 'time-ago-pipe';







const route = [
    {
        path: '',
        component: _dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"],
        data: {
            title: 'Dashboard',
        },
    },
];
let DashboardModule = class DashboardModule {
};
DashboardModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"], _dashboard_count_dashboard_count_component__WEBPACK_IMPORTED_MODULE_13__["DashboardCountComponent"], _table_view_table_view_component__WEBPACK_IMPORTED_MODULE_14__["TableViewComponent"], _map_view_map_view_component__WEBPACK_IMPORTED_MODULE_15__["MapViewComponent"],],
        // TimeAgoPipe
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"].forChild(route),
            _coreui_angular__WEBPACK_IMPORTED_MODULE_3__["TabsetModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_3__["CardModule"],
            _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_5__["IconModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_3__["GridModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatTableModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__["MatPaginatorModule"],
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__["MatSortModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_3__["FormModule"],
            _angular_google_maps__WEBPACK_IMPORTED_MODULE_9__["GoogleMapsModule"],
            ngx_tippy_wrapper__WEBPACK_IMPORTED_MODULE_10__["NgxTippyModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_3__["SpinkitModule"],
            _partial_partial_module__WEBPACK_IMPORTED_MODULE_11__["PartialModule"],
        ],
    })
], DashboardModule);



/***/ }),

/***/ "7P/b":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/table-view/table-view.component.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"fade-in\">\n  <c-card>\n    <c-card-header class=\"d-flex align-items-center\">\n      <h4 class=\"mb-0\">Check-in History</h4>\n    </c-card-header>\n    <c-card-body>\n      <c-row class=\"mb-3\">\n        <c-col md=\"4\">\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\"><i class=\"cil-search\"></i></span>\n            </div>\n            <input cInput placeholder=\"Search here...\" (input)=\"search($event)\" />\n          </div>\n        </c-col>\n        <c-col md=\"3\" *ngIf=\"\n            organizationArr.length &&\n            tokenData &&\n            !tokenData.user.organizationId\n          \" (change)=\"filterData($event, 'orgasnizationUniqueId')\">\n          <select cSelect id=\"select1\" name=\"select1\">\n            <option value=\"\">All Organization</option>\n            <option [value]=\"organization.organizationId\" *ngFor=\"let organization of organizationArr\">\n              {{ organization.organizationName | titlecase }}\n            </option>\n          </select>\n        </c-col>\n      </c-row>\n      <mat-table #table mat-table [dataSource]=\"dataSource\" matSort matSortActive=\"createdAt\" matSortDisableClear\n        matSortDirection=\"desc\" class=\"mat-elevation-z8\" (matSortChange)=\"sortChange()\">\n        <ng-container matColumnDef=\"userDetail.name\">\n          <mat-header-cell [ngClass]=\"'w-name'\" *matHeaderCellDef mat-sort-header>User's Name\n          </mat-header-cell>\n          <mat-cell [ngClass]=\"'w-name'\" *matCellDef=\"let element\">\n            {{\n            element.userDetail ? element.userDetail.name : (\"-\" | titlecase)\n            }}\n          </mat-cell>\n        </ng-container>\n\n        <ng-container matColumnDef=\"organizationDetail.organizationName\">\n          <mat-header-cell [ngClass]=\"'o-name'\" *matHeaderCellDef mat-sort-header>Organization\n          </mat-header-cell>\n          <mat-cell [ngClass]=\"'o-name'\" *matCellDef=\"let element\">\n            {{\n            element.organizationDetail\n            ? element.organizationDetail.organizationName\n            : \"-\"\n            }}\n          </mat-cell>\n        </ng-container>\n\n        <ng-container matColumnDef=\"userDetail.email\">\n          <mat-header-cell [ngClass]=\"'w-email'\" *matHeaderCellDef>User's Email\n          </mat-header-cell>\n          <mat-cell [ngClass]=\"'w-email'\" *matCellDef=\"let element\">\n            {{ element.userDetail ? element.userDetail.email : \"-\" }}\n          </mat-cell>\n        </ng-container>\n\n        <ng-container matColumnDef=\"deviceDetail.location\">\n          <mat-header-cell [ngClass]=\"'c-name'\" *matHeaderCellDef>Coordinates</mat-header-cell>\n          <mat-cell [ngClass]=\"'c-name'\" *matCellDef=\"let element\">\n            <div class=\"mt-10\">\n              <a href=\"javascript:void(0)\" *ngIf=\"element.location\" (click)=\"selectLocation(element.location)\">\n                {{ element.location }}</a>\n              <br />\n              <p>{{ element.installationLocation }}</p>\n            </div>\n          </mat-cell>\n        </ng-container>\n\n        <ng-container matColumnDef=\"createdAt\">\n          <mat-header-cell [ngClass]=\"'d-name'\" *matHeaderCellDef mat-sort-header>Date and Time\n          </mat-header-cell>\n          <mat-cell [ngClass]=\"'d-name'\" *matCellDef=\"let element\">\n            {{ element.createdAt | date: \"dd/MM/yyyy, h:mm:ss\" }}\n            {{ element.createdAt | date: \"a\" | lowercase }}\n          </mat-cell>\n        </ng-container>\n\n        <ng-container matColumnDef=\"status\">\n          <mat-header-cell [ngClass]=\"'s-name'\" *matHeaderCellDef> Status </mat-header-cell>\n          <mat-cell [ngClass]=\"'s-name'\" *matCellDef=\"let element\" class=\"status-icon\">\n            <i class=\"fa fa-exclamation-triangle text-danger mx-2\" *ngIf=\"element.status == 0\" style=\"font-size: 23px\"\n              ngxTippy [tippyProps]=\"simpleProps(element.title)\"></i>\n            <i class=\"fa fa-check text-success mx-2\" *ngIf=\"element.status == 1\" style=\"font-size: 23px\"></i>\n          </mat-cell>\n        </ng-container>\n\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n        <mat-row *matRowDef=\"let row; columns: displayedColumns\"></mat-row>\n      </mat-table>\n      <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">\n        No records found\n      </div>\n      <div class=\"mat-table__bottom\">\n        <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\" [showFirstLastButtons]\n          (page)=\"pageChange()\">\n        </mat-paginator>\n      </div>\n    </c-card-body>\n  </c-card>\n</div>\n\n<div class=\"loading-indicator\" *ngIf=\"loading\">\n  <c-spinkit [name]=\"'bounce'\"></c-spinkit>\n</div>");

/***/ }),

/***/ "934o":
/*!********************************************************************!*\
  !*** ./src/app/views/dashboard/table-view/table-view.component.ts ***!
  \********************************************************************/
/*! exports provided: TableViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableViewComponent", function() { return TableViewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_table_view_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./table-view.component.html */ "7P/b");
/* harmony import */ var _table_view_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table-view.component.scss */ "Qg7a");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/paginator */ "5QHs");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sort */ "LUZP");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/table */ "OaSA");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "LqlI");
/* harmony import */ var _partial_modals_location_modal_location_modal_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../partial/modals/location-modal/location-modal.component */ "SR4K");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");
/* harmony import */ var _services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/google-maps-loader.service */ "YAPy");
/* harmony import */ var _partial_pipe_location_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../partial/pipe/location.pipe */ "3J4n");













/// <reference types="googlemaps" />
let TableViewComponent = class TableViewComponent {
    constructor(httpReqService, authService, modalService, gmLoader, locationPipe) {
        this.httpReqService = httpReqService;
        this.authService = authService;
        this.modalService = modalService;
        this.gmLoader = gmLoader;
        this.locationPipe = locationPipe;
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
        this.displayedColumns = [];
        this.field = [
            "userDetail.name",
            "organizationDetail.organizationName",
            "userDetail.email",
            "deviceDetail.location",
        ];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
        this.selectedLocation = {
            lat: 0,
            lng: 0,
        };
        this.options = {
            center: {
                lat: 37.42,
                lng: -122.103719,
            },
            zoom: 7,
        };
        this.organizationArr = [];
        this.markerOptions = { draggable: false };
        this.tippyPropsDefault = {
            interactive: true,
            allowHTML: true,
            appendTo: "parent",
            theme: "c-tooltip",
            trigger: "mouseenter focus touchstart",
        };
        this.isDisplay = false;
        this.loading = false;
    }
    ngOnInit() {
        this.loading = true;
        this.dataSource.sort = this.sort;
        this.tokenData = this.authService.decodeToken();
        // this.tokenData = tokenData1.user;
        if (this.tokenData && this.tokenData.user.organizationId) {
            this.displayedColumns = [
                "userDetail.name",
                "userDetail.email",
                "deviceDetail.location",
                "createdAt",
                "status",
            ];
        }
        else {
            this.displayedColumns = [
                "userDetail.name",
                "organizationDetail.organizationName",
                "userDetail.email",
                "deviceDetail.location",
                "createdAt",
                "status",
            ];
            this.getOrganizationList();
        }
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.getData();
    }
    getOrganizationList() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            const obj = {
                allrecords: true,
                sortField: "organizationDetail.organizationName",
                sortOrder: "asc",
                filter: { status: 1 },
            };
            if (this.tokenData.user.organizationId) {
                obj["orgasnizationUniqueId"] = this.tokenData.user.organizationId;
            }
            obj.filter["user_id"] = this.tokenData.user._id;
            const response = yield this.httpReqService.post("organization/list", obj, false);
            if (response && response.items.length) {
                this.organizationArr = response.items;
            }
            this.loading = false;
        });
    }
    getData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            this.gridOption.sortField = this.sort.active;
            this.gridOption.sortOrder = this.sort.direction;
            this.gridOption.filter["user_id"] = this.tokenData.user._id;
            this.gridOption.filter["scanType"] = "scan";
            this.gridOption.filter["organizationUniqueId"] =
                this.tokenData.user.organizationId;
            const response = yield this.httpReqService.post("scanHistory/list", this.gridOption, false);
            this.data = response.items;
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](this.data);
            this.resultsLength = response.totalCount;
            if (this.data.length) {
                this.options.center = this.locationPipe.transform(this.data[0].location);
            }
            this.loading = false;
        });
    }
    filterData(event, type) {
        let val = event.target.value;
        if (event.target.value) {
            if (type === "status") {
                val = Number(val);
            }
            this.gridOption.filter[type] = val;
            this.getData();
        }
        else {
            this.getData();
            delete this.gridOption.filter[type];
        }
        // this.pagesetUp();
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
    pagesetUp() {
        this.paginator.pageIndex = 0;
        this.gridOption.limit = this.paginator.pageSize;
        this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
        this.gridOption.sortField = this.sort.active;
        this.gridOption.sortOrder = this.sort.direction;
    }
    selectLocation(data) {
        const location = data.split(",");
        this.selectedLocation["lat"] = Number(location[0]);
        this.selectedLocation["lng"] = Number(location[1]);
        const initialState = {
            title: "Checkin Location",
            list: this.selectedLocation,
        };
        this.modalRef = this.modalService.show(_partial_modals_location_modal_location_modal_component__WEBPACK_IMPORTED_MODULE_8__["LocationModalComponent"], {
            class: "modal-xl modal-dialog-centered",
            initialState,
            backdrop: "static",
            keyboard: false,
        });
        this.modalRef.content.cancleButtonText = "Close";
    }
    getPosition(data) {
        if (data) {
            const location = data.split(",");
            const obj = {
                lat: Number(location[0]),
                lng: Number(location[1]),
            };
            return obj;
        }
    }
    simpleProps(data) {
        return Object.assign(Object.assign({}, this.tippyPropsDefault), { content: data });
    }
    changeTab(tab) {
        if (tab.header === "Table View") {
            this.isDisplay = true;
        }
    }
};
TableViewComponent.ctorParameters = () => [
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_10__["HttpReqService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_9__["AuthService"] },
    { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["BsModalService"] },
    { type: _services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_11__["GoogleMapsLoaderService"] },
    { type: _partial_pipe_location_pipe__WEBPACK_IMPORTED_MODULE_12__["LocationPipe"] }
];
TableViewComponent.propDecorators = {
    paginator: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"],] }],
    sort: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"],] }]
};
TableViewComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-table-view",
        template: _raw_loader_table_view_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [_services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_11__["GoogleMapsLoaderService"], _partial_pipe_location_pipe__WEBPACK_IMPORTED_MODULE_12__["LocationPipe"]],
        styles: [_table_view_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], TableViewComponent);



/***/ }),

/***/ "EHuJ":
/*!********************************************************************************!*\
  !*** ./src/app/views/dashboard/dashboard-count/dashboard-count.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".org-hr {\n  margin: 5px;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2Rhc2hib2FyZC1jb3VudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoiZGFzaGJvYXJkLWNvdW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm9yZy1ocntcbiAgICBtYXJnaW46IDVweDtcbiAgICBvcGFjaXR5OiAwLjU7XG59Il19 */");

/***/ }),

/***/ "H6Rb":
/*!****************************************************************!*\
  !*** ./src/app/views/dashboard/map-view/map-view.component.ts ***!
  \****************************************************************/
/*! exports provided: MapViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapViewComponent", function() { return MapViewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_map_view_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./map-view.component.html */ "uNKX");
/* harmony import */ var _map_view_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map-view.component.scss */ "vQfC");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");
/* harmony import */ var _partial_pipe_location_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../partial/pipe/location.pipe */ "3J4n");
/* harmony import */ var _services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/google-maps-loader.service */ "YAPy");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-socket-io */ "RH9n");










/// <reference types="googlemaps" />
let MapViewComponent = class MapViewComponent {
    constructor(httpClient, gmLoader, authService, httpReqService, socket) {
        this.httpClient = httpClient;
        this.gmLoader = gmLoader;
        this.authService = authService;
        this.httpReqService = httpReqService;
        this.socket = socket;
        this.marker_list = [];
        this.history_list = [];
        this.is_socket = false;
        this.loading = false;
    }
    ngOnInit() {
        this.loading = true;
        // this.socket.on('message', (data)=>{
        //   console.log(data)
        // });
        // setInterval(()=>{
        //   this.socket.emit('message', 'front data');
        // }, 5000)
        this.tokenData = this.authService.decodeToken();
        this.tokenData = this.tokenData.user;
        setTimeout(() => {
            this.map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: {
                    lat: 51.509865,
                    lng: -0.118092
                },
            });
            if (this.tokenData.organizationId) {
                this.getOrgDetail();
            }
            this.getData();
            this.interval = setInterval(() => {
                // this.getData();
            }, 10000);
        });
    }
    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.socket.removeListener("'mapview" + this.tokenData._id + "'", (data) => { });
        this.socket.removeListener("'mapview" + this.tokenData.organizationId + "'", (data) => { });
        this.socket.removeListener("mapview", (data) => { });
    }
    getOrgDetail() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            const response = yield this.httpReqService.get('organizationByUniqueId', this.tokenData.organizationId);
            if (response.items.length) {
                this.organizatioData = response.items[0];
                this.httpClient.get("assets/cities.json").subscribe(data => {
                    var city_object = data.filter((x) => {
                        if (x.name == this.organizatioData.billingAddress.town) {
                            return true;
                        }
                    });
                    if (city_object && city_object[0]) {
                        this.map.setCenter({
                            lat: Number(city_object[0].latitude),
                            lng: Number(city_object[0].longitude)
                        });
                    }
                });
            }
            else {
            }
            this.loading = false;
        });
    }
    getData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            var obj = {
                filter: {
                    user_id: this.tokenData._id,
                },
                allrecords: true
            };
            const response = yield this.httpReqService.post('scanHistory/map_view', obj, false);
            response.items.forEach((data) => {
                var index = this.history_list.findIndex((x) => x._id.toString() == data._id.toString());
                if (index == -1) {
                    this.history_list.push(data);
                    this.add_marker(data);
                }
            });
            if (!this.is_socket) {
                this.is_socket = true;
                if (response.type == 0) {
                    this.socket.on("'mapview" + this.tokenData.user._id + "'", (data) => {
                        this.getData();
                    });
                }
                else if (response.type == 1) {
                    this.socket.on("mapview", (data) => {
                        this.getData();
                    });
                }
                else if (response.type == 2) {
                    this.socket.on("'mapview" + this.tokenData.user.organizationId + "'", (data) => {
                        this.getData();
                    });
                }
            }
            this.loading = false;
        });
    }
    add_marker(data) {
        var location = data.location.split(',');
        var marker = new google.maps.Marker({
            position: {
                lat: Number(location[0]),
                lng: Number(location[1])
            },
            map: this.map,
        });
        const contentString = '<label>Name: </label>' + data.userDetail.name + '<br> <label>Address: </label>' + data.installationLocation;
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        marker.addListener("click", () => {
            infowindow.open(this.map, marker);
            setTimeout(() => {
                infowindow.close();
            }, 5000);
        });
        this.marker_list.push(marker);
        var audio = new Audio('assets/audio.mp3');
        audio.play();
        this.map.setCenter({
            lat: Number(location[0]),
            lng: Number(location[1])
        });
    }
    converTime() {
        var d = new Date();
        // get UTC time in msec
        var utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const mapTime = this.organizatioData.mapFlushTime.split(':');
        var nd = new Date(utc + (3600000 * this.organizatioData.timezone));
    }
};
MapViewComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
    { type: _services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_6__["GoogleMapsLoaderService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_7__["HttpReqService"] },
    { type: ngx_socket_io__WEBPACK_IMPORTED_MODULE_9__["Socket"] }
];
MapViewComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-map-view',
        template: _raw_loader_map_view_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [_services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_6__["GoogleMapsLoaderService"], _partial_pipe_location_pipe__WEBPACK_IMPORTED_MODULE_5__["LocationPipe"]],
        styles: [_map_view_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], MapViewComponent);



/***/ }),

/***/ "IUv7":
/*!******************************************************************************!*\
  !*** ./src/app/views/dashboard/dashboard-count/dashboard-count.component.ts ***!
  \******************************************************************************/
/*! exports provided: DashboardCountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardCountComponent", function() { return DashboardCountComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_dashboard_count_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./dashboard-count.component.html */ "jBpl");
/* harmony import */ var _dashboard_count_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard-count.component.scss */ "EHuJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");






let DashboardCountComponent = class DashboardCountComponent {
    constructor(httpReqService, authService) {
        this.httpReqService = httpReqService;
        this.authService = authService;
        this.countData = [
            { name: 'Assigned Devices', count: 2 },
            { name: 'Unassigned Devices', count: 4 },
            { name: 'Total Registred Users', count: 5 },
            { name: 'Check-In This Month', count: 5 },
            { name: 'Check-In Since Start', count: 6 },
            { name: 'Number Of Organization', count: 7 },
            { name: 'Number Of Active Organization', count: 1 },
            { name: 'Number Of Resellers', count: 5 },
            { name: 'Number Of Active Resellers', count: 8 },
        ];
        this.loading = false;
    }
    ngOnInit() {
        this.loading = true;
        this.tokenData = this.authService.decodeToken();
        this.tokenData = this.tokenData.user;
        this.getUserCount();
        setTimeout(() => {
            this.getPermissionDetails();
        }, 2000);
    }
    getPermissionDetails() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            const response = yield this.httpReqService.get('permission', this.tokenData.permissionId);
            if (response && response.items.length) {
                this.permissionDetails = response.items[0];
            }
            this.loading = false;
        });
    }
    getUserCount() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            const result = yield this.httpReqService.post('dashboardCount/user', { user_id: this.tokenData._id }, false);
            if (result.items && result.items.length) {
                this.userCount = result.items[0].userData;
                this.checkInCount = result.items[1].checkInData;
                this.totaldeviceCount = result.items[2].deviceData;
            }
            this.loading = false;
            this.getOrganizationCount();
        });
    }
    getOrganizationCount() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            const result = yield this.httpReqService.post('dashboardCount/organization', { user_id: this.tokenData._id }, false);
            if (result.items && result.items.length) {
                this.deviceCount = result.items[0].deviceData;
                this.organizationCount = result.items[1].organizationData;
            }
            this.loading = false;
        });
    }
};
DashboardCountComponent.ctorParameters = () => [
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_5__["HttpReqService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] }
];
DashboardCountComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-dashboard-count',
        template: _raw_loader_dashboard_count_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_dashboard_count_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], DashboardCountComponent);



/***/ }),

/***/ "P3Bu":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/dashboard.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"fade-in\">\n  <c-card class=\"p-0\">\n    <c-card-body class=\"p-0\">\n      <c-tabset boxed=\"true\" [activeTab]=\"'0'\">\n        <c-tablist class=\"pt-2 px-2\">\n          <c-tab *ngFor=\"let tab of tabs\" (click)=\"changeTab(tab)\">\n            <c-icon [name]=\"tab.icon\" class=\"pb-1\"></c-icon>\n            {{tab.header}}\n          </c-tab>\n        </c-tablist>\n        <c-tab-content>\n          <c-tab-pane>\n            <app-table-view *ngIf=\"isDisplay\"></app-table-view>\n          </c-tab-pane>\n          <c-tab-pane>\n            <app-map-view *ngIf=\"isMapDisplay\"></app-map-view>\n          </c-tab-pane>\n          <c-tab-pane>\n            <app-dashboard-count></app-dashboard-count>\n          </c-tab-pane>\n        </c-tab-content>\n      </c-tabset>\n    </c-card-body>\n  </c-card>\n</div>\n\n<div class=\"loading-indicator\" *ngIf=\"loading\">\n  <c-spinkit [name]=\"'bounce'\"></c-spinkit>\n</div> ");

/***/ }),

/***/ "Qg7a":
/*!**********************************************************************!*\
  !*** ./src/app/views/dashboard/table-view/table-view.component.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mt-10 {\n  margin-top: 10px;\n}\n\n.w-email {\n  min-width: 350px !important;\n}\n\n.o-name {\n  min-width: 200px !important;\n}\n\n.c-name {\n  min-width: 280px !important;\n}\n\n.d-name {\n  min-width: 200px !important;\n}\n\n.w-name {\n  min-width: 180px !important;\n}\n\n.s-name {\n  min-width: 80px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RhYmxlLXZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsMkJBQUE7QUFDRjs7QUFDQTtFQUNFLDJCQUFBO0FBRUY7O0FBQUE7RUFDRSwyQkFBQTtBQUdGOztBQURBO0VBQ0UsMkJBQUE7QUFJRjs7QUFGQTtFQUNBLDJCQUFBO0FBS0E7O0FBSEE7RUFDRSwwQkFBQTtBQU1GIiwiZmlsZSI6InRhYmxlLXZpZXcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubXQtMTAge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4udy1lbWFpbHtcbiAgbWluLXdpZHRoOiAzNTBweCAhaW1wb3J0YW50O1xufVxuLm8tbmFtZXtcbiAgbWluLXdpZHRoOiAyMDBweCAhaW1wb3J0YW50O1xuICB9XG4uYy1uYW1leyAgICBcbiAgbWluLXdpZHRoOiAyODBweCAhaW1wb3J0YW50O1xuIH1cbi5kLW5hbWV7XG4gIG1pbi13aWR0aDogMjAwcHggIWltcG9ydGFudDtcbiB9XG4udy1uYW1le1xubWluLXdpZHRoOiAxODBweCAhaW1wb3J0YW50O1xufVxuLnMtbmFtZXtcbiAgbWluLXdpZHRoOiA4MHB4ICFpbXBvcnRhbnQ7XG4gIH0iXX0= */");

/***/ }),

/***/ "jBpl":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/dashboard-count/dashboard-count.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container>\n    <c-row>\n        <label cLabel=\"col\" cCol md=\"3\" > <strong>Summary Text</strong>\n        </label>\n        <label cLabel=\"col\" cCol md=\"9\" >  <strong>Count </strong></label>\n    </c-row>\n    <hr class=\"org-hr\"/>\n    <c-row *ngIf=\"permissionDetails && permissionDetails.is_default\">\n        <label cLabel=\"col\" cCol md=\"3\" > Total Devices \n        </label>\n        <label cLabel=\"col\" cCol md=\"9\" >{{totaldeviceCount?.deviceCount ? totaldeviceCount?.deviceCount : 0}}</label>\n    </c-row>\n    <hr *ngIf=\"permissionDetails && permissionDetails.is_default\" class=\"org-hr\"/>\n    <c-row>\n        <label cLabel=\"col\" cCol md=\"3\" > Assigned Devices </label>\n        <label cLabel=\"col\" cCol md=\"9\" >{{deviceCount?.assignedDevice ? deviceCount?.assignedDevice : 0}}</label>\n    </c-row>\n    <hr class=\"org-hr\"/>\n    <c-row>\n        <label cLabel=\"col\" cCol md=\"3\" > Total Registered Users </label>\n        <label cLabel=\"col\" cCol md=\"9\" >{{userCount?.totalRegisterdUser ? userCount?.totalRegisterdUser : 0}}</label>\n    </c-row>\n    <hr class=\"org-hr\"/>\n    <c-row>\n        <label cLabel=\"col\" cCol md=\"3\" > Check-in this month \n        </label>\n        <label cLabel=\"col\" cCol md=\"9\">{{checkInCount?.checkInThisMonth ? checkInCount?.checkInThisMonth : 0}}</label>\n    </c-row>\n    <hr class=\"org-hr\"/>\n    <c-row>\n        <label cLabel=\"col\" cCol md=\"3\" > Total Check-in to date\n        </label>\n        <label cLabel=\"col\" cCol md=\"9\">{{checkInCount?.checkInSinceStart ? checkInCount?.checkInSinceStart : 0}}</label>\n    </c-row>\n    <hr class=\"org-hr\"/>\n    <c-row *ngIf=\"permissionDetails && permissionDetails.is_default\">\n        <label cLabel=\"col\" cCol md=\"3\" > Number of Resellers\n        </label>\n        <label cLabel=\"col\" cCol md=\"9\">{{organizationCount?.resellers ? organizationCount?.resellers : 0}}</label>\n    </c-row>\n    <hr *ngIf=\"permissionDetails && permissionDetails.is_default\" class=\"org-hr\"/>\n    <c-row *ngIf=\"permissionDetails && permissionDetails.is_default\">\n        <label cLabel=\"col\" cCol md=\"3\" > Number of Active Resellers\n        </label>\n        <label cLabel=\"col\" cCol md=\"9\">{{organizationCount?.activeResellers ? organizationCount?.activeResellers : 0}}</label>\n    </c-row>\n    <hr *ngIf=\"permissionDetails && permissionDetails.is_default\" class=\"org-hr\"/>\n    <c-row *ngIf=\"permissionDetails && permissionDetails.is_default\">\n        <label cLabel=\"col\" cCol md=\"3\" > Number of Organizations \n        </label>\n        <label cLabel=\"col\" cCol md=\"9\">{{organizationCount?.organization ? organizationCount?.organization : 0}}</label>\n    </c-row>\n    <hr *ngIf=\"permissionDetails && permissionDetails.is_default\" class=\"org-hr\"/>\n    <c-row *ngIf=\"permissionDetails && permissionDetails.is_default\">\n        <label cLabel=\"col\" cCol md=\"3\" > Number of Active Organizations\n        </label>\n        <label cLabel=\"col\" cCol md=\"9\">{{organizationCount?.activeOrganization ? organizationCount?.activeOrganization : 0}}</label>\n    </c-row>\n    <hr *ngIf=\"permissionDetails && permissionDetails.is_default\" class=\"org-hr\"/>\n    <!-- </c-card-body>\n</c-card> -->\n</ng-container>\n\n<div class=\"loading-indicator\" *ngIf=\"loading\">\n    <c-spinkit [name]=\"'bounce'\"></c-spinkit>\n    </div> \n\n\n\n\n\n\n\n<!--<div class=\"fade-in\">\n    <table class=\"table table-bordered\">\n        <thead>\n            <tr>\n                <th scope=\"col\">Summary Text</th>\n                <th scope=\"col\">Count</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td style=\"width: 30%;\">Assigned Devices</td>\n                <td>{{deviceCount?.assignedDevice ? deviceCount?.assignedDevice : 0}}</td>\n            </tr>\n            <tr *ngIf=\"permissionDetails && permissionDetails.is_default\">\n                <td style=\"width: 30%;\">Unassigned Devices</td>\n                <td>{{deviceCount?.unassignedDevice ? deviceCount?.unassignedDevice : 0}}</td>\n            </tr>\n            <tr>\n                <td style=\"width: 30%;\">Total Registered Users</td>\n                <td>{{userCount?.totalRegisterdUser ? userCount?.totalRegisterdUser : 0}}</td>\n            </tr>\n            <tr *ngIf=\"permissionDetails && permissionDetails.is_default\">\n                <td style=\"width: 30%;\">Number Of Resellers</td>\n                <td>{{userCount?.resellers ? userCount?.resellers : 0}}</td>\n            </tr>\n            <tr *ngIf=\"permissionDetails && permissionDetails.is_default\">\n                <td style=\"width: 30%;\">Number Of Active Resellers</td>\n                <td>{{userCount?.activeResellers ? userCount?.activeResellers : 0}}</td>\n            </tr>\n            <tr>\n                <td style=\"width: 30%;\">Check-in's this month</td>\n                <td>{{checkInCount?.checkInThisMonth ? checkInCount?.checkInThisMonth : 0}}</td>\n            </tr>\n            <tr>\n                <td style=\"width: 30%;\">Total Check-in's to date</td>\n                <td>{{checkInCount?.checkInSinceStart ? checkInCount?.checkInSinceStart : 0}}</td>\n            </tr>\n            <tr *ngIf=\"permissionDetails && permissionDetails.is_default\">\n                <td style=\"width: 30%;\">Number of Organization</td>\n                <td>{{organizationCount?.organization ? organizationCount?.organization : 0}}</td>\n            </tr>\n            <tr *ngIf=\"permissionDetails && permissionDetails.is_default\">\n                <td style=\"width: 30%;\">Number Of Active Organization</td>\n                <td>{{organizationCount?.activeOrganization ? organizationCount?.activeOrganization : 0}}</td>\n            </tr>\n        </tbody>\n    </table>\n</div>-->");

/***/ }),

/***/ "l70X":
/*!********************************************************!*\
  !*** ./src/app/views/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_dashboard_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./dashboard.component.html */ "P3Bu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/auth.service */ "lGQG");




/// <reference types="googlemaps" />
let DashboardComponent = class DashboardComponent {
    constructor(authService) {
        this.authService = authService;
        this.tabs = [
            { header: 'Check-in', icon: 'cil-columns' },
            { header: 'Map View', icon: 'cil-map' },
            { header: 'Summary', icon: 'cil-aperture' },
        ];
        this.isDisplay = true;
        this.isMapDisplay = false;
        this.loading = false;
    }
    ngOnInit() {
        this.loading = true;
        this.tokenData = this.authService.decodeToken();
        this.tokenData = this.tokenData.user;
        this.loading = false;
    }
    changeTab(tab) {
        if (tab.header === 'Table View') {
            this.isDisplay = true;
        }
        else if (tab.header === 'Map View') {
            this.isMapDisplay = true;
        }
    }
};
DashboardComponent.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
];
DashboardComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-dashboard',
        template: _raw_loader_dashboard_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
    })
], DashboardComponent);



/***/ }),

/***/ "uNKX":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/dashboard/map-view/map-view.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"fade-in\">\n    <div id=\"map\" style=\"height: calc(100vh - 250px);\">\n        <!-- <google-map [options]=\"options\" [center]=\"center\" [width]=\"'100%'\" [height]=\"'100%'\">\n            <div *ngIf=\"data && data.length\">\n                <map-marker #marker=\"mapMarker\" *ngFor=\"let m of marker_list; let i = index\" [label]=\"m.label\"\n                    [title]=\"m.title\" [position]=\"m.location |location\" [options]=\"markerOptions\"\n                    (mapClick)=\"openInfoWindow(marker, m)\">\n                </map-marker>\n                <map-marker\n                    *ngFor=\"let marker of marker_list\"\n                    [position]=\"marker.position\"\n                    [label]=\"marker.label\"\n                    [title]=\"marker.title\"\n                    [options]=\"marker.options\">\n                </map-marker>\n            </div>\n        </google-map> -->\n        \n    </div>\n</div>\n\n\n<div class=\"loading-indicator\" *ngIf=\"loading\">\n    <c-spinkit [name]=\"'bounce'\"></c-spinkit>\n    </div> ");

/***/ }),

/***/ "vQfC":
/*!******************************************************************!*\
  !*** ./src/app/views/dashboard/map-view/map-view.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXAtdmlldy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ })

}]);
//# sourceMappingURL=views-dashboard-dashboard-module-es2015.js.map