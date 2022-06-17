import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-group-details',
  templateUrl: './view-group-details.component.html',
  styleUrls: ['./view-group-details.component.scss']
})
export class ViewGroupDetailsComponent implements OnInit {

  title;
  groupData;
  groupType;

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.hide();
  }

}
