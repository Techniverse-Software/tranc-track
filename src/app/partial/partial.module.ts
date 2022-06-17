import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPipe } from './pipe/location.pipe';
import { AddGroupModalComponent } from './modals/add-group-modal/add-group-modal.component';
import { AllocateDeviceModalComponent } from './modals/allocate-device-modal/allocate-device-modal.component';
import { ButtonModule, FormModule, GridModule , SpinkitModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { ViewGroupDetailsComponent } from './modals/view-group-details/view-group-details.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    LocationPipe,
    AddGroupModalComponent,
    AllocateDeviceModalComponent,
    ViewGroupDetailsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    NgSelectModule,
    SpinkitModule,
    ModalModule.forRoot(),
  ],
  providers: [
        BsModalRef,
],
  exports: [
    LocationPipe,
    AllocateDeviceModalComponent,
    AddGroupModalComponent
  ]
})
export class PartialModule { }
