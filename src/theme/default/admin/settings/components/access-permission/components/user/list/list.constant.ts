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
    validatiors: [],
    type: 'text',
    placeholder: 'marketplace.common.Search',
  },
};

// Dynamically generate customTable
export const getCustomTable = () => {
  const updatedPermission =  apiResp();

  return [

  {
    displayName: 'Settings.User.fullName',
    id: 'firstandlastname',
    type: 'template',
    checked: true,
    filterColName: 'Settings.User.fullName'
  },
  {
    displayName: 'Settings.User.EmailId',
    id: 'username',
    type: 'default',
    checked: true,
    filterColName: 'Settings.User.EmailId'
  },
  {
    displayName: 'Settings.User.Role',
    id: 'role',
    type: 'template',
    checked: true,
    filterColName: 'Settings.User.Role'
  },
    {
      displayName: 'Settings.Local.Country.Action',
      type: 'threeDotMenu',
      checked: true,
      isDisable:!updatedPermission['edit-user'] && !updatedPermission['delete-user'] && !updatedPermission['edit-user-permission'],
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
          name: 'Edit', img: 'assets/img/edit.svg',  displayName: 'marketplace.common.Edit',isDisable:!updatedPermission['edit-user']
        },
        {
          name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',isDisable:!updatedPermission['delete-user']
        },
        {
          name:'permission',img:'assets/img/elliptical-h.svg',displayName:'Settings.nav.Permission',isDisable:!updatedPermission['edit-user-permission']
        }
      ]
    },


]
}





export const badgeStatusMappings = {
  1: { text: 'common.Active', class: 'active' },
  0: { text: 'common.In-Active', class: 'inactive' }
};
