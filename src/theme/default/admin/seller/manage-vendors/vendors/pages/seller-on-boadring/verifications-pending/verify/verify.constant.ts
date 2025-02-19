import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CustomValidators } from 'src/theme/default/admin/shared/components/interface/custom-password-validation';
export const verifyField = [
  {
    label: 'Company Registered Country',
    name: 'companyRegisteredCountry',
    type: 'text',
    validatiors: [Validators.required],
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Business Trading Name',
    name: 'businessName',
    validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Business Type',
    name: 'businessTypes',
   validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Business Segment',
    name: 'businessSegment',
     validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Business Domain / Industry',
    name: 'industry',
    validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Seller Legal Name',
    name: 'sellerLegalName',
    // validatiors: [Validators.required],
    type: 'text',
    isDisabled:true
  },
  {
    label: 'Business Display Name In SpurtB2B',
    name: 'businessDisplayName',
     validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Display name in SpurtB2B',
    name: 'businessDisplayName',
     validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Address1',
    name: 'address1',
    validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },

  {
    label: 'Address2',
    name: 'address2',
    validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Area',
    name: 'area',
    // validatiors: [Validators.required],
    type: 'text',
    isDisabled:true

  },
  {
    label: 'City',
    name: 'city',
    // validatiors: [Validators.required],
    type: 'text',
    isDisabled:true

  },
  {
    label: 'State',
    name: 'stateName',
     validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Pincode',
    name: 'pincode',
    validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,
  },
  {
    label: 'Country',
    name: 'countryName',
    validatiors: [Validators.required],
    type: 'text',
    isDisabled:true,
    mandatory:true,

  },
  {
    label: 'Phone Number',
    name: 'phoneNumber',
    // validatiors: [Validators.required],
    type: 'text',
    isDisabled:true
  },
  {
    label: 'Tax Number',
    name: 'gstNumber',
    // validatiors: [Validators.required],
    type: 'text',
    isDisabled:true

  },
  {
    label: ' Business Identification Number ',
    name: 'panNumber',
    // validatiors: [Validators.required],
    type: 'text',
    isDisabled:true

  },
];