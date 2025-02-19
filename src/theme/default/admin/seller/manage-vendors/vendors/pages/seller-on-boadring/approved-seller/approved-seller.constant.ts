export const customTable = [
  {
    displayName: 'marketplace.seller.VendorName',
    id: 'sellerName',
    type: 'default',
    checked: true,
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
    displayName: 'marketplace.seller.VerifiedEmail',
    id: 'emailId',
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
    displayName: 'marketplace.seller.approvedOn',
    id: 'approvalDate',
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
    displayName: 'Sales.Orders.Status',
    id: 'isActive',
    type: 'toggle',
    checked: true,
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    }
  }, 
 
  {
    displayName: 'marketplace.common.Action',
    id: 'menu',
    type: 'imageMenu',
    checked: true,
    customStyle: {
      trow: {
        class: 'text-center'
      },
      tbody: {
        class: 'text-center'
      }
    },
    menuData: [
      {
        name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.seller.Edit'
      },
    ]
  },
]


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
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the seller name'
  },

  Email: {
    label: 'Customers.Customer.E-mailId',
    name: 'Email',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Customers.Customer.EntertheEmailId',
  },

  Company: {
    label: 'marketplace.seller.Companyname',
    name: 'Company',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the company',
  },

  Industry: {
    label: 'marketplace.seller.Industry',
    name: 'Industry',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the industry'
  },

  Date: {
    label: 'marketplace.seller.approvedOn',
    name: 'Approved On',
    aliasName: '',
    validatiors: [],
    type: 'date',
    placeholder: 'Customers.Customer.DD/MM/YEAR',
  },
  Phone: {
    label: 'Sales.Orders.Phone',
    name: 'Phone',
    validatiors: [],
    type: 'text',
    placeholder: 'Enter the phone'
  },

  Status: {
    label: 'Customers.Customer.Status',
    name: 'Status',
    aliasName: '',
    validatiors: [],
    type: 'ngSelect',
    placeholder: 'marketplace.common.Selectthestatus',
    customData: {
      data: [
        { name: 'Active', id: '1' },
        { name: 'In-Active', id: '0' },
      ],
      key: 'name',
      value: 'id',
    },
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