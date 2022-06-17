(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-app-info-app-info-module"],{

/***/ "Bb3V":
/*!*****************************************************************!*\
  !*** ./src/app/views/app-info/app-info/app-info.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".card {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC1pbmZvLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtBQUNKIiwiZmlsZSI6ImFwcC1pbmZvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmR7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufSJdfQ== */");

/***/ }),

/***/ "HAgO":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/app-info/app-info/app-info.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"fade-in text-center\">\n    <h2>Welcome to tracdisc!</h2>\n    <p>Please use the below links to download the mobile app</p>\n    <div class=\"d-flex justify-content-center\">\n        <a href=\"{{iosUrl}}\" target=\"_blank\">\n            <div class=\"card p-3 m-3 px-4\"><strong>iOS</strong></div>\n        </a>\n        <a href=\"{{androidUrl}}\" target=\"_blank\">\n            <div class=\"card p-3 m-3 px-4\"><strong>Android</strong></div>\n        </a>\n    </div>\n</div>");

/***/ }),

/***/ "RvvE":
/*!***************************************************************!*\
  !*** ./src/app/views/app-info/app-info/app-info.component.ts ***!
  \***************************************************************/
/*! exports provided: AppInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppInfoComponent", function() { return AppInfoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_info_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app-info.component.html */ "HAgO");
/* harmony import */ var _app_info_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-info.component.scss */ "Bb3V");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");




let AppInfoComponent = class AppInfoComponent {
    constructor() {
        this.iosUrl = 'https://apps.apple.com/us/app/scanx/id1517228454?ls=1';
        this.androidUrl = 'https://play.google.com/store/apps/details?id=cloud.scanx';
    }
    ngOnInit() {
    }
};
AppInfoComponent.ctorParameters = () => [];
AppInfoComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-app-info',
        template: _raw_loader_app_info_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_app_info_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AppInfoComponent);



/***/ }),

/***/ "Y2kU":
/*!***************************************************!*\
  !*** ./src/app/views/app-info/app-info.module.ts ***!
  \***************************************************/
/*! exports provided: AppInfoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppInfoModule", function() { return AppInfoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _app_info_app_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-info/app-info.component */ "RvvE");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "iInd");





const route = [
    {
        path: '',
        data: {
            title: 'App Info',
        },
        component: _app_info_app_info_component__WEBPACK_IMPORTED_MODULE_3__["AppInfoComponent"]
    }
];
let AppInfoModule = class AppInfoModule {
};
AppInfoModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _app_info_app_info_component__WEBPACK_IMPORTED_MODULE_3__["AppInfoComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(route)
        ]
    })
], AppInfoModule);



/***/ })

}]);
//# sourceMappingURL=views-app-info-app-info-module-es2015.js.map