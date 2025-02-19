// Angular Imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';


// Third Party Imports
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

// Sandbox
import { SellerManagementSandbox } from '../../../../../../../../../core/admin/manageseller/sellermanagement/sellermanagement.sandbox';

// Constant
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { customTable, filterFields, removeEmptyKeys } from './approved-seller.constant';
@Component({
  selector: 'app-approved-seller',
  templateUrl: './approved-seller.component.html',
  styleUrls: ['./approved-seller.component.scss']
})
export class ApprovedSellerComponent implements OnInit {

  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  //Dynamic columns
  customTable: any = customTable;

  // list 
  approvedList: any = [];
  approvalFlag: any = 'verified';

  // pagination
  currentPage: number = 1;
  private offset: any = 0;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    public titleService: Title,
    public sandbox: SellerManagementSandbox,
    public route: ActivatedRoute,
    private router: Router,
    public fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    public modal: NgbModal,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Seller Approval Pennding');
    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
  }

  /*list*/
  getApprovedList() {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    params.recievedDate = this.datePipe.transform(this.backupFormValue['Approved On'], 'yyyy-MM-dd') ?? '',
      this.sandbox.getCategoryList(params);
    this.sandbox.getCategoryList$.subscribe(val => {
      this.approvedList = val;
      this.approvedList.forEach(element => {
        element.sellerName = element?.customer?.firstName + element?.customer?.lastName;
        element.industrys = element?.industry?.name;
        element.emailId = element?.customer?.email;
        element.phone = element?.customer?.mobileNumber;
        element.countryName = element?.country?.name;
        // element.isActive = element?.customer?.isActive
      });
    });
    this.updateQueryParam()
    sessionStorage.setItem('ListPagebreadcrumbs', 'Approved Sellers')
  }

  /*count*/
  getApprovedListCount() {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());
    params.recievedDate = this.datePipe.transform(this.backupFormValue['Approved On'], 'yyyy-MM-dd') ?? '',
      params.count = 1;
    this.sandbox.approvedListCount(params)
  }

  /*new Attribute router*/
  newAttribute(): void {
    this.router.navigate(["/settings/attributes/new"], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  // Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.getApprovedList();
    this.getApprovedListCount();
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

  // /*common table*/
  buttonAction(e: any) {
    switch (e.key) {
      case "imageMenu":
        if (e.actionType == "Edit") {
          sessionStorage.setItem('seller-Id', e.vendorId)
          sessionStorage.setItem('countryName', e.countryName)
          // sessionStorage.setItem('breadcrumbs', 'Approved Sellers List')
          this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/verify"])
        }
        break;
      case "toggle":
        this.status(e);
        break;
    }
  }

  /*Reset filters*/
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'Seller Name': "",
        'Email': "",
        'Company': "",
        'Industry': "",
        'Phone': "",
        'Status': "",
        'Approved On': "",
        'search': ""
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getApprovedList();
    this.getApprovedListCount();
  }

  // when you click tab cursor will go to search 
  focusInput(): void {
    this.myInput.nativeElement.focus();
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
      currentPage: this.currentPage,
      kycStatus: this.approvalFlag,
      // isEmailVerified: this.emailVerify,
      status: this.backupFormValue?.['Status'] ?? '',
      email: this.backupFormValue?.['Email'] ?? '',
      vendorName: this.backupFormValue?.['Seller Name'] ?? '',
      companyName: this.backupFormValue?.['Company'] ?? '',
      industryName: this.backupFormValue?.['Industry'] ?? '',
      companyMobileNumber: this.backupFormValue?.['Phone'] ?? '',
      recievedDate: this.backupFormValue?.['Approved On'] ?? '',
      keyword: this.backupFormValue?.['search'] ?? ""
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
        'Seller Name': paramsValue.vendorName ?? "",
        'Email': paramsValue.email ?? "",
        'Company': paramsValue.companyName ?? "",
        'Industry': paramsValue.industryName ?? "",
        'Phone': paramsValue.companyMobileNumber ?? "",
        'Status': paramsValue.status ? paramsValue.status : null,
        'Approved On': paramsValue.recievedDate ? new Date(paramsValue.recievedDate) : "",
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.getApprovedList();
    this.getApprovedListCount();
  }

  // /*toggle */
  private status(data): void {
    const params = {
      status: data.isActive ? 1 : 0,
      id: data.vendorId
    };
    this.sandbox.approveListStatus(params);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
