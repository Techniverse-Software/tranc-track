import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterContentInit,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { DeleteModalComponent } from "../../../partial/modals/delete-modal/delete-modal.component";
import { GridOption } from "../../../partial/model/gridOption";
import { AuthService } from "../../../services/auth.service";
import { HttpReqService } from "../../../services/http-req.service";
import { Socket } from "ngx-socket-io";

@Component({
  selector: "app-pending-req-list",
  templateUrl: "./pending-req-list.component.html",
  styleUrls: ["./pending-req-list.component.scss"],
})
export class PendingReqListComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public gridOption: GridOption = {
    pagesize: 10,
    search: "",
    filter: {},
    skip: 0,
    limit: 10,
    allrecords: false,
    sortField: "",
    sortOrder: "",
  };

  public dataSource = new MatTableDataSource();
  public dataSource1 = new MatTableDataSource();
  public dataSource2 = new MatTableDataSource();
  public dataSource3 = new MatTableDataSource();
  public dataSource4 = new MatTableDataSource();

  public logindisplayedColumns: string[] = [
    "userDetail.name",
    "userDetail.email",
    "status",
    "action",
  ];

  public namedisplayedColumns: string[] = [
    "userDetail.name",
    "name",
    "status",
    "action",
  ];

  public uniquedevicedisplayedColumns: string[] = [
    "userDetail.name",
    "uniqueDevice",
    "status",
    "action",
  ];

  public emaildisplayedColumns: string[] = [
    "userDetail.email",
    "email",
    "status",
    "action",
  ];

  public organizationdisplayedColumns: string[] = [
    "userDetail.organizationId",
    "userDetail.organizationname",
    "organizationId",
    "organizationname",
    "status",
    "action",
  ];

  public permissionrArr: any = [];

  public field = [
    "userDetail.name",
    "userDetail.email",
    "userDetail.organizationId",
  ];

  public resultsLength: any;

  public data: any;

  public statusIndex: any;

  public modalRef: BsModalRef;

  public tokenData: any;

  public resellerArr: any = [];

  public isSuperAdmin: boolean = false;

  public activeTabNo: string = "0";

  public loading: boolean = false;

  public tabList = [
    { name: "User Sign-ups", tab: 1 },
    { name: "Name Changes", tab: 2 },
    { name: "Email Changes", tab: 3 },
    { name: "Organization Changes", tab: 4 },
    { name: "New Device Changes", tab: 5 },
  ];

  tab: number = 1;

  constructor(
    private httpReqService: HttpReqService,
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.dataSource.sort = this.sort;
    this.dataSource1.sort = this.sort;
    this.dataSource2.sort = this.sort;
    this.dataSource3.sort = this.sort;
    this.dataSource4.sort = this.sort;

    this.gridOption.filter = {
      status: { $in: [0, 1, 2] },
      tab: {
        $and: [{ email: { $ne: null } }, { organizationId: { $ne: null } }],
      },
    };

    this.tokenData = this.authService.decodeToken();

    this.tokenData = this.tokenData.user;

    this.getPermissionList();

    this.socket.on("approval", (data) => {
      if (data) {
        this.getData();
      }
    });
  }

  onactive(tab) {
    this.tab = tab;
    this.paginator.pageIndex = 0;
    this.gridOption.skip = 0;
    this.gridOption.limit = 10;
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    this.dataSource1.paginator = this.paginator ? this.paginator : null;
    this.dataSource2.paginator = this.paginator ? this.paginator : null;
    this.dataSource3.paginator = this.paginator ? this.paginator : null;
    this.dataSource4.paginator = this.paginator ? this.paginator : null;
    this.getData();
  }

  ngAfterContentInit() {
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    this.dataSource1.paginator = this.paginator ? this.paginator : null;
    this.dataSource2.paginator = this.paginator ? this.paginator : null;
    this.dataSource3.paginator = this.paginator ? this.paginator : null;
    this.dataSource4.paginator = this.paginator ? this.paginator : null;
    
  }

  ngOnDestroy() {
    /* this.socket.removeListener('approval'); */
  }

  public async getData() {
    this.loading = true;

    this.gridOption.sortField = this.sort ? this.sort.active : "";

    this.gridOption.sortOrder = this.sort ? this.sort.direction : "";

    this.gridOption.filter["user_id"] = this.tokenData._id;

    this.gridOption.filter["adminId"] = this.tokenData._id;

    if (this.tab == 1) {
      this.gridOption.filter.tab = {
        $and: [{ email: { $ne: null } }, { organizationId: { $ne: null } }],
      };
    } else if (this.tab == 2) {
      this.gridOption.filter.tab = { $and: [{ name: { $ne: null } }] };
    } else if (this.tab == 3) {
      this.gridOption.filter.tab = {
        $and: [{ email: { $ne: null } }, { organizationId: { $eq: null } }],
      };
    } else if (this.tab == 4) {
      this.gridOption.filter.tab = {
        $and: [{ email: { $eq: null } }, { organizationId: { $ne: null } }],
      };
    } else if (this.tab == 5) {
      this.gridOption.filter.tab = { $and: [{ uniqueDevice: { $ne: null } }] };
    }

    const response: any = await this.httpReqService.post(
      "approval/list",
      this.gridOption,
      false
    );

    this.dataSource = new MatTableDataSource(response.items);
    this.dataSource1 = new MatTableDataSource(response.items);
    this.dataSource2 = new MatTableDataSource(response.items);
    this.dataSource3 = new MatTableDataSource(response.items);
    this.dataSource4 = new MatTableDataSource(response.items);

    this.resultsLength = response.totalCount;

    this.loading = false;
  }

  public sortChange(): void {
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.paginator.pageIndex = 0;
    this.getData();
  }

  public pageChange(): void {
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;

    this.getData();
  }

  public search(event) {
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

  public delete(data) {
    const initialState = {
      title: "Reject Request",
      message: "Are you sure you want to reject this request?",
      list: data,
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: "modal-xl modal-dialog-centered",
      initialState,
      backdrop: "static",
      keyboard: false,
    });
    this.modalRef.content.cancleButtonText = "Cancel";
    this.modalRef.content.deleteButtonText = "Reject";
    this.modalRef.content.url = "approval";
    this.modalRef.content.isRejectReq = true;
    this.modalRef.content.is_status_change = false;
    this.modalRef.content.response.subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  public pagesetUp() {
    this.paginator.pageIndex = 0;
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
  }

  public changeStatus(e) {
    const statusValue = e.target.value;
    if (statusValue == 0 || statusValue == 1 || statusValue == 2) {
      this.gridOption.filter.status = Number(statusValue);
    } else {
      this.gridOption.filter.status = { $in: [0, 1, 2] };
    }
    this.pagesetUp();
    this.getData();
  }

  public async updateReqStatus(data, statusValue) {
    const obj = { _id: data._id, status: statusValue };

    if (statusValue === 2) {
      this.delete(obj);
    } else {
      const response: any = await this.httpReqService.put("approval", obj);
      if (response) {
        this.router.navigate(["/user/update", data.userId]);
      }
    }
  }

  public async getPermissionList() {
    this.loading = true;

    let user = this.tokenData;

    if (user != null) {
      if (user.organizationId == null) {
        this.tabList = [
          { name: "Name Changes", tab: 2 },
          { name: "Email Changes", tab: 3 },
        ];
        this.activeTabNo = "0";
        this.isSuperAdmin = true;
        this.tab=2;
      }
    }
    this.loading = false;
    this.getData();
  }
}
