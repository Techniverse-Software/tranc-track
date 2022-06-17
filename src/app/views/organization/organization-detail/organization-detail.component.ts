import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocationModalComponent } from '../../../partial/modals/location-modal/location-modal.component';
import { GridOption } from '../../../partial/model/gridOption';
import { HttpReqService } from '../../../services/http-req.service';
import { AuthService } from '../../../services/auth.service';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {
  loading : boolean = false;
  organizationId: any;
  organizationData: any;
  customparameter: any = {};
  userGridOption: GridOption = {
    allrecords: true,
    sortField: 'name',
    sortOrder: 'asc',
    filter: {
      status: { $in: [1, 0, 4] },
      organizationUniqueId: ''
    },
  };
  deviceGridOption: GridOption = {
    allrecords: true,
    sortField: 'id1',
    sortOrder: 'asc',
    filter: {
      status: { $in: [1, 0, 3, 4] },
    },
  };


  userListArr: any = [];
  deviceListArr: any = [];
  deviceDisplayedColumns: string[] = ['id1', 'uid', 'location', 'status'];
  header = ['ID', 'UID', 'Coordinates', 'Status'];
  deviceField = ['id1', 'uid'];
  userDisplayedColumns: string[] = ['name', 'email', 'role', 'status'];
  userDisplayedColumnsForRepost: string[] = ['name', 'email', 'permissionDetail.name', 'status'];
  userheader: string[] = ['Name', 'Email', 'Permission', 'Status'];
  userField = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource();
  deviceDataSource = new MatTableDataSource();
  selectedLocation: any = {
    lat: 0,
    lng: 0
  };
  modalRef: BsModalRef;
  tokenData;
  head = ['Coordinates', 'Date Time', 'User', 'Status'];
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private httpReqService: HttpReqService,
    private modalService: BsModalService,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    this.organizationId = this.route.snapshot.params.id;
    this.getOrganizationDetail();

  }

  async getOrganizationDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get('organization/idWiseGetOrganization', this.organizationId);
    if (response && response.items.length) {
      this.organizationData = response.items[0];
      await this.getUserList();
      await this.getDeviceList();
      await this.getcustomparameterList();
    }
    this.loading = false;
  }

  async getUserList() {
    this.loading = true;
    this.userGridOption.filter.organizationUniqueId = this.organizationData.organizationId;
    this.userGridOption.filter['user_id'] = this.tokenData._id;
    this.userGridOption.filter['resellerId'] = this.organizationData.resellerId;
    const response: any = await this.httpReqService.post('users/list', this.userGridOption, false);
    if (response && response.items.length) {
      this.userListArr = response.items;
      
      for (let i in this.userListArr) {
        console.log(this.userListArr);
        this.userListArr[i].status = this.userListArr[i].status == 1 ? 'Active' : 'Inactive';
      }
      this.dataSource = new MatTableDataSource(this.userListArr);
    } else {
      this.userListArr = [];
      this.dataSource = new MatTableDataSource();
    }
    this.loading = false;
  }

  async getDeviceList() {
    this.loading = true;
    this.deviceGridOption.filter.organizationId = this.organizationData._id;
    this.deviceGridOption.filter['user_id'] = this.tokenData._id;
    if (this.organizationData.resellerId) {
      this.deviceGridOption.filter['resellerId'] = this.organizationData.organizationId;
    }
    const response: any = await this.httpReqService.post('device/list', this.deviceGridOption, false);
    if (response && response.items.length) {
      this.deviceListArr = response.items;
      for (let i in this.deviceListArr) {
        
        this.deviceListArr[i].status = this.deviceListArr[i].status == 1 ? 'Active' : this.deviceListArr[i].status == 0 ? 'Inactive' : 'Pending';
      }
      this.deviceDataSource = new MatTableDataSource(this.deviceListArr);
    } else {
      this.deviceListArr = [];
      this.deviceDataSource = new MatTableDataSource();
    }
    this.loading = false;
  }

  async getcustomparameterList() {
    this.loading = true;
    this.deviceGridOption.filter.organizationId = this.organizationData._id;
    this.deviceGridOption.filter['user_id'] = this.tokenData._id;
    const response: any = await this.httpReqService.get('organization/custom_parameter', this.organizationId);
    if (response && response.items) {
      this.customparameter = response.items;
    }
    this.loading = false;
  }

  userSearch(event) {
    let filterValue = event.target.value;
    if (filterValue) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.userGridOption.searchfields = this.userField;
    } else {
      delete this.userGridOption.searchfields;
      filterValue = '';
    }
    this.userGridOption.search = filterValue;
    this.getUserList();
  }

  deviceSearch(event) {
    let filterValue = event.target.value;
    if (filterValue) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.deviceGridOption.searchfields = this.deviceField;
    } else {
      delete this.deviceGridOption.searchfields;
      filterValue = '';
    }
    this.deviceGridOption.search = filterValue;
    this.getDeviceList();
  }

  selectLocation(data) {
    const location = data.split(',');
    this.selectedLocation['lat'] = Number(location[0]);
    this.selectedLocation['lng'] = Number(location[1]);
    const initialState = {
      title: 'Checkin Location',
      list: this.selectedLocation
    };
    this.modalRef = this.modalService.show(LocationModalComponent, { class: 'modal-xl modal-dialog-centered', initialState, backdrop: 'static', keyboard: false });
    this.modalRef.content.cancleButtonText = 'Close';
  }

  createPdf() {
    const data = {
      header: this.header,
      coloumn: this.deviceDisplayedColumns,
      data: this.deviceListArr,
      userListArr: this.userListArr,
      userDisplayedColumns: this.userDisplayedColumnsForRepost,
      userheader: this.userheader,
      fileName: 'organization_detail_',
      organiZationData: this.organizationData,
      customparameter: this.customparameter,
      tokenData: this.tokenData,
      title: 'Check-In Report'
    };
    // if (this.filterForm.value.fromDate) {
    //   data['fromDate'] = this.datePipe.transform(this.filterForm.value.fromDate, 'medium')
    // }
    // if (this.filterForm.value.toDate) {
    //   data['toDate'] = this.datePipe.transform(this.filterForm.value.toDate, 'medium')
    // }
    this.reportService.createReport1(data);
  }

}
