(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-logs-logs-module"],{

/***/ "1ClV":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/logs/logs-list/logs-list.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"fade-in\">\n    <c-card>\n        <c-card-header class=\"d-flex align-items-center\">\n            <h4 class=\"mb-0\">Logs List</h4>\n        </c-card-header>\n        <c-card-body>\n            <c-row class=\"mb-3\" *ngIf=\"!loading\">\n                <c-col md=\"3\">\n                    <label>From Date</label>\n                    <div class=\"input-group\">\n                        <input cInput #dp=\"bsDatepicker\" bsDatepicker [bsConfig]=\"bsConfig\" placeholder=\"From Date\"\n                            (bsValueChange)=\"changeFromDate($event)\" [(ngModel)]=\"fromDate\">\n                    </div>\n                </c-col>\n                <c-col md=\"3\">\n                    <label>To Date</label>\n                    <div class=\"input-group\">\n                        <input cInput #dp=\"bsDatepicker\" bsDatepicker [bsConfig]=\"bsConfig\" [(ngModel)]=\"toDate\"\n                            placeholder=\"To Date\" (bsValueChange)=\"changeToDate($event)\">\n                    </div>\n                </c-col>\n\n               <!-- <c-col md=\"3\">\n                    <label>Action</label>\n                    <select cSelect id=\"select1\" name=\"select1\" (change)=\"filterData($event,'actionOperation')\"\n                        [(ngModel)]=\"actionOperation\">\n                        <option value=\"\">All</option>\n                        <option [value]=\"action\" *ngFor=\"let action of actionArr\">\n                            {{action | titlecase}}</option>\n                    </select>\n                </c-col>-->\n                <!--<c-col md=\"3\">\n                    <label>Object</label>\n                    <select cSelect id=\"select1\" name=\"select1\" (change)=\"filterData($event,'objectName')\"\n                        [(ngModel)]=\"objectName\">\n                        <option value=\"\">All</option>\n                        <option [value]=\"object\" *ngFor=\"let object of objectArr\">\n                            {{object | titlecase}}</option>\n                    </select>\n                </c-col>-->\n                <c-col md=\"3\">\n                    <label>Status</label>\n                    <select cSelect id=\"select2\" name=\"select2\" (change)=\"filterData($event,'isSuccess')\"\n                        [(ngModel)]=\"isSuccess\">\n                        <option value=''>All</option>\n                        <option value=\"true\">Success</option>\n                        <option value=\"false\">Failure</option>\n                    </select>\n                </c-col>\n                \n                <c-col md=\"3\">\n                    <label>View Status</label>\n                    <select cSelect id=\"select1\" name=\"select1\" (change)=\"filterData($event,'isViewed')\"\n                        [(ngModel)]=\"isViewed\">\n                        <option value=''>All</option>\n                        <option value=\"false\">Unviewed</option>\n                        <option value=\"true\">Viewed</option>\n                    </select>\n                </c-col>\n            </c-row>\n            <c-row class=\"mb-3\" *ngIf=\"!loading\">\n                <c-col md=\"3\" *ngIf=\"isDisplay\">\n                    <label> Users</label>\n                    <select cSelect id=\"select1\" name=\"select1\" (change)=\"filterData($event,'user')\"\n                        [(ngModel)]=\"userId\">\n                        <option value=\"\">All</option>\n                        <option [value]=\"user._id\" *ngFor=\"let user of userArr\">\n                            {{user?user.name:'-' | titlecase}}</option>\n                    </select>\n                </c-col>\n                <c-col md=\"3\" *ngIf=\"tokenData.role !== roles.admin && !isOrganizationAdmin && isDisplay\">\n                    <label>Organization</label>\n                    <select cSelect id=\"organization-select\" name=\"organization-select\"\n                        (change)=\"filterData($event,'organization')\" [(ngModel)]=\"organizationId\">\n                        <option value=\"\">All</option>\n                        <option [value]=\"organization.organizationId\" *ngFor=\"let organization of organizationArr\">\n                            {{organization.organizationName | titlecase}}</option>\n                    </select>\n                </c-col>\n            </c-row>\n            <mat-table #table mat-table [dataSource]=\"dataSource\" matSort matSortActive=\"createdAt\" matSortDisableClear\n                matSortDirection=\"desc\" class=\"mat-elevation-z8\" (matSortChange)=\"sortChange()\">\n\n                <ng-container matColumnDef=\"actionOperation\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>Action Operation</mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\" [ngClass]=\"{'font-weight-bold':!element.isViewed}\">\n                        {{element.actionOperation |titlecase}}\n                    </mat-cell>\n                </ng-container>\n\n\n               <!-- <ng-container matColumnDef=\"objectName\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header> Object </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\" [ngClass]=\"{'font-weight-bold':!element.isViewed}\">\n                        {{element.objectName}} </mat-cell>\n                </ng-container>-->\n\n                <ng-container matColumnDef=\"userDetails.name\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header> User Name </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\" [ngClass]=\"{'font-weight-bold':!element.isViewed}\">\n                        {{element.userDetails?element.userDetails.name:'-'}} </mat-cell>\n                </ng-container>\n\n                <ng-container matColumnDef=\"createdAt\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header> Date Time </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\" [ngClass]=\"{'font-weight-bold':!element.isViewed}\">\n                        {{element.createdAt | date:\"dd/MM/yyyy HH:mm:ss\"}} </mat-cell>\n                </ng-container>\n\n                <ng-container matColumnDef=\"action\">\n                    <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\">\n                        <i class=\"fa fa-eye mr-2\" routerLink=\"/logs/detail/{{element._id}}\"></i>\n                    </mat-cell>\n                </ng-container>\n\n                <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n            </mat-table>\n            <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">No records found</div>\n            <div class=\"mat-table__bottom\">\n                <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\" [showFirstLastButtons]\n                    (page)=\"pageChange()\">\n                </mat-paginator>\n            </div>\n        </c-card-body>\n    </c-card>\n</div>\n\n<!-- <div class=\"loading-indicator\" *ngIf=\"loading\">\n    <c-spinkit [name]=\"'bounce'\"></c-spinkit>\n</div>  -->");

/***/ }),

/***/ "4YEA":
/*!***************************************************************!*\
  !*** ./src/app/views/logs/log-detail/log-detail.component.ts ***!
  \***************************************************************/
/*! exports provided: LogDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogDetailComponent", function() { return LogDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_log_detail_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./log-detail.component.html */ "UOt0");
/* harmony import */ var _log_detail_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./log-detail.component.scss */ "wXVj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/table */ "OaSA");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/google-maps-loader.service */ "YAPy");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");






;


/// <reference types="googlemaps" />
let LogDetailComponent = class LogDetailComponent {
    constructor(router, route, httpReqService, gmLoader) {
        this.router = router;
        this.route = route;
        this.httpReqService = httpReqService;
        this.gmLoader = gmLoader;
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"]();
        this.userArr = ['organizationId', 'email', 'name', 'role', 'nfcEnabled', 'sharedLocation', 'status'];
        this.deviceArr = ['organizationDetail.organizationName', 'id1', 'uid', 'location', 'status'];
        this.organizationArr = ['organizationName', 'registrationNumber', 'organizationId', 'status'];
        this.checkInArr = ['location', 'scanType', 'organizationId', 'status'];
        this.options = {
            center: {
                lat: 37.42,
                lng: -122.103719
            },
            zoom: 7
        };
        this.markerOptions = { draggable: false };
        this.selectedLocation = {
            lat: 0,
            lng: 0
        };
    }
    ngOnInit() {
        this.logId = this.route.snapshot.params.id;
        this.getLogDetail();
        this.route_subscribe = this.router.events.subscribe(val => {
            if (val instanceof _angular_router__WEBPACK_IMPORTED_MODULE_5__["NavigationEnd"]) {
                this.logId = this.route.snapshot.params.id;
                this.getLogDetail();
            }
        });
        // this.updatStatus()
    }
    ngOnDestroy() {
        this.route_subscribe.unsubscribe();
    }
    getLogDetail() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const response = yield this.httpReqService.get('logs', this.logId);
            if (response && response.items.length) {
                this.logData = response.items[0];
                this.contectBeforeAction = this.logData.contectBeforeAction;
                this.contectAfterAction = this.logData.contectAfterAction;
                this.logData.contentBeforeAction.status =
                    this.logData.contentBeforeAction.status == 0
                        ? "Inactive"
                        : this.logData.contentBeforeAction.status == 1
                            ? "Active"
                            : "Pending";
                this.logData.contentAfterAction.status =
                    this.logData.contentAfterAction.status == 0
                        ? "Inactive"
                        : this.logData.contentAfterAction.status == 1
                            ? "Active"
                            : "Pending";
                this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](this.logData);
                this.updatStatus();
                if (this.logData.objectName == 'CheckIn' && this.logData.location) {
                    const location = this.logData.location.split(',');
                    this.selectedLocation['lat'] = Number(location[0]);
                    this.selectedLocation['lng'] = Number(location[1]);
                    this.options.center = this.selectedLocation;
                }
                else {
                }
            }
        });
    }
    updatStatus() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const response = yield this.httpReqService.get('logs/updatStatus', this.logId);
        });
    }
};
LogDetailComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_7__["HttpReqService"] },
    { type: _services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_6__["GoogleMapsLoaderService"] }
];
LogDetailComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-log-detail',
        template: _raw_loader_log_detail_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [_services_google_maps_loader_service__WEBPACK_IMPORTED_MODULE_6__["GoogleMapsLoaderService"]],
        styles: [_log_detail_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], LogDetailComponent);



/***/ }),

