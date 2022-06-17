import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { GoogleMapsLoaderService } from '../../../services/google-maps-loader.service';
/// <reference types="googlemaps" />

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
  providers: [GoogleMapsLoaderService],
})
export class LocationModalComponent implements OnInit {
  cancleButtonText: string;
  deleteButtonText: string;
  url: string;
  title: any;
  positionForm: FormGroup;
  message: any;
  list: any;
  options: google.maps.MapOptions = {
    center: {
      lat: 37.42000,
      lng: -122.103719
    },
    zoom: 7
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  public response: Subject<boolean>;
  constructor(
    public modalRef: BsModalRef,
    public gmLoader: GoogleMapsLoaderService,
  ) { }

  ngOnInit(): void {
    this.response = new Subject();
    this.options.center = this.list;
  }

  cancle(): void {
    this.response.next();
    this.modalRef.hide();
  }
}
