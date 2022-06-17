import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpReqService } from '../../services/http-req.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})

export class DefaultLayoutComponent implements OnInit, OnDestroy {
  @HostBinding('class.c-app') cAppClass = true;

  public navItems = navItems;
  tokenData: any;
  public sidebarMinimized = true;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  is_socket: boolean = false;
  count: number = 0;

  constructor(private httpReqService: HttpReqService,
    private router: Router,
    private authService: AuthService,
    private socket: Socket
  ) {
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
  }

  ngOnInit() {
    this.getDetail();
    this.alerts_count()
    this.socket.on("approval", (data) => {
      this.count = this.count + data;
      if (this.count < 0) {
        this.count = 0;
      }
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('approval');
  }

  async getDetail() {
    const decoded: any = this.authService.decodeToken();
    const response1: any = await this.httpReqService.get('permission', decoded.user.permissionId);

    if (response1 && response1.items.length) {
      this.authService.permission_detail = response1.items[0];
      this.authService.check_url();
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = !this.sidebarMinimized;
  }

  async alerts_count() {
    var gridOption = {
      filter: {
        allrecords: true,
        status: 0
      }
    }
    gridOption.filter['user_id'] = this.tokenData._id;

    // if(!this.tokenData.is_org){
    gridOption.filter['adminId'] = this.tokenData._id;
    // } else {
    //   this.gridOption.filter['adminId'] = '';
    // }
    const response: any = await this.httpReqService.post('approval/list', gridOption, false);
    if (response) {
      this.count = response.totalCount;
    }

  }

}
