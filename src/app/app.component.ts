import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { cilMoon, cilSun, cilApplicationsSettings, cilX } from '@coreui/icons';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { HttpReqService } from './services/http-req.service';


@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  loading = false;
  constructor(
    public authservice: AuthService,
    public iconSet: IconSetService,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
    private bnIdle: BnNgIdleService,
    private authService: AuthService,
    private router: Router,
    private httpReqService: HttpReqService
  ) {
    let token = localStorage.getItem('accessToken') || null;
    if (token != null) {
      this.bnIdle.startWatching(18000).subscribe(async (res) => {
        if (res) {
          await this.logOut();
        }
      });
      }
    // iconSet singleton
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
    // iconSet.icons = { cilMoon, cilSun, cilApplicationsSettings, cilX };

    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.authservice.check_url();
      }
    });
  }


  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  // ngAfterViewInit(): void {
  //   this.loaderService.loading.subscribe((res) => {
  //     this.loading = res;
  //     this.cdr.detectChanges();
  //   });
  // }
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
