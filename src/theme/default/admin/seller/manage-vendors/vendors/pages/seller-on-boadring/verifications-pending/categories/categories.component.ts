import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SellerCategoriesSandbox } from '../../../../../../../../../../../src/core/admin/manageseller/categories/sellerCategories.sandbox';
import { companyVerifySandbox } from '../../../../../../../../../../../src/core/admin/manageseller/companyverify/companyverify.sandbox';
import { Custom, filterFields, pageSizeOptions, removeEmptyKeys } from './categories.constant';
// import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentmodalComponent } from "../commentmodal/commentmodal.component";
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
   /*filters*/
 @ViewChild('myDropdown') myDropdown!: NgbDropdown;
 @ViewChild('myDropdownSearch') myDropdownSearch!: NgbDropdown
  currentPage = 1; //page number
  limit: any = 10;
  offset = 0;
  page: any = pageSizeOptions;
  approvalFlag: any = 0;
  count: any = 0;

 /*filter*/
 dynamicFormGroup: any;
 submitted: any = false;
models: any = filterFields;
 dynamicControls: any = [];
 keyword: any = '';




  verifiedCategory: any = [];
  rejectedCategory: any = [];
  private subscription = new Subscription();
  custom: any = Custom;
  //seller-info
  sellerinfo: any;
  DocumentId: any;
  detailsData: any;
  //country
  countryName: any;
  listArr: any=[];
  data: any = [];
    loader:Boolean=false;
  datas: any={};
  categoryStatus: any;
  constructor(public Sandbox: companyVerifySandbox, public sellerCategoriesSandbox: SellerCategoriesSandbox,
    public ref:ChangeDetectorRef,public router: Router, public modalService: NgbActiveModal,
    private model: NgbModal,public route: ActivatedRoute,   public fb: UntypedFormBuilder,
    public titleService: Title
  ) {
    this.titleService.setTitle('Seller KYC Request'); 
  }

  ngOnInit(): void {
    
    this.getList();
    
    this.routeSubscribe();
    this.buildForm();
   
  }



  //details
  getList() {

    var sellerId = sessionStorage.getItem("seller-Id");
    const params = {
      sellerId: sellerId ? sellerId : "",
    };
    this.Sandbox.companyVerifyList(params);
    this.subscription.add(
      this.Sandbox.companyVerifyList$.subscribe((ress) => {
        this.categoryStatus=ress?.data?.verificationStatus?.categoryStatus
        if (ress.status == 1) {
          var res = ress.data;
          this.sellerinfo = res.sellerUser[0];
          this.detailsData = res;
          var countryNames = sessionStorage.getItem("countryName");
          if (countryNames) {
            this.countryName = countryNames;
          }
        }
      })
    );
  }







  sellerCategoriesList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    var sellerId = sessionStorage.getItem("seller-Id");
    params.sellerId=sellerId ? sellerId : "",
    delete params['currentPage']
    this.sellerCategoriesSandbox.sellerCategoriesList(params);
    this.sellerCategoriesSandbox.sellerCategoriesList$.subscribe(val => {
      this.listArr=[...val]
      this.ref.detectChanges();
    })
    this.updateQueryParam();
  }


  sellerCategoriesCount() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
  
    var sellerId = sessionStorage.getItem("seller-Id");
    params.sellerId=sellerId ? sellerId : "",
    delete params['currentPage']
    this.sellerCategoriesSandbox.sellerCategoryCount(params);
    this.sellerCategoriesSandbox.sellerCategoryCount$.subscribe(val => {
      this.ref.detectChanges();
    })
  }

  buttonAction(e: any) {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Approve") {
e.isVerified='Approve'?1:0
          this.approveList(e);
        } else if (e.actionType == "Reject") {
          e.isVerified='Reject'?2:0
          this.rejectList(e);
        }
        break;

      // case "toggle":
      //   this.status(e);
      //   break;
    }
  }



  approveList(e) {
    const ind = this.listArr.findIndex(val=> val.categoryId == e.categoryId);
    this.listArr[ind].isVerified = e.isVerified;
    
    if (this.verifiedCategory.includes(e.categoryId)) {
      let a = this.verifiedCategory.findIndex((id: any) => id == e.categoryId);
      this.verifiedCategory.splice(a, 1)
    } else {
      if(!this.verifiedCategory.includes(e.categoryId)){
        this.verifiedCategory.push(e.categoryId);
      }
       }
    this.verifiedCategory.forEach(val => {
      this.rejectedCategory.forEach(element => {
        if (val == element) {
          let b = this.verifiedCategory.findIndex((id: any) => id == e.categoryId)
          this.rejectedCategory.splice(b, 1)
          
        }
      })
    })
  }





  rejectList(e) {
    // const ind = this.listArr.findIndex(val=> val.categoryId == e.categoryId);
    // this.listArr[ind].isVerified = e.isVerified;
    
    if (this.rejectedCategory.includes(e.categoryId)) {
      let a = this.verifiedCategory.findIndex((id: any) => id == e.categoryId)
      this.rejectedCategory.splice(a, 1)
    } else {
      if(!this.rejectedCategory.includes(e.categoryId)){
        this.rejectedCategory.push(e.categoryId);
      } 
    }
    this.verifiedCategory.forEach(val => {
      this.rejectedCategory.forEach(element => {
        if (val == element) {
          let b = this.verifiedCategory.findIndex((id: any) => id == e.categoryId)
          this.verifiedCategory.splice(b, 1);
        }
      })
    })
  }




