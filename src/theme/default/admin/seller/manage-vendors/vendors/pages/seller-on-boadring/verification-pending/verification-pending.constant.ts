export const customTable = [
  {
    displayName: 'marketplace.seller.VendorName',
    id: 'sellerName',
    type: 'default',
    checked: true,
    customStyle: {
      tbody: {
        class: 'fw-semibold'
      }
    },
  },
  {
    displayName: 'marketplace.seller.Companyname',
    id: 'companyName',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'Sales.Orders.Email',
    id: 'emailId',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'marketplace.seller.Industry',
    id: 'industrys',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'myShop.BusinessType',
    id: 'businessType',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'myShop.BusinessSegment',
    id: 'businessSegment',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'marketplace.seller.Country',
    id: 'countryName',
    type: 'default',
    checked: true,
  },
  {
    displayName: 'Customers.Customer.phoneNumber',
    id: 'companyMobileNumber',
    type: 'default',
    checked: true,
  },

  {
    displayName: 'marketplace.seller.ReceivedOn',
    id: 'createdDate',
    type: 'date',
    format: 'dd/MM/yyyy',
    checked: true,
    customStyle: {
      tbody: {
        class: 'text-nowrap'
      }
    },
  },

  {
    displayName: 'marketplace.seller.Verify',
    type: 'buttonGroup',
    checked: true,
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    },
    buttons: [
      {
        displayName: 'fullfillment.view details',
        image: '',
        key: 'Edit',
        customStyle: {
          tbody: {
            width: '50%',
            height: '3%',
            class: 'link-text',
          }
        }
      },
    ]
  },
];

export const pageSizeOptions = [
  { id: 2 },
  { id: 5 },
  { id: 10 },
  { id: 15 },
  { id: 20 },
];

export const filterFields = {
  SellerName: {
    label: 'marketplace.seller.VendorName',
    name: 'Seller Name',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the seller name'
  },
  Company: {
    label: 'marketplace.seller.Companyname',
    name: 'Company Name',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the company'
  },
  Industry: {
    label: 'marketplace.seller.Industry',
    name: 'Industry',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the industry'
  },
 
  ReceivedOn: {
    label: 'marketplace.seller.ReceivedOn',
    name: 'Received On',
    validatiors: [],
    type: 'date',
    placeholder: 'Enter the received on'
  },
  Phone: {
    label: 'Sales.Orders.Phone',
    name: 'Phone',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the phone'
  },
  Search: {
    label: 'marketplace.common.Search',
    name: 'search',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.common.Search',
  },
};


export function removeEmptyKeys(obj: any): any {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      }
    }
  }
  return obj;
}
