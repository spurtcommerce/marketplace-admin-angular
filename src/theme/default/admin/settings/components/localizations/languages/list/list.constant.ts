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
  
// Dynamically generate customTable
export const getCustomTable = () => {
  const updatedPermission =  apiResp();

  return [
  
    {
      displayName: 'Settings.Local.Language.LanguageName',
      id: 'name',
      type: 'default',
      checked: true,
      filterColName: 'Settings.Local.Language.LanguageName'
    },
    {
      displayName: 'Settings.Local.Language.Code',
      id: 'code',
      type: 'default',
      checked: true,
      filterColName: 'Settings.Local.Language.Code'
    },
    {
      displayName: 'Settings.Local.Language.SortOrder',
      id: 'sortOrder',
      type: 'default',
      checked: true,
      filterColName: 'Settings.Local.Language.SortOrder',
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
      displayName: 'Settings.Local.Emailtemplate.Status',
      id: 'productStatus',
      type: 'template',
      checked: true,
      filterColName: 'Settings.Local.Emailtemplate.Status',
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
      displayName: 'Settings.Local.Language.Action',
      type: 'threeDotMenu',
      checked: true,
      isDisable: !updatedPermission['edit-language'] && !updatedPermission['delete-language'],
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
          name: 'Edit', img: 'assets/img/edit.svg',  displayName: 'marketplace.common.Edit',isDisable: !updatedPermission['edit-language']
        },
        {
          name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',isDisable: !updatedPermission['delete-language']
        }
      ]
    },
    
  
  ]
}
  
// reusable Form 
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
  
  
  
  
  export const badgeStatusMappings = {
    1: { text: 'common.Active', class: 'active' },
    0: { text: 'common.In-Active', class: 'inactive' }
  };
  