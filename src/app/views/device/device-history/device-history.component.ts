import { Component, OnInit } from '@angular/core';
import { HttpReqService } from '../../../services/http-req.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss']
})
export class DeviceHistoryComponent implements OnInit {
  cancleButtonText: string;
  loading : boolean = false;
  title: any;
  list: any;
  public response: Subject<boolean>;
  deviceId: any;
  data: any = [];
  resultsLength: any;
  constructor(
    private httpReqService: HttpReqService,
    private modalRef: BsModalRef
  ) { }


  ngOnInit(): void {
    this.response = new Subject();
    this.data = this.list.items;
    // this.deviceId = this.list._id;
    // if (this.deviceId) {
    //   this.getDeviceHistory();
    // }
  }

  async getDeviceHistory() {
    const response: any = await this.httpReqService.get('device/deviceIdWiseGetHistory', this.deviceId);
    if (response && response.items.length) {
      this.data = response.items;
    }
  }


  cancle(): void {
    this.response.next();
    this.modalRef.hide();
  }
}
