import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GridOption } from '../../../partial/model/gridOption';
import { HttpReqService } from '../../../services/http-req.service';
import { ValidationFormsService } from '../../../services/validation-forms.service';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-system-parameter',
  templateUrl: './system-parameter.component.html',
  styleUrls: ['./system-parameter.component.scss']
})
export class SystemParameterComponent implements OnInit {
  systemParameterForm: FormGroup;
  submitted = false;
  formErrors: any;
  gridOption: GridOption = {
    allrecords: true
  };
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private httpReqService: HttpReqService,
    public vf: ValidationFormsService,
    public gs: GlobalService
  ) {
    this.httpReqService.clearMassage();
    this.createForm();
  }

  ngOnInit(): void {
    this.formErrors = this.vf.errorMessages;
    this.getSettingDetail();
  }


  /**
   * Create profile form
   */
  createForm() {
    this.systemParameterForm = this.fb.group(
      {
        status: [1]
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.systemParameterForm.controls;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.systemParameterForm.status === 'VALID';
  }

  async save() {
    if (this.onValidate()) {
      const response: any = await this.httpReqService.post('setting/create', this.systemParameterForm.value, true);

    }
  }

  async getSettingDetail() {
    const response: any = await this.httpReqService.post('setting/list', this.gridOption, true);
    if (response && response.items.length) {
      this.systemParameterForm.patchValue(response.items[0]);
    }
  }
}
