import { EventEmitter, Injectable, Output, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToasterComponent, ToasterPosition } from '@coreui/angular';
import { ToastrComponent } from '../common/toast/toast.component';
import jwt_decode from 'jwt-decode';

export enum Colors {
  '' = '',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  dark = 'dark',
  light = 'light',
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public profileDataSubject: BehaviorSubject<any>;
  public profileData: Observable<any>;
  positions = Object.values(ToasterPosition);
  position = ToasterPosition.TopRight;
  colors = Object.keys(Colors);
  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  @Output() organizationNameEvent: EventEmitter<any> = new EventEmitter();
  @Output() notificationEvent: EventEmitter<any> = new EventEmitter();
  @Output() notificationBadgeEvent: EventEmitter<any> = new EventEmitter();
  permission_detail: any;


  constructor(
    public router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('accessToken'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.profileDataSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.profileData = this.profileDataSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  check_super_admin() {
    if (this.permission_detail) {
      if (this.permission_detail.is_default) {
        return true;
      } else {
        return false;
      }
    }
  }

  check_org_permission(title, type) {
    var index = this.permission_detail.permission_list.findIndex((x) => x.title == title);
    if (index == -1 || !this.permission_detail.permission_list[index][type]) {
      return true;
    } else {
      return false;
    }

  }

  check_url() {
    if (localStorage.getItem('accessToken') && this.permission_detail && this.router.url !== '/profile/update') {
      var urls = this.router.url.split('/');
      var index = this.permission_detail.permission_list.findIndex((x) => x.url == '/' + urls[1]);
      if (index == -1 || !this.permission_detail.permission_list[index].is_view) {
        var index = this.permission_detail.permission_list.findIndex((x) => x.is_view == true);
        this.router.navigate([this.permission_detail.permission_list[index].url])
      }
    }
  }

  check_delete_access() {
    if (this.permission_detail) {
      var urls = this.router.url.split('/');
      var index = this.permission_detail.permission_list.findIndex((x) => x.url == '/' + urls[1]);
      if (index == -1 || !this.permission_detail.permission_list[index].is_delete) {
        return false;
      } else {
        return true;
      }
    }
  }

  check_edit_access() {
    if (this.permission_detail) {
      var urls = this.router.url.split('/');
      var index = this.permission_detail.permission_list.findIndex((x) => x.url == '/' + urls[1]);
      if (index == -1 || !this.permission_detail.permission_list[index].is_edit) {
        return false;
      } else {
        return true;
      }
    }
  }

  check_add_access() {
    if (this.permission_detail) {
      var urls = this.router.url.split('/');
      var index = this.permission_detail.permission_list.findIndex((x) => x.url == '/' + urls[1]);
      if (index == -1 || !this.permission_detail.permission_list[index].is_add) {
        return false;
      } else {
        return true;
      }
    }
  }

  check_add_url() {
    if (this.permission_detail) {
      var urls = this.router.url.split('/');
      var index = this.permission_detail.permission_list.findIndex((x) => x.url == '/' + urls[1]);
      if (index == -1 || !this.permission_detail.permission_list[index].is_add) {
        var index = this.permission_detail.permission_list.findIndex((x) => x.is_view == true);
        this.router.navigate([this.permission_detail.permission_list[index].url])
      }
    }
  }

  check_edit_url() {
    if (this.permission_detail) {
      var urls = this.router.url.split('/');
      var index = this.permission_detail.permission_list.findIndex((x) => x.url == '/' + urls[1]);
      if (index == -1 || !this.permission_detail.permission_list[index].is_edit) {
        var index = this.permission_detail.permission_list.findIndex((x) => x.is_view == true);
        this.router.navigate([this.permission_detail.permission_list[index].url])
      }
    }
  }

  show_menu_url(url) {
    if (this.permission_detail) {
      var index = this.permission_detail.permission_list.findIndex((x) => x.url == url);
      if (index == -1 || !this.permission_detail.permission_list[index].is_view) {
        return true;
      } else {
        return false;
      }
    } else {
    }
  }

  currentUserSubjet(data) {
    this.currentUserSubject.next(data);
  }

  profileSubject(data) {
    this.profileDataSubject.next(data);
  }

  showToaster(msg, color) {
    const toasterPosition = this.viewChildren.filter(item => item.position === 'bottom-right');
    toasterPosition.forEach((item) => {
      const title = msg;
      const option = {
        autohide: true,
        closeButton: true,
        color: color,
        delay: 2000,
        fade: true,
        position: 'bottom-right'
      };
      const { ...options } = { ...option, title };
      const componentRef = item.addToast(ToastrComponent, options);
      componentRef.instance['closeButton'] = options.closeButton;
    });
  }

  decodeToken() {
    const token = localStorage.getItem('accessToken');
    const decoded: any = jwt_decode(token);
    return decoded;
  }

  getOrganizationName(data) {
    this.organizationNameEvent.emit(data);
  }

  getUpdatedLogs() {
    this.notificationEvent.emit();
  }

  getBadgeCount() {
    this.notificationBadgeEvent.emit();
  }
}