/***/ "K8FM":
/*!***************************************************************!*\
  !*** ./src/app/views/logs/logs-list/logs-list.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/* .bs-datepicker */\n.bs-datepicker {\n  display: flex;\n  align-items: stretch;\n  flex-flow: row wrap;\n  background: #fff;\n  box-shadow: 0 0 10px 0 #aaa;\n  position: relative;\n  z-index: 1;\n  /* button */\n  /* .bs-datepicker-head */\n  /* .bs-datepicker-body */\n  /* .current-timedate */\n  /* .bs-datepicker-multiple */\n  /* .bs-datepicker-btns */\n  /*.bs-datepicker-custom-range */\n  /* .bs-datepicker-predefined-btns */\n  /* .bs-datepicker-buttons */\n}\n.bs-datepicker:after {\n  clear: both;\n  content: \"\";\n  display: block;\n}\n.bs-datepicker bs-day-picker {\n  float: left;\n}\n.bs-datepicker button:hover,\n.bs-datepicker button:focus,\n.bs-datepicker button:active,\n.bs-datepicker input:hover,\n.bs-datepicker input:focus,\n.bs-datepicker input:active, .bs-datepicker-btns button:hover, .bs-datepicker-btns button:focus, .bs-datepicker-btns button:active, .bs-datepicker-predefined-btns button:active, .bs-datepicker-predefined-btns button:focus {\n  outline: none;\n}\n.bs-datepicker-head {\n  min-width: 270px;\n  height: 50px;\n  padding: 10px;\n  border-radius: 3px 3px 0 0;\n  text-align: justify;\n  /* .bs-datepicker-head button */\n}\n.bs-datepicker-head:after {\n  content: \"\";\n  display: inline-block;\n  vertical-align: top;\n  width: 100%;\n}\n.bs-datepicker-head button {\n  display: inline-block;\n  vertical-align: top;\n  padding: 0;\n  height: 30px;\n  line-height: 30px;\n  border: 0;\n  background: transparent;\n  text-align: center;\n  cursor: pointer;\n  color: #fff;\n  transition: 0.3s;\n}\n.bs-datepicker-head button[disabled], .bs-datepicker-head button[disabled]:hover, .bs-datepicker-head button[disabled]:active {\n  background: rgba(221, 221, 221, 0.3);\n  color: #f5f5f5;\n  cursor: not-allowed;\n}\n.bs-datepicker-head button.next, .bs-datepicker-head button.previous {\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n}\n.bs-datepicker-head button.next span, .bs-datepicker-head button.previous span {\n  font-size: 28px;\n  line-height: 1;\n  display: inline-block;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  border-radius: 50%;\n}\n.bs-datepicker-head button.current {\n  border-radius: 15px;\n  max-width: 155px;\n  padding: 0 13px;\n}\n.bs-datepicker-head button:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.bs-datepicker-head button:active {\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.bs-datepicker-body {\n  padding: 10px;\n  border-radius: 0 0 3px 3px;\n  min-height: 232px;\n  min-width: 278px;\n  border: 1px solid #e9edf0;\n  /* .bs-datepicker-body table */\n}\n.bs-datepicker-body .days.weeks {\n  position: relative;\n  z-index: 1;\n}\n.bs-datepicker-body table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  /* .bs-datepicker-body table.days */\n  /* .bs-datepicker-body table.weeks */\n}\n.bs-datepicker-body table th {\n  font-size: 13px;\n  color: #9aaec1;\n  font-weight: 400;\n  text-align: center;\n}\n.bs-datepicker-body table td {\n  color: #54708b;\n  text-align: center;\n  position: relative;\n  padding: 0;\n}\n.bs-datepicker-body table td span {\n  display: block;\n  margin: 0 auto;\n  font-size: 13px;\n  border-radius: 50%;\n  /*z-index: 1;*/\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.bs-datepicker-body table td:not(.disabled):not(.week) span:not(.disabled):not(.is-other-month) {\n  cursor: pointer;\n}\n.bs-datepicker-body table td.is-highlighted:not(.disabled):not(.selected) span,\n.bs-datepicker-body table td span.is-highlighted:not(.disabled):not(.selected) {\n  background-color: #e9edf0;\n  transition: 0s;\n}\n.bs-datepicker-body table td.is-active-other-month:not(.disabled):not(.selected) span,\n.bs-datepicker-body table td span.is-active-other-month:not(.disabled):not(.selected) {\n  background-color: #e9edf0;\n  transition: 0s;\n  cursor: pointer;\n}\n.bs-datepicker-body table td span.disabled, .bs-datepicker-body table td.disabled span {\n  color: #9aaec1;\n}\n.bs-datepicker-body table td span.selected, .bs-datepicker-body table td.selected span {\n  color: #fff;\n}\n.bs-datepicker-body table td span.is-other-month, .bs-datepicker-body table td.is-other-month span {\n  color: rgba(0, 0, 0, 0.25);\n}\n.bs-datepicker-body table td.active {\n  position: relative;\n}\n.bs-datepicker-body table td.active.select-start:before {\n  left: 35%;\n}\n.bs-datepicker-body table td.active.select-end:before {\n  left: -85%;\n}\n.bs-datepicker-body table td span.active.select-start:after,\n.bs-datepicker-body table td span.active.select-end:after, .bs-datepicker-body table td.active.select-start span:after, .bs-datepicker-body table td.active.select-end span:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  transition: 0.3s;\n  top: 0;\n  border-radius: 50%;\n}\n.bs-datepicker-body table td:before,\n.bs-datepicker-body table td span:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  z-index: -1;\n  top: 6px;\n  bottom: 6px;\n  left: -3px;\n  right: -2px;\n  box-sizing: content-box;\n  background: transparent;\n}\n.bs-datepicker-body table td.active.select-start + td.active:before {\n  left: -20%;\n}\n.bs-datepicker-body table td:last-child.active:before {\n  border-radius: 0 3px 3px 0;\n  width: 125%;\n  left: -25%;\n}\n.bs-datepicker-body table td span[class*=select-], .bs-datepicker-body table td[class*=select-] span {\n  border-radius: 50%;\n  color: #fff;\n}\n.bs-datepicker-body table.days td.active:not(.select-start):before, .bs-datepicker-body table.days td.in-range:not(.select-start):before,\n.bs-datepicker-body table.days span.active:not(.select-start):before,\n.bs-datepicker-body table.days span.in-range:not(.select-start):before {\n  background: #e9edf0;\n}\n.bs-datepicker-body table.days span {\n  width: 32px;\n  height: 32px;\n  line-height: 32px;\n}\n.bs-datepicker-body table.days span.select-start {\n  z-index: 2;\n}\n.bs-datepicker-body table.days span.is-highlighted.in-range:before {\n  right: 3px;\n  left: 0;\n}\n.bs-datepicker-body table.days span.in-range.select-end:before {\n  right: 4px;\n  left: 0;\n}\n.bs-datepicker-body table.days td.select-start + td.select-end:before, .bs-datepicker-body table.days td.select-start + td.is-highlighted:before, .bs-datepicker-body table.days td.active + td.is-highlighted:before, .bs-datepicker-body table.days td.active + td.select-end:before, .bs-datepicker-body table.days td.in-range + td.is-highlighted:before, .bs-datepicker-body table.days td.in-range + td.select-end:before {\n  background: #e9edf0;\n  width: 100%;\n}\n.bs-datepicker-body table.weeks tr td:nth-child(2).active:before {\n  border-radius: 3px 0 0 3px;\n  left: 0;\n  width: 100%;\n}\n.bs-datepicker-body table:not(.weeks) tr td:first-child:before {\n  border-radius: 3px 0 0 3px;\n}\n.bs-datepicker-body table.years td span {\n  width: 46px;\n  height: 46px;\n  line-height: 45px;\n  margin: 0 auto;\n}\n.bs-datepicker-body table.years tr:not(:last-child) td span {\n  margin-bottom: 8px;\n}\n.bs-datepicker-body table.months td {\n  height: 52px;\n}\n.bs-datepicker-body table.months td span {\n  padding: 6px;\n  border-radius: 15px;\n}\n.bs-datepicker .current-timedate {\n  color: #54708b;\n  font-size: 15px;\n  text-align: center;\n  height: 30px;\n  line-height: 30px;\n  border-radius: 20px;\n  border: 1px solid #e9edf0;\n  margin-bottom: 10px;\n  cursor: pointer;\n  text-transform: uppercase;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.bs-datepicker .current-timedate span:not(:empty):before {\n  content: \"\";\n  width: 15px;\n  height: 16px;\n  display: inline-block;\n  margin-right: 4px;\n  vertical-align: text-bottom;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAABMklEQVQoU9VTwW3CQBCcOUgBtEBKSAukAnBKME+wFCAlYIhk8sQlxFABtJAScAsuAPBEewYcxCP8ouxrPDsza61uiVN1o6RNHD4htSCmq49RfO71BvMJqBBkITRf1kmUW49nQRC9h1I5AZlBClaL8aP1fKgOOxCx8aSLs+Q19eZuNO8QmPqJRtDFguy7OAcDbJPs+/BKVPDIPrvD2ZJgWAmVe7O0rI0Vqs1seyWUXpuJoppYCa5L+U++NpNPkr5OE2oMdARsb3gykJT5ydZcL8Z9Ww60nxg2LhjON9li9OwXZzo+xLbp3nC2s9CL2RrueGyVrgwNm8HpsCzZ9EEW6kqXlo1GQe03FzP/7W8Hl0dBtu7Bf7zt6mIwvX1RvzDCm7+q3mAW0Dl/GPdUCeXrZLT9BrDrGkm4qlPvAAAAAElFTkSuQmCC);\n}\n.bs-datepicker-multiple {\n  border-radius: 4px 0 0 4px;\n}\n.bs-datepicker-multiple + .bs-datepicker-multiple {\n  margin-left: 10px;\n}\n.bs-datepicker-multiple .bs-datepicker {\n  box-shadow: none;\n  position: relative;\n}\n.bs-datepicker-multiple .bs-datepicker:not(:last-child) {\n  padding-right: 10px;\n}\n.bs-datepicker-multiple .bs-datepicker + .bs-datepicker:after {\n  content: \"\";\n  display: block;\n  width: 14px;\n  height: 10px;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAKCAYAAABrGwT5AAAA1ElEQVQoU42RsQrCUAxF77VuDu7O4oMWW//BURBBpZvgKk4uIrjoqKOTf+DopIO4uYggtFTfw3+pkQqCW1/G5J7kJiFy4m5MxUlxAzgIPHX+lzMPzupRYlYgxiR7vqsOP8YKzsTx0yxFMCUZ+q7aZzlr+OvgoWcAFyAHgat2jLWu48252DdqAihDJGSSJNUUxYmQjs3+hPQBlAh2rG2LCOPnaw3IiGDX99TRCs7ASJsNhUOA7d/LcuHvRG22FIZvsNXw1MX6VZExCilOQKEfeLXr/10+aC9Ho7arh7oAAAAASUVORK5CYII=);\n  position: absolute;\n  top: 25px;\n  left: -8px;\n}\n.bs-datepicker-multiple .bs-datepicker .left {\n  float: left;\n}\n.bs-datepicker-multiple .bs-datepicker .right {\n  float: right;\n}\n.bs-datepicker-container {\n  padding: 15px;\n}\n.bs-datepicker .bs-media-container {\n  display: flex;\n}\n@media (max-width: 768px) {\n  .bs-datepicker .bs-media-container {\n    flex-direction: column;\n  }\n}\n.bs-datepicker-custom-range {\n  padding: 15px;\n  background: #eee;\n}\n.bs-datepicker-predefined-btns button {\n  width: 100%;\n  display: block;\n  height: 30px;\n  background-color: #9aaec1;\n  border-radius: 4px;\n  color: #fff;\n  border: 0;\n  margin-bottom: 10px;\n  padding: 0 18px;\n  text-align: left;\n  transition: 0.3s;\n}\n.bs-datepicker-predefined-btns button:hover {\n  background-color: #54708b;\n}\n.bs-datepicker-buttons {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: flex-end;\n  padding-top: 10px;\n  border-top: 1px solid #e9edf0;\n}\n.bs-datepicker-buttons .btn-default {\n  margin-left: 10px;\n}\n.bs-datepicker-buttons .btn-today-wrapper {\n  display: flex;\n  flex-flow: row wrap;\n}\n.bs-datepicker-buttons .clear-right,\n.bs-datepicker-buttons .today-right {\n  flex-grow: 0;\n}\n.bs-datepicker-buttons .clear-left,\n.bs-datepicker-buttons .today-left {\n  flex-grow: 1;\n}\n.bs-datepicker-buttons .clear-center,\n.bs-datepicker-buttons .today-center {\n  flex-grow: 0.5;\n}\n/* .bs-timepicker */\n.bs-timepicker-container {\n  padding: 10px 0;\n}\n.bs-timepicker-label {\n  color: #54708b;\n  margin-bottom: 10px;\n}\n.bs-timepicker-controls {\n  display: inline-block;\n  vertical-align: top;\n  margin-right: 10px;\n}\n.bs-timepicker-controls button {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 0;\n  background-color: #e9edf0;\n  color: #54708b;\n  font-size: 16px;\n  font-weight: 700;\n  vertical-align: middle;\n  line-height: 0;\n  padding: 0;\n  transition: 0.3s;\n}\n.bs-timepicker-controls button:hover {\n  background-color: #d5dadd;\n}\n.bs-timepicker-controls input {\n  width: 35px;\n  height: 25px;\n  border-radius: 13px;\n  text-align: center;\n  border: 1px solid #e9edf0;\n}\n.bs-timepicker .switch-time-format {\n  text-transform: uppercase;\n  min-width: 54px;\n  height: 25px;\n  border-radius: 20px;\n  border: 1px solid #e9edf0;\n  background: #fff;\n  color: #54708b;\n  font-size: 13px;\n}\n.bs-timepicker .switch-time-format img {\n  vertical-align: initial;\n  margin-left: 4px;\n}\nbs-datepicker-container,\nbs-daterangepicker-container {\n  z-index: 1080;\n}\n/* screen size < 1024px */\n@media (max-width: 768px) {\n  .bs-datepicker-multiple {\n    display: flex;\n  }\n  .bs-datepicker-multiple + .bs-datepicker-multiple {\n    margin-top: 10px;\n    margin-left: 0;\n  }\n}\n/* theming */\n.theme-default .bs-datepicker-head {\n  background-color: #777;\n}\n.theme-default .btn-today-wrapper .btn-success, .theme-default .btn-clear-wrapper .btn-success {\n  background-color: #777;\n  border-color: #777;\n}\n.theme-default .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active:focus, .theme-default .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}\n.theme-default .btn-today-wrapper .btn-success:focus, .theme-default .btn-clear-wrapper .btn-success:focus {\n  box-shadow: none;\n}\n.theme-default .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active, .theme-default .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active {\n  background-color: #616161;\n  border-color: #616161;\n}\n.theme-default .btn-today-wrapper .btn-success:hover, .theme-default .btn-clear-wrapper .btn-success:hover {\n  background-color: #6F6E6E;\n  border-color: #6F6E6E;\n}\n.theme-default .bs-datepicker-predefined-btns button.selected {\n  background-color: #777;\n}\n.theme-default .bs-datepicker-body table td span.selected, .theme-default .bs-datepicker-body table td.selected span,\n.theme-default .bs-datepicker-body table td span[class*=select-]:after, .theme-default .bs-datepicker-body table td[class*=select-] span:after {\n  background-color: #777;\n}\n.theme-default .bs-datepicker-body table td.week span {\n  color: #777;\n}\n.theme-default .bs-datepicker-body table td.active-week span:hover {\n  cursor: pointer;\n  background-color: #777;\n  color: #fff;\n  opacity: 0.5;\n  transition: 0s;\n}\n.theme-green .bs-datepicker-head {\n  background-color: #5cb85c;\n}\n.theme-green .btn-today-wrapper .btn-success, .theme-green .btn-clear-wrapper .btn-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n.theme-green .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active:focus, .theme-green .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}\n.theme-green .btn-today-wrapper .btn-success:focus, .theme-green .btn-clear-wrapper .btn-success:focus {\n  box-shadow: none;\n}\n.theme-green .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active, .theme-green .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active {\n  background-color: #1e7e34;\n  border-color: #1e7e34;\n}\n.theme-green .btn-today-wrapper .btn-success:hover, .theme-green .btn-clear-wrapper .btn-success:hover {\n  background-color: #218838;\n  border-color: #218838;\n}\n.theme-green .bs-datepicker-predefined-btns button.selected {\n  background-color: #5cb85c;\n}\n.theme-green .bs-datepicker-body table td span.selected, .theme-green .bs-datepicker-body table td.selected span,\n.theme-green .bs-datepicker-body table td span[class*=select-]:after, .theme-green .bs-datepicker-body table td[class*=select-] span:after {\n  background-color: #5cb85c;\n}\n.theme-green .bs-datepicker-body table td.week span {\n  color: #5cb85c;\n}\n.theme-green .bs-datepicker-body table td.active-week span:hover {\n  cursor: pointer;\n  background-color: #5cb85c;\n  color: #fff;\n  opacity: 0.5;\n  transition: 0s;\n}\n.theme-blue .bs-datepicker-head {\n  background-color: #5bc0de;\n}\n.theme-blue .btn-today-wrapper .btn-success, .theme-blue .btn-clear-wrapper .btn-success {\n  background-color: #5bc0de;\n  border-color: #5bc0de;\n}\n.theme-blue .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active:focus, .theme-blue .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}\n.theme-blue .btn-today-wrapper .btn-success:focus, .theme-blue .btn-clear-wrapper .btn-success:focus {\n  box-shadow: none;\n}\n.theme-blue .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active, .theme-blue .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active {\n  background-color: #2AA8CD;\n  border-color: #2AA8CD;\n}\n.theme-blue .btn-today-wrapper .btn-success:hover, .theme-blue .btn-clear-wrapper .btn-success:hover {\n  background-color: #3AB3D7;\n  border-color: #3AB3D7;\n}\n.theme-blue .bs-datepicker-predefined-btns button.selected {\n  background-color: #5bc0de;\n}\n.theme-blue .bs-datepicker-body table td span.selected, .theme-blue .bs-datepicker-body table td.selected span,\n.theme-blue .bs-datepicker-body table td span[class*=select-]:after, .theme-blue .bs-datepicker-body table td[class*=select-] span:after {\n  background-color: #5bc0de;\n}\n.theme-blue .bs-datepicker-body table td.week span {\n  color: #5bc0de;\n}\n.theme-blue .bs-datepicker-body table td.active-week span:hover {\n  cursor: pointer;\n  background-color: #5bc0de;\n  color: #fff;\n  opacity: 0.5;\n  transition: 0s;\n}\n.theme-dark-blue .bs-datepicker-head {\n  background-color: #337ab7;\n}\n.theme-dark-blue .btn-today-wrapper .btn-success, .theme-dark-blue .btn-clear-wrapper .btn-success {\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.theme-dark-blue .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active:focus, .theme-dark-blue .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}\n.theme-dark-blue .btn-today-wrapper .btn-success:focus, .theme-dark-blue .btn-clear-wrapper .btn-success:focus {\n  box-shadow: none;\n}\n.theme-dark-blue .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active, .theme-dark-blue .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active {\n  background-color: #266498;\n  border-color: #266498;\n}\n.theme-dark-blue .btn-today-wrapper .btn-success:hover, .theme-dark-blue .btn-clear-wrapper .btn-success:hover {\n  background-color: #2C6FA9;\n  border-color: #2C6FA9;\n}\n.theme-dark-blue .bs-datepicker-predefined-btns button.selected {\n  background-color: #337ab7;\n}\n.theme-dark-blue .bs-datepicker-body table td span.selected, .theme-dark-blue .bs-datepicker-body table td.selected span,\n.theme-dark-blue .bs-datepicker-body table td span[class*=select-]:after, .theme-dark-blue .bs-datepicker-body table td[class*=select-] span:after {\n  background-color: #337ab7;\n}\n.theme-dark-blue .bs-datepicker-body table td.week span {\n  color: #337ab7;\n}\n.theme-dark-blue .bs-datepicker-body table td.active-week span:hover {\n  cursor: pointer;\n  background-color: #337ab7;\n  color: #fff;\n  opacity: 0.5;\n  transition: 0s;\n}\n.theme-red .bs-datepicker-head {\n  background-color: #d9534f;\n}\n.theme-red .btn-today-wrapper .btn-success, .theme-red .btn-clear-wrapper .btn-success {\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n.theme-red .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active:focus, .theme-red .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}\n.theme-red .btn-today-wrapper .btn-success:focus, .theme-red .btn-clear-wrapper .btn-success:focus {\n  box-shadow: none;\n}\n.theme-red .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active, .theme-red .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active {\n  background-color: #D23531;\n  border-color: #D23531;\n}\n.theme-red .btn-today-wrapper .btn-success:hover, .theme-red .btn-clear-wrapper .btn-success:hover {\n  background-color: #E33732;\n  border-color: #E33732;\n}\n.theme-red .bs-datepicker-predefined-btns button.selected {\n  background-color: #d9534f;\n}\n.theme-red .bs-datepicker-body table td span.selected, .theme-red .bs-datepicker-body table td.selected span,\n.theme-red .bs-datepicker-body table td span[class*=select-]:after, .theme-red .bs-datepicker-body table td[class*=select-] span:after {\n  background-color: #d9534f;\n}\n.theme-red .bs-datepicker-body table td.week span {\n  color: #d9534f;\n}\n.theme-red .bs-datepicker-body table td.active-week span:hover {\n  cursor: pointer;\n  background-color: #d9534f;\n  color: #fff;\n  opacity: 0.5;\n  transition: 0s;\n}\n.theme-orange .bs-datepicker-head {\n  background-color: #f0ad4e;\n}\n.theme-orange .btn-today-wrapper .btn-success, .theme-orange .btn-clear-wrapper .btn-success {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n.theme-orange .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active:focus, .theme-orange .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none;\n}\n.theme-orange .btn-today-wrapper .btn-success:focus, .theme-orange .btn-clear-wrapper .btn-success:focus {\n  box-shadow: none;\n}\n.theme-orange .btn-today-wrapper .btn-success:not(:disabled):not(.disabled):active, .theme-orange .btn-clear-wrapper .btn-success:not(:disabled):not(.disabled):active {\n  background-color: #ED9C29;\n  border-color: #ED9C29;\n}\n.theme-orange .btn-today-wrapper .btn-success:hover, .theme-orange .btn-clear-wrapper .btn-success:hover {\n  background-color: #FFAC35;\n  border-color: #FFAC35;\n}\n.theme-orange .bs-datepicker-predefined-btns button.selected {\n  background-color: #f0ad4e;\n}\n.theme-orange .bs-datepicker-body table td span.selected, .theme-orange .bs-datepicker-body table td.selected span,\n.theme-orange .bs-datepicker-body table td span[class*=select-]:after, .theme-orange .bs-datepicker-body table td[class*=select-] span:after {\n  background-color: #f0ad4e;\n}\n.theme-orange .bs-datepicker-body table td.week span {\n  color: #f0ad4e;\n}\n.theme-orange .bs-datepicker-body table td.active-week span:hover {\n  cursor: pointer;\n  background-color: #f0ad4e;\n  color: #fff;\n  opacity: 0.5;\n  transition: 0s;\n}\n.c-dark-theme ~ * .bs-datepicker {\n  background-color: #23242d !important;\n}\n.c-dark-theme ~ * .bs-datepicker .bs-datepicker-head button {\n  color: black !important;\n}\n.c-dark-theme ~ * .bs-datepicker .bs-datepicker-body td {\n  color: #9d9fb2 !important;\n}\n.c-dark-theme ~ * .bs-datepicker .bs-datepicker-body {\n  border-color: #393b4a !important;\n}\n.c-dark-theme ~ * .bs-datepicker .bs-datepicker-body table td.disabled span,\n.c-dark-theme ~ * .bs-datepicker .bs-datepicker-body table td span.disabled {\n  color: #9d9fb2 !important;\n}\n.c-dark-theme ~ * .bs-datepicker .bs-datepicker-body table.days span.in-range:not(.select-start):before {\n  background-color: black !important;\n}\n.c-dark-theme ~ * .bs-datepicker .bs-datepicker-buttons {\n  border-top-color: #393b4a !important;\n}\n:host c-input-group-prepend c-input-group-text c-icon:only-child {\n  display: flex;\n}\n:host c-input-group-append c-input-group-text c-icon:only-child {\n  display: flex;\n}\n.theme-dark-blue .bs-datepicker-head, .custom-today-class, .theme-dark-blue .bs-datepicker-body table td span.selected, .theme-dark-blue .bs-datepicker-body table td.selected span, .theme-dark-blue .bs-datepicker-body table td span[class*=select-]:after, .theme-dark-blue .bs-datepicker-body table td[class*=select-] span:after {\n  background-color: var(--primary) !important;\n  color: white !important;\n}\n.theme-dark-blue .bs-datepicker-body table td.week span {\n  color: var(--primary) !important;\n}\ni {\n  cursor: pointer;\n  font-size: 17px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXIvYnMtZGF0ZXBpY2tlci5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25neC1ib290c3RyYXAvZGF0ZXBpY2tlci91dGlscy9zY3NzL3ZhcmlhYmxlcy5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vbG9ncy1saXN0LmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25neC1ib290c3RyYXAvZGF0ZXBpY2tlci91dGlscy9zY3NzL21peGlucy5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2Nzcy92ZW5kb3JzL2JzLWRhdGVwaWNrZXIvZGF0ZXBpY2tlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLG1CQUFBO0FBQ0E7RUFDRSxhQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQ1JnQjtFRFNoQiwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQVlBLFdBQUE7RUFlQSx3QkFBQTtFQXlFQSx3QkFBQTtFQXNPQSxzQkFBQTtFQTJCQSw0QkFBQTtFQXFDQSx3QkFBQTtFQVlBLCtCQUFBO0VBTUEsbUNBQUE7RUFxQkEsMkJBQUE7QUUxYUY7QUZMRTtFQUNFLFdBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtBRU9KO0FGSkU7RUFDRSxXQUFBO0FFTUo7QUZGRTs7Ozs7O0VBV0UsYUFBQTtBRURKO0FGS0U7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsMEJBQUE7RUFDQSxtQkFBQTtFQVNBLCtCQUFBO0FFWEo7QUZJSTtFQUNFLFdBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBRUZOO0FGTUk7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7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RSxnQkFBQTtBRCtjVjtBQzVjTTtFQUNFLGdCQUFBO0FEOGNSO0FDeGNRO0VBQ0UseUJGVVc7RUVUWCxxQkZTVztBQ2ljckI7QUN2Y1E7RUFDRSx5QkZGVTtFRUdWLHFCRkhVO0FDNGNwQjtBQzVYVTtFQUNFLHlCRnBFQztBQ2tjYjtBQ3RYVTs7RUFJRSx5QkZoRkM7QUNzY2I7QUNuWFU7RUFDRSxjRnBGQztBQ3ljYjtBQ2xYVTtFQUNFLGVBQUE7RUFDQSx5QkZ6RkM7RUUwRkQsV0YvSE07RUVnSU4sWUFBQTtFQUNBLGNBQUE7QURvWFo7QUN0Zkk7RUFDRSx5QkZxQ087QUNvZGI7QUNyZk07RUFDRSx5QkZnQ0s7RUUvQkwscUJGK0JLO0FDd2RiO0FDcGZRO0VBQ0UsZ0JBQUE7QURzZlY7QUNuZk07RUFDRSxnQkFBQTtBRHFmUjtBQ2plUTtFQUNFLHlCRkhVO0VFSVYscUJGSlU7QUN1ZXBCO0FDaGVRO0VBQ0UseUJGZlM7RUVnQlQscUJGaEJTO0FDa2ZuQjtBQ25hVTtFQUNFLHlCRnBFQztBQ3llYjtBQzdaVTs7RUFJRSx5QkZoRkM7QUM2ZWI7QUMxWlU7RUFDRSxjRnBGQztBQ2dmYjtBQ3paVTtFQUNFLGVBQUE7RUFDQSx5QkZ6RkM7RUUwRkQsV0YvSE07RUVnSU4sWUFBQTtFQUNBLGNBQUE7QUQyWlo7QUM3aEJJO0VBQ0UseUJGcUNPO0FDMmZiO0FDNWhCTTtFQUNFLHlCRmdDSztFRS9CTCxxQkYrQks7QUMrZmI7QUMzaEJRO0VBQ0UsZ0JBQUE7QUQ2aEJWO0FDMWhCTTtFQUNFLGdCQUFBO0FENGhCUjtBQzFmUTtFQUNFLHlCRmhCZTtFRWlCZixxQkZqQmU7QUM2Z0J6QjtBQ3pmUTtFQUNFLHlCRjVCYztFRTZCZCxxQkY3QmM7QUN3aEJ4QjtBQzFjVTtFQUNFLHlCRnBFQztBQ2doQmI7QUNwY1U7O0VBSUUseUJGaEZDO0FDb2hCYjtBQ2pjVTtFQUNFLGNGcEZDO0FDdWhCYjtBQ2hjVTtFQUNFLGVBQUE7RUFDQSx5QkZ6RkM7RUUwRkQsV0YvSE07RUVnSU4sWUFBQTtFQUNBLGNBQUE7QURrY1o7QUNwa0JJO0VBQ0UseUJGcUNPO0FDa2lCYjtBQ25rQk07RUFDRSx5QkZnQ0s7RUUvQkwscUJGK0JLO0FDc2lCYjtBQ2xrQlE7RUFDRSxnQkFBQTtBRG9rQlY7QUNqa0JNO0VBQ0UsZ0JBQUE7QURta0JSO0FDcmdCUTtFQUNFLHlCRjFDUztFRTJDVCxxQkYzQ1M7QUNrakJuQjtBQ3BnQlE7RUFDRSx5QkZ0RFE7RUV1RFIscUJGdkRRO0FDNmpCbEI7QUNqZlU7RUFDRSx5QkZwRUM7QUN1akJiO0FDM2VVOztFQUlFLHlCRmhGQztBQzJqQmI7QUN4ZVU7RUFDRSxjRnBGQztBQzhqQmI7QUN2ZVU7RUFDRSxlQUFBO0VBQ0EseUJGekZDO0VFMEZELFdGL0hNO0VFZ0lOLFlBQUE7RUFDQSxjQUFBO0FEeWVaO0FDM21CSTtFQUNFLHlCRnFDTztBQ3lrQmI7QUMxbUJNO0VBQ0UseUJGZ0NLO0VFL0JMLHFCRitCSztBQzZrQmI7QUN6bUJRO0VBQ0UsZ0JBQUE7QUQybUJWO0FDeG1CTTtFQUNFLGdCQUFBO0FEMG1CUjtBQzFqQlE7RUFDRSx5QkY3Qlk7RUU4QloscUJGOUJZO0FDMGxCdEI7QUN6akJRO0VBQ0UseUJGekNXO0VFMENYLHFCRjFDVztBQ3FtQnJCO0FDeGhCVTtFQUNFLHlCRnBFQztBQzhsQmI7QUNsaEJVOztFQUlFLHlCRmhGQztBQ2ttQmI7QUMvZ0JVO0VBQ0UsY0ZwRkM7QUNxbUJiO0FDOWdCVTtFQUNFLGVBQUE7RUFDQSx5QkZ6RkM7RUUwRkQsV0YvSE07RUVnSU4sWUFBQTtFQUNBLGNBQUE7QURnaEJaO0FFcHBCQTtFQUNFLG9DQUFBO0FGdXBCRjtBRXRwQkU7RUFDRSx1QkFBQTtBRndwQko7QUV0cEJFO0VBQ0UseUJBQUE7QUZ3cEJKO0FFdHBCRTtFQUNFLGdDQUFBO0FGd3BCSjtBRXRwQkU7O0VBRUUseUJBQUE7QUZ3cEJKO0FFdHBCRTtFQUNFLGtDQUFBO0FGd3BCSjtBRXRwQkU7RUFDRSxvQ0FBQTtBRndwQko7QUF6cUJFO0VBQ0UsYUFBQTtBQTRxQko7QUF2cUJFO0VBQ0UsYUFBQTtBQTBxQko7QUF2cUJBO0VBQ0UsMkNBQUE7RUFDQSx1QkFBQTtBQTBxQkY7QUF4cUJBO0VBQ0UsZ0NBQUE7QUEycUJGO0FBenFCQTtFQUNFLGVBQUE7RUFDQSxlQUFBO0FBNHFCRiIsImZpbGUiOiJsb2dzLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICd1dGlscy9zY3NzL3ZhcmlhYmxlcyc7XG5AaW1wb3J0ICd1dGlscy9zY3NzL21peGlucyc7XG5cbi8qIC5icy1kYXRlcGlja2VyICovXG4uYnMtZGF0ZXBpY2tlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICBiYWNrZ3JvdW5kOiAkbWFpbi1iZztcbiAgYm94LXNoYWRvdzogMCAwIDEwcHggMCAkbWFpbi1ib3gtc2hhZG93O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG5cbiAgJjphZnRlciB7XG4gICAgY2xlYXI6IGJvdGg7XG4gICAgY29udGVudDogJyc7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cblxuICBicy1kYXktcGlja2VyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgfVxuXG4gIC8qIGJ1dHRvbiAqL1xuICBidXR0b246aG92ZXIsXG4gIGJ1dHRvbjpmb2N1cyxcbiAgYnV0dG9uOmFjdGl2ZSxcbiAgaW5wdXQ6aG92ZXIsXG4gIGlucHV0OmZvY3VzLFxuICBpbnB1dDphY3RpdmUsXG4gICYtYnRucyBidXR0b246aG92ZXIsXG4gICYtYnRucyBidXR0b246Zm9jdXMsXG4gICYtYnRucyBidXR0b246YWN0aXZlLFxuICAmLXByZWRlZmluZWQtYnRucyBidXR0b246YWN0aXZlLFxuICAmLXByZWRlZmluZWQtYnRucyBidXR0b246Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAvKiAuYnMtZGF0ZXBpY2tlci1oZWFkICovXG4gICYtaGVhZCB7XG4gICAgbWluLXdpZHRoOiAyNzBweDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAzcHggM3B4IDAgMDtcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xuXG4gICAgJjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC8qIC5icy1kYXRlcGlja2VyLWhlYWQgYnV0dG9uICovXG4gICAgYnV0dG9uIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGNvbG9yOiAkZm9udC1jb2xvci0wMTtcbiAgICAgIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgICAgICZbZGlzYWJsZWRdLFxuICAgICAgJltkaXNhYmxlZF06aG92ZXIsXG4gICAgICAmW2Rpc2FibGVkXTphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiAkZGlzYWJsZWQtYmFja2dyb3VuZDtcbiAgICAgICAgY29sb3I6ICRkaXNhYmxlZC1jb2xvcjtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICAgIH1cblxuICAgICAgJi5uZXh0LFxuICAgICAgJi5wcmV2aW91cyB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgd2lkdGg6IDMwcHg7XG4gICAgICAgIGhlaWdodDogMzBweDtcblxuICAgICAgICBzcGFuIHtcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYuY3VycmVudCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICAgIG1heC13aWR0aDogMTU1cHg7XG4gICAgICAgIHBhZGRpbmc6IDAgMTNweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmLWhlYWQge1xuICAgIGJ1dHRvbiB7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgfVxuICAgICAgJjphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogLmJzLWRhdGVwaWNrZXItYm9keSAqL1xuICAmLWJvZHkge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMCAwIDNweCAzcHg7XG4gICAgbWluLWhlaWdodDogMjMycHg7XG4gICAgbWluLXdpZHRoOiAyNzhweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWNvbG9yO1xuXG4gICAgLmRheXMud2Vla3Mge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgei1pbmRleDogMTtcbiAgICB9XG5cbiAgICAvKiAuYnMtZGF0ZXBpY2tlci1ib2R5IHRhYmxlICovXG4gICAgdGFibGUge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xuICAgICAgYm9yZGVyLXNwYWNpbmc6IDA7XG5cbiAgICAgIHRoIHtcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICBjb2xvcjogJGZvbnQtY29sb3ItMDI7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgdGQge1xuICAgICAgICBjb2xvcjogJGZvbnQtY29sb3ItMDM7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBwYWRkaW5nOiAwO1xuXG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgLyp6LWluZGV4OiAxOyovXG4gICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZG86IGNoZWNrIGZpcnN0IDpub3QoLmRpc2FibGVkKSB1c2FnZVxuICAgICAgICAmOm5vdCguZGlzYWJsZWQpOm5vdCgud2Vlaykgc3Bhbjpub3QoLmRpc2FibGVkKTpub3QoLmlzLW90aGVyLW1vbnRoKSB7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgJi5pcy1oaWdobGlnaHRlZDpub3QoLmRpc2FibGVkKTpub3QoLnNlbGVjdGVkKSBzcGFuLFxuICAgICAgICBzcGFuLmlzLWhpZ2hsaWdodGVkOm5vdCguZGlzYWJsZWQpOm5vdCguc2VsZWN0ZWQpIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaGlnaGxpZ2h0ZWQ7XG4gICAgICAgICAgdHJhbnNpdGlvbjogMHM7XG4gICAgICAgIH1cblxuICAgICAgICAmLmlzLWFjdGl2ZS1vdGhlci1tb250aDpub3QoLmRpc2FibGVkKTpub3QoLnNlbGVjdGVkKSBzcGFuLFxuICAgICAgICBzcGFuLmlzLWFjdGl2ZS1vdGhlci1tb250aDpub3QoLmRpc2FibGVkKTpub3QoLnNlbGVjdGVkKSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGhpZ2hsaWdodGVkO1xuICAgICAgICAgIHRyYW5zaXRpb246IDBzO1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwYW4uZGlzYWJsZWQsXG4gICAgICAgICYuZGlzYWJsZWQgc3BhbiB7XG4gICAgICAgICAgY29sb3I6ICRmb250LWNvbG9yLTAyO1xuICAgICAgICB9XG5cbiAgICAgICAgc3Bhbi5zZWxlY3RlZCxcbiAgICAgICAgJi5zZWxlY3RlZCBzcGFuIHtcbiAgICAgICAgICBjb2xvcjogJGZvbnQtY29sb3ItMDE7XG4gICAgICAgIH1cblxuICAgICAgICBzcGFuLmlzLW90aGVyLW1vbnRoLFxuICAgICAgICAmLmlzLW90aGVyLW1vbnRoIHNwYW4ge1xuICAgICAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJi5hY3RpdmUge1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgICAgICYuc2VsZWN0LXN0YXJ0OmJlZm9yZSB7XG4gICAgICAgICAgICBsZWZ0OiAzNSU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi5zZWxlY3QtZW5kOmJlZm9yZSB7XG4gICAgICAgICAgICBsZWZ0OiAtODUlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNwYW4uYWN0aXZlLnNlbGVjdC1zdGFydDphZnRlcixcbiAgICAgICAgc3Bhbi5hY3RpdmUuc2VsZWN0LWVuZDphZnRlcixcbiAgICAgICAgJi5hY3RpdmUuc2VsZWN0LXN0YXJ0IHNwYW46YWZ0ZXIsXG4gICAgICAgICYuYWN0aXZlLnNlbGVjdC1lbmQgc3BhbjphZnRlciB7XG4gICAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIHRyYW5zaXRpb246IDAuM3M7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6YmVmb3JlLFxuICAgICAgICBzcGFuOmJlZm9yZSB7XG4gICAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgICAgdG9wOiA2cHg7XG4gICAgICAgICAgYm90dG9tOiA2cHg7XG4gICAgICAgICAgbGVmdDogLTNweDtcbiAgICAgICAgICByaWdodDogLTJweDtcbiAgICAgICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgICYuYWN0aXZlLnNlbGVjdC1zdGFydCArIHRkLmFjdGl2ZTpiZWZvcmUge1xuICAgICAgICAgIGxlZnQ6IC0yMCU7XG4gICAgICAgIH1cblxuICAgICAgICAmOmxhc3QtY2hpbGQuYWN0aXZlOmJlZm9yZSB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMCAzcHggM3B4IDA7XG4gICAgICAgICAgd2lkdGg6IDEyNSU7XG4gICAgICAgICAgbGVmdDogLTI1JTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwYW5bY2xhc3MqPVwic2VsZWN0LVwiXSxcbiAgICAgICAgJltjbGFzcyo9XCJzZWxlY3QtXCJdIHNwYW4ge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBjb2xvcjogJGZvbnQtY29sb3ItMDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogLmJzLWRhdGVwaWNrZXItYm9keSB0YWJsZS5kYXlzICovXG4gICAgICAmLmRheXMge1xuICAgICAgICB0ZCxcbiAgICAgICAgc3BhbiB7XG4gICAgICAgICAgJi5hY3RpdmU6bm90KC5zZWxlY3Qtc3RhcnQpOmJlZm9yZSxcbiAgICAgICAgICAmLmluLXJhbmdlOm5vdCguc2VsZWN0LXN0YXJ0KTpiZWZvcmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJGhpZ2hsaWdodGVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMzJweDtcblxuICAgICAgICAgICYuc2VsZWN0LXN0YXJ0IHtcbiAgICAgICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgICAgfVxuICAgICAgICAgICYuaXMtaGlnaGxpZ2h0ZWQuaW4tcmFuZ2U6YmVmb3JlIHtcbiAgICAgICAgICAgIHJpZ2h0OiAzcHg7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICAmLmluLXJhbmdlLnNlbGVjdC1lbmQ6YmVmb3JlIHtcbiAgICAgICAgICAgIHJpZ2h0OiA0cHg7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRkIHtcbiAgICAgICAgICAmLnNlbGVjdC1zdGFydCArIHRkLnNlbGVjdC1lbmQ6YmVmb3JlLFxuICAgICAgICAgICYuc2VsZWN0LXN0YXJ0ICsgdGQuaXMtaGlnaGxpZ2h0ZWQ6YmVmb3JlLFxuICAgICAgICAgICYuYWN0aXZlICsgdGQuaXMtaGlnaGxpZ2h0ZWQ6YmVmb3JlLFxuICAgICAgICAgICYuYWN0aXZlICsgdGQuc2VsZWN0LWVuZDpiZWZvcmUsXG4gICAgICAgICAgJi5pbi1yYW5nZSArIHRkLmlzLWhpZ2hsaWdodGVkOmJlZm9yZSxcbiAgICAgICAgICAmLmluLXJhbmdlICsgdGQuc2VsZWN0LWVuZDpiZWZvcmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJGhpZ2hsaWdodGVkO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIC5icy1kYXRlcGlja2VyLWJvZHkgdGFibGUud2Vla3MgKi9cbiAgICAgICYud2Vla3Mge1xuICAgICAgICB0ciB7XG4gICAgICAgICAgdGQge1xuICAgICAgICAgICAgJjpudGgtY2hpbGQoMikuYWN0aXZlOmJlZm9yZSB7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xuICAgICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJjpub3QoLndlZWtzKSB7XG4gICAgICAgIHRyIHtcbiAgICAgICAgICB0ZHtcbiAgICAgICAgICAgICY6Zmlyc3QtY2hpbGQ6YmVmb3JlIHtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4IDAgMCAzcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYueWVhcnMge1xuICAgICAgICB0ZCB7XG4gICAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICB3aWR0aDogNDZweDtcbiAgICAgICAgICAgIGhlaWdodDogNDZweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA0NXB4O1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHI6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgICAgdGQge1xuICAgICAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJi5tb250aHMge1xuICAgICAgICB0ZCB7XG4gICAgICAgICAgaGVpZ2h0OiA1MnB4O1xuXG4gICAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICBwYWRkaW5nOiA2cHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qIC5jdXJyZW50LXRpbWVkYXRlICovXG4gIC5jdXJyZW50LXRpbWVkYXRlIHtcbiAgICBjb2xvcjogJGZvbnQtY29sb3ItMDM7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWNvbG9yO1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcblxuICAgIHNwYW46bm90KDplbXB0eSk6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICB3aWR0aDogMTVweDtcbiAgICAgIGhlaWdodDogMTZweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIG1hcmdpbi1yaWdodDogNHB4O1xuICAgICAgdmVydGljYWwtYWxpZ246IHRleHQtYm90dG9tO1xuICAgICAgYmFja2dyb3VuZDogdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQThBQUFBUUNBWUFBQURKVmlVRUFBQUJNa2xFUVZRb1U5VlR3VzNDUUJDY09VZ0J0RUJLU0F1a0FuQktNRSt3RkNBbFlJaGs4c1FseEZBQnRKQVNjQXN1QVBCRWV3WWN4Q1A4b3V4clBEc3phNjF1aVZOMW82Uk5IRDRodFNDbXE0OVJmTzcxQnZNSnFCQmtJVFJmMWttVVc0OW5RUkM5aDFJNUFabEJDbGFMOGFQMWZLZ09PeEN4OGFTTHMrUTE5ZVp1Tk84UW1QcUpSdERGZ3V5N09BY0RiSlBzKy9CS1ZQRElQcnZEMlpKZ1dBbVZlN08wckkwVnFzMXNleVdVWHB1Sm9wcFlDYTVMK1UrK05wTlBrcjVPRTJvTWRBUnNiM2d5a0pUNXlkWmNMOFo5V3c2MG54ZzJMaGpPTjlsaTlPd1haem8reExicDNuQzJzOUNMMlJydWVHeVZyZ3dObThIcHNDelo5RUVXNmtxWGxvMUdRZTAzRnpQLzdXOEhsMGRCdHU3QmY3enQ2bUl3dlgxUnZ6RENtNytxM21BVzBEbC9HUGRVQ2VYclpMVDlCckRyR2ttNHFsUHZBQUFBQUVsRlRrU3VRbUNDKTtcbiAgICB9XG4gIH1cblxuICAvKiAuYnMtZGF0ZXBpY2tlci1tdWx0aXBsZSAqL1xuICAmLW11bHRpcGxlIHtcbiAgICBib3JkZXItcmFkaXVzOiA0cHggMCAwIDRweDtcblxuICAgICYgKyAmIHtcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIH1cblxuICAgIC5icy1kYXRlcGlja2VyIHtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAgICY6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gICAgICB9XG5cbiAgICAgICYgKyAuYnMtZGF0ZXBpY2tlcjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB3aWR0aDogMTRweDtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBOEFBQUFLQ0FZQUFBQnJHd1Q1QUFBQTFFbEVRVlFvVTQyUnNRckNVQXhGNzdWdUR1N080b01XVy8vQlVSQkJwWnZnS2s0dUlyam9xS09UZitEb3BJTzR1WWdndEZUZnczK3BrUXFDVzEvRzVKN2tKaUZ5NG01TXhVbHhBemdJUEhYK2x6TVB6dXBSWWxZZ3hpUjd2cXNPUDhZS3pzVHgweXhGTUNVWitxN2FaemxyK092Z29XY0FGeUFIZ2F0MmpMV3U0ODI1MkRkcUFpaERKR1NTSk5VVXhZbVFqczMraFBRQmxBaDJyRzJMQ09QbmF3M0lpR0RYOTlUUkNzN0FTSnNOaFVPQTdkL0xjdUh2UkcyMkZJWnZzTlh3MU1YNlZaRXhDaWxPUUtFZmVMWHIvMTArYUM5SG83YXJoN29BQUFBQVNVVk9SSzVDWUlJPSk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAyNXB4O1xuICAgICAgICBsZWZ0OiAtOHB4O1xuICAgICAgfVxuXG4gICAgICAubGVmdCB7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgfVxuXG4gICAgICAucmlnaHQge1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogLmJzLWRhdGVwaWNrZXItYnRucyAqL1xuICAmLWNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMTVweDtcbiAgfVxuXG4gIC5icy1tZWRpYS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgQG1lZGlhKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxuICB9XG5cbiAgLyouYnMtZGF0ZXBpY2tlci1jdXN0b20tcmFuZ2UgKi9cbiAgJi1jdXN0b20tcmFuZ2Uge1xuICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgYmFja2dyb3VuZDogJGN1c3RvbS1yYW5nZS1iZztcbiAgfVxuXG4gIC8qIC5icy1kYXRlcGlja2VyLXByZWRlZmluZWQtYnRucyAqL1xuICAmLXByZWRlZmluZWQtYnRucyB7XG4gICAgYnV0dG9uIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYnRuLWJnMjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGNvbG9yOiAkZm9udC1jb2xvci0wMTtcbiAgICAgIGJvcmRlcjogMDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICBwYWRkaW5nOiAwIDE4cHg7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgdHJhbnNpdGlvbjogMC4zcztcblxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRidG4tYmcyLWhvdmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qIC5icy1kYXRlcGlja2VyLWJ1dHRvbnMgKi9cbiAgJi1idXR0b25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgJGJvcmRlci1jb2xvcjtcblxuICAgIC5idG4tZGVmYXVsdCB7XG4gICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICB9XG5cbiAgICAuYnRuLXRvZGF5LXdyYXBwZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XG4gICAgfVxuXG4gICAgLmNsZWFyLXJpZ2h0LFxuICAgIC50b2RheS1yaWdodCB7XG4gICAgICBmbGV4LWdyb3c6IDA7XG4gICAgfVxuICAgIC5jbGVhci1sZWZ0LFxuICAgIC50b2RheS1sZWZ0IHtcbiAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICB9XG5cbiAgICAuY2xlYXItY2VudGVyLFxuICAgIC50b2RheS1jZW50ZXIge1xuICAgICAgZmxleC1ncm93OiAwLjU7XG4gICAgfVxuICB9XG59XG5cbi8qIC5icy10aW1lcGlja2VyICovXG4uYnMtdGltZXBpY2tlciB7XG4gICYtY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAxMHB4IDA7XG4gIH1cblxuICAmLWxhYmVsIHtcbiAgICBjb2xvcjogJGZvbnQtY29sb3ItMDM7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgfVxuXG4gICYtY29udHJvbHMge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcblxuICAgIGJ1dHRvbiB7XG4gICAgICB3aWR0aDogMjBweDtcbiAgICAgIGhlaWdodDogMjBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJvcmRlcjogMDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRidG4tYmc7XG4gICAgICBjb2xvcjogJGZvbnQtY29sb3ItMDM7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIHRyYW5zaXRpb246IDAuM3M7XG5cbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYnRuLWJnLWhvdmVyO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0IHtcbiAgICAgIHdpZHRoOiAzNXB4O1xuICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTNweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXItY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLnN3aXRjaC10aW1lLWZvcm1hdCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBtaW4td2lkdGg6IDU0cHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlci1jb2xvcjtcbiAgICBiYWNrZ3JvdW5kOiAkbWFpbi1iZztcbiAgICBjb2xvcjogJGZvbnQtY29sb3ItMDM7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuXG4gICAgaW1nIHtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBpbml0aWFsO1xuICAgICAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgICB9XG4gIH1cbn1cblxuYnMtZGF0ZXBpY2tlci1jb250YWluZXIsXG5icy1kYXRlcmFuZ2VwaWNrZXItY29udGFpbmVyIHtcbiAgei1pbmRleDogMTA4MDtcbn1cblxuLyogc2NyZWVuIHNpemUgPCAxMDI0cHggKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuYnMtZGF0ZXBpY2tlciB7XG4gICAgJi1tdWx0aXBsZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuXG4gICAgICAmICsgJiB7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiB0aGVtaW5nICovXG5AZWFjaCAkbmFtZSwgJGNvbG9yIGluICR0aGVtZS1saXN0IHtcbiAgQGluY2x1ZGUgdGhlbWluZygkbmFtZSwgJGNvbG9yKTtcbn1cbiIsIiRtYWluLWJnOiAgICAgICAgICNmZmYgIWRlZmF1bHQ7XG4kY3VzdG9tLXJhbmdlLWJnOiAjZWVlICFkZWZhdWx0O1xuXG4kbWFpbi1ib3gtc2hhZG93OiAjYWFhICFkZWZhdWx0O1xuXG4kZm9udC1jb2xvci0wMTogICAjZmZmICFkZWZhdWx0O1xuJGZvbnQtY29sb3ItMDI6ICAgIzlhYWVjMSAhZGVmYXVsdDtcbiRmb250LWNvbG9yLTAzOiAgICM1NDcwOGIgIWRlZmF1bHQ7XG5cbiRib3JkZXItY29sb3I6ICAgICNlOWVkZjAgIWRlZmF1bHQ7XG4kaGlnaGxpZ2h0ZWQ6ICAgICAjZTllZGYwICFkZWZhdWx0O1xuXG4kYnRuLWJnOiAgICAgICAgICAjZTllZGYwICFkZWZhdWx0O1xuJGJ0bi1iZy1ob3ZlcjogICAgI2Q1ZGFkZCAhZGVmYXVsdDtcblxuJGJ0bi1iZzI6ICAgICAgICAgIzlhYWVjMSAhZGVmYXVsdDtcbiRidG4tYmcyLWhvdmVyOiAgICM1NDcwOGIgIWRlZmF1bHQ7XG5cbiR0aGVtZS1ncmF5OiAgICAgICM3NzcgIWRlZmF1bHQ7XG4kdGhlbWUtZ3JlZW46ICAgICAjNWNiODVjICFkZWZhdWx0O1xuJHRoZW1lLWJsdWU6ICAgICAgIzViYzBkZSAhZGVmYXVsdDtcbiR0aGVtZS1kYXJrLWJsdWU6ICMzMzdhYjcgIWRlZmF1bHQ7XG4kdGhlbWUtcmVkOiAgICAgICAjZDk1MzRmICFkZWZhdWx0O1xuJHRoZW1lLW9yYW5nZTogICAgI2YwYWQ0ZSAhZGVmYXVsdDtcblxuJGRpc2FibGVkLWJhY2tncm91bmQ6ICByZ2JhKDIyMSwgMjIxLCAyMjEsIDAuMykgIWRlZmF1bHQ7XG4kZGlzYWJsZWQtY29sb3I6ICAgICAgICNmNWY1ZjUgIWRlZmF1bHQ7XG5cbiRob3Zlci10aGVtZS1kZWZhdWx0OiAjNkY2RTZFO1xuJGhvdmVyLXRoZW1lLWdyZWVuOiAjMjE4ODM4O1xuJGhvdmVyLXRoZW1lLWJsdWU6ICMzQUIzRDc7XG4kaG92ZXItdGhlbWUtZGFyay1ibHVlOiAjMkM2RkE5O1xuJGhvdmVyLXRoZW1lLW9yYW5nZTogI0ZGQUMzNTtcbiRob3Zlci10aGVtZS1yZWQ6ICNFMzM3MzI7XG5cbiRhY3RpdmUtdGhlbWUtZGVmYXVsdDogIzYxNjE2MTtcbiRhY3RpdmUtdGhlbWUtZ3JlZW46ICMxZTdlMzQ7XG4kYWN0aXZlLXRoZW1lLWJsdWU6ICMyQUE4Q0Q7XG4kYWN0aXZlLXRoZW1lLWRhcmstYmx1ZTogIzI2NjQ5ODtcbiRhY3RpdmUtdGhlbWUtb3JhbmdlOiAjRUQ5QzI5O1xuJGFjdGl2ZS10aGVtZS1yZWQ6ICNEMjM1MzE7XG5cbiR0aGVtZS1saXN0OiAoXG4gICdkZWZhdWx0JzogJHRoZW1lLWdyYXksXG4gICdncmVlbic6ICR0aGVtZS1ncmVlbixcbiAgJ2JsdWUnOiAkdGhlbWUtYmx1ZSxcbiAgJ2RhcmstYmx1ZSc6ICR0aGVtZS1kYXJrLWJsdWUsXG4gICdyZWQnOiAkdGhlbWUtcmVkLFxuICAnb3JhbmdlJzogJHRoZW1lLW9yYW5nZSxcbikgIWRlZmF1bHQ7XG4iLCJAaW1wb3J0ICd+bmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyL2JzLWRhdGVwaWNrZXIuc2Nzcyc7XG5AaW1wb3J0ICcuL3NyYy9zY3NzL3ZlbmRvcnMvYnMtZGF0ZXBpY2tlci9kYXRlcGlja2VyJztcblxuOmhvc3QgYy1pbnB1dC1ncm91cC1wcmVwZW5kIGMtaW5wdXQtZ3JvdXAtdGV4dCBjLWljb24ge1xuICAmOm9ubHktY2hpbGQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gIH1cbn1cblxuOmhvc3QgYy1pbnB1dC1ncm91cC1hcHBlbmQgYy1pbnB1dC1ncm91cC10ZXh0IGMtaWNvbiB7XG4gICY6b25seS1jaGlsZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxufVxuLnRoZW1lLWRhcmstYmx1ZSAuYnMtZGF0ZXBpY2tlci1oZWFkLC5jdXN0b20tdG9kYXktY2xhc3MsLnRoZW1lLWRhcmstYmx1ZSAuYnMtZGF0ZXBpY2tlci1ib2R5IHRhYmxlIHRkIHNwYW4uc2VsZWN0ZWQsIC50aGVtZS1kYXJrLWJsdWUgLmJzLWRhdGVwaWNrZXItYm9keSB0YWJsZSB0ZC5zZWxlY3RlZCBzcGFuLCAudGhlbWUtZGFyay1ibHVlIC5icy1kYXRlcGlja2VyLWJvZHkgdGFibGUgdGQgc3BhbltjbGFzcyo9c2VsZWN0LV06YWZ0ZXIsIC50aGVtZS1kYXJrLWJsdWUgLmJzLWRhdGVwaWNrZXItYm9keSB0YWJsZSB0ZFtjbGFzcyo9c2VsZWN0LV0gc3BhbjphZnRlcntcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeSkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG4udGhlbWUtZGFyay1ibHVlIC5icy1kYXRlcGlja2VyLWJvZHkgdGFibGUgdGQud2VlayBzcGFue1xuICBjb2xvcjogIHZhcigtLXByaW1hcnkpICFpbXBvcnRhbnQ7XG59XG5pe1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTdweDtcbn0iLCJAaW1wb3J0ICd2YXJpYWJsZXMnO1xuXG5AbWl4aW4gdGhlbWluZygkbmFtZSwgJGNvbG9yKSB7XG4gIC50aGVtZS0jeyRuYW1lfSB7XG4gICAgLmJzLWRhdGVwaWNrZXItaGVhZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3I7XG4gICAgfVxuXG4gICAgLmJ0bi10b2RheS13cmFwcGVyLCAuYnRuLWNsZWFyLXdyYXBwZXIge1xuICAgICAgLmJ0bi1zdWNjZXNzIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yO1xuICAgICAgICBib3JkZXItY29sb3I6ICRjb2xvcjtcbiAgICAgIH1cbiAgICAgIC5idG4tc3VjY2Vzczpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmUge1xuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAuYnRuLXN1Y2Nlc3M6Zm9jdXMge1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBpZiAkbmFtZSA9PSAnZ3JlZW4nIHtcbiAgICAgIC5idG4tdG9kYXktd3JhcHBlciwgLmJ0bi1jbGVhci13cmFwcGVyIHtcbiAgICAgICAgLmJ0bi1zdWNjZXNzOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjdGl2ZS10aGVtZS1ncmVlbjtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRhY3RpdmUtdGhlbWUtZ3JlZW47XG4gICAgICAgIH1cblxuICAgICAgICAuYnRuLXN1Y2Nlc3M6aG92ZXIge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRob3Zlci10aGVtZS1ncmVlbjtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRob3Zlci10aGVtZS1ncmVlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEBpZiAkbmFtZSA9PSAnYmx1ZScge1xuICAgICAgLmJ0bi10b2RheS13cmFwcGVyLCAuYnRuLWNsZWFyLXdyYXBwZXIge1xuICAgICAgICAuYnRuLXN1Y2Nlc3M6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWN0aXZlLXRoZW1lLWJsdWU7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAkYWN0aXZlLXRoZW1lLWJsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAuYnRuLXN1Y2Nlc3M6aG92ZXIge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRob3Zlci10aGVtZS1ibHVlO1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogJGhvdmVyLXRoZW1lLWJsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBAaWYgJG5hbWUgPT0gJ2RhcmstYmx1ZScge1xuICAgICAgLmJ0bi10b2RheS13cmFwcGVyLCAuYnRuLWNsZWFyLXdyYXBwZXIge1xuICAgICAgICAuYnRuLXN1Y2Nlc3M6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYWN0aXZlLXRoZW1lLWRhcmstYmx1ZTtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRhY3RpdmUtdGhlbWUtZGFyay1ibHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmJ0bi1zdWNjZXNzOmhvdmVyIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaG92ZXItdGhlbWUtZGFyay1ibHVlO1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogJGhvdmVyLXRoZW1lLWRhcmstYmx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEBpZiAkbmFtZSA9PSAnb3JhbmdlJyB7XG4gICAgICAuYnRuLXRvZGF5LXdyYXBwZXIsIC5idG4tY2xlYXItd3JhcHBlciB7XG4gICAgICAgIC5idG4tc3VjY2Vzczpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmUge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRhY3RpdmUtdGhlbWUtb3JhbmdlO1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogJGFjdGl2ZS10aGVtZS1vcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICAuYnRuLXN1Y2Nlc3M6aG92ZXIge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRob3Zlci10aGVtZS1vcmFuZ2U7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAkaG92ZXItdGhlbWUtb3JhbmdlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgQGlmICRuYW1lID09ICdyZWQnIHtcbiAgICAgIC5idG4tdG9kYXktd3JhcHBlciwgLmJ0bi1jbGVhci13cmFwcGVyIHtcbiAgICAgICAgLmJ0bi1zdWNjZXNzOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjdGl2ZS10aGVtZS1yZWQ7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAkYWN0aXZlLXRoZW1lLXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5idG4tc3VjY2Vzczpob3ZlciB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGhvdmVyLXRoZW1lLXJlZDtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRob3Zlci10aGVtZS1yZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBAaWYgJG5hbWUgPT0gJ2RlZmF1bHQnIHtcbiAgICAgIC5idG4tdG9kYXktd3JhcHBlciwgLmJ0bi1jbGVhci13cmFwcGVyIHtcbiAgICAgICAgLmJ0bi1zdWNjZXNzOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGFjdGl2ZS10aGVtZS1kZWZhdWx0O1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogJGFjdGl2ZS10aGVtZS1kZWZhdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLmJ0bi1zdWNjZXNzOmhvdmVyIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkaG92ZXItdGhlbWUtZGVmYXVsdDtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRob3Zlci10aGVtZS1kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgICAuYnMtZGF0ZXBpY2tlci1wcmVkZWZpbmVkLWJ0bnMge1xuICAgICAgICBidXR0b24ge1xuICAgICAgICAgICYuc2VsZWN0ZWQge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yIDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmJzLWRhdGVwaWNrZXItYm9keSB7XG4gICAgICB0YWJsZSB7XG4gICAgICAgIHRkIHtcbiAgICAgICAgICBzcGFuLnNlbGVjdGVkLFxuICAgICAgICAgICYuc2VsZWN0ZWQgc3BhbixcbiAgICAgICAgICBzcGFuW2NsYXNzKj1cInNlbGVjdC1cIl06YWZ0ZXIsXG4gICAgICAgICAgJltjbGFzcyo9XCJzZWxlY3QtXCJdIHNwYW46YWZ0ZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICYud2VlayBzcGFuIHtcbiAgICAgICAgICAgIGNvbG9yOiAkY29sb3I7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi5hY3RpdmUtd2VlayBzcGFuOmhvdmVyIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcjtcbiAgICAgICAgICAgIGNvbG9yOiAkZm9udC1jb2xvci0wMTtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IDBzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gdG9kbzogdGVtcCBjLWRhcmstdGhlbWUgcGx1bWJpbmcgZm9yIGJzLWRhdGVwaWNrZXJcblxuLmMtZGFyay10aGVtZSB+ICogLmJzLWRhdGVwaWNrZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjMyNDJkICFpbXBvcnRhbnQ7XG4gIC5icy1kYXRlcGlja2VyLWhlYWQgYnV0dG9uIHtcbiAgICBjb2xvcjogZGFya2VuKCMyMzI0MmQsIDUwJSkgIWltcG9ydGFudDtcbiAgfVxuICAuYnMtZGF0ZXBpY2tlci1ib2R5IHRkIHtcbiAgICBjb2xvcjogbGlnaHRlbigjMjMyNDJkLCA1MCUpICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmJzLWRhdGVwaWNrZXItYm9keSB7XG4gICAgYm9yZGVyLWNvbG9yOiBsaWdodGVuKCMyMzI0MmQsIDEwJSkgIWltcG9ydGFudDtcbiAgfVxuICAuYnMtZGF0ZXBpY2tlci1ib2R5IHRhYmxlIHRkLmRpc2FibGVkIHNwYW4sXG4gIC5icy1kYXRlcGlja2VyLWJvZHkgdGFibGUgdGQgc3Bhbi5kaXNhYmxlZCB7XG4gICAgY29sb3I6IGxpZ2h0ZW4oIzIzMjQyZCwgNTAlKSAhaW1wb3J0YW50O1xuICB9XG4gIC5icy1kYXRlcGlja2VyLWJvZHkgdGFibGUuZGF5cyBzcGFuLmluLXJhbmdlOm5vdCguc2VsZWN0LXN0YXJ0KTpiZWZvcmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtlbigjMjMyNDJkLCA5MCUpICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmJzLWRhdGVwaWNrZXItYnV0dG9ucyB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogbGlnaHRlbigjMjMyNDJkLCAxMCUpICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuIl19 */");

/***/ }),

