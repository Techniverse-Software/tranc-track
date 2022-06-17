import { DeleteModalComponent } from "../../../partial/modals/delete-modal/delete-modal.component";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Role } from "../../../services/role";
import { HttpReqService } from "../../../services/http-req.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationFormsService } from "../../../services/validation-forms.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { GridOption } from "../../../partial/model/gridOption";
import { AddGroupModalComponent } from "../../../partial/modals/add-group-modal/add-group-modal.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { GlobalService } from "../../../services/global.service";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-user-add-edit",
  templateUrl: "./user-add-edit.component.html",
  styleUrls: ["./user-add-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserAddEditComponent implements OnInit {
  roles = Role;
  passwordIcon = "fa fa-eye-slash";
  passwordType = "password";
  userForm: FormGroup;
  formErrors: any;
  submitted = false;
  tokenData: any;
  userId: any;
  tippyPropsDefault = {
    interactive: true,
    allowHTML: true,
    appendTo: "parent",
    theme: "c-tooltip",
    trigger: "mouseenter focus touchstart",
  };
  managerArr: any = [];
  permissionrArr: any = [];
  groupList;
  selectedGroups = [];
  removedGroups = [];

  userDetails = {
    is_org: false,
    permissionId: "",
    users: [],
    email: "",
    manager_ids: [],
    is_all_device_selected: true,
    selected_device_ids: []
  };
  is_all_device_selected: boolean = true;

  userList;
  selectedUserList = [];
  isEditPermission = true;
  modalRef: BsModalRef;
  is_org: boolean = false;
  isSupervisor: boolean = true;
  loading: boolean = false;
  public loggedInUser: string = "";
  search_data: string = '';

  device_list: any[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["is_selected", "id1", "location"];

  constructor(
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private modalService: BsModalService,
    public gs: GlobalService,
    private toastr: ToastrService
  ) {
    this.httpReqService.clearMassage();
  }

  ngOnInit(): void {
    this.formErrors = this.vf.errorMessages;

    this.createForm();
    this.tokenData = this.authService.decodeToken();
    this.loggedInUser = this.tokenData.user.email;
    this.userId = this.route.snapshot.params.id;
    if (this.userId) {
      this.getUserDetail();
    } else {
      if (!this.authService.check_super_admin()) {
        this.getDeviceList()
      }
    }
    // this.getAllGroups();
    this.getPermissionList();
    if (!this.authService.check_super_admin()) {
    }

    if (!this.userId) {
      this.authService.check_add_url();
      if (!this.authService.check_super_admin()) {
        this.getOrganizationManagerList();
      }
    }

  }

  async getDeviceList() {
    var gridOption = {
      allrecords: true,
      filter: { user_id: this.tokenData.user._id },
      sortField: "",
      sortOrder: "",
      search: ""
    }
    const response: any = await this.httpReqService.post(
      "device/list",
      gridOption,
      false
    );
    this.device_list = response.items;
    if (this.userDetails.is_all_device_selected) {
      this.device_list.forEach((device) => {
        device.is_selected = true;
      })
    } else {
      this.device_list.forEach((device) => {
        if (this.userDetails.selected_device_ids) {
          var index = this.userDetails.selected_device_ids.findIndex((x) => x.toString() == device._id.toString());
          if (index !== -1) {
            device.is_selected = true;
          } else {
            device.is_selected = false;
          }
        } else {
          device.is_selected = false;
        }
      })
    }
    this.dataSource = new MatTableDataSource(this.device_list);
  }

  edit_popup(defaultModal) {
    this.search_data = '';
    if (this.userDetails.is_all_device_selected) {
      this.device_list.forEach((device) => {
        device.is_selected = true;
      })
    } else {
      this.device_list.forEach((device) => {
        if (this.userDetails.selected_device_ids) {
          var index = this.userDetails.selected_device_ids.findIndex((x) => x.toString() == device._id.toString());
          if (index !== -1) {
            device.is_selected = true;
          } else {
            device.is_selected = false;
          }
        } else {
          device.is_selected = false;
        }
      })
    }
    this.is_all_device_selected = this.userDetails.is_all_device_selected;
    defaultModal.show()
  }

  select_unselect_all() {
    console.log('select_unselect_all')
    this.is_all_device_selected = !this.is_all_device_selected;


    this.device_list.forEach((device) => {
      device.is_selected = this.is_all_device_selected;
    })
    this.dataSource = new MatTableDataSource(this.device_list);
  }

  select_device(device_id) {
    var index = this.device_list.findIndex((x) => x._id == device_id);
    console.log('select_deviceL ' + index)
    if (index !== -1) {
      this.device_list[index].is_selected = true;
      this.dataSource = new MatTableDataSource(this.device_list);
    }
    this.is_all_device_selected = false;
  }

  unselect_device(device_id) {
    var index = this.device_list.findIndex((x) => x._id == device_id);
    console.log('unselect_device: ' + index)
    if (index !== -1) {
      this.device_list[index].is_selected = false;
      this.dataSource = new MatTableDataSource(this.device_list);
    }
    this.is_all_device_selected = false;
  }

  check_selected_device(id) {
    var index = this.userDetails.selected_device_ids.findIndex((x) => x.toString() == id.toString());
    if (index == -1) {
      return true;
    } else {
      return false;
    }
  }

  search(event) {
    this.search_data = event.target.value
  }

  check_search_data(name) {
    if (!this.search_data) {
      return false;
    } else {
      var search_data: any = this.search_data;
      search_data = search_data.replace(/^\s+|\s+$/g, '');
      search_data = search_data.replace(/ +(?= )/g, '');
      search_data = new RegExp(search_data, "gi");

      if (name.match(search_data)) {
        return false;
      } else {
        return true;
      }
    }
  }

  updateData(defaultModal) {
    this.userDetails.is_all_device_selected = this.is_all_device_selected;
    if (this.userDetails.is_all_device_selected) {
      this.userDetails.selected_device_ids = [];
    } else {
      this.userDetails.selected_device_ids = [];
      this.device_list.forEach((device) => {
        if (device.is_selected) {
          this.userDetails.selected_device_ids.push(device._id);
        }
      })
    }
    defaultModal.hide()
  }

  togglePassword() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
    this.passwordIcon =
      this.passwordIcon === "fa fa-eye-slash" ? "fa fa-eye" : "fa fa-eye-slash";
  }

  /**
   * Create profile form
   */
  createForm() {
    this.userForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.pattern(this.vf.formRules.name)],
      ],
      email: [
        "",
        [Validators.required, Validators.pattern(this.vf.formRules.email)],
      ],
      password: [
        "",
        // ,[
        //   Validators.required,
        //   Validators.minLength(this.vf.formRules.passwordMin),
        //   Validators.pattern(this.vf.formRules.passwordPattern),
        // ],
      ],
      is_org: [true],
      nfcEnabled: [true],
      sharedLocation: [true],
      groups: [""],
      // role: ['', [
      //   Validators.required
      // ]],
      manager_ids: [""],
      is_manager: [false],
      is_all_device_selected: [true],
      selected_device_ids: [[]],
      permissionId: [null, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  simpleProps(data) {
    return { ...this.tippyPropsDefault, content: data };
  }

  async getAllGroups() {
    this.loading = true;
    const obj = {
      groupType: "user",
      user_id: this.tokenData.user._id,
    };
    const response: any = await this.httpReqService.post(
      "userDeviceGroup/list",
      obj,
      false
    );
    this.groupList = response.items;
    this.loading = false;
  }

  change(event) {
    //  this.loading = true;
    this.userDetails.is_org = !this.userDetails.is_org;
    console.log(this.userDetails.is_org);

    var title = !this.userDetails.is_org ? "disable" : "enable";
    const initialState = {
      title: "Do you want to " + title + " this user as Organization Admin?",
      message: "This user will become an admin. Are you sure? ",
      list: { is_org: !this.userDetails.is_org },
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

    this.modalRef.content.response.subscribe((result) => {
      if (result) {
        this.is_org = this.userDetails.is_org;
        if (this.is_org) {
          let obj = this.permissionrArr.find(
            (data) => data.name == "Organization Admin"
          );
          if (obj) {
            this.userDetails.permissionId = obj._id;
            this.userForm.controls.permissionId.setValue(obj._id);
            this.isSupervisor = !this.isSupervisor;
          }
        } else {
          this.userDetails.permissionId = '';
          this.userForm.controls.permissionId.setValue('');
          this.isSupervisor = !this.isSupervisor;
        }
      } else {
        this.userDetails.is_org = this.is_org;
      }
    });
    //  this.loading = false;
  }

  select_permission(event) {
    let obj = this.permissionrArr.find((data) => data._id == event);
    if (obj && obj.name == "Organization Admin") {
      this.userDetails.is_org = true;
    }
  }

  onReset() {
    this.loading = true;
    this.submitted = false;
    this.userForm.reset();
    this.userForm.controls.nfcEnabled.setValue(true);
    this.userForm.controls.sharedLocation.setValue(true);
    this.loading = false;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.userForm.status === "VALID";
  }

  removeUser(id) {
    this.loading = true;
    for (var i = this.userList.length - 1; i >= 0; --i) {
      if (this.userList[i]["_id"] == id) {
        this.selectedUserList.push(this.userList[i]);
        this.userList.splice(i, 1);
      }
    }
    this.loading = false;
  }

  addGroupList() {
    this.loading = true;
    const initialState = {
      title: "Create User Group",
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
      this.getAllGroups();
      if (result) {
      }
    });
    this.loading = false;
  }

  async getUserDetail() {
    this.loading = true;
    const response: any = await this.httpReqService.get("users", this.userId);
    if (response && response.items.length) {
      this.userDetails = response.items[0];
      this.userForm.patchValue(response.items[0]);
      this.userForm.patchValue({
        groups: response.items[0]["group_ids"],
      });

      if (this.userDetails.is_org) {
        this.isEditPermission = false;
        this.userForm.get("permissionId").setValidators([]);
        this.userForm.get("permissionId").updateValueAndValidity();
        this.isSupervisor = !this.isSupervisor;
      } else {
        this.isEditPermission = true;
        this.userForm.get("permissionId").setValidators([Validators.required]);
        this.userForm.get("permissionId").updateValueAndValidity();
      }

      this.userForm.controls.password.clearValidators();
      this.userForm.controls.password.updateValueAndValidity();
      //   console.log('getOrganizationManagerList')
      if (!this.authService.check_super_admin()) {
        this.getOrganizationManagerList();
        this.getDeviceList()
      }
      this.is_org = response.items[0].is_org;
    } else {
      this.router.navigate(["user"]);
    }
    this.loading = false;
  }

  async getAllusers() {
    this.loading = true;
    const gridOption = {
      allrecords: true,
      sortField: "name",
      sortOrder: "asc",
      filter: {
        status: { $in: [1, 4] },
        user_id: this.tokenData.user._id,
      },
    };
    const response: any = await this.httpReqService.post(
      "users/list",
      gridOption,
      false
    );
    this.userList = response.items;
    this.loading = false;
    if (this.userDetails) {
      for (const data of this.userDetails.users) {
        this.removeUser(data);
      }
    }
    if (this.userId) {
      this.authService.check_edit_url();
      // this.getPermissionList();
    }
  }

  isManagerClick(event) {
    this.userForm.patchValue({
      is_manager: event.target.checked,
    });
  }

  getSelectValues(select) {
    const result = [];
    const options = select && select.options;
    let opt;

    for (let i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];
      if (opt.selected) {
        result.push(opt);
      }
    }
    return result;
  }

  moveRight(leftValue, rightValue) {
    //alert("Elft value is t : "+leftValue);
    const leftSelect = document.forms["form1"].elements[leftValue];
    const rightSelect = document.forms["form1"].elements[rightValue];

    const leftSelectArr = this.getSelectValues(leftSelect);
    const rightSelectArr = this.getSelectValues(rightSelect);
    if (leftSelect.selectedIndex == -1) {
      window.alert("You must first select an item on the left side.");
    } else {
      for (const option of leftSelectArr) {
        rightSelect.appendChild(option);
      }
    }
  }

  getAllSelectedId() {
    const result = [];
    const select = document.forms["form1"].elements["rightProcess"];
    const options = select && select["options"];
    let opt;

    for (let i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];
      result.push(opt.value);
    }
    return result;
  }

  async save() {
    try {
      console.log("innnnnnnnnn")
      this.loading = true;
      if (this.onValidate()) {
        console.log("jkkkkkkkkkkkkkkkkkkkkkk")
        // if (this.tokenData.user.role === this.roles.admin || this.tokenData.user.role === this.roles.manager) {
        this.userForm.value.organizationId = this.tokenData.user.organizationId;
        // }
        const params = JSON.parse(JSON.stringify(this.userForm.value));
        params["added_group_id"] = this.userForm.value.groups;
        params["is_all_device_selected"] = this.userDetails.is_all_device_selected;
        // if(this.userDetails.is_all_device_selected){
        //   params["selected_device_ids"] = [];
        // } else {
        //   this.userDetails.selected_device_ids = [];
        //   this.device_list.forEach((device)=>{
        //     if(device.is_selected){
        //       this.userDetails.selected_device_ids.push(device._id);
        //     }
        //   })
        // }
        params["selected_device_ids"] = this.userDetails.selected_device_ids;
        if (this.userForm.value.is_manager) {
          params["users"] = this.getAllSelectedId();
        }
        delete params.groups;
        // params['password'] = 'Test@123';
        console.log("org----", this.userDetails.is_org);
        params["is_org"] = this.userDetails.is_org;
        if (this.is_org == this.userDetails.is_org) {
          console.log("hhhhhhhhhhh")
          let response: any = await this.httpReqService.post(
            "users/create",
            params,
            true
          );
          if (response && response.error) {
            this.loading = false;
            this.toastr.error(`${response.error.message}`);
            return
          }
          if (response && response.status == 1) {
            this.gs.resMassage.message = response.message;
            this.gs.resMassage.message = "success";
            this.httpReqService.hideMassege();
            setTimeout(() => {
              this.router.navigate(["user"]);
            }, 1000);
          } else {
            console.log("response", response);
            this.gs.resMassage.message = response.message;
            this.gs.resMassage.message = "error";
            window.scroll(0, 0);
          }
          console.log("jjuuuuuuuuuuuuu")
        } else {
          console.log("ijjjjjjjjjj")
          var title = params.is_org ? "enabled" : "disabled";
          const initialState = {
            title: "Do you want to " + title + " Device status?",
            message: "Are you sure you want to delete this user?",
            list: params,
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

          this.modalRef.content.response.subscribe((result) => {
            if (result) {
              this.is_org = params.is_org;
              this.save();
            } else {
            }
          });
        }
      }
      this.loading = false;
    } catch (error) {
      console.log('error---------', error);
    }
  }

  addGroup(event) {
    this.selectedGroups.push(event._id);
  }

  removeGroup(event) {
    this.removedGroups.push(event.value._id);
  }

  async update() {
    this.loading = true;
    if (this.onValidate()) {
      this.userForm.value._id = this.userId;
      delete this.userForm.value.password;
      const params = JSON.parse(JSON.stringify(this.userForm.value));
      params["added_group_id"] = this.selectedGroups;
      params["removed_group_id"] = this.removedGroups;
      params["is_all_device_selected"] = this.userDetails.is_all_device_selected;
      // if(this.userDetails.is_all_device_selected){
      //   params["selected_device_ids"] = [];
      // } else {
      //   this.userDetails.selected_device_ids = [];
      //   this.device_list.forEach((device)=>{
      //     if(device.is_selected){
      //       this.userDetails.selected_device_ids.push(device._id);
      //     }
      //   })
      // }
      params["selected_device_ids"] = this.userDetails.selected_device_ids;
      if (this.userForm.value.is_manager) {
        params["users"] = this.getAllSelectedId();
      } else {
        params["users"] = [];
      }
      delete params.groups;
      // params['password'] = 'Test@123';
      params["is_org"] = this.userDetails.is_org;
      if (this.is_org == this.userDetails.is_org) {
        const response: any = await this.httpReqService.put("users", params);
        if (response && response.status == 1) {
          this.gs.resMassage.message = response.message;
          this.gs.resMassage.message = "success";
          this.httpReqService.hideMassege();
          setTimeout(() => {
            this.router.navigate(["user"]);
          }, 1000);
        } else {
          this.loading = false;
          this.gs.resMassage.message = response.message;
          this.gs.resMassage.message = "error";
          window.scroll(0, 0);
        }
      } else {
        var title = params.is_org ? "enabled" : "disabled";
        const initialState = {
          title: "Do you want to " + title + " as Organization Admin?",
          message: "Are you sure you want to delete this user?",
          list: params,
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

        this.modalRef.content.response.subscribe((result) => {
          if (result) {
            this.is_org = params.is_org;
            this.update();
          } else {
          }
        });
      }
    }
    this.loading = false;
  }

  async getOrganizationManagerList() {
    //this.loading = true;
    const obj = {
      allrecords: true,
      sortField: "name",
      sortOrder: "asc",
      filter: {
        status: { $in: [1, 4, 5, 6] },
        user_id: this.tokenData.user._id,
        is_manager: true,
      },
      orgasnizationUniqueId: this.tokenData.user.organizationId,
    };
    const response: any = await this.httpReqService.post(
      "users/list",
      obj,
      false
    );
    if (response && response.items.length) {
      this.managerArr = response.items;
      if (this.userDetails) {
        console.log(this.userDetails);
        this.userForm.patchValue({
          manager_ids: this.userDetails.manager_ids,
        });
      }
    }
    this.loading = false;
    // this.getPermissionList();
    this.getAllusers();
  }

  async getPermissionList() {
    //  this.loading = true;
    var gridOption = {
      search: "",
      filter: {},
      allrecords: true,
      sortField: "",
      sortOrder: "",
      type: 3
    };
    gridOption.filter["user_id"] = this.tokenData.user._id;
    const response: any = await this.httpReqService.post(
      "permission/list",
      gridOption,
      false
    );
    if (response && response.items.length) {
      this.permissionrArr = response.items;
      if (this.tokenData.user.organizationId == null) {
        let index = this.permissionrArr.findIndex(
          (data) => data.name == "Super Admin"
        );
        this.permissionrArr.splice(index);
      }
    }
    //  this.loading = false;
  }
}
