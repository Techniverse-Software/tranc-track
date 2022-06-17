import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpReqService } from '../../../services/http-req.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-default-header-dropdown-account',
  templateUrl: './default-header-dropdown-account.component.html',
})
export class DefaultHeaderDropdownAccountComponent implements OnInit {
  currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
  mediaUrl = environment.mediaUrl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpReqService: HttpReqService
  ) { }

  ngOnInit(): void {
    this.authService.profileData.subscribe((data) => {
      this.currentUser = data;
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  /**
   * Log Out
   */
  async logOut() {
    const response = await this.httpReqService.post('users/logOut', {}, false);
    if (response) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      this.authService.currentUserSubjet(null);
      this.router.navigate(['auth/login']);
    }
  }
}
