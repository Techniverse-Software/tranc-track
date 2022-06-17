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
@Component({
  selector: "app-assigned-group",
  templateUrl: "./assigned-group.component.html",
  styleUrls: ["./assigned-group.component.scss"],
})
export class AssignedGroupComponent implements OnInit, AfterContentInit {
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
  displayedColumns: string[] = ["name", "users", "action"];
  field = ["id1", "uid"];
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
  header = ["Name", "Users"];
  keysArr = ["name", "users"];
  tempHeader = [];
  tempKeysArr = [];
  coloumn = [];
  selectedExportType;
  organizationId: any;
  constructor(
    private httpReqService: HttpReqService,
    private modalService: BsModalService,
    private authService: AuthService,
    private loaderService: LoaderService,
    private excelService: ExeclService
  ) {}
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.tokenData = this.authService.decodeToken();
    // this.getOrganizationList();
    // this.getInstallerList();
    this.coloumn = [...this.displayedColumns];
    this.tempHeader = [...this.header];
    this.tempKeysArr = [...this.keysArr];
  }

  async getOrganizationDetail() {
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
      this.getData();
    }
  }

  ngAfterContentInit() {
    this.dataSource.paginator = this.paginator;
    // if (this.tokenData.user.role !== Role.admin) {
    //   this.getOrganizationDetail();
    // } else {
    //   this.getData();
    // }
  }

  async getData(isRegisterd?) {
    // this.gridOption.sortField = this.sort.active;
    // this.gridOption.sortOrder = this.sort.direction;
    const obj = {
      groupType: "user",
      user_id: this.tokenData.user._id,
    };
    const response: any = await this.httpReqService.post(
      "userDeviceGroup/list",
      obj,
      false
    );
    this.data = response.items;
    this.dataSource = new MatTableDataSource(this.data);
    this.resultsLength = response.totalCount;
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

  change(event, data, index) {
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
    this.pagesetUp();
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
    this.modalRef.content.url = "device/delete";
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

  async getOrganizationList() {
    const obj = {
      groupType: "user",
      user_id: this.tokenData.user._id,
    };
    const response: any = await this.httpReqService.post(
      "userDeviceGroup/list",
      obj,
      false
    );
    if (response && response.items.length) {
      this.organizationArr = response.items;
    }
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
      console.warn("in if", typeof val);
      if (type === "status") {
        val = Number(val);
      }
      this.gridOption.filter[type] = val;
    } else {
      delete this.gridOption.filter[type];
    }
    this.getData();
    this.pagesetUp();
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
      this.exportData();
    } else if (event.target.value === "0") {
      this.selectedExportType = 0;
      this.exportData();
    }
  }

  exportData() {
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

  selectFile(e) {}

  addGroup() {
    const initialState = {
      title: "Create Device Or User Group",
      groupType: "user",
    };
    this.modalRef = this.modalService.show(AddGroupModalComponent, {
      class: "modal-xl modal-dialog-centered ",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Cancel";
    this.modalRef.content.submitButtonText = "Submit";
    this.modalRef.content.response.subscribe((result) => {
      this.getData();
      if (result) {
      }
    });
  }

  allocateDevice() {
    const initialState = {
      title: "Allocate Device To User",
    };
    this.modalRef = this.modalService.show(AllocateDeviceModalComponent, {
      class: "modal-xl modal-dialog-centered modal-lg",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Cancel";
    this.modalRef.content.submitButtonText = "Allocate";
    this.modalRef.content.response.subscribe((result) => {
      if (result) {
        // this.getData();
      }
    });
  }
}
