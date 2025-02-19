// Angular Imports
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// Sandbox Imports
import { ExportSandbox } from 'src/core/admin/catalog/export/export.sandbox';

@Component({
  selector: 'app-from-module',
  templateUrl: './from-module.component.html',
  styleUrls: ['./from-module.component.scss']
})
export class FromModuleComponent implements OnInit {
  // Array
  modulesList: any = [
    { name: 'Orders', translate: 'dataExport.Orders' },
    // { name: 'Failed Orders', translate: 'dataExport.FaliedOrders' },
    // { name: 'Abondoned', translate: 'dataExport.Abondoned' },
    // { name: 'Archive Payments', translate: 'dataExport.ArchivePayments' },
    { name: 'Product Categories', translate: 'dataExport.ProductCategories' },
    { name: 'Manage Customers', translate: 'dataExport.Customers' },
    // { name: 'Banners', translate: 'dataExport.Banners' },
    // { name: 'Coupon', translate: 'dataExport.Coupon' },
    { name: 'Vendors', translate: 'dataExport.Vendors' },
    { name: 'Manage Products', translate: 'dataExport.ManageProduct' },
    // { name: 'Vendor Products', translate: 'dataExport.VendorProducts' },
    // { name: 'Payments', translate: 'dataExport.Payments' },
    // { name: 'Settlement History', translate: 'dataExport.SettlementHistory' },
    // { name: 'Sales by Vendor', translate: 'dataExport.SalesByVendor' },
    // { name: 'Total Sales Report', translate: 'dataExport.TotalSalesReport' },
    // { name: 'Settlements', translate: 'dataExport.Settlements' }
  ];
  selectedModule: any = null;
  createdBy: any = [];
  exportData: any;
  productId: any;
  submitted: boolean = false;

  constructor(
    public titleService: Title,
    public sandbox: ExportSandbox,
    public route: Router,
    public cdr: ChangeDetectorRef
  ) {
    this.titleService.setTitle('Data Export');
  }

  ngOnInit(): void { }

  getModule(): void {
    this.createdBy = JSON.parse(sessionStorage.getItem('adminUser'));
    const params: any = {};
    params.module = this.selectedModule?.name ?? '';
    params.createdBy = this.createdBy.userId;
    this.export();
  }

  // id export 
  export() {
    this.submitted = true;
    switch (this.selectedModule?.name) {
      case 'Orders': {
        const param: any = {
          data: {
            failedOrder: false
          },
          type: 'Orders'
        };
        this.sandbox.getFromModule(param);
        break;
      }
      case 'Failed Orders': {
        const param: any = {
          data: {
            failedOrder: true
          },
          type: 'Failed Orders'
        };
        this.sandbox.getFromModule(param);
        break;
      }
      case 'Manage Products': {
        const param: any = {
          data: {
            productId: []
          },
          type: 'Manage Products'
        };
        this.sandbox.getFromModule(param);
        break;
      }
      case 'Product Categories': {
        const param: any = {
          data: {
            categoryId: []
          },
          type: 'Product Categories'
        };
        this.sandbox.getFromModule(param);
        break;
      }
      case 'Archive Payments': {
        const param: any = {
          data: {},
          type: 'Archive Payments'
        };
        this.sandbox.getFromModule(param);
        break;
      }
      case 'Manage Customers': {
        const param: any = {
          data: {},
          type: 'Manage Customers'
        };
        this.sandbox.getFromModule(param);
        break;
      }
      case 'Vendors': {
        const param: any = {
          data: {},
          type: 'Vendors'
        };
        this.sandbox.getFromModule(param);
        break;
      }
      default:
      // Default case if none of the above cases match
    }
  }
}
