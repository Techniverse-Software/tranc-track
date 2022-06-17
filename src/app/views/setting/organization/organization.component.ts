import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpReqService } from '../../../services/http-req.service';
import { ValidationFormsService } from '../../../services/validation-forms.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizationForm: FormGroup;
  organiZationData: any;
  tokenData: any;
  submitted = false;
  formErrors: any;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private httpReqService: HttpReqService,
    public vf: ValidationFormsService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.tokenData = this.authService.decodeToken();
    this.tokenData = this.tokenData.user;
    // this.getOrganizationDetail();
    this.formErrors = this.vf.errorMessages;
  }

  /**
   * Create profile form
   */
  createForm() {
    this.organizationForm = this.fb.group(
      {
        organizationName: [
          '',
          [
            Validators.required,
          ],
        ],
        billingAddress: this.fb.group({
          addressLine1: ['', [Validators.required]],
        }),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.organizationForm.controls;
  }

  async getOrganizationDetail() {
    const response: any = await this.httpReqService.get('organizationByUniqueId', this.tokenData.organizationId);
    if (response.items.length) {
      this.organiZationData = response.items[0];
      this.organizationForm.patchValue(this.organiZationData);
    }
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.organizationForm.status === 'VALID';
  }

  async update() {
    if (this.onValidate()) {
      this.organiZationData.billingAddress.addressLine1 = this.organizationForm.value.billingAddress.addressLine1;
      this.organiZationData.organizationName = this.organizationForm.value.organizationName;
      const response: any = await this.httpReqService.put('organization', this.organiZationData);
      
      this.authService.getOrganizationName(response.items.organizationName);
    }
  }

}
