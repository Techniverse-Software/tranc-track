import { Component, OnInit } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { GlobalService } from '../../../services/global.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { HttpReqService } from '../../../services/http-req.service';
import { Role } from '../../../services/role';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../default-layout.component';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
  mediaUrl = environment.mediaUrl;
  tokenData: any;
  organizationId: any;
  public sidebarMinimized = true;
  is_org_not_approved: boolean = false;
  userName : string = null;
  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private router: Router,
    public gs: GlobalService,
    private httpReqService: HttpReqService, 
    private layOutComponent : DefaultLayoutComponent) {
    super();
  }

  async ngOnInit(): Promise<void> {
    
    this.authService.profileData.subscribe((data) => {
      this.currentUser = data;
    });
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    if (this.tokenData.organizationId) {
      this.getOrganizationDetail();
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "auto";
      this.gs.organizatioName = 'Trace N Track';
      // 'Trace N Track'; 
    }
    this.authService.organizationNameEvent.subscribe((data) => {
      this.gs.organizatioName = data;
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    await this.getUserDetail();

  }

  toggleTheme() {
    this.classToggler.toggle('.c-app', 'c-dark-theme');
  }

  toggleMinimize(e){
    this.layOutComponent.toggleMinimize(e);
  }

  async getOrganizationDetail() {
    const response: any = await this.httpReqService.get('organizationByUniqueId', this.tokenData.organizationId);
    if (response.items.length) {
      this.gs.organizatioName = response.items[0].organizationName;
      this.organizationId = response.items[0].organizationId;
      if(response.items[0].status == 0){
        this.is_org_not_approved = true;
        document.body.style.overflowY = "hidden";
        document.body.style.overflowX = "hidden";
      } else {
        this.is_org_not_approved = false;
        document.body.style.overflowY = "auto";
        document.body.style.overflowX = "auto";
      }
    }
  }

  async logOut() {
    const response = await this.httpReqService.post('users/logOut', {}, false);
    if (response) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      this.authService.currentUserSubjet(null);
      this.router.navigate(['auth/login']);
    }
  }
  // async ngDoCheck() {
  //   await this.getUserDetail();
  // }
  async getUserDetail() {
    const response: any = await this.httpReqService.get('users', this.tokenData._id);
    this.userName = response && response.items.length > 0 ? response.items[0].name : "";
  }
}
