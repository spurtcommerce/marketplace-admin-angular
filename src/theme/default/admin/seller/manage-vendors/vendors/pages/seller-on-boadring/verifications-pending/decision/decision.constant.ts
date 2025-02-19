import { Validators } from "@angular/forms";

export const DecisionField = [
  {
    displayName: 'Verified',
    id: 'categoryId',
    type: 'checkBox',
    checked: true,
    isEnableSelectall: true,

  },
  {
    label: 'Business Trading Name',
    name: 'businessName',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Business Type',
    name: 'businessTypes',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Business Segment',
    name: 'businessSegment',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Business Domain / Industry',
    name: 'industry',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Seller Legal Name',
    name: 'sellerLegalName',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Business Display Name In SpurtB2B',
    name: 'businessDisplayName',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Display name in SpurtB2B',
    name: 'businessDisplayName',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Address1',
    name: 'address1',
    type: 'text',
    isDisabled: true

  },

  {
    label: 'Address2',
    name: 'address2',
    type: 'text',
    isDisabled: true

  },
  {
    label: 'Area',
    name: 'area',
    type: 'text',
    isDisabled: true

  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    isDisabled: true

  },
  {
    label: 'State',
    name: 'stateName',
    type: 'text',
    isDisabled: true

  },
  {
    label: 'Pincode',
    name: 'pincode',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Country',
    name: 'countryName',
    type: 'text',
    isDisabled: true

  },
  {
    label: 'Phone Number',
    name: 'phoneNumber',
    type: 'text',
    isDisabled: true
  },
  {
    label: 'Tax Number',
    name: 'gstNumber',
    validatiors: [Validators.required, Validators.pattern('[a-zA-Z \'-,;.]*'), Validators.maxLength(32)],
    type: 'text',
    isDisabled: true

  },
  {
    label: ' Business Identificaation Number ',
    name: 'panNumber',
    validatiors: [Validators.required, Validators.pattern('[a-zA-Z \'-,;.]*'), Validators.maxLength(32)],
    type: 'text',
    isDisabled: true

  },
];