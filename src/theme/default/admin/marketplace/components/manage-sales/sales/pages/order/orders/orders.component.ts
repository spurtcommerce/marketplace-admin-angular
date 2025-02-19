// Angular imports
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { Subscription } from 'rxjs';
import * as moment from 'moment';
// Sandbox
import { OrdersSandbox } from '../../../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.sandbox';
// Constants  
import { badgeStatusMappings, filterFields, getCustomTable, removeEmptyKeys } from './orders.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
// environment
import { environment } from 'src/environments/environment';
import { apiResponse } from 'src/theme/default/admin/shared/components/services/permission.constant';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})

export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;

  //Dynamic columns
  customTable: any;

  // Status Badge
  badgeStatusMappings = badgeStatusMappings;

  // Pagination
  currentPage = 1;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  offset = 0;
  queryData: any = {};
  pagination: boolean = true;

  // currency
  public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

  // List
  orderList = [];

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
  viewDeatilsPermission:any;
  constructor(
    public titleService: Title,
    private router: Router,
    public route: ActivatedRoute,
    public orderSandbox: OrdersSandbox,
    private ref: ChangeDetectorRef,
    public modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public modal: NgbModal) { }

  ngOnInit(): void {
    this.titleService.setTitle('Orders');
    this.viewDeatilsPermission = apiResponse['view-order'];
    this.customTable = getCustomTable();
    // Form
    this.buildForm();
    // Router Param
    this.routeSubscribe();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == 'Edit') {
          this.router.navigate(['/vendors/manage-sales/sales/order/order-detail/' + e.orderId]);
        }
        break;
    }
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
        'orderId': '',
        'customerName': '',
        'Date': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // Orders list
  ordersList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    param.keyUp = false;
    this.orderSandbox.ordersList(param);
    this.subscriptions.add(this.orderSandbox.getOrdersList$.subscribe((element: any = []) => {
      this.orderList = element;
      this.ref.detectChanges();
    }))
    this.updateQueryParam();
  }

  // Orders Count
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    delete params.limit;
    delete params.offset;
    params.count = 1;
    params.keyUp = false;
    this.orderSandbox.ordersListCount(params);
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.ordersList();
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
      orderPrefixId: this.backupFormValue['orderId'] ?? '',
      customerName: this.backupFormValue['customerName'] ? this.backupFormValue['customerName'] : '',
      dateAdded: this.backupFormValue['Date'] ? moment(this.backupFormValue['Date']).format('YYYY-MM-DD') : '',
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
        'orderId': paramsValue.orderPrefixId ?? "",
        'customerName': paramsValue.customerName ? paramsValue.customerName : "",
        'date': paramsValue.dateAdded ? new Date(paramsValue.dateAdded) : "",
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.ordersList();
    this.productCount();
  }

  viewOrderDetails(id:any):void{
    if(apiResponse['view-order']){
      this.router.navigate(['/vendors/manage-sales/sales/order/order-detail/'+id], {queryParams: this.getQueryParam()})
    }else{
      return
    }

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}