import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { LoaderService } from "../../../services/loader.service";
import { DeleteModalComponent } from "../../../partial/modals/delete-modal/delete-modal.component";
import { GridOption } from "../../../partial/model/gridOption";
import { AuthService } from "../../../services/auth.service";
import { HttpReqService } from "../../../services/http-req.service";
import { Role } from "../../../services/role";
import { ExeclService } from "../../../services/execl.service";
import { ImportFileComponent } from "../../../partial/modals/import-file/import-file.component";
import { FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-organization-list",
  templateUrl: "./organization-list.component.html",
  styleUrls: ["./organization-list.component.scss"],
})
export class OrganizationListComponent implements OnInit, AfterViewInit {
  gridOption: GridOption = {
    pagesize: 10,
    search: "",
    filter: { status: { $in: [0, 1, 7] } },
    skip: 0,
    limit: 10,
    allrecords: false,
    sortField: "",
    sortOrder: "",
  };
  //displayedColumns: string[] = ['organizationName', 'personDetail.name', 'personDetail.email', 'numberOfUser',  'numberOfDevice', 'nfcEnabled', 'status', 'action'];
  displayedColumns: string[] = [
    "organizationName",
    "personDetail.name",
    "personDetail.email",
    "numberOfUser",
    "numberOfDevice",
    "status",
    "action",
  ];
  field = ["organizationName", "personDetail.name", "personDetail.email"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength: any;
  data: any;
  role = Role;
  statusIndex: any;
  modalRef: BsModalRef;
  tokenData: any = {};
  resellerArr: any = [];
  organizationArr: any = [];
  permissionrArr: any = [];
  loading: boolean = false;
  filterValue = new FormControl("all");
  orgTypeValue = new FormControl("");
  //header = ['Company Name', 'Admin Name', 'Admin Email', 'Users', 'Devices', 'NFC Enabled', 'status'];
  header = [
    "Company Name",
    "Admin Name",
    "Admin Email",
    "Users",
    "Devices",
    "status",
  ];
  //keysArr = ['organizationName', 'personDetail.name', 'personDetail.email', 'numberOfUser', 'numberOfDevice', 'nfcEnabled', 'status'];
  keysArr = [
    "organizationName",
    "personDetail.name",
    "personDetail.email",
    "numberOfUser",
    "numberOfDevice",
    "status",
  ];
  selectedExportType;
  isOrganizationAdmin: boolean = false;
  isSupperAdmin: boolean = false;
  constructor(
    private httpReqService: HttpReqService,
    private modalService: BsModalService,
    public authService: AuthService,
    private loaderService: LoaderService,
    private excelService: ExeclService,
    private toastr: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.dataSource.sort = this.sort;
    this.tokenData = this.authService.decodeToken();
    await this.getPermissionList();
    this.dataSource.paginator = this.paginator;
    this.getData();
    //if (this.tokenData.user && !this.tokenData.user.organizationId) {
    //  this.getOrganizationList();
    //}

    // this.getResellerList();
  }

  ngAfterViewInit() { }

  async getData() {
    this.loading = true;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.gridOption.filter["user_id"] = this.tokenData.user._id;
    if (this.tokenData.user.organizationId) {
      this.gridOption["orgasnizationUniqueId"] =
        this.tokenData.user.organizationId;
    }
    const response: any = await this.httpReqService.post(
      "organization/list",
      this.gridOption,
      false
    );
    this.data = response.items;
    // this.gridOption.filter.status = this.filterValue;
    // this.gridOption.filter.orgType = this.orgTypeValue;
    this.dataSource = new MatTableDataSource(this.data);
    this.resultsLength = response.totalCount;
    this.loading = false;
  }

  sortChange(): void {
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.paginator.pageIndex = 0;
    this.pagesetUp();
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

  delete(data) {
    const initialState = {
      title: "Delete This Organization",
      message: "Are you sure you want to delete this organization?",
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
    this.modalRef.content.is_status_change = false;
    this.modalRef.content.url = "organization/delete";
    this.modalRef.content.response.subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  pagesetUp() {
    this.paginator.pageIndex = 0;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
  }

  changeStatus(e) {
    const statusValue = e.target.value;
    if (statusValue == 0 || statusValue == 1 || statusValue == 7) {
      this.gridOption.filter.status = Number(statusValue);
    } else {
      this.gridOption.filter.status = { $in: [0, 1, 7] };
    }
    this.pagesetUp();
    this.getData();
  }

  changeOrgType(e) {
    let orgType = e.target.value;
    if (orgType != "") {
      this.gridOption.filter.orgType = orgType;
    } else {
      delete this.gridOption.filter.orgType;
    }
    this.pagesetUp();
    this.getData();
  }

  async getResellerList() {
    const obj = {
      allrecords: true,
      sortField: "name",
      sortOrder: "asc",
      filter: { status: { $in: [1, 4, 7] }, user_id: this.tokenData.user._id },
      search: this.role.resellers,
      searchfields: ["role"],
    };
    obj.filter["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "users/list",
      obj,
      false
    );
    if (response && response.items.length) {
      this.resellerArr = response.items;
    }
  }

  async getOrganizationList() {
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
  }

  filterData(event, type) {
    let val = event.target.value;
    if (event.target.value) {
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

  changeReseller(e) {
    if (e.target.value) {
      this.gridOption.filter.resellerId = e.target.value;
    } else {
      delete this.gridOption.filter.resellerId;
    }
    this.pagesetUp();
    this.getData();
  }

  toggleNFCEnabled(event, data, index) {
    this.statusIndex = index;

    var title = !data.nfcEnabled ? "enabled" : "disabled";
    const initialState = {
      title: "Do you want to " + title + " NFC status?",
      message: "Are you sure you want to delete this organization?",
      list: data,
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Cancel";
    this.modalRef.content.deleteButtonText = "Continue";
    this.modalRef.content.is_status_change = true;
    // this.modalRef.content.url = 'organization/delete';
    this.modalRef.content.response.subscribe((result) => {
      if (result) {
        event.checked = !event.checked;
        if (data.nfcEnabled) {
          this.changeNFCStatus({ status: 0 }, data._id);
        } else {
          this.changeNFCStatus({ status: 1 }, data._id);
          data.nfcEnabled = true;
        }
      } else {
        this.getData();
      }
    });

    // if (data.nfcEnabled) {
    //   const procced = confirm('Do you want to disable NFC status?');
    //   if (procced) {
    // event.checked = !event.checked;
    // if (data.nfcEnabled) {
    //   this.changeNFCStatus({ status: 0 }, data._id);
    // } else {
    //   this.changeNFCStatus({ status: 1 }, data._id);
    //   data.nfcEnabled = true;
    // }
    //   } else {
    //     event.target.checked = true;
    //   }
    // } else {
    //   this.changeNFCStatus({ status: 1 }, data._id);
    // }
  }

  async changeNFCStatus(data, id) {
    data["organizationId"] = id;
    const response: any = await this.httpReqService.put(
      "organization/disableOrgNfc",
      data
    );
    this.dataSource.data[this.statusIndex]["nfcEnabled"] =
      response.items.nfcEnabled;
    this.dataSource._updateChangeSubscription();
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

  exportPdf() {
    this.selectedExportType = 0;
    this.exportData();
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
      fileName: "Organization",
      exportType: this.selectedExportType,
    };
    this.excelService.exportData(details);
  }

  // Import File
  importFile() {
    const initialState = {
      title: "Upload file",
      page: "organizations",
    };
    this.modalRef = this.modalService.show(ImportFileComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Close";
  }

  async getPermissionList() {
    this.loading = true;
    let user = this.tokenData.user;
    //  console.log(user);
    if (user != null) {
      if (
        user.is_org &&
        user.organizationId != null &&
        user.organizationId != ""
      ) {
        this.isOrganizationAdmin = true;
      } else if (user.organizationId == null) {
        this.isSupperAdmin = true;
      }
    }
    this.loading = false;
  }

  async subscribeOrg() {
    console.log("ogggg", this.tokenData)
    if (this.tokenData && this.tokenData.user && this.tokenData.user.organizationId) {
      const response: any = await this.httpReqService.post("create/subscription", {
        orgId: this.tokenData.user.organizationId
      }, false)

      if (response && response.error) {
        this.loading = false;
        this.toastr.error(`${response.error.message}`);
        return
      }
      this.toastr.success('Your subscription created successfully!')
    } else {
      this.toastr.error(`You can not subscribe`);
    }
  }
}
