import { DatePipe } from "@angular/common";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";
import { apiResp } from "src/theme/default/admin/shared/components/services/permission.constant";

export const getCustomTable = () => {
  const updatedPermission =  apiResp();

  return [

  {
    displayName: '',
    id: 'bannerId',
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
  //  {
  //     displayName: 'CMS.Banners.Image',
  //     id: 'image',
  //     type: 'image',
  //     checked: true,
  //     customStyle: {
  //         tbody: {
  //              class: 'product-image'
  //         }
  //       },
  // },
  {
    displayName: 'CMS.Pages.Title',
    id: 'bannerName',
    type: 'template',
    checked: true,
    customStyle: {
      tbody: {
        class: 'fw-semibold text-capitalize'
      }
    }
  },


  {
    displayName: 'CMS.Banners.type',
    id: 'type',
    type: 'default',
    checked: true,

  },
  {
    displayName: 'CMS.Banners.Position',
    id: 'position',
    type: 'default',
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
    displayName: 'CMS.Banners.Banners',
    id: 'bannerImageCount',
    type: 'default',
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
    displayName: 'CMS.Pages.Status',
    type: 'template',
    id: 'Active',
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
    displayName: 'catalog.ratingReview.CreatedDate',
    type: 'date',
    id: 'createdDate',
    key: 'checkBox',
    checked: true,
  },

  {
    displayName: 'CMS.Banners.lastUpdatedOn',
    id: 'modifiedDate',
    type: 'date',
    checked: true,

  },




  {
    displayName: 'CMS.Banners.Action',
    id: 'menu',
    type: 'threeDotMenu',
    checked: true,
    isDisable: !updatedPermission['edit-banners'] && !updatedPermission['delete-banners'],
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
        name: 'Edit', img: 'assets/img/edit.svg', displayName: 'marketplace.common.Edit',isDisable: !updatedPermission['edit-banners']
      },
      {
        name: 'Delete', img: 'assets/img/delete-new.svg', displayName: 'marketplace.common.Delete',isDisable: !updatedPermission['delete-banners']
      }
    ]
  }
]
}

export const filterFields = {
    Search: {
        label: 'marketplace.common.Search',
        name: 'search',
        aliasName:'',
        validatiors: [],
        type: 'text',
        placeholder:'marketplace.common.Search',
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

export function convertNgbFormatToPipeFormat(ngbDate: NgbDateStruct, pipeFormat: string): string {
    const jsDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    const datePipe = new DatePipe('en-US'); // Use your preferred locale here
    return datePipe.transform(jsDate, pipeFormat);
}

const updatedPermission = apiResp();
const availableActions = ['itemSelected','delete',  'exportExcel', 'resetCheckbox'];
const filteredActions = availableActions.filter(action => {
  switch (action) {
    case 'delete':
      return updatedPermission['delete-banners'];
      case 'exportExcel':
        return ['exportExcel'];
    case 'resetCheckbox':
      return ['resetCheckbox'];
    default:
      return true; 
  }
});

export const bulkActions = getBulkConfig(filteredActions);

// export const bulkActions = getBulkConfig(['itemSelected','delete', 'exportExcel', 'resetCheckbox']);