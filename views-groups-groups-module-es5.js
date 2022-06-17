(function () {
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-groups-groups-module"], {
    /***/
    "5XSl":
    /*!*************************************************************************!*\
      !*** ./src/app/views/groups/assigned-group/assigned-group.component.ts ***!
      \*************************************************************************/

    /*! exports provided: AssignedGroupComponent */

    /***/
    function XSl(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AssignedGroupComponent", function () {
        return AssignedGroupComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_assigned_group_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./assigned-group.component.html */
      "m+iz");
      /* harmony import */


      var _assigned_group_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./assigned-group.component.scss */
      "r5cE");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "8Y7J");
      /* harmony import */


      var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/paginator */
      "5QHs");
      /* harmony import */


      var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/sort */
      "LUZP");
      /* harmony import */


      var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/material/table */
      "OaSA");
      /* harmony import */


      var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ngx-bootstrap/modal */
      "LqlI");
      /* harmony import */


      var _services_execl_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../services/execl.service */
      "4514");
      /* harmony import */


      var _services_loader_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../../services/loader.service */
      "5dVO");
      /* harmony import */


      var _partial_modals_delete_modal_delete_modal_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../../partial/modals/delete-modal/delete-modal.component */
      "6Jid");
      /* harmony import */


      var _partial_modals_location_modal_location_modal_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../../partial/modals/location-modal/location-modal.component */
      "SR4K");
      /* harmony import */


      var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ../../../services/auth.service */
      "lGQG");
      /* harmony import */


      var _services_http_req_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ../../../services/http-req.service */
      "J+oG");
      /* harmony import */


      var _services_role__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ../../../services/role */
      "WPje");
      /* harmony import */


      var _partial_modals_add_group_modal_add_group_modal_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ../../../partial/modals/add-group-modal/add-group-modal.component */
      "319c");
      /* harmony import */


      var _partial_modals_allocate_device_modal_allocate_device_modal_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ../../../partial/modals/allocate-device-modal/allocate-device-modal.component */
      "529H");

      var AssignedGroupComponent = /*#__PURE__*/function () {
        function AssignedGroupComponent(httpReqService, modalService, authService, loaderService, excelService) {
          _classCallCheck(this, AssignedGroupComponent);

          this.httpReqService = httpReqService;
          this.modalService = modalService;
          this.authService = authService;
          this.loaderService = loaderService;
          this.excelService = excelService;
          this.gridOption = {
            pagesize: 10,
            search: "",
            filter: {},
            skip: 0,
            limit: 10,
            allrecords: false,
            sortField: "",
            sortOrder: ""
          };
          this.displayedColumns = ["name", "users", "action"];
          this.field = ["id1", "uid"];
          this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
          this.role = _services_role__WEBPACK_IMPORTED_MODULE_14__["Role"];
          this.tippyPropsDefault = {
            interactive: true,
            allowHTML: true,
            appendTo: "parent",
            theme: "c-tooltip",
            trigger: "mouseenter focus touchstart"
          };
          this.selectedLocation = {
            lat: 0,
            lng: 0
          };
          this.organizationArr = [];
          this.gridOption1 = {
            allrecords: true,
            sortField: "name",
            sortOrder: "asc",
            filter: {
              status: {
                $in: [1, 4]
              }
            }
          };
          this.installerArr = [];
          this.isRegeistred = false;
          this.header = ["Name", "Users"];
          this.keysArr = ["name", "users"];
          this.tempHeader = [];
          this.tempKeysArr = [];
          this.coloumn = [];
        }

        _createClass(AssignedGroupComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.dataSource.sort = this.sort;
            this.tokenData = this.authService.decodeToken(); // this.getOrganizationList();
            // this.getInstallerList();

            this.coloumn = _toConsumableArray(this.displayedColumns);
            this.tempHeader = _toConsumableArray(this.header);
            this.tempKeysArr = _toConsumableArray(this.keysArr);
          }
        }, {
          key: "getOrganizationDetail",
          value: function getOrganizationDetail() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var response;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.httpReqService.get("organizationByUniqueId", this.tokenData.user.organizationId);

                    case 2:
                      response = _context.sent;

                      if (response.items.length) {
                        this.organizationId = response.items[0]._id;
                        this.gridOption.filter["organizationId"] = this.organizationId;
                        this.displayedColumns.splice(this.displayedColumns.indexOf("organizationDetail.organizationName"), 1);
                        this.keysArr.splice(this.keysArr.indexOf("organizationDetail.organizationName"), 1);
                        this.header.splice(this.header.indexOf("Assigned To"), 1);
                        this.getData();
                      }

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "ngAfterContentInit",
          value: function ngAfterContentInit() {
            this.dataSource.paginator = this.paginator; // if (this.tokenData.user.role !== Role.admin) {
            //   this.getOrganizationDetail();
            // } else {
            //   this.getData();
            // }
          }
        }, {
          key: "getData",
          value: function getData(isRegisterd) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var obj, response;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      // this.gridOption.sortField = this.sort.active;
                      // this.gridOption.sortOrder = this.sort.direction;
                      obj = {
                        groupType: "user",
                        user_id: this.tokenData.user._id
                      };
                      _context2.next = 3;
                      return this.httpReqService.post("userDeviceGroup/list", obj, false);

                    case 3:
                      response = _context2.sent;
                      this.data = response.items;
                      this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](this.data);
                      this.resultsLength = response.totalCount;

                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "sortChange",
          value: function sortChange() {
            this.gridOption.limit = this.paginator.pageSize;
            this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
            this.gridOption.sortField = this.sort.active;
            this.gridOption.sortOrder = this.sort.direction;
            this.paginator.pageIndex = 0;
            this.getData();
          }
        }, {
          key: "pageChange",
          value: function pageChange() {
            this.gridOption.limit = this.paginator.pageSize;
            this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
            this.getData();
          }
        }, {
          key: "change",
          value: function change(event, data, index) {
            this.statusIndex = index;

            if (data.status === 1) {
              var procced = confirm("Do you want to disable this user?");

              if (procced) {
                event.checked = !event.checked;

                if (data.status === 1) {
                  this.changeStatus({
                    status: 0
                  }, data._id);
                } else {
                  this.changeStatus({
                    status: 1
                  }, data._id);
                }
              } else {
                event.target.checked = true;
                data.status = 1;
              }
            } else {
              this.changeStatus({
                status: 1
              }, data._id);
            }
          }
        }, {
          key: "changeStatus",
          value: function changeStatus(data, id) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var response;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      data["_id"] = id;
                      _context3.next = 3;
                      return this.httpReqService.put("users", data);

                    case 3:
                      response = _context3.sent;
                      this.dataSource.data[this.statusIndex] = response.items;

                      this.dataSource._updateChangeSubscription();

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "search",
          value: function search(event) {
            var filterValue = event.target.value;

            if (filterValue) {
              filterValue = filterValue.trim(); // Remove whitespace

              filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

              this.gridOption.searchfields = this.field;
            } else {
              delete this.gridOption.searchfields;
              filterValue = "";
            }

            this.gridOption.search = filterValue;
            this.pagesetUp();
            this.getData();
          }
        }, {
          key: "delete",
          value: function _delete(data) {
            var _this = this;

            var initialState = {
              title: "Delete This Device",
              message: "Are you sure you want to delete this device?",
              list: data
            };
            this.modalRef = this.modalService.show(_partial_modals_delete_modal_delete_modal_component__WEBPACK_IMPORTED_MODULE_10__["DeleteModalComponent"], {
              "class": "modal-xl modal-dialog-centered",
              initialState: initialState,
              backdrop: "static",
              keyboard: false
            });
            this.modalRef.content.cancleButtonText = "Cancel";
            this.modalRef.content.deleteButtonText = "Delete";
            this.modalRef.content.url = "device/delete";
            this.modalRef.content.is_status_change = false;
            this.modalRef.content.response.subscribe(function (result) {
              if (result) {
                _this.getData();
              }
            });
          }
        }, {
          key: "simpleProps",
          value: function simpleProps(data) {
            return Object.assign(Object.assign({}, this.tippyPropsDefault), {
              content: data
            });
          }
        }, {
          key: "selectLocation",
          value: function selectLocation(data) {
            var location = data.split(",");
            this.selectedLocation["lat"] = Number(location[0]);
            this.selectedLocation["lng"] = Number(location[1]);
            var initialState = {
              title: "Checkin Location",
              list: this.selectedLocation
            };
            this.modalRef = this.modalService.show(_partial_modals_location_modal_location_modal_component__WEBPACK_IMPORTED_MODULE_11__["LocationModalComponent"], {
              "class": "modal-xl modal-dialog-centered",
              initialState: initialState,
              backdrop: "static",
              keyboard: false
            });
            this.modalRef.content.cancleButtonText = "Close";
          }
        }, {
          key: "getOrganizationList",
          value: function getOrganizationList() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var obj, response;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      obj = {
                        groupType: "user",
                        user_id: this.tokenData.user._id
                      };
                      _context4.next = 3;
                      return this.httpReqService.post("userDeviceGroup/list", obj, false);

                    case 3:
                      response = _context4.sent;

                      if (response && response.items.length) {
                        this.organizationArr = response.items;
                      }

                    case 5:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "getInstallerList",
          value: function getInstallerList() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var response;
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      this.gridOption1.searchfields = ["role"];
                      this.gridOption1.search = this.role.installer;
                      this.gridOption1.filter["user_id"] = this.tokenData.user._id;
                      _context5.next = 5;
                      return this.httpReqService.post("users/list", this.gridOption1, false);

                    case 5:
                      response = _context5.sent;

                      if (response && response.items.length) {
                        this.installerArr = response.items;
                      }

                    case 7:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));
          }
        }, {
          key: "filterData",
          value: function filterData(event, type) {
            var val = event.target.value;

            if (event.target.value) {
              console.warn("in if", typeof val);

              if (type === "status") {
                val = Number(val);
              }

              this.gridOption.filter[type] = val;
            } else {
              delete this.gridOption.filter[type];
            }

            this.getData();
            this.pagesetUp();
          }
        }, {
          key: "registerDeviceFilter",
          value: function registerDeviceFilter(event) {
            var registerStatus = event.target.value;

            if (registerStatus) {
              if (registerStatus === "true") {
                this.setOrignalColoumn();
                this.gridOption.filter["registrationStatus"] = true;
              } else {
                this.displayedColumns.splice(this.displayedColumns.indexOf("organizationDetail.organizationName"), 1);
                this.displayedColumns.splice(this.displayedColumns.indexOf("location"), 1);
                this.keysArr.splice(this.keysArr.indexOf("organizationDetail.organizationName"), 1);
                this.keysArr.splice(this.keysArr.indexOf("location"), 1);
                this.header.splice(this.header.indexOf("Coordinates"), 1);
                this.header.splice(this.header.indexOf("Assigned To"), 1);
                this.gridOption.filter["registrationStatus"] = false;
              }
            } else {
              this.setOrignalColoumn();
              delete this.gridOption.filter.registrationStatus;
            }

            this.pagesetUp();
            this.getData(true);
          }
        }, {
          key: "setOrignalColoumn",
          value: function setOrignalColoumn() {
            this.displayedColumns = _toConsumableArray(this.coloumn);
            this.header = _toConsumableArray(this.tempHeader);
            this.keysArr = _toConsumableArray(this.tempKeysArr);
          }
        }, {
          key: "pagesetUp",
          value: function pagesetUp() {
            this.paginator.pageIndex = 0;
            this.gridOption.limit = this.paginator.pageSize;
            this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
            this.gridOption.sortField = this.sort.active;
            this.gridOption.sortOrder = this.sort.direction;
          }
        }, {
          key: "selectExport",
          value: function selectExport(event) {
            if (event.target.value === "1") {
              this.selectedExportType = 1;
              this.exportData();
            } else if (event.target.value === "0") {
              this.selectedExportType = 0;
              this.exportData();
            }
          }
        }, {
          key: "exportData",
          value: function exportData() {
            var _this2 = this;

            this.loaderService.display(true);
            var data = [];
            this.data.forEach(function (element) {
              // tslint:disable-next-line: forin
              var rowData = [];

              _this2.keysArr.forEach(function (entity) {
                if (entity.indexOf(".") > -1) {
                  var property = entity.split(".");

                  if (element[property[0]]) {
                    rowData.push(element[property[0]][property[1]]);
                  } else {
                    rowData.push("");
                  }
                } else {
                  if (element[entity] != null) {
                    if (entity === "status") {
                      if (element[entity]) {
                        rowData.push("Active");
                      } else {
                        rowData.push("Inactive");
                      }
                    } else {
                      rowData.push(element[entity]);
                    }
                  } else {
                    rowData.push("");
                  }
                }
              });

              data.push(rowData);
            });
            var details = {
              header: this.header,
              data: data,
              fileName: "Device",
              exportType: this.selectedExportType
            };
            this.excelService.exportData(details);
          }
        }, {
          key: "selectFile",
          value: function selectFile(e) {}
        }, {
          key: "addGroup",
          value: function addGroup() {
            var _this3 = this;

            var initialState = {
              title: "Create Device Or User Group",
              groupType: "user"
            };
            this.modalRef = this.modalService.show(_partial_modals_add_group_modal_add_group_modal_component__WEBPACK_IMPORTED_MODULE_15__["AddGroupModalComponent"], {
              "class": "modal-xl modal-dialog-centered ",
              initialState: initialState,
              backdrop: "static",
              keyboard: false
            });
            this.modalRef.content.cancleButtonText = "Cancel";
            this.modalRef.content.submitButtonText = "Submit";
            this.modalRef.content.response.subscribe(function (result) {
              _this3.getData();

              if (result) {}
            });
          }
        }, {
          key: "allocateDevice",
          value: function allocateDevice() {
            var initialState = {
              title: "Allocate Device To User"
            };
            this.modalRef = this.modalService.show(_partial_modals_allocate_device_modal_allocate_device_modal_component__WEBPACK_IMPORTED_MODULE_16__["AllocateDeviceModalComponent"], {
              "class": "modal-xl modal-dialog-centered modal-lg",
              initialState: initialState,
              backdrop: "static",
              keyboard: false
            });
            this.modalRef.content.cancleButtonText = "Cancel";
            this.modalRef.content.submitButtonText = "Allocate";
            this.modalRef.content.response.subscribe(function (result) {
              if (result) {// this.getData();
              }
            });
          }
        }]);

        return AssignedGroupComponent;
      }();

      AssignedGroupComponent.ctorParameters = function () {
        return [{
          type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_13__["HttpReqService"]
        }, {
          type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_7__["BsModalService"]
        }, {
          type: _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"]
        }, {
          type: _services_loader_service__WEBPACK_IMPORTED_MODULE_9__["LoaderService"]
        }, {
          type: _services_execl_service__WEBPACK_IMPORTED_MODULE_8__["ExeclService"]
        }];
      };

      AssignedGroupComponent.propDecorators = {
        paginator: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
          args: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"]]
        }],
        sort: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
          args: [_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"]]
        }]
      };
      AssignedGroupComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-assigned-group",
        template: _raw_loader_assigned_group_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_assigned_group_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], AssignedGroupComponent);
      /***/
    },

    /***/
    "m+iz":
    /*!*****************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/groups/assigned-group/assigned-group.component.html ***!
      \*****************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function mIz(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<div class=\"fade-in\">\n    <c-card>\n        <c-card-header class=\"d-flex align-items-center\">\n            <h4 class=\"mb-0\">Assigned Group List</h4>\n            <c-card-header-actions class=\"ml-auto\">\n                <button cButton color=\"primary\" size=\"md\" class=\"mfe-1\" (click)=\"allocateDevice()\">\n                    <span> Allocate Group</span>\n                </button>\n            </c-card-header-actions>\n        </c-card-header>\n        <c-card-body>\n            <!-- <c-row class=\"mb-3\">\n                <c-col md=\"12\">\n                    <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                            <span class=\"input-group-text\"><i class=\"cil-search\"></i></span>\n                        </div>\n                        <input cInput placeholder=\"Search here...\" (input)=\"search($event)\" />\n                    </div>\n                </c-col>\n            </c-row> -->\n\n            <mat-table #table mat-table [dataSource]=\"dataSource\" matSort matSortActive=\"createdAt\" matSortDisableClear\n                matSortDirection=\"desc\" class=\"mat-elevation-z8\" (matSortChange)=\"sortChange()\">\n\n                <ng-container matColumnDef=\"name\">\n                    <mat-header-cell [ngClass]=\"'w-name'\" *matHeaderCellDef>Device Group </mat-header-cell>\n                    <mat-cell [ngClass]=\"'w-name'\" *matCellDef=\"let element\">\n                        {{element.name}}\n                    </mat-cell>\n                </ng-container>\n\n\n                <ng-container matColumnDef=\"users\">\n                    <mat-header-cell [ngClass]=\"'w-name'\" *matHeaderCellDef> User Group </mat-header-cell>\n                    <mat-cell [ngClass]=\"'w-name'\" *matCellDef=\"let element\"> {{element.users.length}} </mat-cell>\n                </ng-container>\n\n\n                <ng-container matColumnDef=\"action\">\n                    <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\">\n                       <!--  <i class=\"fa fa-pencil mr-2\" routerLink=\"/device/update/{{element._id}}\"></i>\n                        <i class=\"fa fa-trash text-danger\" (click)=\"delete(element)\"\n                            *ngIf=\"element.role != role.admin\"></i> -->\n                    </mat-cell>\n                </ng-container>\n\n                <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n            </mat-table>\n            <div class=\"mat-table__message text-center mt-3\" *ngIf=\"!resultsLength\">No records found</div>\n           <!--  <div class=\"mat-table__bottom\">\n                <mat-paginator [pageSizeOptions]=\"[10, 25, 50, 100]\" [length]=\"resultsLength\" [showFirstLastButtons]\n                    (page)=\"pageChange()\">\n                </mat-paginator>\n            </div> -->\n        </c-card-body>\n    </c-card>\n</div>";
      /***/
    },

    /***/
    "r5cE":
    /*!***************************************************************************!*\
      !*** ./src/app/views/groups/assigned-group/assigned-group.component.scss ***!
      \***************************************************************************/

    /*! exports provided: default */

    /***/
    function r5cE(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".status-icon i {\n  font-size: 24px;\n}\n\ni {\n  height: 16px;\n  font-size: 17px;\n  cursor: pointer;\n}\n\nc-icon {\n  cursor: pointer;\n}\n\n.w-name {\n  min-width: 200px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2Fzc2lnbmVkLWdyb3VwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0ksZUFBQTtBQUFSOztBQUdBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBQUo7O0FBRUE7RUFDSSxlQUFBO0FBQ0o7O0FBQ0E7RUFDQywyQkFBQTtBQUVEIiwiZmlsZSI6ImFzc2lnbmVkLWdyb3VwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnN0YXR1cy1pY29ue1xuICAgIGl7XG4gICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICB9XG59XG5pe1xuICAgIGhlaWdodDogMTZweDtcbiAgICBmb250LXNpemU6IDE3cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuYy1pY29ue1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cbi53LW5hbWV7XG5cdG1pbi13aWR0aDogMjAwcHggIWltcG9ydGFudDtcbn0iXX0= */";
      /***/
    },

    /***/
    "y4P3":
    /*!***********************************************!*\
      !*** ./src/app/views/groups/groups.module.ts ***!
      \***********************************************/

    /*! exports provided: GroupsModule */

    /***/
    function y4P3(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GroupsModule", function () {
        return GroupsModule;
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


      var _assigned_group_assigned_group_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./assigned-group/assigned-group.component */
      "5XSl");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "iInd");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/forms */
      "s7LF");
      /* harmony import */


      var _coreui_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @coreui/angular */
      "Iluq");
      /* harmony import */


      var _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @coreui/icons-angular */
      "rVqu");
      /* harmony import */


      var _angular_material_sort__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/sort */
      "LUZP");
      /* harmony import */


      var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ngx-bootstrap/datepicker */
      "ienR");
      /* harmony import */


      var _angular_material_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/material/table */
      "OaSA");
      /* harmony import */


      var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/material/paginator */
      "5QHs");
      /* harmony import */


      var ngx_tippy_wrapper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ngx-tippy-wrapper */
      "xw+3");
      /* harmony import */


      var _angular_google_maps__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/google-maps */
      "MIJf");
      /* harmony import */


      var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ng-select/ng-select */
      "wTG2");
      /* harmony import */


      var _partial_partial_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ../../partial/partial.module */
      "a0rN"); // Datepicker
      // Material
      // Ng2-select


      var route = [{
        path: '',
        data: {
          title: 'Groups'
        },
        children: [{
          path: '',
          redirectTo: 'user'
        }, {
          path: 'assinged',
          data: {
            title: 'Assigned Group'
          },
          component: _assigned_group_assigned_group_component__WEBPACK_IMPORTED_MODULE_3__["AssignedGroupComponent"]
        }]
      }];

      var GroupsModule = function GroupsModule() {
        _classCallCheck(this, GroupsModule);
      };

      GroupsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_assigned_group_assigned_group_component__WEBPACK_IMPORTED_MODULE_3__["AssignedGroupComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(route), _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["FormModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["CardModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["GridModule"], _angular_material_sort__WEBPACK_IMPORTED_MODULE_8__["MatSortModule"], _coreui_icons_angular__WEBPACK_IMPORTED_MODULE_7__["IconModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["ButtonModule"], ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_9__["BsDatepickerModule"].forRoot(), _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatTableModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["ImgModule"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__["MatPaginatorModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["SwitchModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["ModalModule"], ngx_tippy_wrapper__WEBPACK_IMPORTED_MODULE_12__["NgxTippyModule"], _angular_google_maps__WEBPACK_IMPORTED_MODULE_13__["GoogleMapsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_14__["NgSelectModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["BadgeModule"], _coreui_angular__WEBPACK_IMPORTED_MODULE_6__["TextMaskModule"], _partial_partial_module__WEBPACK_IMPORTED_MODULE_15__["PartialModule"]],
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]]
      })], GroupsModule);
      /***/
    }
  }]);
})();
//# sourceMappingURL=views-groups-groups-module-es5.js.map