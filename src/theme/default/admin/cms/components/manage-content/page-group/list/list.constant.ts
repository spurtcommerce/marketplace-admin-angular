import { apiResp } from "../../../../../../../../../src/theme/default/admin/shared/components/services/permission.constant"

// Dynamically generate customTable
export const getCustomTable = () => {
  const updatedPermission =  apiResp();

  return [
  
    {
      displayName: 'CMS.PageGroup.GroupName',
      id: 'groupName',
      type: 'template',
      checked: true,
      customStyle: {
        trow: {
          width:"30%"
          // class: 'text-right'
        },
        tbody: {
          class: 'fw-semibold'
        }
      }
    },
  
    {
      displayName: 'CMS.PageGroup.Status',
      id: 'isActive',
      type: 'template',
      checked: true,
      customStyle:{
        trow:{
          width:"40%",
          class: 'text-center'
        }
      }

    },  
    {
      displayName: 'CMS.Pages.Action',
      id: 'menu',
      type: 'threeDotMenu',
      isDisable: !updatedPermission['Edit-page-group'] && !updatedPermission['page-group-delete'] ,
      checked: true,
      customStyle: {
        trow: {
          width:"30%",
          class: 'text-center'
        },
        tbody: {
          class: 'text-center'
        }
      },
      menuData: [
        {
          name: 'Edit', img:'assets/img/edit.svg', displayName: 'marketplace.common.Edit',isDisable: !updatedPermission['Edit-page-group']
        },
        {
          name: 'Delete', img:'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',isDisable: !updatedPermission['page-group-delete']
        }
      ]
    }
  ]
}

  export const filterFields = {
    Search: {
        label: '',
        name: 'search',
        aliasName:'',
        validatiors: [],
        type: 'text',
        placeholder:'marketplace.common.Search',
      },
  }