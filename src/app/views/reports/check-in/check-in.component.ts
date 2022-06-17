import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Role } from "../../../services/role";
import { LocationModalComponent } from "../../../partial/modals/location-modal/location-modal.component";
import { GridOption } from "../../../partial/model/gridOption";
import { AuthService } from "../../../services/auth.service";
import { HttpReqService } from "../../../services/http-req.service";
import { ReportService } from "../../../services/report.service";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

declare const jsPDF: any;

@Component({
  selector: "app-check-in",
  templateUrl: "./check-in.component.html",
  styleUrls: ["./check-in.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class CheckInComponent implements OnInit {
  loading: boolean = false;
  colorTheme = "theme-dark-blue";
  bsConfig: Partial<BsDatepickerConfig>;
  filterForm: FormGroup;
  data: any = [];
  gridOption: GridOption = {
    allrecords: false,
    filter: {
      dateRange: {
        fromDate: "",
        toDate: "",
      },
      status: { $in: [0, 1] },
    },
    sortField: "createdAt",
    sortOrder: "desc",
    limit: 10,
    skip: 0,
  };
  userGridOption: GridOption = {
    allrecords: true,
    sortField: "name",
    sortOrder: "asc",
    filter: {
      status: { $in: [1, 4] },
    },
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userListArr: any = [];
  selectedLocation: any = {
    lat: 0,
    lng: 0,
  };
  modalRef: BsModalRef;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  resultsLength: any;
  isDisplay = false;
  organiZationData: any;
  head = ["Coordinates", "Date Time", "User", "Status"];
  pdfData: any = [];
  organizationArr: any = [];
  tokenData;
  constructor(
    private fb: FormBuilder,
    private httpReqService: HttpReqService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private reportService: ReportService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loading = true;
    this.dataSource.sort = this.sort;
    this.tokenData = this.authService.decodeToken();
    // this.tokenData = this.tokenData.user;
    this.bsConfig = Object.assign(
      {},
      {
        containerClass: this.colorTheme,
        customTodayClass: "custom-today-class",
        dateInputFormat: "DD-MM-YYYY",
      }
    );
    this.getUserList();
    if (this.tokenData && this.tokenData.user.organizationId) {
      this.displayedColumns = [
        "location",
        "createdAt",
        "userDetail.name",
        "status",
      ];
    } else {
      this.displayedColumns = [
        "location",
        "organizationDetail.organizationName",
        "createdAt",
        "userDetail.name",
        "status",
      ];
    }
    this.generateReport();
    this.getOrganizationList();
    // this.getOrganizationDetail();
    // this.loading = false;
  }

  createForm() {
    this.filterForm = this.fb.group({
      userId: [""],
      status: ["all"],
      fromDate: [],
      toDate: [],
    });
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

  filterData(event, type) {
    this.loading = true;
    let val = event.target.value;

    if (event.target.value) {
      if (type === "status") {
        val = Number(val);
      }
      this.gridOption.filter[type] = val;
      // this.getData();
    } else {
      // this.getData();
      delete this.gridOption.filter[type];
    }
    this.loading = false;
  }

  async getOrganizationDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get(
      "organizationByUniqueId",
      this.tokenData.organizationId
    );
    if (response.items.length) {
      this.organiZationData = response.items[0];
    }
    this.loading = false;
  }

  async generateReport() {
    this.loading = true;
    this.isDisplay = true;
    const formData = this.filterForm.value;
    if (formData.fromDate) {
      formData.fromDate = new Date(formData.fromDate);
      const date = formData.fromDate.toISOString().split("T")[0];
      this.gridOption.filter["dateRange"]["fromDate"] = date;
    }
    if (formData.toDate) {
      formData.toDate = new Date(formData.toDate);
      const date = formData.toDate.toISOString().split("T")[0];
      this.gridOption.filter["dateRange"]["toDate"] = date;
    }
    if (formData.userId) {
      this.gridOption.filter.userId = formData.userId;
    } else {
      delete this.gridOption.filter.userId;
    }
    if (formData.status == 0 || formData.status == 1) {
      this.gridOption.filter.status = Number(formData.status);
    } else {
      this.gridOption.filter.status = { $in: [0, 1] };
    }
    // this.gridOption.searchfields = ['scanType'];
    // this.gridOption.search = 'scan';
    // this.gridOption['isLookup'] = true;
    // if (this.tokenData.role !== Role.superAdmin) {
    //   this.gridOption.filter['organizationUniqueId'] = this.tokenData.organizationId;
    // }
    if (this.sort) {
      this.gridOption.sortField = this.sort.active;
      this.gridOption.sortOrder = this.sort.direction;
    }
    // this.gridOption.filter['user_id'] = this.tokenData._id;

    // this.gridOption.sortField = this.sort.active;
    // this.gridOption.sortOrder = this.sort.direction;
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
    this.loading = false;
  }

  async getUserList() {
    this.loading = true;
    if (this.tokenData.role !== Role.superAdmin) {
      this.userGridOption.filter["organizationUniqueId"] =
        this.tokenData.user.organizationId;
    }
    this.userGridOption.filter["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "users/list",
      this.userGridOption,
      false
    );
    this.userListArr = response.items;
    this.loading = false;
  }

  sortChange(): void {
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.generateReport();
  }

  pageChange(): void {
    this.gridOption.limit = this.paginator.pageSize;
    this.gridOption.skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.generateReport();
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

  createPdf() {
    const data = {
      header: this.head,
      coloumn: this.displayedColumns,
      data: this.data,
      fileName: "check_in_report_",
      organiZationData: this.organiZationData,
      tokenData: this.tokenData,
      title: "Check-In Report",
    };
    if (this.filterForm.value.fromDate) {
      data["fromDate"] = this.datePipe.transform(
        this.filterForm.value.fromDate,
        "medium"
      );
    }
    if (this.filterForm.value.toDate) {
      data["toDate"] = this.datePipe.transform(
        this.filterForm.value.toDate,
        "medium"
      );
    }
    this.reportService.createReport(data);
  }
}
