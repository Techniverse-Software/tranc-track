import { Component, OnInit } from '@angular/core';
import { HttpReqService } from '../../../services/http-req.service';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationFormsService } from '../../../services/validation-forms.service';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

/** passwords must match - custom validator */
export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  return password && confirm && password.value === confirm.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  formErrors: any;
  submitted = false;
  passwordType = 'password';
  passwordIcon = 'fa fa-eye-slash';
  oldPasswordType = 'password';
  oldPasswordIcon = 'fa fa-eye-slash';
  cPasswordType = 'password';
  cPasswordIcon = 'fa fa-eye-slash';
  constructor(
    private httpReqService: HttpReqService,
    private fb: FormBuilder,
    public vf: ValidationFormsService,
    public gs: GlobalService,
    private authService: AuthService,
    private router: Router
  ) {
    this.httpReqService.clearMassage();
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.changePasswordForm.controls;
  }

  /**
  * Create  form
  */
  createForm() {
    this.changePasswordForm = this.fb.group(
      {

        oldPassword: ['', [
          Validators.required,
          //Validators.minLength(this.vf.formRules.passwordMin),
          //Validators.pattern(this.vf.formRules.passwordPattern),
        ]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(this.vf.formRules.passwordMin),
            Validators.pattern(this.vf.formRules.passwordPattern),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: confirmPasswordValidator }
    );
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.changePasswordForm.status === 'VALID';
  }

  async onSubmit() {
    if (this.onValidate()) {
      const response: any = await this.httpReqService.post('users/changePassword', this.changePasswordForm.value, true);
      if (response) {
        this.changePasswordForm.reset();
        this.submitted = false;
        this.logOut();
      }
    }
  }

  async logOut() {
    const response = await this.httpReqService.post('users/logOut', {}, false);
    if (response) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      this.authService.currentUserSubjet(null);
      this.router.navigate(['auth/login']);
    }
  }

  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
  }
  oldTogglePassword() {
    this.oldPasswordType = this.oldPasswordType === 'password' ? 'text' : 'password';
    this.oldPasswordIcon = this.oldPasswordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
  }
  cTogglePassword() {
    this.cPasswordType = this.cPasswordType === 'password' ? 'text' : 'password';
    this.cPasswordIcon = this.cPasswordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
  }

}
