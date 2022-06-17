import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOption } from '../../../partial/model/gridOption';
import { HttpReqService } from '../../../services/http-req.service';
import { ValidationFormsService } from '../../../services/validation-forms.service';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrls: ['./mail-template.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class MailTemplateComponent implements OnInit {
  templateForm: FormGroup;
  submitted = false;
  formErrors: any;
  templateArr = [
    'Account Suspended',
    'Reset Password',
    'Invoice Created',
    'Invoice Overdue Notice #1',
    'Invoice Overdue Notice #2',
    'New User Account',
    'New Organization User Account',
    // 'User Approval',
    'New User Account (Mobile)'
  ];
  gridOption: GridOption = {
    allrecords: true,
    sortField: 'type',
    sortOrder: 'asc',
  };
  emailTemplateList: any = [];
  selectedTemplateIndex: any;
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
    this.getEmailTemplpateList();
  }


  /**
   * Create profile form
   */
  createForm() {
    this.templateForm = this.fb.group(
      {
        type: ['',
          [
            Validators.required,
          ],
        ],
        subject: ['', [Validators.required]],
        content: ['', [Validators.required]],
        status: [1]
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.templateForm.controls;
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.templateForm.status === 'VALID';
  }

  async save() {
    if (this.onValidate()) {
      let response: any;
      if (this.selectedTemplateIndex === -1) {
        response = await this.httpReqService.post('emailTemplate/create', this.templateForm.value, true);
        if (response && response.status == 1) {
          this.gs.resMassage.message = response.message;
          this.gs.resMassage.message = 'success';
          this.httpReqService.hideMassege();
        //   setTimeout(() => {
        //     this.router.navigate(['organization']);
        // } , 1000 );
         
        } else {
          this.gs.resMassage.message = response.message;
          this.gs.resMassage.message = 'error';
          window.scroll(0, 0);
        }
      } else {
        this.templateForm.value['_id'] = this.emailTemplateList[this.selectedTemplateIndex]._id;
        response = await this.httpReqService.put('emailTemplate', this.templateForm.value);
        if (response && response.status == 1) {
          this.gs.resMassage.message = response.message;
          this.gs.resMassage.message = 'success';
          this.httpReqService.hideMassege();
        //   setTimeout(() => {
        //     this.router.navigate(['organization']);
        // } , 1000 );
         
        } else {
          this.gs.resMassage.message = response.message;
          this.gs.resMassage.message = 'error';
          window.scroll(0, 0);
        }
      }
      if (response) {
        this.submitted = false;
        this.templateForm.reset();
        this.templateForm.controls.status.setValue(1);
        this.templateForm.controls.type.setValue('');
        this.getEmailTemplpateList();
      }
    }
  }

  async getEmailTemplpateList() {
    const response: any = await this.httpReqService.post('emailTemplate/list', this.gridOption, false);
    if (response && response.items.length) {
      this.emailTemplateList = response.items;
    }
  }

  changeTemplate() {
    const templateType = this.templateForm.value.type;
    this.selectedTemplateIndex = this.emailTemplateList.findIndex(x => x.type === templateType);
    if (this.selectedTemplateIndex !== -1) {
      this.templateForm.patchValue(this.emailTemplateList[this.selectedTemplateIndex]);
    } else {
      this.templateForm.controls.content.setValue('');
      this.templateForm.controls.subject.setValue('');
      this.templateForm.controls.status.setValue(1);
    }
  }
}
