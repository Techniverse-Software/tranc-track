import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocationModalComponent } from '../../partial/modals/location-modal/location-modal.component';
import { GridOption } from '../../partial/model/gridOption';
import { AuthService } from '../../services/auth.service';
import { HttpReqService } from '../../services/http-req.service';
import { GoogleMapsLoaderService } from '../../services/google-maps-loader.service';
import { LocationPipe } from '../../partial/pipe/location.pipe';
/// <reference types="googlemaps" />
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  tabs: any[] = [
    { header: 'Check-in', icon: 'cil-columns' },
    { header: 'Map View', icon: 'cil-map' },
    { header: 'Summary', icon: 'cil-aperture' },
  ];
  tokenData: any;
  isDisplay = true;
  isMapDisplay = false;
  loading: boolean = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    this.loading = false;
  }


  changeTab(tab) {
    if (tab.header === 'Table View') {
      this.isDisplay = true;
    } else if (tab.header === 'Map View') {
      this.isMapDisplay = true;
    }

  }
}
