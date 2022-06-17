import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ExeclService } from "../../../services/execl.service";
import { LoaderService } from "../../../services/loader.service";
import { DeleteModalComponent } from "../../../partial/modals/delete-modal/delete-modal.component";
import { LocationModalComponent } from "../../../partial/modals/location-modal/location-modal.component";
import { GridOption } from "../../../partial/model/gridOption";
import { AuthService } from "../../../services/auth.service";
import { HttpReqService } from "../../../services/http-req.service";
import { Role } from "../../../services/role";
import { AddGroupModalComponent } from "../../../partial/modals/add-group-modal/add-group-modal.component";
import { AllocateDeviceModalComponent } from "../../../partial/modals/allocate-device-modal/allocate-device-modal.component";
import { ImportFileComponent } from "../../../partial/modals/import-file/import-file.component";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.scss"],
})
export class LocationComponent implements OnInit, AfterViewInit {
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
  // displayedColumns: string[] = ['name', 'addressLineOne', 'addressLineTwo', 'town', 'postCode', 'status', 'action'];
  field = [
    "name",
    "town",
    "postCode",
    "organizationDetail.organizationName",
    "status",
    "action",
  ];
  // field = ['name', 'addressLineOne', 'addressLineTwo', 'town', 'postCode', 'status', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength: any;
  data: any;
  role = Role;
  statusIndex: any;
  modalRef: BsModalRef;
  tokenData: any;
  tippyPropsDefault = {
    interactive: true,
    allowHTML: true,
    appendTo: "parent",
    theme: "c-tooltip",
    trigger: "mouseenter focus touchstart",
  };
  selectedLocation: any = {
    lat: 0,
    lng: 0,
  };
  organizationArr: any = [];
  gridOption1: GridOption = {
    allrecords: true,
    sortField: "name",
    sortOrder: "asc",
    filter: { status: { $in: [1, 4] } },
  };
  installerArr: any = [];
  isRegeistred = false;
  header = [];
  keysArr = [];
  tempHeader = [];
  tempKeysArr = [];
  coloumn = [];
  locationData: any;
  selectedExportType;
  organizationId: any;
  loading: boolean = false;
  constructor(
    private httpReqService: HttpReqService,
    private modalService: BsModalService,
    public authService: AuthService,
    private loaderService: LoaderService,
    private excelService: ExeclService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.dataSource.sort = this.sort;
    this.tokenData = this.authService.decodeToken();
    if (this.tokenData.user && this.tokenData.user.organizationId) {
      this.displayedColumns = ["name", "town", "postCode", "status", "action"];
      this.header = ["Name", "Town", "Postcode", "Status"];
      this.keysArr = ["name", "town", "postCode", "status"];
    } else {
      this.displayedColumns = [
        "name",
        "organization",
        "town",
        "postCode",
        "status",
        "action",
      ];
      this.header = ["Name", "Organization", "Town", "Postcode", "Status"];
      this.keysArr = [
        "name",
        "organizationDetail.organizationName",
        "town",
        "postCode",
        "status",
      ];
      this.getOrganizationList();
    }
    // this.getInstallerList();
    this.coloumn = [...this.displayedColumns];
    this.tempHeader = [...this.header];
    this.tempKeysArr = [...this.keysArr];
  }

  async getOrganizationDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get(
      "organizationByUniqueId",
      this.tokenData.user.organizationId
    );
    if (response.items.length) {
      this.organizationId = response.items[0]._id;

      this.gridOption.filter["organizationId"] = this.organizationId;
      this.displayedColumns.splice(
        this.displayedColumns.indexOf("organizationDetail.organizationName"),
        1
      );
      this.keysArr.splice(
        this.keysArr.indexOf("organizationDetail.organizationName"),
        1
      );
      this.header.splice(this.header.indexOf("Assigned To"), 1);
      this.loading = false;
      this.getData();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getData();
  }

  async getData(isRegisterd?) {
    this.loading = true;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.gridOption["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "location/list",
      this.gridOption,
      false
    );
    this.data = response.items;
    for (let i in this.data) {
      this.data[i].status = this.data[i].status == 1 ? "Active" : "Inactive";
    }
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.resultsLength = response.totalCount;
    this.loading = false;
  }

  sortChange(): void {
    this.loading = true;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.paginator.pageIndex = 0;
    this.getData();
  }

  pageChange(): void {
    this.loading = true;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.getData();
  }

