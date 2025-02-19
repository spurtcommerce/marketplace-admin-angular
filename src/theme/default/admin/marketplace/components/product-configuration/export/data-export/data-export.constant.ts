import { DatePipe } from "@angular/common";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { getBulkConfig } from "src/theme/default/admin/shared/components/bulk-action/bulk-action.constant";

export const modulesList = [
    { name: 'Orders', translate: 'dataExport.Orders' },
    { name: 'Failed Orders', translate: 'dataExport.FaliedOrders' },
    { name: 'Archive Payments', translate: 'dataExport.ArchivePayments' },
    { name: 'Product Categories', translate: 'dataExport.ProductCategories' },
    { name: 'Manage Customers', translate: 'dataExport.Customers' },
    { name: 'Manage Products', translate: 'dataExport.ManageProduct' },
  ];

export const customTable = [  
    {
      displayName: 'dataExport.Module',
      id: 'module',
      type: 'default',
      checked: true,
    },
    {
      displayName: 'dataExport.ExportedBy',
      id: 'name',
      type: 'template',
      checked: true,
    },
    {
      displayName: 'dataExport.ExportedDateAndTime',
      id: 'createdDate',
      type: 'date',
      checked: true,
      customStyle: {
        trow: {
          class: 'text-left'
        },
        tbody: {
          class: 'text-left'
        }
      },
    },
    {
      displayName: 'dataExport.RecordAvailable',
      id: 'recordAvailable',
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
    }
  ]
  
  
  export const pageSizeOptions = [
    { id: 2 },
    { id: 5 },
    { id: 10 },
    { id: 15 },
    { id: 20 },
  ];
  
  export const filterFields = {
    SelectModule: {
        label:'dataExport.SelectModule',
        name: 'moduleName',
        aliasName:'',
        validatiors: [],
        type: 'ngSelect',
        placeholder:'dataExport.SelectModule',
        customData: {
          data: modulesList,
          key: 'name',
          value: 'name',
        },
    },
   
    DateAdded: {
      label: 'Customers.Customer.DateAdded',
      name: 'date',
      aliasName:'',
      validatiors: [],
      type: 'date',
      placeholder:'dd/mm/yyyy',
    },
    SelectUser: {
      label:'dataExport.SelectUser',
      name: 'user',
      aliasName: '',
      validatiors: [],
      type: 'text',
      placeholder:'dataExport.SelectUser',
    },
  //   SelectUser: {
  //     label:'dataExport.SelectUser',
  //     name: 'user',
  //     aliasName:'',
  //     validatiors: [],
  //     type: 'ngSelect',
  //     placeholder:'dataExport.SelectUser',
  //     customData: {
  //       data: [],
  //       key: '',
  //       value: '',
  //     },
  // },
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

  export const bulkActions = getBulkConfig(['itemSelected', 'exportExcel', 'resetCheckbox']);