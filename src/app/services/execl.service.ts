import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { DatePipe } from '@angular/common';
import * as fs from 'file-saver';
import { LoaderService } from './loader.service';
import { GlobalService } from './global.service';
import { HttpReqService } from '../services/http-req.service';
import { AuthService } from '../services/auth.service';
declare const jsPDF: any;

@Injectable({
  providedIn: 'root'
})
export class ExeclService {
  orgFullData: any = {};
  constructor(
    private loaderService: LoaderService,
    private datePipe: DatePipe,
    private gs: GlobalService,
    private httpReqService: HttpReqService,
    private authService: AuthService,
  ) { }

  async exportData(excelData) {
    let tokenData = await this.authService.decodeToken();
    const response: any = await this.httpReqService.get('organizationByUniqueId', tokenData.user.organizationId);
    this.orgFullData = response.items[0];
    // this.orgFullData.address = this.orgFullData.billingAddress.addressLine1 != "" ? this.orgFullData.billingAddress.addressLine1 + ',' : this.orgFullData.billingAddress.addressLine2 != "" ? +this.orgFullData.billingAddress.addressLine2 + ',' : this.orgFullData.billingAddress.landmark != "" ? +this.orgFullData.billingAddress.landmark + ',' : this.orgFullData.billingAddress.town != "" ? +this.orgFullData.billingAddress.town + ',' : this.orgFullData.billingAddress.postCode != "" ? +this.orgFullData.billingAddress.postCode + ',' : this.orgFullData.billingAddress.state != "" ? +this.orgFullData.billingAddress.state + ',' : this.orgFullData.billingAddress.country != "" ? +this.orgFullData.billingAddress.country : ',';
    if (excelData.exportType) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet(excelData.fileName);

      // Blank Row
      worksheet.addRow([]);

      // Add Header Row
      const headerRow = worksheet.addRow(excelData.header);

      // Cell Style : Fill and Border
      headerRow.eachCell((cell) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });

      // Add Data and Conditional Formatting
      excelData.data.forEach(d => {
        const row = worksheet.addRow(d);
      }
      );
      this.loaderService.display(false);
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, excelData.fileName + '_' + new Date().getTime() + '.xlsx');
      });
    } else {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      if (response && this.orgFullData != undefined) {
        doc.setFontSize(9);
        doc.setFontStyle('normal');
        doc.text('Name : ', 15, 10);
        doc.text(this.gs.organizatioName ? this.gs.organizatioName : "", 26, 10);
        doc.setFontStyle('normal');
        doc.text('Address : ', 15, 15);
        doc.setFontSize(8);
        var strArr = doc.splitTextToSize(this.orgFullData.billingAddress.addressLine1 + ',' + this.orgFullData.billingAddress.addressLine2 + '' + this.orgFullData.billingAddress.town + '-' + this.orgFullData.billingAddress.postCode + ',' + this.orgFullData.billingAddress.state + ',' + this.orgFullData.billingAddress.country + ',')
        doc.text(strArr, 30, 15);
        doc.setFontSize(9);
        doc.text('Email : ', 15, 20);
        doc.text(this.orgFullData.personDetail.email, 26, 20);
        doc.text('Tel : ', 15, 25);
        doc.text(this.orgFullData.personDetail.primaryPhoneNo, 22, 25);
        doc.text('Generated on :', 15, 30);
        doc.text(this.datePipe.transform(new Date(), 'medium'), 38, 30);
        doc.text('Generated By : ', 15, 35);
        doc.text(this.orgFullData.personDetail.name, 38, 35);
        doc.addImage(this.gs.base64Image, 'JPEG', 165, 7, 30, 30)
      } else {
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
        doc.addImage(this.gs.base64Image, 'JPEG', 172, 7, 23, 23)
        // doc.setFontSize(9);
        // doc.setFontStyle('normal');
        // doc.text('Name :', 15, 25);
        // doc.text(this.gs.organizatioName ? this.gs.organizatioName : "", 26, 25);
        // doc.setFontStyle('normal');
        // // doc.text('Address :', 15, 15);
        // // doc.setFontSize(8);
        // // var strArr = doc.splitTextToSize('Gundawadi Main Rd, Gundavadi, Rajkot, Gujarat 360002', 100)
        // // doc.text(strArr, 30, 15);
        // // doc.setFontSize(9);
        // // doc.text('Email :', 15, 20);
        // // doc.text('bhavesh@techniverse.com', 26, 20);
        // // doc.text('Tel :', 15, 25);
        // // doc.text('+91 9785456723', 21, 25);
        // doc.text('Generated on :', 15, 30);
        // doc.text(this.datePipe.transform(new Date(), 'medium'), 38, 30);
        // doc.text('Generated By :', 15, 35);
        // doc.text(this.gs.organizatioName ? this.gs.organizatioName : "", 38, 35);
      }
      doc.setDrawColor(217, 217, 217);
      doc.line(15, 33, 195, 33);
      doc.autoTable(excelData.header, excelData.data, {
        theme: 'grid',
        startY: 37,
        styles: { overflow: 'linebreak', fontSize: 8 },
        bodyStyles: {
          cellPadding: 2,
        },
        createdHeaderCell: (cell) => {
          cell.styles.cellPadding = 2;
          cell.styles.fillColor = [37, 119, 150];
          cell.styles.textColor = [255, 255, 255];
        },
        drawRow: (row, data) => {
          data.doc.line(
            data.cursor.x - data.table.width,
            data.cursor.y + row.height,
            data.cursor.x,
            data.cursor.y + row.height
          );
        },
        drawHeaderRow: (head, data) => {
          data.doc.line(
            data.cursor.x,
            data.cursor.y + head.height,
            data.cursor.x + data.table.width,
            data.cursor.y + head.height
          );
        },

      });
      this.loaderService.display(false);

      // below line for Open PDF document in new tab
      // doc.output('dataurlnewwindow');
      const string = doc.output('datauristring');
      const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + string + '\'></iframe>';
      const x = window.open();
      x.document.open();
      x.document.write(iframe);
      x.document.close();

      // below line for Download PDF document
      doc.save(excelData.fileName + '_' + new Date().getTime());
    }
  }
}