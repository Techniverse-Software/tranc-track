import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ValidationFormsService {
  errorMessages: any;

  formRules = {
    nonEmpty: "^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$",
    usernameMin: 5,
    passwordMin: 6,
    // passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
    name: "^[a-zA-Z ]*$",
    phone: "^[0-9]*$",
    amount: "^([0-9]+(.[0-9]+)?)",
    numeric: "^[0-9]*.?[0-9]+$",
    alpha_spaces: "^[a-zA-Z ]+$",
    alpha_numeric: "^[A-Z0-9]+$",
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    // email:
    //   '^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)' +
    //   '@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,})+$',
    emailLength:
      "^(?=[^@]{6,}@)([w.-]*[a-zA-Z0-9_]@(?=.{3,}.[^.]*$)[w.-]*[a-zA-Z0-9].[a-zA-Z][a-zA-Z.]*[a-zA-Z])$",
    mobile: "^[0-9]{8,16}$",
    url: "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
    postCode: "^[a-zA-Z0-9 ]*$",
    passwordPattern:
      "^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,20}$",
    link: "^(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
  };

  formErrors = {
    permissionId: "",
    firstName: "",
    lastName: "",
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accept: false,
    role: "",
    id1: "",
    uid: "",
    organization: "",
    location: "",
    registrationNumber: "",
    addressLine1: "",
    country: "",
    state: "",
    town: "",
    zip: "",
    phone: "",
    template: "",
    timedelay: "",
    subject: "",
    groupType: "",
    device: "",
    user: "",
    organizationType: "",
    resellerType: "",
    organizationName: "",
    locationName: "",
    locationTown: "",
    locationPostcode: "",
    Groupname: "",
    PermissionName: "",
    locationId: "",
  };

  constructor() {
    this.errorMessages = {
      permissionId: {
        required: "Permission is required",
      },
      PermissionName: {
        required: "Permission Name is required",
      },
      organizationType: {
        required: "Please select organization type",
      },
      resellerType: {
        required: "Please select reseller type",
      },
      organizationName: {
        required: "Please select organization name",
      },
      groups: {
        required: "Please select",
      },
      firstName: {
        required: "First name is required",
      },
      lastName: {
        required: "Last name is required",
      },
      name: {
        required: "Full Name is required",
        pattren: "Full Name contain letters only",
      },
      Groupname: {
        required: "Group Name is required",
      },
      username: {
        required: "Username is required",
        minLength: `'Username must be ${this.formRules.usernameMin} characters or more`,
        pattern: "Must contain letters and/or numbers, no trailing spaces",
      },
      email: {
        required: "Email is required",
        email: "Invalid email address",
      },
      password: {
        required: "Password is required",
        pattern:
          "Password must contain at least a number, an uppercase letter, a lowercase letter and a special character",
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`,
      },
      confirmPassword: {
        required: "Password confirmation is required",
        passwordMismatch: "Passwords must match",
      },
      accept: {
        requiredTrue: "You have to accept our Terms and Conditions",
      },
      role: {
        required: "Role is required",
      },
      id1: {
        required: "ID is required",
        invalid: "ID is invalid",
      },
      uid: {
        required: "UID is required",
      },
      organization: {
        required: "Please select organization",
      },
      location: {
        required: "Location Coordinate is required",
      },
      registrationNumber: {
        required: "Registration number is required",
      },
      addressLine1: {
        required: "Address line 1 is required",
      },
      country: {
        pattern: "Country contain letters only",
      },
      state: {
        pattern: "State contain letters only",
      },
      town: {
        pattern: "Town contain letters only",
      },
      postCode: {
        pattern: "Invalid postcode",
      },
      phone: {
        required: "Primary Phone No. is required",
      },
      template: {
        required: "Template type is required",
      },
      timedelay: {
        pattren: "Timedelay contain number only",
      },
      subject: {
        required: "Subject is required",
      },
      groupType: {
        required: "Group type is required",
      },
      device: {
        required: "Please select Devices",
      },
      user: {
        required: "Please select Users",
      },
      locationName: {
        required: "Location Name is required",
      },
      locationTown: {
        required: "Town is required",
      },
      locationPostcode: {
        required: "Postcode is required",
      },
      locationId: {
        required: "Location is required",
      },
    };
  }
}
