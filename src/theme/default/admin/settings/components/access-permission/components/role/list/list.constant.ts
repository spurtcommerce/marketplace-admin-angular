import { apiResp, apiResponse } from "src/theme/default/admin/shared/components/services/permission.constant";




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

  export const filterFields = {
    Search: {
      label: 'marketplace.common.Search',
      name: 'search',
      aliasName: '',
      validators: [],
      type: 'text',
      placeholder: 'marketplace.common.Search',
    },
  
  };
  
// Dynamically generate customTable
export const getCustomTable = () => {
  const updatedPermission =  apiResp();

  return [
  
    {
      displayName: 'Settings.Role.Name',
      id: 'name',
      type: 'default',
      checked: true,
      filterColName: 'uniformListColumName.orderId'
    },
    {
      displayName: 'Settings.Role.Status',
      id: 'productStatus',
      type: 'template',
      checked: true,
      filterColName: 'uniformListColumName.status',
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
      displayName: 'Settings.Local.Country.Action',
      type: 'threeDotMenu',
      checked: true,
      isDisable:!updatedPermission['edit-role'] && !updatedPermission['delete-role'] && !updatedPermission['edit-role-permission'],
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
          name: 'Edit', img: 'assets/img/edit.svg',  displayName: 'marketplace.common.Edit',isDisable:!updatedPermission['edit-role']
        },
        {
          name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',isDisable:!updatedPermission['delete-role']
        },
        {
          name:'role',img:'assets/img/elliptical-h.svg', displayName:'Settings.nav.Permission',isDisable:!updatedPermission['edit-role-permission']
        }
      ]
    },
    
  
  ]
}
  
  
  
    
    
  export const badgeStatusMappings = {
    1: { text: 'common.Active', class: 'active' },
    0: { text: 'common.In-Active', class: 'inactive' }
  };
  