// Angular imports
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { Subscription } from 'rxjs';
// Sandbox
import { SellerProductSandox } from 'src/core/admin/vendor/manage-products/sellerProduct/sellerProduct.sandbox';
// Constants  
import { getImageUrl } from 'src/theme/default/admin/shared/components/common-table/common-table/common.constant';
import { bulkActions, filterFields, getCustomTable, removeEmptyKeys } from './rejected-products.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
// environment
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { apiResponse } from 'src/theme/default/admin/shared/components/services/permission.constant';
@Component({
  selector: 'app-rejected-products',
  templateUrl: './rejected-products.component.html',
  styleUrls: ['./rejected-products.component.scss']
})
export class RejectedProductsComponent implements OnInit, OnDestroy {
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;

  //Dynamic columns
  customTable: any;

  // Pagination
  currentPage = 1;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  offset = 0;
  queryData: any = {};
  pagination: boolean = true;

  // List
  rejectedProductList = [];
  
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };

  // environment
  imageUrl: string = environment.imageUrl;

  // Bulk Action
  bulkAction = bulkActions;

  // currency
  public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

  viewDeatilsPermission:any;
  constructor(
    public titleService: Title,
    private router: Router,
    public route: ActivatedRoute,
    public sandbox: SellerProductSandox, private ref: ChangeDetectorRef,
    public modalService: NgbModal,
    public fb: UntypedFormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.titleService.setTitle('Rejected Products');
    this.viewDeatilsPermission = apiResponse['approve-market-place-product'];
    this.customTable = getCustomTable();
    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == 'Approve') {
          this.approveProduct(e);
        }
        break;
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
    }
  }

  // Approve Product
  approveProduct(e) {
    const param = {
      productIds: [e.productId],
      approvalFlag: '1',
    };
    this.sandbox.approveProduct(param)
    this.subscriptions.add(this.sandbox.approveProduct$.subscribe(val => {
      if (val?.status == 1) {
        this.routeSubscribe();
      }
    }));
  }

  // Export Excel
  exportExcel() {
    const param = {
      productId: this.selectedDatas.map(list => list?.productId).toString()
    };
    this.sandbox.MultipleProductDataExport(param);
    this.subscriptions.add(this.sandbox.MultipleProductDataExport$.subscribe(val => {
      this.resetCheckbox();
    }))
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.rejectedProductList.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.rejectedProductList.filter(val => val?.checked);
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  //Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.productCount();
    this.dropDownClose('myDropdown');
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = filterFields;
    const formGroupField = getFormControlsFields(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  /*Remove filter*/
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  /*Reset filters*/
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'sellerName': '',
        'companyName': '',
        'productName': '',
        'Date': ''
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  goToDetail(data) {
    if(apiResponse['approve-market-place-product']){
    const value: any = {
      name: 'RejectedProducts',
      id: data.productId,
      sellerId: data.vendorId
    }
    if(data.isSimplified == 1){ 
      this.router.navigate(["/vendors/manage-products/product-detail", data.productId], { queryParams: value })
    }
  else if(data.isSimplified == 0) {
    this.router.navigate(["/vendors/manage-products/variant-product-detail", data.productId], { queryParams: value })
  }
  }
}

  // Rejected product list
  productList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    param.approvalFlag = 2;
    param.updatedDate = this.datePipe.transform(this.backupFormValue['Date'], 'yyyy-MM-dd') ?? '';
    this.sandbox.sellerProductList(param);
    this.subscriptions.add(this.sandbox.sellerProductList$.subscribe(element => {
      this.rejectedProductList = element;
      this.rejectedProductList?.forEach((element) => {
        element.isDisabled = element.approvalFlag == 1 ? false : true;
        element.truncatedText = element.name?.length > 80 ? element.name.slice(0, 80) : element.name;
        if (this.empty.includes(element.image)) {
          element.image = "assets/error-images/Load-icon-Products.png";
        } else {
          element.image = getImageUrl(
            this.imageUrl,
            element.containerName,
            element.image
          );
          this.ref.detectChanges();
        }
      });
    }))
    this.updateQueryParam();
  }

  // Rejected product list
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    params.approvalFlag = 2;
    params.updatedDate = this.datePipe.transform(this.backupFormValue['Date'], 'yyyy-MM-dd') ?? '';
    this.sandbox.sellerProductCount(params);
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.productList();
  }

  // Value update in queryparams for pagination
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // Query param value and pagination
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      keyword: this.backupFormValue['search'] ?? '',
      vendorName: this.backupFormValue['sellerName'] ?? '',
      productName: this.backupFormValue['productName'] ? this.backupFormValue['productName'] : '',
      companyName: this.backupFormValue?.['companyName'] ? this.backupFormValue?.['companyName'] : '',
    };
    return params;
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = (paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
      this.formObjFormGroup.patchValue({
        'sellerName': paramsValue.vendorName ?? "",
        'companyName': paramsValue.companyName ?? "",
        'productName': paramsValue.productName ?? "",
        'Date': paramsValue.updatedDate ? new Date(paramsValue.updatedDate) : "",
        'search': paramsValue.keyword ?? "",
      });
      this.filterValueUpdate();
    }));
    this.productList();
    this.productCount();
  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.exportExcel()
        break;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}