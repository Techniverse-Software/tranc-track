import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {

  apiLoaded: Observable<boolean>;
  apiKey = environment.googleMapApiKey; // CoreUI demo Google API key, to replace

  constructor(
    private httpClient: HttpClient
  ) {
    // To use the Google Maps JavaScript API, you must register your app project on the Google API Console
    // and get a Google API key which you can add to your app
    // see: https://developers.google.com/maps/gmp-get-started
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  getLoaction() {
    var geocoder = new google.maps.Geocoder;
    var latlng = {lat: parseFloat('44.4647452'), lng: parseFloat('7.3553838')};
    return this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/geocode/js?latlng=44.4647452,7.3553838&key=${this.apiKey}`, 'callback');
  }
}
