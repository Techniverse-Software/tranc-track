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
import { GridOption } from "../../../partial/model/gridOption";
import { AuthService } from "../../../services/auth.service";
import { HttpReqService } from "../../../services/http-req.service";
import { Role } from "../../../services/role";
import { DeleteModalComponent } from "../../../partial/modals/delete-modal/delete-modal.component";

@Component({
  selector: "app-permission-list",
  templateUrl: "./permission-list.component.html",
  styleUrls: ["./permission-list.component.scss"],
})
export class PermissionListComponent implements OnInit, AfterContentInit {
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
  displayedColumns: string[] = ["name", "type", "description", "action"];
  field = ["name", "type", "description", "action"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength: any;
  data: any;
  role = Role;
  statusIndex: any;
  modalRef: BsModalRef;
  tokenData: any;

  gridOption1: GridOption = {
    allrecords: true,
    sortField: "name",
    sortOrder: "asc",
    filter: { status: { $in: [1, 4] } },
  };
  isRegeistred = false;
  permission_list: any[] = [];
  selectedExportType: number;
  header = ["ID#1", "UID", "Coordinates", "Assigned To", "Status"];
  keysArr = [
    "id1",
    "uid",
    "location",
    "organizationDetail.organizationName",
    "status",
  ];
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
  }

  ngAfterContentInit() {
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.getData();
    }, 1000);
  }

  async getData(isRegisterd?) {
    this.loading = true;
    this.gridOption.sortField = this.sort.active;
    this.gridOption.sortOrder = this.sort.direction;
    this.gridOption.filter["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "permission/list",
      this.gridOption,
      false
    );
    this.data = response.items;
    this.dataSource = new MatTableDataSource(this.data);
    this.resultsLength = response.totalCount;
    this.loading = false;
    // if (isRegisterd) {
    //   this.isRegeistred = !this.isRegeistred;
    // }
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

  delete(data) {
    const initialState = {
      title: "Delete This Permission",
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
    this.modalRef.content.url = "permission/delete";
    this.modalRef.content.is_status_change = false;
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
      fileName: "Permission",
      exportType: this.selectedExportType,
    };
    this.excelService.exportData(details);
  }

  selectFile(e) {}
}
