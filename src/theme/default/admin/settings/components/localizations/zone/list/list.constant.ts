import { apiResp, apiResponse } from "src/theme/default/admin/shared/components/services/permission.constant";



// Dynamically generate customTable
export const getCustomTable = () => {
  const updatedPermission =  apiResp();

  return [

  {
    displayName: 'Settings.Local.Zone.Country',
    id: 'countryName',
    type: 'template',
    checked: true,
    filterColName: 'Settings.Local.Zone.Country'
  },
  {
    displayName: 'Settings.Local.Zone.ZoneName',
    id: 'name',
    type: 'default',
    checked: true,
    filterColName: 'Settings.Local.Zone.ZoneName'
  },
  {
    displayName: 'Settings.Local.Zone.ZoneCode',
    id: 'code',
    type: 'default',
    checked: true,
    filterColName: 'Settings.Local.Zone.ZoneCode'
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
    displayName: 'Settings.Local.Zone.Action',
    type: 'threeDotMenu',
    checked: true,
    isDisable: !updatedPermission['edit-zone'] && !updatedPermission['delete-zone'],
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
        name: 'Edit', img: 'assets/img/edit.svg',  displayName: 'marketplace.common.Edit',isDisable: !updatedPermission['edit-zone']
      },
      {
        name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',isDisable: !updatedPermission['delete-zone']
      }
    ]
  },
]
}

export const filterFields = {
  search: {
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

export const badgeStatusMappings = {
  1: { text: 'common.Active', class: 'active' },
  0: { text: 'common.In-Active', class: 'inactive' }
};
