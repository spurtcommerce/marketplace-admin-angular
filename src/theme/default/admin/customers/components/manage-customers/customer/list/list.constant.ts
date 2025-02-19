import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";
import { apiResp } from "src/theme/default/admin/shared/components/services/permission.constant";



export const getCustomTable= () => {
  const updatedPermission =  apiResp();

  return [
 {
   displayName: '',
   id: 'id',
   type: 'checkBox',
   checked: true,
   isEnableSelectall: true,
   customStyle: {
     trow: {
       class: 'check-table'
     },
     tbody: {
       class: 'check-table'
     }
   }
 },
 {
   displayName: 'Customers.Customer.CustomerName',
   id: 'detail',
   type: 'template',
   checked: true,
   customStyle: {
     tbody: {
       class: 'fw-semibold text-capitalize'
     }
   }
 },

 {
   displayName: 'Customers.Customer.E-mailId',
   id: 'email',
   type: 'default',
   checked: true,
 },
 {
   displayName: 'Customers.Customer.Group',
   id: 'customerGroupName',
   type: 'default',
   checked: true,
 },
 {
   displayName: 'Customers.Customer.DateAdded',
   id: 'createdDate',
   type: 'date',
   checked: true,
 },
 {
  displayName: 'Customers.Customer.Address',
  type: 'template',
  id: 'address',
  isDisable: !updatedPermission['buyer-address-list'],
  key: 'checkBox',
  checked: true,
  customStyle: {
    trow: {
      class: 'text-center'
    },
    tbody: {
      class: 'text-center'
    }
  },
},
 {
   displayName: 'marketplace.common.Status',
   id: 'status',
   type: 'template',
   checked: true,
   customStyle: {
     trow: {
       class: 'text-center'
     },
     tbody: {
       class: 'text-center'
     }
   },
 },
 {
   displayName: 'marketplace.common.Action',
   id: 'menu',
   type: 'threeDotMenu',
   isDisable: !updatedPermission['update-buyer'] && !updatedPermission['delete-buyer'],
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
       name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.seller.Edit',isDisable: !updatedPermission['update-buyer']
     },
     {
       name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.seller.Delete',isDisable: !updatedPermission['delete-buyer']
     },

   ]
 }
]
}


export const filterFields = {

  BuyerName: {
    label: 'Customers.Customer.CustomerName',
    name: 'Buyer Name',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Customers.Customer.EnterTheBuyername',
  },

  Email: {
    label: 'Customers.Customer.E-mailId',
    name: 'Email ID',
    aliasName: '',
    validatiors: [],
    type: 'text',
    placeholder: 'Customers.Customer.EntertheEmailId',
  },

  Status: {
    label: 'Customers.Customer.Status',
    name: 'status',
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

  Date: {
    label: 'Customers.Customer.DateAdded',
    name: 'Date',
    aliasName: '',
    validatiors: [],
    type: 'date',
    placeholder: 'Customers.Customer.DD/MM/YEAR',
  },


  BuyerGroup: {
    label: 'Customers.Customer.CustomerGroup',
    name: 'Buyer Group',
    aliasName: '',
    validatiors: [],
    type: 'ngSelect',
    placeholder: 'marketplace.common.Selectthestatus',
    customData: {
      data: [{}],
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

export const badgeStatusMappings = {
  1: { text: 'common.Active', class: 'active' },
  0: { text: 'common.In-Active', class: 'inactive' }
};
const updatedPermission = apiResp();
const availableActions = ['itemSelected', 'exportExcel', 'exportExcelAll', 'delete', 'resetCheckbox'];
const filteredActions = availableActions.filter(action => {
  switch (action) {
    case 'exportExcel':
      return ['exportExcel'];
    case 'exportExcelAll':
      return ['exportExcelAll'];
    case 'delete':
      return updatedPermission['delete-buyer'];
    case 'resetCheckbox':
      return ['resetCheckbox'];
    default:
      return true; 
  }
});

export const bulkAction = getBulkConfig(filteredActions);


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