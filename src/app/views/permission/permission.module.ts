import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// CoreUI Modules
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ImgModule,
  SwitchModule,
  ModalModule,
  BadgeModule,
  TextMaskModule,
  SpinkitModule,
} from "@coreui/angular";

import { IconModule } from "@coreui/icons-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
// Material
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

import { NgxTippyModule } from "ngx-tippy-wrapper";
import { GoogleMapsModule } from "@angular/google-maps";

// Ng2-select
import { NgSelectModule } from "@ng-select/ng-select";
import { PermissionListComponent } from "./permission-list/permission-list.component";
import { PermissionAddEditComponent } from "./permissionadd-edit/permission-add-edit.component";
import { PartialModule } from "../../partial/partial.module";
const route = [
  {
    path: "",
    data: {
      title: "Permissions",
    },
    children: [
      {
        path: "",
        redirectTo: "permission",
      },
      {
        path: "",
        data: {
          title: "",
        },
        component: PermissionListComponent,
      },
      {
        path: "add",
        data: {
          title: "Add",
        },
        component: PermissionAddEditComponent,
      },
      {
        path: "update/:id",
        data: {
          title: "Update",
        },
        component: PermissionAddEditComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [PermissionListComponent, PermissionAddEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    CardModule,
    IconModule,
    GridModule,
    FormModule,
    ButtonModule,
    FormsModule,
    ImgModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SwitchModule,
    ModalModule,
    NgxTippyModule,
    GoogleMapsModule,
    NgSelectModule,
    BadgeModule,
    TextMaskModule,
    PartialModule,
    SpinkitModule,
  ],
})
export class PermissionModule {}
