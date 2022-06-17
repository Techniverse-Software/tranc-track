import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { LocationModalComponent } from "../../../partial/modals/location-modal/location-modal.component";
import { GridOption } from "../../../partial/model/gridOption";
import { AuthService } from "../../../services/auth.service";
import { HttpReqService } from "../../../services/http-req.service";
import { GoogleMapsLoaderService } from "../../../services/google-maps-loader.service";
import { LocationPipe } from "../../../partial/pipe/location.pipe";
/// <reference types="googlemaps" />

@Component({
  selector: "app-table-view",
  templateUrl: "./table-view.component.html",
  styleUrls: ["./table-view.component.scss"],
  providers: [GoogleMapsLoaderService, LocationPipe],
})
export class TableViewComponent implements OnInit {
  gridOption: GridOption = {
    pagesize: 10,
    search: "",
    filter: {},
    skip: 0,
    limit: 10,
    allrecords: false,
    sortField: "",
    sortOrder: "",
  };
  displayedColumns: string[] = [];
  field = [
    "userDetail.name",
    "organizationDetail.organizationName",
    "userDetail.email",
    "deviceDetail.location",
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength: any;
  data: any;
  statusIndex: any;
  tokenData: any;
  selectedLocation: any = {
    lat: 0,
    lng: 0,
  };
  modalRef: BsModalRef;
  options: google.maps.MapOptions = {
    center: {
      lat: 37.42,
      lng: -122.103719,
    },
    zoom: 7,
  };
  organizationArr: any = [];
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  tippyPropsDefault = {
    interactive: true,
    allowHTML: true,
    appendTo: "parent",
    theme: "c-tooltip",
    trigger: "mouseenter focus touchstart",
  };
  isDisplay = false;
  loading: boolean = false;
  constructor(
    private httpReqService: HttpReqService,
    private authService: AuthService,
    private modalService: BsModalService,
    public gmLoader: GoogleMapsLoaderService,
    private locationPipe: LocationPipe
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.dataSource.sort = this.sort;
    this.tokenData = this.authService.decodeToken();
    // this.tokenData = tokenData1.user;
    if (this.tokenData && this.tokenData.user.organizationId) {
      this.displayedColumns = [
        "userDetail.name",
        "userDetail.email",
        "deviceDetail.location",
        "createdAt",
        "status",
      ];
    } else {
      this.displayedColumns = [
        "userDetail.name",
        "organizationDetail.organizationName",
        "userDetail.email",
        "deviceDetail.location",
        "createdAt",
        "status",
      ];
      this.getOrganizationList();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getData();
  }

  async getOrganizationList() {
    this.loading = true;
    const obj = {
      allrecords: true,
      sortField: "organizationDetail.organizationName",
      sortOrder: "asc",
      filter: { status: 1 },
    };
    if (this.tokenData.user.organizationId) {
      obj["orgasnizationUniqueId"] = this.tokenData.user.organizationId;
    }
    obj.filter["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "organization/list",
      obj,
      false
    );

    if (response && response.items.length) {
      this.organizationArr = response.items;
    }
    this.loading = false;
  }

  async getData() {
    this.loading = true;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.gridOption.filter["user_id"] = this.tokenData.user._id;
    this.gridOption.filter["scanType"] = "scan";
    this.gridOption.filter["organizationUniqueId"] =
      this.tokenData.user.organizationId;
    const response: any = await this.httpReqService.post(
      "scanHistory/list",
      this.gridOption,
      false
    );
    this.data = response.items;
    this.dataSource = new MatTableDataSource(this.data);
    this.resultsLength = response.totalCount;
    if (this.data.length) {
      this.options.center = this.locationPipe.transform(this.data[0].location);
    }
    this.loading = false;
  }

  filterData(event, type) {
    let val = event.target.value;

    if (event.target.value) {
      if (type === "status") {
        val = Number(val);
      }
      this.gridOption.filter[type] = val;
      this.getData();
    } else {
      this.getData();
      delete this.gridOption.filter[type];
    }
    // this.pagesetUp();
  }

  sortChange(): void {
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.paginator.pageIndex = 0;
    this.getData();
  }

  pageChange(): void {
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.getData();
  }

  search(event) {
    let filterValue = event.target.value;
    if (filterValue) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.gridOption.searchfields = this.field;
    } else {
      delete this.gridOption.searchfields;
      filterValue = "";
    }
    this.gridOption.search = filterValue;
    this.pagesetUp();
    this.getData();
  }

  pagesetUp() {
    this.paginator.pageIndex = 0;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
  }

  selectLocation(data) {
    const location = data.split(",");
    this.selectedLocation["lat"] = Number(location[0]);
    this.selectedLocation["lng"] = Number(location[1]);
    const initialState = {
      title: "Checkin Location",
      list: this.selectedLocation,
    };
    this.modalRef = this.modalService.show(LocationModalComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Close";
  }

  getPosition(data) {
    if (data) {
      const location = data.split(",");
      const obj = {
        lat: Number(location[0]),
        lng: Number(location[1]),
      };
      return obj;
    }
  }

  simpleProps(data) {
    return { ...this.tippyPropsDefault, content: data };
  }

  changeTab(tab) {
    if (tab.header === "Table View") {
      this.isDisplay = true;
    }
  }
}