  change(event, data, index) {
    this.loading = true;
    this.statusIndex = index;
    if (data.status === 1) {
      const procced = confirm("Do you want to disable this user?");
      if (procced) {
        event.checked = !event.checked;
        if (data.status === 1) {
          this.changeStatus({ status: 0 }, data._id);
        } else {
          this.changeStatus({ status: 1 }, data._id);
        }
      } else {
        event.target.checked = true;
        data.status = 1;
      }
    } else {
      this.changeStatus({ status: 1 }, data._id);
    }
  }

  async changeStatus(data, id) {
    data["_id"] = id;
    const response: any = await this.httpReqService.put("users", data);
    this.dataSource.data[this.statusIndex] = response.items;
    this.dataSource._updateChangeSubscription();
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
    // this.pagesetUp();
    this.getData();
  }

  delete(data) {
    const initialState = {
      title: "Delete This Device",
      message: "Are you sure you want to delete this device?",
      list: data,
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Cancel";
    this.modalRef.content.deleteButtonText = "Delete";
    this.modalRef.content.url = "location/delete";
    this.modalRef.content.is_status_change = false;
    this.modalRef.content.response.subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  simpleProps(data) {
    return { ...this.tippyPropsDefault, content: data };
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

  // async getOrganizationList() {
  //   const obj = {
  //     groupType: 'device',
  //     user_id: this.tokenData.user._id
  //   };
  //   const response: any = await this.httpReqService.post('userDeviceGroup/list', obj, false);
  //   if (response && response.items.length) {
  //     this.organizationArr = response.items;
  //   }
  // }

  async getOrganizationList() {
    this.loading = true;
    const obj = {
      allrecords: true,
      sortField: "organizationName",
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

  async getInstallerList() {
    this.gridOption1.searchfields = ["role"];
    this.gridOption1.search = this.role.installer;
    this.gridOption1.filter["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "users/list",
      this.gridOption1,
      false
    );
    if (response && response.items.length) {
      this.installerArr = response.items;
    }
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

  registerDeviceFilter(event) {
    const registerStatus = event.target.value;
    if (registerStatus) {
      if (registerStatus === "true") {
        this.setOrignalColoumn();
        this.gridOption.filter["registrationStatus"] = true;
      } else {
        this.displayedColumns.splice(
          this.displayedColumns.indexOf("organizationDetail.organizationName"),
          1
        );
        this.displayedColumns.splice(
          this.displayedColumns.indexOf("location"),
          1
        );
        this.keysArr.splice(
          this.keysArr.indexOf("organizationDetail.organizationName"),
          1
        );
        this.keysArr.splice(this.keysArr.indexOf("location"), 1);
        this.header.splice(this.header.indexOf("Coordinates"), 1);
        this.header.splice(this.header.indexOf("Assigned To"), 1);
        this.gridOption.filter["registrationStatus"] = false;
      }
    } else {
      this.setOrignalColoumn();
      delete this.gridOption.filter.registrationStatus;
    }
    this.pagesetUp();
    this.getData(true);
  }

  setOrignalColoumn() {
    this.displayedColumns = [...this.coloumn];
    this.header = [...this.tempHeader];
    this.keysArr = [...this.tempKeysArr];
  }

  pagesetUp() {
    this.paginator.pageIndex = 0;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
  }

  selectExport(event) {
    if (event.target.value === "1") {
      this.selectedExportType = 1;
      this.exportPdf();
    } else if (event.target.value === "0") {
      this.selectedExportType = 0;
      this.exportPdf();
    }
  }

  exportPdf() {
    this.loaderService.display(true);
    const data = [];
    this.data.forEach((element) => {
      // tslint:disable-next-line: forin
      const rowData = [];
      this.keysArr.forEach((entity) => {
        if (entity.indexOf(".") > -1) {
          const property = entity.split(".");
          if (element[property[0]]) {
            rowData.push(element[property[0]][property[1]]);
          } else {
            rowData.push("");
          }
        } else {
          if (element[entity] != null) {
            if (entity === "status") {
              if (element[entity]) {
                rowData.push("Active");
              } else {
                rowData.push("Inactive");
              }
            } else {
              rowData.push(element[entity]);
            }
          } else {
            rowData.push("");
          }
        }
      });
      data.push(rowData);
    });

    const details = {
      header: this.header,
      data: data,
      fileName: "Device",
      exportType: this.selectedExportType,
    };
    this.excelService.exportData(details);
  }

  // Import File
  importFile() {
    const initialState = {
      title: "Upload file",
      page: "location",
    };
    this.modalRef = this.modalService.show(ImportFileComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Close";
  }
}
