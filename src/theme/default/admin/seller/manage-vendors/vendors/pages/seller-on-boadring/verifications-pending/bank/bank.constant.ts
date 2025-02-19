import { Validators } from "@angular/forms";

export const bankFields = [
  {
    label: "Bank Name",
    name: "bankName",
    type: "text",
    mandatory:true,
    validatiors: [Validators.required],
    isDisabled: true
  },
  {
    label: "Account Holder Name",
    name: "accountHolderName",
    validatiors: [Validators.required],
    type: "text",
    mandatory:true,
    isDisabled: true
  },
  {
    label: "Branch",
    name: "branch",
    validatiors: [Validators.required],
    type: "text",
    mandatory:true,
    isDisabled: true
  },

  {
    label: "Account number",
    name: "accountNumber",
    validatiors: [Validators.required],
    type: "text",
    mandatory:true,
    isDisabled: true
  },
  {
    label: "IFSC code",
    name: "ifscCode",
    validatiors: [Validators.required],
    type: "text",
    mandatory:true,
    isDisabled: true
  },
  {
    label: "BIC or SWIFT code",
    name: "bicCode",
    // validatiors: [Validators.required],
    type: "text",
    isDisabled: true
  },
  {
    label: "Account Since",
    name: "accountSince",
    // validatiors: [Validators.required],
    type: "text",
    isDisabled: true
  },
  {
    label: "Address Line 1",
    name: "addressLine1",
    // validatiors: [Validators.required],
    type: "text",
    // mandatory:true,
    isDisabled: true
  },

  {
    label: "Address Line 2",
    name: "addressLine2",
    // validatiors: [Validators.required],
    type: "text",
    isDisabled: true
  },
  {
    label: "Area",
    name: "area",
    // validatiors: [Validators.required],
    type: "text",
    // mandatory:true,
    isDisabled: true
  },
  {
    label: "City",
    name: "city",
    // validatiors: [Validators.required],
    type: "text",
    // mandatory:true,
    isDisabled: true
  },
  {
    label: "State",
    name: "state",
    // validatiors: [Validators.required],
    type: "text",
    // mandatory:true,
    isDisabled: true
  },
  {
    label: "Pincode",
    name: "pincode",
    // validatiors: [Validators.required],
    type: "text",
    // mandatory: true,
    isDisabled: true
  },
  {
    label: "Country",
    name: "country",
    // validatiors: [Validators.required],
    type: "text",
    // mandatory:true,
    isDisabled: true
  },
];
