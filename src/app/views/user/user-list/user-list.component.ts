import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BsModalRef, BsModalService, ModalDirective } from "ngx-bootstrap/modal";
import { LoaderService } from "../../../services/loader.service";
import { environment } from "../../../../environments/environment";
import { DeleteModalComponent } from "../../../partial/modals/delete-modal/delete-modal.component";
import { GridOption } from "../../../partial/model/gridOption";
import { AuthService } from "../../../services/auth.service";
import { ExeclService } from "../../../services/execl.service";
import { HttpReqService } from "../../../services/http-req.service";
import { Role } from "../../../services/role";
import { ImportFileComponent } from "../../../partial/modals/import-file/import-file.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  gridOption: GridOption = {
    pagesize: 10,
    search: "",
    filter: {
      status: { $in: [0, 1, 4, 7] },
    },
    skip: 0,
    limit: 10,
    allrecords: false,
    sortField: "",
    sortOrder: "",
  };
  displayedColumns: string[] = ["name", "email", "role", "status", "action"];
  field = [
    "name",
    "email",
    "organizationDetail.organizationName",
    "permissionDetail.name",
  ];
  organizationAdminEmails = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength: any;
  data: any;
  role = Role;
  statusIndex: any;
  modalRef: BsModalRef;
  mediaUrl = environment.mediaUrl;
  tokenData: any;
  userData: any;
  header = ["Name", "Email", "Permission", "status"];
  keysArr = ["name", "email", "permission", "statusName"];
  organizationArr: any = [];
  selectedExportType;
  organizationId;
  public loggedInUser: string = "";
  @ViewChild("defaultemailModal") defaultemailModal: ModalDirective;
  isOrgAdminEmail: boolean = false;

  constructor(
    private httpReqService: HttpReqService,
    private modalService: BsModalService,
    public authService: AuthService,
    private excelService: ExeclService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.tokenData = this.authService.decodeToken();
    this.loggedInUser = this.tokenData.user.email;

    if (this.tokenData.user && this.tokenData.user.organizationId) {
      this.displayedColumns = ["name", "email", "role", "status", "action"];
    } else {
      this.displayedColumns = [
        "organizationDetail.organizationName",
        "name",
        "email",
        "role",
        "status",
        "action",
      ];
    }
    this.getOrganizationList();
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
      for (let key in this.organizationArr) {
        let value = this.organizationArr[key].personDetail
          ? this.organizationArr[key].personDetail.email
          : null;
        this.organizationAdminEmails.push(value);
      }
    }
    this.loading = false;
  }

  async getData() {
    this.loading = true;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.gridOption.filter["user_id"] = this.tokenData.user._id;

    // return;

    const response: any = await this.httpReqService.post(
      "users/list",
      this.gridOption,
      false
    );
    this.data = response.items;
    for (let i in this.data) {
      if (this.data[i].permissionDetail) {
        this.data[i].permission = this.data[i].permissionDetail.name;
        this.data[i].statusName =
          this.data[i].status == 1 ? "Active" : "Inactive";
      }
    }

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
    this.getData();
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
  }

  pageChange(): void {
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.getData();
  }

  change(event, data, index) {
    this.statusIndex = index;

    var title = !data.status ? "enabled" : "disabled";
    const initialState = {
      title: "Do you want to " + title + " User status?",
      message: "Are you sure you want to delete this user?",
      list: data,
      isUser: true,
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Cancel";
    this.modalRef.content.deleteButtonText = !data.status ? "Enable" : "Disable";
    this.modalRef.content.color = !data.status ? "success" : "danger";
    this.modalRef.content.is_status_change = true;
    // this.modalRef.content.url = 'organization/delete';
    this.modalRef.content.response.subscribe((result) => {
      this.loading = true;
      if (result) {
        event.checked = !event.checked;
        if (data.status === 1) {
          data.status = 0;
          this.changeStatus({ status: 0 }, data._id);
        } else {
          data.status = 1;
          this.changeStatus({ status: 1 }, data._id);
        }
      } else {
        this.getData();
      }
      this.loading = false;
    });

    // if (data.status === 1) {
    //   const procced = confirm('Do you want to disable this user?');
    //   if (procced) {
    //     event.checked = !event.checked;
    //     if (data.status === 1) {
    //       this.changeStatus({ status: 0 }, data._id);
    //     } else {
    //       this.changeStatus({ status: 1 }, data._id);
    //     }
    //   } else {
    //     event.target.checked = true;
    //     data.status = 1;
    //   }
    // } else {
    //   this.changeStatus({ status: 1 }, data._id);
    // }
  }

  async changeStatus(data, id) {
    this.loading = true;
    data["_id"] = id;
    const response: any = await this.httpReqService.put("users", data);
    this.loading = false;
    // this.dataSource.data[this.statusIndex] = response.items;
    // this.dataSource._updateChangeSubscription();
  }

  exportPdf() {
    this.selectedExportType = 0;
    this.exportData();
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
    this.paginator.pageIndex = 0;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.search = filterValue;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    setTimeout(() => {
      this.getData();
    }, 200);
  }

  async delete(data) {
    const initialState = {
      title: "Delete this User?",
      message: "Are you sure you want to delete this user?",
      list: data,
      isOrgAdminEmail: await this.checkEmailIsOrgAdminEmail(data),
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Cancel";
    this.modalRef.content.deleteButtonText = "Delete";
    this.modalRef.content.url = "users/delete";
    this.modalRef.content.is_status_change = false;
    this.modalRef.content.response.subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  async checkEmailIsOrgAdminEmail(data) {
    if (this.organizationAdminEmails.includes(data.email)) {
      this.isOrgAdminEmail = true;
    } else {
      this.isOrgAdminEmail = false;
    }
    return this.isOrgAdminEmail;
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
      const rowData = [];
      this.keysArr.forEach((entity) => {
        rowData.push(element[entity]);
      });
      data.push(rowData);
    });
    const details = {
      header: this.header,
      data: data,
      fileName: "User",
      exportType: this.selectedExportType,
    };
    this.excelService.exportData(details);
  }

  // Import File
  importFile() {
    const initialState = {
      title: "Upload file",
      page: "user",
    };
    this.modalRef = this.modalService.show(ImportFileComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Close";
  }

  async sendEmail(user_id) {
    this.loading = true;
    const response: any = await this.httpReqService.post(
      "users/resendEmail",
      { user_id: user_id },
      false
    );
    if (response && response.status == 1) {
      this.defaultemailModal.show();
    }
    this.loading = false;
  }

  openModal(template: any) {
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: "static",
    });
  }

  async checkSubscription() {
    try {
      var getAccessToken = localStorage.getItem('accessToken');
      const response: any = await this.httpReqService.get(
        "user/subscription",
        {
          params: {
            orgId: '59dbdc'
          }
        }
      );
    } catch (error) {

    }

  }
}
