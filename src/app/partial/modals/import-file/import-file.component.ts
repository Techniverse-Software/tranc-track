import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../../services/global.service';
import { HttpReqService } from '../../../services/http-req.service';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {

  title;
  page;
  fileData: any = {}; // for file info

  constructor(
    public modalRef: BsModalRef,
    private httpReqService: HttpReqService,
    public gs: GlobalService,
    private toastr: ToastrService,
  ) {
    this.httpReqService.clearMassage();
  }

  ngOnInit(): void { }

  close() {
    this.modalRef.hide();
  }

  async selectFile(e) {
    this.fileData.storeTemp = e.target.files[0]
    this.fileData.fileName = this.fileData.storeTemp.name.split('.').shift()
    this.fileData.fileSize = this.gs.bytesToSize(this.fileData.storeTemp.size)
  }

  async save() {
    const formData = new FormData();
    formData.append('file', this.fileData.storeTemp);
    const result = await this.httpReqService.post('common/bulkInsertExcel', formData, true);
  }

}
