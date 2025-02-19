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
        displayName: 'Sales.Orders.Phone',
        id: 'companyMobileNumber',
        type: 'default',
        checked: true,
      },
      {
        displayName: 'marketplace.seller.ReceivedOn',
        id: 'approvalDate',
        type: 'date',
        format:'dd/MM/yyyy',
        checked: true,
        customStyle: {
          tbody: {
            class: 'text-nowrap'
          }
        },
      },
      {
        displayName: 'marketplace.seller.RejectedOn',
        id: 'modifiedDate',
        type: 'date',
        format:'dd/MM/yyyy',
        checked: true,
        customStyle: {
          tbody: {
            class: 'text-nowrap'
          }
        },
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
    SellerName:{
      label: 'marketplace.seller.VendorName',
      name: 'Seller Name',
      validatiors: [],
      type: 'text',
      placeholder:'Enter the seller name'
    },
    Company: {
      label: 'marketplace.seller.Companyname',
      name: 'Company Name',
      validatiors: [],
      type: 'text',
      placeholder:'Enter the company'
    },
    Industry:{
      label: 'marketplace.seller.Industry',
      name: 'Industry',
      validatiors: [],
      type: 'text',
      placeholder:'Enter the industry'
    },
   
    RejectedOn: {
      label: 'marketplace.seller.RejectedOn',
      name: 'Rejected On',
      validatiors: [],
      type: 'date',
      placeholder:'Enter the received on'
    },
    Phone: {
      label: 'Sales.Orders.Phone',
      name: 'Phone',
      validatiors: [],
      type: 'text',
      placeholder:'Enter the phone'
    },
    Search: {
      label: 'marketplace.common.Search',
      name: 'search',
      aliasName: '',
      validatiors: [],
      type: 'text',
      placeholder: 'marketplace.common.Search',
    },
  }
   
  

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