/***/ "KaKP":
/*!*******************************************!*\
  !*** ./src/app/views/logs/logs.module.ts ***!
  \*******************************************/
/*! exports provided: LogsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsModule", function() { return LogsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _logs_list_logs_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logs-list/logs-list.component */ "xPDb");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _coreui_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @coreui/angular */ "Iluq");
/* harmony import */ var _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @coreui/icons-angular */ "rVqu");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "5QHs");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/table */ "OaSA");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/sort */ "LUZP");
/* harmony import */ var _log_detail_log_detail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./log-detail/log-detail.component */ "4YEA");
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ "ienR");
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/google-maps */ "MIJf");
/* harmony import */ var _partial_partial_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../partial/partial.module */ "a0rN");





// CoreUI Modules










const route = [
    {
        path: '',
        data: {
            title: 'Logs',
        },
        children: [
            {
                path: '',
                redirectTo: 'logs',
            },
            {
                path: '',
                data: {
                    title: '',
                },
                component: _logs_list_logs_list_component__WEBPACK_IMPORTED_MODULE_3__["LogsListComponent"]
            },
            {
                path: 'detail/:id',
                data: {
                    title: 'Details'
                },
                component: _log_detail_log_detail_component__WEBPACK_IMPORTED_MODULE_11__["LogDetailComponent"]
            }
        ]
    }
];
let LogsModule = class LogsModule {
};
LogsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _logs_list_logs_list_component__WEBPACK_IMPORTED_MODULE_3__["LogsListComponent"],
            _log_detail_log_detail_component__WEBPACK_IMPORTED_MODULE_11__["LogDetailComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(route),
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["TabsetModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["CardModule"],
            _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_6__["IconModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["GridModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["FormModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["ButtonModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["ImgModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_9__["MatTableModule"],
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_10__["MatSortModule"],
            ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_12__["BsDatepickerModule"].forRoot(),
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
            _angular_google_maps__WEBPACK_IMPORTED_MODULE_13__["GoogleMapsModule"],
            _partial_partial_module__WEBPACK_IMPORTED_MODULE_14__["PartialModule"],
            _coreui_angular__WEBPACK_IMPORTED_MODULE_5__["SpinkitModule"],
        ],
    })
], LogsModule);



