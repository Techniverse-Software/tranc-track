import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LocationPipe } from '../../../partial/pipe/location.pipe';
import { GoogleMapsLoaderService } from '../../../services/google-maps-loader.service';
import { HttpReqService } from '../../../services/http-req.service';
import { HttpClient } from "@angular/common/http";
import { Socket } from 'ngx-socket-io';
/// <reference types="googlemaps" />

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  providers: [GoogleMapsLoaderService, LocationPipe],
})
export class MapViewComponent implements OnInit, OnDestroy {
  // options: google.maps.MapOptions = {
  //   center: {
  //     lat: 51.509865,
  //     lng: -0.118092
  //   },
  //   zoom: 7
  // };
  // center: google.maps.LatLngLiteral =  {
  //     lat: 51.509865,
  //     lng: -0.118092
  //   }
  // markerOptions: google.maps.MarkerOptions = { draggable: false };
  tokenData: any;
  organizatioData: any;
  utc: any;
  marker_list: any[] = [];
  map: any;
  history_list: any[] = [];
  interval: any;
  is_socket: boolean = false;
  loading : boolean = false;

  constructor(
    private httpClient: HttpClient,
    public gmLoader: GoogleMapsLoaderService,
    private authService: AuthService,
    private httpReqService: HttpReqService,
    private socket: Socket
  ) { }

  ngOnInit(): void {
    this.loading = true;
    // this.socket.on('message', (data)=>{
    //   console.log(data)
    // });
    // setInterval(()=>{
    //   this.socket.emit('message', 'front data');
    // }, 5000)

    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    setTimeout(()=>{
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 8,
          center: {
            lat: 51.509865,
            lng: -0.118092
          },
        }
      );
      if(this.tokenData.organizationId){
        this.getOrgDetail();
      }
      this.getData();
      this.interval = setInterval(()=>{
        // this.getData();
      }, 10000)
    })
  }

  ngOnDestroy(){
    if(this.interval){
      clearInterval(this.interval)
    }
    this.socket.removeListener("'mapview"+this.tokenData._id+"'", (data)=>{})
    this.socket.removeListener("'mapview"+this.tokenData.organizationId+"'", (data)=>{})
    this.socket.removeListener("mapview", (data)=>{})
  }

  async getOrgDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get('organizationByUniqueId', this.tokenData.organizationId);

    if (response.items.length) {
      this.organizatioData = response.items[0];
      this.httpClient.get("assets/cities.json").subscribe(data => {
        var city_object = (data as any).filter((x) => {
          if (x.name == this.organizatioData.billingAddress.town) {
            return true;
          }
        })
        if(city_object && city_object[0]){
          this.map.setCenter({
            lat: Number(city_object[0].latitude),
            lng: Number(city_object[0].longitude)
          })
        }
      });
    } else {

    }
    this.loading = false;
  }

  async getData() {
    this.loading = true;
    var obj = {
      filter: {
        user_id: this.tokenData._id,
      },
      allrecords: true
    }
    const response: any = await this.httpReqService.post('scanHistory/map_view', obj, false);
    response.items.forEach((data)=>{
      var index = this.history_list.findIndex((x)=>x._id.toString() == data._id.toString());
      if(index == -1){
        this.history_list.push(data);
        this.add_marker(data)
      }
    });

    if(!this.is_socket){
      this.is_socket = true;
      if(response.type == 0){
        this.socket.on("'mapview"+this.tokenData.user._id+"'", (data)=>{
          this.getData();
        });
      } else if(response.type == 1){
        this.socket.on("mapview", (data)=>{
          this.getData();
        });
      } else if(response.type == 2){
        this.socket.on("'mapview"+this.tokenData.user.organizationId+"'", (data)=>{
          this.getData();
        });
      }
    }
    this.loading = false;
  }

  add_marker(data){
    var location = data.location.split(',')
    var marker = new google.maps.Marker({
      position: {
        lat: Number(location[0]),
        lng: Number(location[1])
      },
      map: this.map,
    }); 
    const contentString ='<label>Name: </label>' + data.userDetail.name + '<br> <label>Address: </label>' + data.installationLocation;
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    marker.addListener("click", () => {
      infowindow.open(this.map, marker);
      setTimeout(()=>{
        infowindow.close();
      }, 5000);
    });
    this.marker_list.push(marker)
    var audio = new Audio('assets/audio.mp3');
    audio.play();
    this.map.setCenter({
      lat: Number(location[0]),
      lng: Number(location[1])
    })
  }

  converTime() {
    var d = new Date();

    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const mapTime = this.organizatioData.mapFlushTime.split(':')
    var nd: any = new Date(utc + (3600000 * this.organizatioData.timezone));
  }
}
