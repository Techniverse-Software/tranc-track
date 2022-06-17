import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpReqService } from '../../../services/http-req.service';

@Component({
  selector: 'app-dashboard-count',
  templateUrl: './dashboard-count.component.html',
  styleUrls: ['./dashboard-count.component.scss']
})
export class DashboardCountComponent implements OnInit {
  countData = [
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
  userCount: any;
  deviceCount: any;
  checkInCount: any;
  totaldeviceCount: any;
  organizationCount: any;
  tokenData: any;
  loading : boolean = false;
  permissionDetails;

  constructor(
    private httpReqService: HttpReqService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    this.getUserCount();
    setTimeout(()=>{
      this.getPermissionDetails();
    }, 2000);
  }

  async getPermissionDetails() {
    this.loading = true;
    const response: any = await this.httpReqService.get('permission', this.tokenData.permissionId);
    if (response && response.items.length) {
      this.permissionDetails = response.items[0];
    }
    this.loading = false;
  }

  async getUserCount() {
    this.loading = true;
    const result: any = await this.httpReqService.post('dashboardCount/user', {user_id: this.tokenData._id}, false);
    if (result.items && result.items.length) {
      this.userCount = result.items[0].userData;
      this.checkInCount = result.items[1].checkInData;
      this.totaldeviceCount = result.items[2].deviceData;
    }
    this.loading = false;
    this.getOrganizationCount();
  }

  async getOrganizationCount() {
    this.loading = true;
    const result: any = await this.httpReqService.post('dashboardCount/organization', {user_id: this.tokenData._id}, false);
    if (result.items && result.items.length) {
      this.deviceCount = result.items[0].deviceData;
      this.organizationCount = result.items[1].organizationData;
    }
    this.loading = false;
  }
}