/***/ }),

/***/ "UOt0":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/logs/log-detail/log-detail.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"fade-in\">\n    <c-card>\n        <c-card-header class=\"d-flex align-items-center\">\n            <h4 class=\"mb-0\">Log Details</h4>\n        </c-card-header>\n        <c-card-body *ngIf=\"logData\">\n            <c-row>\n                <label cLabel=\"col\" cCol md=\"3\" for=\"email-input\"><strong> Action :</strong> </label>\n                <label cLabel=\"col\" cCol md=\"9\" for=\"email-input\"> {{logData.actionOperation}}</label>\n            </c-row>\n            <c-row *ngIf=\"(logData.objectName != 'CheckIn') && (logData.objectName != 'Login')\">\n                <label cLabel=\"col\" cCol md=\"3\" for=\"email-input\"><strong> Object :</strong> </label>\n                <label cLabel=\"col\" cCol md=\"9\" for=\"email-input\">{{logData.objectName}}</label>\n            </c-row>\n            <c-row>\n                <label cLabel=\"col\" cCol md=\"3\" for=\"email-input\"><strong> User Name :</strong> </label>\n                <label cLabel=\"col\" cCol md=\"9\"\n                    for=\"email-input\">{{logData.userDetails?logData.userDetails.name:'-'}}</label>\n            </c-row>\n            <c-row>\n                <label cLabel=\"col\" cCol md=\"3\" for=\"email-input\"><strong> Date Time :</strong> </label>\n                <label cLabel=\"col\" cCol md=\"9\" for=\"email-input\">{{logData.createdAt | date:\"dd/MM/yyyy\n                    HH:mm:ss\"}}</label>\n            </c-row>\n            <c-row *ngIf=\"logData.location && logData.objectName == 'CheckIn'\">\n                <label cLabel=\"col\" cCol md=\"3\" for=\"email-input\"><strong> Location :</strong> </label>\n                <label cLabel=\"col\" cCol md=\"9\" for=\"email-input\">{{logData.location}}</label>\n            </c-row>\n            <c-row *ngIf=\"logData.oprationStatus\">\n                <label cLabel=\"col\" cCol md=\"3\" for=\"email-input\"><strong> Status :</strong> </label>\n                <label cLabel=\"col\" cCol md=\"9\" for=\"email-input\">logData.oprationStatus == 0\n            ? \"Inactive\"\n            : logData.oprationStatus == 1\n            ? \"Active\"\n            : \"Pending\"</label>\n            </c-row>\n            <c-row *ngIf=\"logData.actionOperation ==='Deactivate'\">\n                <label cLabel=\"col\" cCol md=\"3\" for=\"email-input\"><strong> Message :</strong> </label>\n                <label cLabel=\"col\" cCol md=\"9\" for=\"email-input\">This User is deactivated</label>\n            </c-row>\n\n            <div class=\"mt-3\" *ngIf=\"logData && logData.objectName == 'CheckIn'\">\n                <div *ngIf=\"gmLoader.apiLoaded | async\">\n                    <google-map [options]=\"options\" [width]=\"'100%'\" [height]=\"'480px'\">\n                        <map-marker #marker=\"mapMarker\" [position]=\"logData.location |location\"\n                            [options]=\"markerOptions\">\n                        </map-marker>\n                    </google-map>\n                </div>\n            </div>\n        </c-card-body>\n    </c-card>\n    <c-card *ngIf=\"(logData) && (logData.contentBeforeAction || logData.contentAfterAction) && logData.actionOperation !='Deactivate' && logData.actionOperation !='Login' \n    && logData.actionOperation !='Logout'\" >\n        <c-card-header class=\"d-flex align-items-center\">\n            <h4 class=\"mb-0\">List of Fields</h4>\n        </c-card-header>\n        <c-card-body>\n            <table class=\"table table-responsive-sm\">\n                <colgroup>\n                    <col class=\"column-1\" />\n                    <col class=\"column-2\" />\n                    <col class=\"column-3\" />\n                </colgroup>\n                <thead>\n                    <tr>\n                        <th scope=\"col\">Field Name</th>\n                        <th>Previous Content</th>\n                        <th>Updated Content</th>\n                    </tr>\n                </thead>\n                <tbody *ngIf=\"logData && logData.objectName == 'User' && logData.actionOperation !='Deactivate'\">\n                    <tr *ngFor=\"let data of userArr\">\n                        <td scope=\"row\">{{ data }}</td>\n                        <td>{{ logData.contentBeforeAction?logData.contentBeforeAction[data]:'' }}</td>\n                        <td *ngIf=\"logData.contentAfterAction\">{{ logData.contentAfterAction[data] }}</td>\n                    </tr>\n                </tbody>\n\n                <tbody *ngIf=\"logData && logData.objectName == 'Scan History'\">\n                    <tr *ngFor=\"let data of checkInArr\">\n                        <td scope=\"row\">{{ data }}</td>\n                        <td>{{logData.contentBeforeAction? logData.contentBeforeAction[data]:'' }}</td>\n                        <td *ngIf=\"logData.contentAfterAction\">{{ logData.contentAfterAction[data] }}</td>\n                    </tr>\n                </tbody>\n                <tbody *ngIf=\"logData && logData.objectName == 'Device'\">\n                    <tr *ngFor=\"let data of deviceArr\">\n                        <td scope=\"row\">{{ data }}</td>\n                        <td>{{logData.contentBeforeAction? data !='organizationDetail.organizationName'?logData.contentBeforeAction[data]:logData.contentBeforeAction?.organizationDetail?logData.contentBeforeAction?.organizationDetail?.organizationName:'-':'' }}</td>\n                        <td *ngIf=\"logData.contentAfterAction\">{{data !='organizationDetail.organizationName'? logData.contentAfterAction[data]: logData.contentAfterAction?.organizationDetail?logData.contentAfterAction?.organizationDetail?.organizationName:'-'}}</td>\n                    </tr>\n                </tbody>\n                <tbody *ngIf=\"logData && logData.objectName == 'Organization'\">\n                    <tr *ngFor=\"let data of organizationArr\">\n                        <td scope=\"row\">{{ data }}</td>\n                        <td>{{logData.contentBeforeAction? logData.contentBeforeAction[data]:'' }}</td>\n                        <td *ngIf=\"logData.contentAfterAction\">{{ logData.contentAfterAction[data] }}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </c-card-body>\n    </c-card>\n</div>");

