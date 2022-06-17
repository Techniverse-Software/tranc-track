import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})
export class AppInfoComponent implements OnInit {
  iosUrl = 'https://apps.apple.com/us/app/scanx/id1517228454?ls=1';
  androidUrl = 'https://play.google.com/store/apps/details?id=cloud.scanx'
  constructor() { }

  ngOnInit(): void {
  }

}
