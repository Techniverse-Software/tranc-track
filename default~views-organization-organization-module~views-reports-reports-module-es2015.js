(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-organization-organization-module~views-reports-reports-module"],{

/***/ "ppW+":
/*!********************************************!*\
  !*** ./src/app/services/report.service.ts ***!
  \********************************************/
/*! exports provided: ReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportService", function() { return ReportService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global.service */ "4WDQ");
/* harmony import */ var _services_http_req_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/http-req.service */ "J+oG");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/auth.service */ "lGQG");






let ReportService = class ReportService {
    constructor(datePipe, gs, httpReqService, authService) {
        this.datePipe = datePipe;
        this.gs = gs;
        this.httpReqService = httpReqService;
        this.authService = authService;
        this.pdfData = [];
        this.pdfData1 = [];
        this.orgFullData = {};
    }
    ngOnInit() {
    }
    createReport(reportData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let tokenData = yield this.authService.decodeToken();
            const response = yield this.httpReqService.get('organizationByUniqueId', tokenData.user.organizationId);
            this.orgFullData = response.items[0];
            this.pdfData = [];
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
            reportData.data.forEach((element) => {
                const dataArr = [];
                reportData.coloumn.forEach((col, index, object) => {
                    if (col === 'organizationName') {
                        object.splice(index, 1);
                    }
                    if (col.indexOf('.') > -1) {
                        const property = col.split('.');
                        if (element[property[0]]) {
                            dataArr.push(element[property[0]][property[1]]);
                        }
                        else {
                            dataArr.push('');
                        }
                    }
                    else {
                        if (element[col] != null) {
                            if (col === 'status') {
                                if (element[col]) {
                                    dataArr.push('Successful');
                                }
                                else {
                                    dataArr.push(element.title);
                                }
                            }
                            else if (col === 'createdAt') {
                                dataArr.push(this.datePipe.transform(element[col], 'medium'));
                            }
                            else {
                                dataArr.push(element[col]);
                            }
                        }
                        else {
                            dataArr.push('');
                        }
                    }
                });
                this.pdfData.push(dataArr);
            });
            if (response && this.orgFullData != undefined) {
                doc.setFontSize(9);
                doc.setFontStyle('normal');
                doc.text('Name : ', 15, 10);
                doc.text(this.gs.organizatioName ? this.gs.organizatioName : "", 26, 10);
                doc.setFontStyle('normal');
                doc.text('Address : ', 15, 15);
                doc.setFontSize(8);
                var strArr = doc.splitTextToSize(this.orgFullData.billingAddress.addressLine1 + ',' + this.orgFullData.billingAddress.addressLine2 + '' + this.orgFullData.billingAddress.town + '-' + this.orgFullData.billingAddress.postCode + ',' + this.orgFullData.billingAddress.state + ',' + this.orgFullData.billingAddress.country + ',');
                doc.text(strArr, 30, 15);
                doc.setFontSize(9);
                doc.text('Email : ', 15, 20);
                doc.text(this.orgFullData.personDetail.email, 26, 20);
                doc.text('Tel : ', 15, 25);
                doc.text(this.orgFullData.personDetail.primaryPhoneNo, 22, 25);
                doc.text('Generated On :', 15, 30);
                doc.text(this.datePipe.transform(new Date(), 'medium'), 38, 30);
                doc.text('Generated By : ', 15, 35);
                doc.text(this.orgFullData.personDetail.name, 38, 35);
                doc.addImage(this.gs.base64Image, 'JPEG', 165, 7, 30, 30);
            }
            else {
                doc.setFontSize(9);
                doc.setFontStyle('normal');
                doc.text('Name :', 15, 15);
                doc.text(this.gs.organizatioName ? this.gs.organizatioName : "", 26, 15);
                doc.setFontStyle('normal');
                doc.setFontSize(9);
                doc.text('Generated on :', 15, 21);
                doc.text(this.datePipe.transform(new Date(), 'medium'), 38, 21);
                doc.text('Generated By :', 15, 27);
                doc.text("Super Admin", 38, 27);
                doc.addImage(this.gs.base64Image, 'JPEG', 172, 7, 23, 23);
            }
            // doc.setFontSize(9);
            //   doc.setFontStyle('normal');
            //   doc.text('Name : ', 15, 10);
            //   doc.text(this.gs.organizatioName, 26, 10);
            //   doc.setFontStyle('normal');
            //   doc.text('Address : ', 15, 15);
            //   doc.setFontSize(8);
            //   var strArr = doc.splitTextToSize(this.orgFullData.billingAddress.addressLine1 + ',' + this.orgFullData.billingAddress.addressLine2 + '' + this.orgFullData.billingAddress.town + '-' + this.orgFullData.billingAddress.postCode + ',' + this.orgFullData.billingAddress.state + ',' + this.orgFullData.billingAddress.country + ',')
            //   doc.text(strArr, 30, 15);
            //   doc.setFontSize(9);
            //   doc.text('Email : ', 15, 20);
            //   doc.text(this.orgFullData.personDetail.email, 26, 20);
            //   doc.text('Tel : ', 15, 25);
            //   doc.text(this.orgFullData.personDetail.primaryPhoneNo, 22, 25);
            //   doc.text('Generated on :', 15, 30);
            //   doc.text(this.datePipe.transform(new Date(), 'medium'), 38, 30);
            //   doc.text('Generated By : ', 15, 35);
            //   doc.text(this.orgFullData.personDetail.name, 38, 35);
            doc.setDrawColor(217, 217, 217);
            doc.line(15, 33, 195, 33);
            doc.autoTable(reportData.header, this.pdfData, {
                theme: 'grid',
                startY: 37,
                bodyStyles: {
                    cellPadding: 4,
                },
                createdHeaderCell: (cell) => {
                    cell.styles.cellPadding = 5;
                    cell.styles.fillColor = [37, 119, 150];
                    cell.styles.textColor = [255, 255, 255];
                },
                drawRow: (row, data) => {
                    data.doc.line(data.cursor.x - data.table.width, data.cursor.y + row.height, data.cursor.x, data.cursor.y + row.height);
                },
                drawHeaderRow: (head, data) => {
                    data.doc.line(data.cursor.x, data.cursor.y + head.height, data.cursor.x + data.table.width, data.cursor.y + head.height);
                },
            });
            // below line for Open PDF document in new tab
            // doc.output('dataurlnewwindow');
            const string = doc.output('datauristring');
            const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + string + '\'></iframe>';
            const x = window.open();
            x.document.open();
            x.document.write(iframe);
            x.document.close();
            // below line for Download PDF document
            doc.save(reportData.fileName + new Date().getTime());
        });
    }
    createReport1(reportData) {
        // console.log(reportData);
        this.pdfData = [];
        this.pdfData1 = [];
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        reportData.data.forEach((element) => {
            // tslint:disable-next-line: forin
            const dataArr = [];
            reportData.coloumn.forEach((col) => {
                if (col.indexOf('.') > -1) {
                    const property = col.split('.');
                    if (element[property[0]]) {
                        dataArr.push(element[property[0]][property[1]]);
                    }
                    else {
                        dataArr.push('');
                    }
                }
                else {
                    if (element[col] != null) {
                        if (col === 'status') {
                            if (element[col]) {
                                dataArr.push(element[col]);
                            }
                            // else {
                            //   dataArr.push(element.title);
                            // }
                        }
                        else if (col === 'createdAt') {
                            dataArr.push(this.datePipe.transform(element[col], 'medium'));
                        }
                        else {
                            dataArr.push(element[col]);
                        }
                    }
                    else {
                        dataArr.push('');
                    }
                }
            });
            this.pdfData.push(dataArr);
        });
        reportData.userListArr.forEach((element) => {
            // tslint:disable-next-line: forin
            const dataArr = [];
            reportData.userDisplayedColumns.forEach((col) => {
                if (col.indexOf('.') > -1) {
                    const property = col.split('.');
                    if (element[property[0]]) {
                        dataArr.push(element[property[0]][property[1]]);
                    }
                    else {
                        dataArr.push('');
                    }
                }
                else {
                    if (element[col] != null) {
                        if (col === 'status') {
                            if (element[col]) {
                                dataArr.push(element[col]);
                            }
                            // else {
                            //   dataArr.push(element.title);
                            // }
                        }
                        else if (col === 'createdAt') {
                            dataArr.push(this.datePipe.transform(element[col], 'medium'));
                        }
                        else {
                            dataArr.push(element[col]);
                        }
                    }
                    else {
                        dataArr.push('');
                    }
                }
            });
            this.pdfData1.push(dataArr);
        });
        doc.setFontSize(18);
        doc.setFontStyle('bold');
        doc.text('Organization Details', pageWidth / 2, 15, 'center');
        // doc.setDrawColor(217, 217, 217);
        // doc.line(15, 22, 190, 22)
        doc.setFontSize(12);
        doc.setFontStyle('normal');
        doc.text(20, 30, 'Organization Name');
        doc.setFontStyle('normal');
        doc.text(80, 30, ':  ' + reportData.organiZationData.organizationName);
        doc.setFontStyle('normal');
        doc.text(20, 40, 'Organization Unique Id');
        doc.setFontStyle('normal');
        doc.text(80, 40, ':  ' + reportData.organiZationData.organizationId);
        doc.setFontStyle('normal');
        doc.text(20, 50, 'Number Of Users');
        doc.setFontStyle('normal');
        doc.text(80, 50, ':  ' + reportData.organiZationData.numberOfUser.toString());
        doc.setFontStyle('normal');
        doc.text(20, 60, 'Admin Name');
        doc.setFontStyle('normal');
        doc.text(80, 60, reportData.organiZationData.personDetail ? ':  ' + reportData.organiZationData.personDetail.name : ':  ' + '-');
        doc.setFontStyle('normal');
        doc.text(20, 70, 'Admin Email');
        doc.setFontStyle('normal');
        doc.text(80, 70, reportData.organiZationData.personDetail ? ':  ' + reportData.organiZationData.personDetail.email : ':  ' + '-');
        doc.setFontStyle('normal');
        doc.text(20, 80, 'Number Of Registred Device ');
        doc.setFontStyle('normal');
        doc.text(80, 80, ':  ' + reportData.organiZationData.numberOfDevice.toString());
        // doc.text(60, 36, reportData.organiZationData.billingAddress?.addressLine1);
        doc.setFontStyle('normal');
        doc.text(20, 90, 'Status');
        doc.setFontStyle('normal');
        doc.text(80, 90, reportData.organiZationData.status ? ':  ' + 'Active' : ':  ' + 'Inactive');
        doc.setFontStyle('normal');
        doc.text(20, 100, 'NFC Enabled');
        doc.setFontStyle('normal');
        doc.text(80, 100, reportData.organiZationData.nfcEnabled ? ':  ' + 'Yes' : ':  ' + "No");
        doc.setDrawColor(217, 217, 217);
        // doc.line(15, 92, 190, 92)
        // doc.setTextColor(0, 0, 0);
        //doc.addPage();
        doc.setFontSize(18);
        doc.setFontStyle('bold');
        doc.text('Contact Details', pageWidth / 2, 120, 'center');
        // doc.setDrawColor(217, 217, 217);
        // doc.line(15, 22, 190, 22)
        doc.setFontSize(12);
        doc.setFontStyle('normal');
        doc.text(20, 135, 'Address Line 1');
        doc.setFontStyle('normal');
        doc.text(80, 135, ':  ' + reportData.organiZationData.billingAddress.addressLine1 || false);
        doc.setFontStyle('normal');
        doc.text(20, 145, 'Address Line 2');
        doc.setFontStyle('normal');
        doc.text(80, 145, ':  ' + reportData.organiZationData.billingAddress.addressLine2 || false);
        doc.setFontStyle('normal');
        doc.text(20, 155, 'Country');
        doc.setFontStyle('normal');
        doc.text(80, 155, ':  ' + reportData.organiZationData.billingAddress.country || false);
        doc.setFontStyle('normal');
        doc.text(20, 165, 'State');
        doc.setFontStyle('normal');
        doc.text(80, 165, ':  ' + reportData.organiZationData.billingAddress.state || false);
        doc.setFontStyle('normal');
        doc.text(20, 175, 'Town');
        doc.setFontStyle('normal');
        doc.text(80, 175, ':  ' + reportData.organiZationData.billingAddress.town || false);
        doc.setFontStyle('normal');
        doc.text(20, 185, 'Postcode');
        doc.setFontStyle('normal');
        doc.text(80, 185, ':  ' + reportData.organiZationData.billingAddress.postCode || false);
        // doc.text(60, 36, reportData.organiZationData.billingAddress?.addressLine1);
        doc.setFontStyle('normal');
        doc.text(20, 195, 'Primary Phone No.');
        doc.setFontStyle('normal');
        doc.text(80, 195, ': ' + reportData.organiZationData.personDetail.primaryPhoneNo || false);
        doc.setFontStyle('normal');
        doc.text(20, 205, 'Secondary Phone No.');
        doc.setFontStyle('normal');
        doc.text(80, 205, ': ' + reportData.organiZationData.personDetail.secondaryPhoneNo || false);
        doc.setDrawColor(217, 217, 217);
        // doc.line(15, 92, 190, 92)
        // doc.setTextColor(0, 0, 0);
        doc.addPage();
        doc.setFontSize(18);
        doc.setFontStyle('bold');
        doc.text('Users', pageWidth / 2, 15, 'center');
        doc.setFontSize(12);
        doc.autoTable(reportData.userheader, this.pdfData1, {
            theme: 'grid',
            startY: 30,
            bodyStyles: {
                cellPadding: 4,
            },
            createdHeaderCell: (cell) => {
                cell.styles.cellPadding = 5;
                cell.styles.fillColor = [217, 217, 217];
                cell.styles.textColor = [0, 0, 0];
            },
            drawRow: (row, data) => {
                data.doc.line(data.cursor.x - data.table.width, data.cursor.y + row.height, data.cursor.x, data.cursor.y + row.height);
            },
            drawHeaderRow: (head, data) => {
                data.doc.line(data.cursor.x, data.cursor.y + head.height, data.cursor.x + data.table.width, data.cursor.y + head.height);
            },
        });
        // doc.setFontSize(14);
        // doc.setFontStyle('bold');
        // let t = (160 + ((this.pdfData.length + 1) * 40))
        // doc.text('Devices', pageWidth / 2, t, 'center');
        // doc.setFontSize(12);
        // 180 + ((this.pdfData.length + 1) * 40)
        doc.addPage();
        doc.setFontSize(18);
        doc.setFontStyle('bold');
        doc.text('Devices', pageWidth / 2, 15, 'center');
        doc.setFontSize(12);
        doc.autoTable(reportData.header, this.pdfData, {
            theme: 'grid',
            startY: 30,
            bodyStyles: {
                cellPadding: 4,
            },
            createdHeaderCell: (cell) => {
                cell.styles.cellPadding = 5;
                cell.styles.fillColor = [217, 217, 217];
                cell.styles.textColor = [0, 0, 0];
            },
            drawRow: (row, data) => {
                data.doc.line(data.cursor.x - data.table.width, data.cursor.y + row.height, data.cursor.x, data.cursor.y + row.height);
            },
            drawHeaderRow: (head, data) => {
                data.doc.line(data.cursor.x, data.cursor.y + head.height, data.cursor.x + data.table.width, data.cursor.y + head.height);
            },
        });
        let i = 30 + (this.pdfData.length * 40);
        i = i + (this.pdfData1.length * 40);
        doc.addPage();
        doc.setFontSize(18);
        doc.setFontStyle('bold');
        doc.text('Custom Parameters', pageWidth / 2, 15, 'center'); //reportData.customparameter
        doc.setFontSize(12);
        doc.setFontStyle('normal');
        doc.text(20, 30, 'Time delay between scans (seconds)');
        doc.setFontStyle('normal');
        doc.text(100, 30, ':  ' + reportData.customparameter.time_delay);
        doc.setFontStyle('normal');
        doc.text(20, 40, 'Map view flush time every day (HH:MM)');
        doc.setFontStyle('normal');
        doc.text(100, 40, ':  ' + reportData.customparameter.map_flush_timezone + ' - ' + reportData.customparameter.map_flush_time);
        doc.setFontStyle('normal');
        doc.text(20, 50, 'Scan NFC Tag Text');
        doc.setFontStyle('normal');
        doc.text(100, 50, ':  ' + reportData.customparameter.nfc_button_text);
        doc.setFontStyle('normal');
        doc.text(20, 60, 'Set Device Coordinates Button Text');
        doc.setFontStyle('normal');
        doc.text(100, 60, ':  ' + reportData.customparameter.update_device_cordnate_text);
        doc.setFontStyle('normal');
        // doc.text(20, 70, 'Organization Logo');
        // doc.setFontStyle('normal');
        // doc.text(100, 70, ':    -');
        // below line for Open PDF document in new tab
        // doc.output('dataurlnewwindow');
        const string = doc.output('datauristring');
        const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + string + '\'></iframe>';
        const x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
        // below line for Download PDF document
        doc.save(reportData.fileName + new Date().getTime());
    }
};
ReportService.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"] },
    { type: _global_service__WEBPACK_IMPORTED_MODULE_3__["GlobalService"] },
    { type: _services_http_req_service__WEBPACK_IMPORTED_MODULE_4__["HttpReqService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }
];
ReportService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root',
    })
], ReportService);



/***/ })

}]);
//# sourceMappingURL=default~views-organization-organization-module~views-reports-reports-module-es2015.js.map