/***/ }),

/***/ "WPje":
/*!**********************************!*\
  !*** ./src/app/services/role.ts ***!
  \**********************************/
/*! exports provided: Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
const Role = {
    'admin': 'Organization Admin',
    'manager': 'Organization Manager',
    'resellers': 'Resellers',
    'installer': 'Installer',
    'scanner': 'Scanner',
    'scannerAndInstaller': 'ScannerAndInstaller',
    'superAdmin': 'Super Admin'
};


/***/ }),

/***/ "wXVj":
/*!*****************************************************************!*\
  !*** ./src/app/views/logs/log-detail/log-detail.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2ctZGV0YWlsLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "xPDb":
/*!*************************************************************!*\
  !*** ./src/app/views/logs/logs-list/logs-list.component.ts ***!
  \*************************************************************/
/*! exports provided: LogsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsListComponent", function() { return LogsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_logs_list_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./logs-list.component.html */ "1ClV");
/* harmony import */ var _logs_list_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logs-list.component.scss */ "K8FM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/paginator */ "5QHs");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sort */ "LUZP");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/table */ "OaSA");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/modal */ "LqlI");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/auth.service */ "lGQG");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/http-req.service */ "J+oG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _services_role__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/role */ "WPje");












let LogsListComponent = class LogsListComponent {
    constructor(httpReqService, modalService, authService) {
        this.httpReqService = httpReqService;
        this.modalService = modalService;
        this.authService = authService;
        this.colorTheme = "theme-dark-blue";
        this.gridOption = {
            pagesize: 10,
            search: "",
            filter: {
                dateRange: {
                    fromDate: "",
                    toDate: "",
                },
                status: { $in: [0, 1] },
            },
            skip: 0,
            limit: 10,
            allrecords: false,
            sortField: "",
            sortOrder: "",
        };
        //displayedColumns: string[] = ['actionOperation', 'objectName', 'userDetails.name', 'createdAt', 'action'];
        this.displayedColumns = [
            "actionOperation",
            "userDetails.name",
            "createdAt",
            "action",
        ];
        this.field = ["createdAt"];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
        this.organizationArr = [];
        this.gridOption1 = {
            allrecords: true,
            sortField: "name",
            sortOrder: "asc",
            filter: { status: { $in: [1, 4] } },
        };
        this.permissionrArr = [];
        this.loading = false;
        //objectArr: any = ['Device', 'User', 'Organization', 'Login', 'CheckIn'];
        //actionArr: any = ['Create', 'Update', 'Delete', 'Login', 'Checkin', 'Change Request', 'Approval', 'Deactivate']
        this.userArr = [];
        this.actionOperation = "";
        this.userId = "";
        this.objectName = "";
        this.isViewed = "";
        this.fromDate = null;
        this.toDate = null;
        this.isSuccess = "";
        this.organizationId = "";
        this.roles = _services_role__WEBPACK_IMPORTED_MODULE_11__["Role"];
        this.isOrganizationAdmin = false;
        this.isSupperAdmin = false;
        this.isDisplay = false;
    }
    ngOnInit() {
        this.loading = true;
        this.dataSource.sort = this.sort;
        this.authService.notificationEvent.subscribe(() => {
            this.gridOption.filter = {
                dateRange: {
                    fromDate: "",
                    toDate: "",
                },
                status: { $in: [0, 1] },
            };
            this.gridOption.skip = 0;
            this.gridOption.limit = 10;
            if (this.tokenData.role === _services_role__WEBPACK_IMPORTED_MODULE_11__["Role"].admin) {
                delete this.gridOption.filter["organizationUniqueId"];
            }
            this.actionOperation = "";
            this.userId = "";
            this.objectName = "";
            this.isViewed = "";
            this.fromDate = null;
            this.toDate = null;
            this.isSuccess = "";
            this.organizationId = "";
            this.getData();
        });
        this.bsConfig = Object.assign({}, {
            containerClass: this.colorTheme,
            customTodayClass: "custom-today-class",
            dateInputFormat: "DD-MM-YYYY",
        });
        this.tokenData = this.authService.decodeToken();
        this.tokenData = this.tokenData.user;
        this.getOrganizationList();
        this.authService.getBadgeCount();
        if (this.tokenData.role === _services_role__WEBPACK_IMPORTED_MODULE_11__["Role"].admin) {
            this.gridOption.filter["organization"] = this.tokenData.organizationId;
        }
        this.getUserList();
        this.getPermissionList();
        this.loading = false;
    }
    ngAfterContentInit() {
        this.dataSource.paginator = this.paginator;
        // this.getData();
    }
    getData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            this.gridOption.sortField = this.sort.active;
            this.gridOption.sortOrder = this.sort.direction;
            this.gridOption.filter["user_id"] = this.tokenData._id;
            const response = yield this.httpReqService.post("logs/list", this.gridOption, false);
            this.data = response.items;
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](this.data);
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
    change(event, data, index) {
        this.statusIndex = index;
        if (data.status === 1) {
            const procced = confirm("Do you want to disable this user?");
            if (procced) {
                event.checked = !event.checked;
                if (data.status === 1) {
                    this.changeStatus({ status: 0 }, data._id);
                }
                else {
                    this.changeStatus({ status: 1 }, data._id);
                }
            }
            else {
                event.target.checked = true;
                data.status = 1;
            }
        }
        else {
            this.changeStatus({ status: 1 }, data._id);
        }
    }
    changeStatus(data, id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            data["_id"] = id;
            const response = yield this.httpReqService.put("users", data);
            this.dataSource.data[this.statusIndex] = response.items;
            this.dataSource._updateChangeSubscription();
        });
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
    filterData(event, type) {
        let val = event.target.value;
        if (event.target.value) {
            if (type === "status") {
                val = Number(val);
            }
            this.gridOption.filter[type] = val;
        }
        else {
            delete this.gridOption.filter[type];
        }
        this.getData();
        this.pagesetUp();
    }
    changeFromDate(e) {
        if (e) {
            const date = e.toISOString().split("T")[0];
            this.gridOption.filter["dateRange"]["fromDate"] = date;
            this.getData();
        }
    }
    changeToDate(e) {
        if (e) {
            const date = e.toISOString().split("T")[0];
            this.gridOption.filter["dateRange"]["toDate"] = date;
            this.getData();
        }
    }
    getUserList() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.gridOption1.filter["user_id"] = this.tokenData._id;
            const response = yield this.httpReqService.post("users/list", this.gridOption1, false);
            if (response && response.items.length) {
                this.userArr = response.items;
            }
            this.getData();
        });
    }
    pagesetUp() {
        this.paginator.pageIndex = 0;
        this.gridOption.limit = this.paginator.pageSize;
        this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
        this.gridOption.sortField = this.sort.active;
        this.gridOption.sortOrder = this.sort.direction;
    }
    getOrganizationList() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            const obj = {
                allrecords: true,
                sortField: "organizationName",
                sortOrder: "asc",
                filter: { status: 1 },
            };
            // if (this.tokenData.user.organizationId) {
            //   this.gridOption['orgasnizationUniqueId'] = this.tokenData.user.organizationId;
            // }
            obj.filter["user_id"] = this.tokenData._id;
            const response = yield this.httpReqService.post("organization/list", obj, false);
            if (response && response.items.length) {
                this.organizationArr = response.items;
            }
            this.loading = false;
        });
    }
    getPermissionList() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = true;
            let user = this.tokenData;
            // console.log(user);
            if (user != null) {
                if (user.is_org &&
                    user.organizationId != null &&
                    user.organizationId != "") {
                    this.isOrganizationAdmin = true;
                }
                else if (user.organizationId == null) {
                    this.isSupperAdmin = true;
                }
            }
            if (this.isSupperAdmin || this.isOrganizationAdmin) {
                this.isDisplay = true;
            }
            this.loading = false;
        });
    }
};
LogsListComponent.ctorParameters = () => [
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_9__["HttpReqService"] },
    { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["BsModalService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"] }
];
LogsListComponent.propDecorators = {
    paginator: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"],] }],
    sort: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"],] }]
};
LogsListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-logs-list",
        template: _raw_loader_logs_list_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["DatePipe"]],
        styles: [_logs_list_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], LogsListComponent);



/***/ })

}]);
//# sourceMappingURL=views-logs-logs-module-es2015.js.map