submit(){
 
  var sellerId = sessionStorage.getItem("seller-Id");

 let params= {
  sellerId: sellerId ? sellerId : "",
    isApproved: 1,
    verifiedCategory:this.verifiedCategory,
    rejectedCategory:this.rejectedCategory
  }

  this.loader=true
  this.ref.detectChanges();
  this.sellerCategoriesSandbox.updateSellerCategories(params);
  this.sellerCategoriesSandbox.updateSellerCategories$.subscribe(val=>{
    if(val?.status==1){
      this.loader=false;
      // this.verifiedCategory='',
      // this.rejectedCategory=''
       this.sellerCategoriesList();
       this.getList();
      
    }
  })

 
  var sellerId = sessionStorage.getItem("seller-Id");
  const param = {
   id: sessionStorage.getItem('seller-Id'),
   categoryStatusVerify:1,
 };
this.sellerCategoriesSandbox.categoryVerify(param)
this.sellerCategoriesSandbox.categoryVerify$.subscribe(val=>{

  if(val){
    //  this.sellerCategoriesList();
    this.getList();
 
  }
})

}


  // modal
  opencommentlog(): void {
    var sellerId = sessionStorage.getItem('seller-Id')
    const modelRef = this.model.open(CommentmodalComponent, {
      size: 'xl', windowClass: 'commentlogmodal right', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.id = sellerId;
    modelRef.componentInstance.name = "Categories";
    modelRef.componentInstance.decision = 0;
    modelRef.componentInstance.arrvalue = this.data;
  }



 //cancel
 cancel() {
  this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/bank"]);
}

//next
next() {
  this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/documents"]);
}


  /*query param value*/
  private getQueryParam() {
    
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.keyword ?? "",
      status: this.dynamicFormGroup?.value.Status ?? "",
      categoryName: this.dynamicFormGroup?.value['Category Name'] ?? '',
    };
   
    return params ;
  }


  routeSubscribe(): void {

    this.limit = sessionStorage.getItem("itemsPerPage")
      ? sessionStorage.getItem("itemsPerPage")
      : this.limit;
    let paramsValue: any = {};
    this.route.queryParams.subscribe((params) => {
      paramsValue = params;
      this.keyword = paramsValue.keyword ?? '';
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = paramsValue.currentPage
        ? Number(paramsValue.currentPage)
        : 1;
    });

    this.dynamicFormGroup?.controls['Category Name']?.setValue(paramsValue.CategoryName);
    
    this.dynamicFormGroup?.controls['status']?.setValue(paramsValue.status);

    this.sellerCategoriesList();
    this.sellerCategoriesCount();

  }

  /* value update in queryparams */
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }



/*filters*/
applyFilter(): void {
  this.keyword = '';
  this.onPageChange({ limit: this.limit, offset: 0 });
  this.dropDownClose('myDropdown');

  this.sellerCategoriesCount();
}
/*Reset filters*/
filterReset(): void {
  this.dropDownClose('myDropdown');
  this.dynamicFormGroup.reset();
  this.sellerCategoriesList();
  this.sellerCategoriesCount();

}

/*search name*/
searchItems(): void {
  this.onPageChange({ limit: this.limit, offset: 0 });
  this.dropDownClose('myDropdown');
  this.dropDownClose('myDropdownSearch');

  this.sellerCategoriesCount();
}
/*search reset*/
clearSearch(): void {
  this.keyword = '';
  this.onPageChange({ limit: this.limit, offset: 0 });
  this.dropDownClose('myDropdown');
  this.dropDownClose('myDropdownSearch');
  this.sellerCategoriesCount();
}

// filterclose
private dropDownClose(dropDownName): void {
  if (this.hasOwnProperty(dropDownName)) {
    this[dropDownName]?.close();
  }
}



/*pagination*/
onPageChange(event: { offset: number; limit: number }): void {
  this.limit = event.limit;
  this.currentPage = Math.floor(event.offset / event.limit) + 1;
  this.sellerCategoriesList();
  this.sellerCategoriesCount();
}

/*per page drop down*/
pageSizeChange(e): void {
  this.onPageChange({ limit: e.id, offset: 0 });
}


buildForm(): void {
  const formGroupFields = getFormControlsFields(this.models);

  this.dynamicFormGroup = this.fb.group(formGroupFields);

  this.models.forEach((element: any) => {
    this.dynamicControls.push(getTypes(element, this.dynamicFormGroup));
  });

}

CategoryVerifybutton(){
  // this.loader=false
  var sellerId = sessionStorage.getItem("seller-Id");
  const params = {
   id: sessionStorage.getItem('seller-Id'),
   documentsVerify:1,
 };
}


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
