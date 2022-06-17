import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpReqService } from '../../../services/http-req.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-default-header-dropdown-notifications',
  templateUrl: './default-header-dropdown-notifications.component.html',
})
export class DefaultHeaderDropdownNotificationsComponent implements OnInit, OnDestroy {
  public items: any;
  logList: any = [];
  constructor(
    private httpReqService: HttpReqService,
    private router: Router,
    private authService: AuthService,
    private socket: Socket
  ) { }

  tokenData;
  interval;
  is_socket: boolean = false;
  ngOnInit(): void {
    this.tokenData = this.authService.decodeToken();
    // this.getBadgeCount();
    this.getLogs();
    this.interval = setInterval(()=>{
      // this.getLogs();
    }, 120000)
    
  }

  ngOnDestroy(){
    this.socket.removeListener("'logs"+this.tokenData.user._id+"'", (data)=>{})
    this.socket.removeListener("'logs"+this.tokenData.user.organizationId+"'", (data)=>{})
    this.socket.removeListener("logs", (data)=>{})
  }

  async getLogs() {
    const obj = {
      allrecords: false,
      sortField: 'createdAt',
      sortOrder: 'desc',
      filter: { status: 1,user_id:  this.tokenData.user._id },
      limit: 5
    };
    const response: any = await this.httpReqService.post('logs/list', obj, false);
    if (response) {
      this.logList = response.items;
      this.items = response.unreadCount;
      if(!this.is_socket){
        this.is_socket = true;
        if(response.type == 0){
          this.socket.on("'logs"+this.tokenData.user._id+"'", (data)=>{
            this.getLogs();
          });
        } else if(response.type == 1){
          this.socket.on("logs", (data)=>{
            this.getLogs();
          });
        } else if(response.type == 2){
          this.socket.on("'logs"+this.tokenData.user.organizationId+"'", (data)=>{
            this.getLogs();
          });
        }
      }
    }
    // setInterval(() => {
    //   this.getBadgeCount();
    // }, 10000);
    // this.authService.notificationBadgeEvent.subscribe(() => {
    //   this.getBadgeCount();
    // });
  }

  async getBadgeCount() {
    const response: any = await this.httpReqService.post('logs/unreadCountOfLog', {user_id: this.tokenData.user._id}, false);
    if (response) {
      this.items = response.items;
    }
  }

  async markAllViewd() {
    const response: any = await this.httpReqService.put('logs/marakAllRead', {});
    if (response) {
      this.items = 0;
      this.authService.getUpdatedLogs();
    }
  }

  viewAll() {
    this.authService.getUpdatedLogs();
    this.router.navigate(['logs']);
  }
}
