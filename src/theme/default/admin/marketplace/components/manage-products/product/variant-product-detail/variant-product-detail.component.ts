import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroupName, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductVariantSandbox } from 'src/core/admin/catalog/product-variant/productVariant.sandbox';
import { ProductVariantService } from 'src/core/admin/catalog/product-variant/productVariant.service';
import { ProductSandbox } from 'src/core/admin/catalog/product/product.sandbox';
import { ProductService } from 'src/core/admin/catalog/product/product.service';
import { ConfigService } from 'src/core/admin/service/config.service';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';
import { RejectsModelComponent } from '../../rejects-model/rejects-model.component';
import { SellerProductSandox } from 'src/core/admin/vendor/manage-products/sellerProduct/sellerProduct.sandbox';

@Component({
  selector: 'app-variant-product-detail',
  templateUrl: './variant-product-detail.component.html',
  styleUrl: './variant-product-detail.component.scss'
})
export class VariantProductDetailComponent {
 
  @ViewChild('filePath') filePath: ElementRef;

  public dropDownnArray: any = [];
  public user: UntypedFormGroup;
  public sizeFormArray: UntypedFormArray;
  @ViewChild(NgbNav)
  private tabset: NgbNav;
  public nav: any;
  public editId: any;
  private param: any = {};
  public show: boolean;
  public submittedValues = false;
  public length: number;
  public imageUrls: string;
  public defaultImageValue = 1;
  public selectedProducts: any = [];
  private totalArray: any = [];
  public addOneTimeData = false;
  private subscriptions: Array<Subscription> = [];
  public optionListArray: any = [];
  public dropdownValueArray: any = [];
  public dropDownnValue: number;
  public isFormActive: string;
  public selectedOption: any;
  public optionValidatevalue: any;
  public searchText = '';
  public updateproductdetails = [];
  public productOptions: any = [];
  public optionIdArray: any = [];
  public NewOptionID: number;
  public defaultSelected = '--select option--';
  public name = 'ng2-ckeditor';
  public ckeConfig: any;
  public mycontent: string;
  public log = '';
  public ratingImage = {};
  public ratingVal = 3.4;
  public config: any;
  @ViewChild('myckeditor') ckeditor: any;
  public selected_optionId: UntypedFormControl;
  public required: UntypedFormControl;
  public optionValue: UntypedFormArray;
  public rightOption: FormGroupName;
  public options: FormGroupName;
  public currencySymbol: any = JSON.parse(sessionStorage.getItem('adminCurrency'));
  public taxType = '1';
  public taxValue: any;
  public taxArray: any;
  public taxPercentage: any;
  public currentTaxId: any;
  public grossTotal: number;
  public totalPrice: number;
  public shippingValid = false;
  public tierFormArray: UntypedFormArray;
  public tierForm: UntypedFormGroup;

  // filter params
  public filterParams: any = {};

  public productTypeSelectedSlug: any = '';

  // attributes
  public attributeFormArray: UntypedFormArray;
  public attributeForm: UntypedFormGroup;
  currentDate: Date;

  // video
  public values = '0';
  videoUrl: any = '';
  embeded = false;
  uploaded = false;
  url: any = '';
  public abc: any;
  urlSafe: any = '';
  FinalUrl: string;
  videoName: any = '';
  dateAvail: any;
  uploadedVideoUrl: any = '';
  discountstart: any;
  discountend: any;
  specialstart: any;
  specialend: any;
  productItem: any = {}
  image: any;
  minPickerDate: any;
  submittedSpecialDate = false;
  public dateError: string;
  public isRequired = false;
  public discounterror = [];



  public priceValid: boolean;
  public selectedVariantArray = [];
  public selectedVaraintId = [];
  public emptyVariant = [];
  public currency: any;
  public probability: any = [];
  public isVariantExist = false;
  // variant form
  public variantItems: UntypedFormArray;
  public variantForm: UntypedFormGroup;
  public optionImageArray: any = [];
  public optionValueArray: any = [];
  public toggleArray: any = [];
  public existVariantId = []
  public existOptionDetail = []
  bulkVariantList: any = [];
  oldVariantIds: any = [];
  orderFlag: number;
  isDelete:boolean = false;

  // reject approve
  routeName: any;
  sellerId: any;
  approvalFlag: any;

  constructor(
    public fb: UntypedFormBuilder,
    public productSandbox: ProductVariantSandbox,
    private popup: NgbModal,
    private route: ActivatedRoute,
    private changeDetectRef: ChangeDetectorRef,
    public configService: ConfigService,
    public router: Router,
    public domSanitizer: DomSanitizer,
    public ckeconfiqservice: CkeConfiqService,
    public toastr: ToastrService,
    public snackBar: MatSnackBar,
    public productVariantService: ProductVariantService,
    private datePipe: DatePipe,
    public sandbox: SellerProductSandox

  ) {
    this.url = this.domSanitizer.bypassSecurityTrustUrl(this.videoUrl);
    this.config = this.ckeconfiqservice.getckeconfig();
    this.mycontent = `<p>My html content</p>`;
    this.route.queryParams.subscribe((params) => {
      this.editId = params.id,
        this.routeName = params.name,
        this.sellerId = params.sellerId,
        this.approvalFlag = params.approvalFlag
    })
    this.route.params.subscribe(data => {
      if (data) {
        this.editId = data['id'];
      }
    });
    const pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    const offset = this.route.snapshot.queryParamMap.get('offset');
    const keyword = this.route.snapshot.queryParamMap.get('keyword');
    const filterSku = this.route.snapshot.queryParamMap.get('sku');
    const filterStatus = this.route.snapshot.queryParamMap.get('status');
    const price = this.route.snapshot.queryParamMap.get('price');
    const index = this.route.snapshot.queryParamMap.get('index');


    this.filterParams.pageSize = pageSize || '';
    this.filterParams.keyword = keyword || '';
    this.filterParams.sku = filterSku || '';
    this.filterParams.offset = offset || 0;
    this.filterParams.price = price || '';
    this.filterParams.index = index || 0;
    this.filterParams.status = filterStatus || '';

  }

  // beforeChange($event: NgbPanelChangeEvent) {
  //   if ($event.panelId === 'preventchange-2') {
  //     $event.preventDefault();
  //   }

  //   if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
  //     $event.preventDefault();
  //   }
  // }
  ngOnInit() {
    this.currency = JSON.parse(sessionStorage.getItem('adminCurrency'));
    this.currentDate = new Date();
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.variantList();
    this.initProductForm();
    if (this.editId) {
      this.productSandbox.getProductDetail({ id: this.editId });
      this.productSandbox.productDetails$.subscribe(data => {

        if (data) {
          this.existOptionDetail = data.productVariantList
          this.productItem = data;
          this.changeDetectRef.detectChanges();
          // if (!['', null, undefined, 0].includes(this.existOptionDetail?.length)) {
          //   this.variantFlag();
          // }
        }
      })
      this.regDetailEvent();
    }

    this.imageUrls = this.configService.getImageUrl();

  }

  // orderplace variantdisable flag getting api
  // private variantFlag(): void {
  //   const params: any = {}
  //   params.productId = this.productItem.productId;
  //   this.productSandbox.variantFlag(params);
  //   this.productSandbox.variantFlag$.subscribe(element => {
  //     if (element) {
  //       this.orderFlag = element?.data;
  //       this.changeDetectRef.detectChanges();
  //     }
  //   })

  // }

  // reactive form
  initProductForm() {
    this.variantForm = this.fb.group({
      variantItems: this.fb.array([])
    });
    this.user = this.fb.group({
      options: this.fb.group({
        selected_optionId: this.selected_optionId,
        rightOption: this.fb.array([])
      }),
    })

    this.optionValue = this.user.controls['options'].get(
      'rightOption'
    ) as UntypedFormArray;
  }

  get variantFormArray() {
    return <UntypedFormArray>(
      this.variantForm.controls['variantItems']);
  }

  subscribe() {
    this.productSandbox.productVariantUpdate$.subscribe(data => {
      if (data && data['status'] === 1) {
        const params: any = {}
        params.offset = 0;
        params.limit = 0;
        params.keyword = '';
        this.productSandbox.getProductList({});
        this.router.navigate(['/catalog/manage-products/product_variant/product-list'], { queryParams: this.filterParams });
      }
    });
  }



  /**
   * Handles  'onSubmit' event. Calls productSandbox doProductUpdate function if (this.editId) else
   * calls productSandbox doProductAdd function.
   * @param user entire form value
   */
  onSubmit(user) {
    this.shippingValid = false;
    if (this.probability.length > 0) {
      this.probability.map((data, i) => {
        this.optionImageArray.map((item, j) => {
          if (i === j) {
            const opts: any = { ...data, optionImage: item, };
            Object.assign(data, opts);
          }
        });
      });
    }
    this.submittedValues = true;
    const validateForm = this.variantForm.value.variantItems.some(val => ((val.price == '') || (val.price == '0') || (val.inventory == '')))
    if (validateForm) {
      this.validateAllFormFields(this.variantForm);
      // this.tabset.select('7');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }
    this.priceValid = this.variantForm.value.variantItems.some(val => ((val.discountPrice) && !(val.discountStart.day) || (val.discountPrice) && !(val.discountEnd.day) || (val.specialPrice) && !(val.specialPriceStart.day) || (val.specialPrice) && !(val.specialPriceEnd.day)))
    if (this.priceValid) {
      return
    }
    const validValues = this.variantForm.value.variantItems.some(val => ((+val.price < +val.specialPrice) || (+val.price < +val.discountPrice)))
    if (validValues) {
      return
    }
    const param: any = {}
    if (this.editId) {
      if (this.probability.length > 0) {
        const final = [];
        const form = this.variantForm.value.variantItems;
        const prob = this.probability;

        for (let i = 0; i < prob.length; i++) {
          for (let k = 0; k < form.length; k++) {
            if (prob[i].arrayId === form[k].arrayId) {
              var listId = ''
              this.existOptionDetail.map(resp => {
                if (resp.skuName == form[k].sku) {
                  listId = resp.id
                  return
                }
              })
              prob[i].name = form[k].name;
              const name = [];
              const id = [];
              const discountPrice = []
              const specialPrice = []
              const price = Number(form[k].price);
              const sku = form[k].sku;
              const isActive = form[k].isActive === true ? 1 : 0;
              const optionImage = prob[i].optionImage;
              const quantity = form[k].inventory;

              if (Number(form[k].discountPrice) > 0) {
                const val1: any = {}
                this.existOptionDetail.map(resp => {
                  if (resp.skuName == form[k].sku) {
                    resp?.discountPrice.map(data => {
                      val1.id = data.productDiscountId
                    })
                  }
                })
                val1.productId = Number(this.editId)
                val1.skuId = form[k].sku;
                val1.priority = 1;
                val1.price = Number(form[k].discountPrice)
                const startDate = form[k].discountStart
                val1.dateStart = startDate
                  ? startDate.year +
                  "-" +
                  ("0" + startDate.month).slice(-2) +
                  "-" +
                  ("0" + startDate.day).slice(-2)
                  : this.minPickerDate.year +
                  "-" +
                  this.minPickerDate.month +
                  "-" +
                  this.minPickerDate.day;
                const endDate = form[k].discountEnd
                val1.dateEnd = endDate
                  ? endDate.year +
                  "-" +
                  ("0" + endDate.month).slice(-2) +
                  "-" +
                  ("0" + endDate.day).slice(-2)
                  : this.minPickerDate.year +
                  "-" +
                  this.minPickerDate.month +
                  "-" +
                  this.minPickerDate.day;
                discountPrice.push(val1)
              }

              if (+form[k].specialPrice > 0) {
                const val2: any = {}
                this.existOptionDetail.map(resp => {
                  if (resp.skuName == form[k].sku) {
                    resp.specialPrice.map(data => {
                      val2.id = data.productSpecialId
                    })
                  }
                })
                val2.productId = Number(this.editId)
                val2.skuId = form[k].sku;
                val2.priority = 1;
                val2.price = +form[k].specialPrice
                const startDateSpl = form[k].specialPriceStart
                val2.dateStart = startDateSpl
                  ? startDateSpl.year +
                  "-" +
                  ("0" + startDateSpl.month).slice(-2) +
                  "-" +
                  ("0" + startDateSpl.day).slice(-2)
                  : this.minPickerDate.year +
                  "-" +
                  this.minPickerDate.month +
                  "-" +
                  this.minPickerDate.day;
                const endDateSpl = form[k].specialPriceEnd
                val2.dateEnd = endDateSpl
                  ? endDateSpl.year +
                  "-" +
                  ("0" + endDateSpl.month).slice(-2) +
                  "-" +
                  ("0" + endDateSpl.day).slice(-2)
                  : this.minPickerDate.year +
                  "-" +
                  this.minPickerDate.month +
                  "-" +
                  this.minPickerDate.day;
                specialPrice.push(val2)
              }
              prob[i].value.map(each => {
                name.push(each.value);
                const param1: any = {}
                param1.variantValueId = each.id;
                this.bulkVariantList.map(data1 => {
                  if (data1.variantValues) {
                    data1.variantValues.map(resp1 => {
                      if (resp1.id == each.id) {
                        param1.variantId = resp1.variantId
                      }
                    })
                  }
                })
                id.push(param1);
              });
              final.push({ varientName: name.toString(), variantValueDetails: id, optionImage: optionImage, price: price, sku: sku, isActive: isActive, quantity: quantity, id: listId, variantDiscountPrice: discountPrice, variantSpecialPrice: specialPrice });
              break;
            }
          }
        }

        // reshuffle 0,1 condtion checking 
        this.param.reShuffle = (this.selectedVaraintId.filter(ele => !ele.hasOwnProperty('id')).length>0 || (this.orderFlag ==0 && this.isDelete))? 1:0;
        if(this.param.reShuffle == 1) {
          this.selectedVaraintId.forEach(val => {
            if(val.hasOwnProperty('id')) {
              val.id = 0;
            }
          });
          final.forEach(val => {
              val.id = 0;
          });
        }
        
        this.param.productVariantOptions = final;
        this.param.productVariants = this.selectedVaraintId;

      } else {
        this.param.productVariantOptions = [];
        this.param.productVariants = [];
      }
      this.param.productId = Number(this.editId);
      this.productSandbox.doProductUpdate(this.param);
      this.productSandbox.productVariantUpdateLoaded$.subscribe(val => {
        // const params: any = {}
        // params.offset = 0;
        // params.limit = 0;
        // params.keyword = '';
        // this.productSandbox.getProductList({});
      })
    }
    else {
      if (this.probability.length > 0) {
        const final = [];
        const form = this.variantForm.value.variantItems;
        const prob = this.probability;

        for (let i = 0; i < prob.length; i++) {
          for (let k = 0; k < form.length; k++) {
            if (prob[i].arrayId === form[k].arrayId) {
              prob[i].name = form[k].name;
              const name = [];
              const id = [];
              const discountPrice = [];
              const specialPrice = [];
              const price = form[k].price;
              const sku = form[k].sku;
              const isActive = form[k].isActive === true ? 1 : 0;
              const optionImage = prob[i].optionImage;
              const quantity = form[k].inventory;

              prob[i].value.map(each => {
                name.push(each.value);
                const param1: any = {}
                param1.variantValueId = each.id;
                this.bulkVariantList.map(data1 => {
                  if (data1.varientsValue) {
                    data1.varientsValue.map(resp1 => {
                      if (resp1.id == each.id) {
                        param1.variantId = resp1.variantId
                      }
                    })
                  }
                })
                id.push(param1);
              });
              const val1: any = {}
              val1.skuId = form[k].sku;
              val1.priority = 1;
              val1.price = form[k].discountPrice
              const startDate = form[k].discountStart
              val1.dateStart = startDate
                ? startDate.year +
                "-" +
                ("0" + startDate.month).slice(-2) +
                "-" +
                ("0" + startDate.day).slice(-2)
                : this.minPickerDate.year +
                "-" +
                this.minPickerDate.month +
                "-" +
                this.minPickerDate.day;
              const endDate = form[k].discountEnd
              val1.dateEnd = endDate
                ? endDate.year +
                "-" +
                ("0" + endDate.month).slice(-2) +
                "-" +
                ("0" + endDate.day).slice(-2)
                : this.minPickerDate.year +
                "-" +
                this.minPickerDate.month +
                "-" +
                this.minPickerDate.day;
              discountPrice.push(val1)

              const val2: any = {}
              val2.skuId = form[k].sku;
              val2.priority = 1;
              val2.price = form[k].specialPrice
              const startDateSpl = form[k].specialPriceStart
              val2.dateStart = startDateSpl
                ? startDateSpl.year +
                "-" +
                ("0" + startDateSpl.month).slice(-2) +
                "-" +
                ("0" + startDateSpl.day).slice(-2)
                : this.minPickerDate.year +
                "-" +
                this.minPickerDate.month +
                "-" +
                this.minPickerDate.day;
              const endDateSpl = form[k].specialPriceEnd
              val2.dateEnd = endDateSpl
                ? endDateSpl.year +
                "-" +
                ("0" + endDateSpl.month).slice(-2) +
                "-" +
                ("0" + endDateSpl.day).slice(-2)
                : this.minPickerDate.year +
                "-" +
                this.minPickerDate.month +
                "-" +
                this.minPickerDate.day;
              specialPrice.push(val2)
              final.push({ varientName: name.toString(), variantValueDetails: id, optionImage: optionImage, price: price, sku: sku, isActive: isActive, quantity: quantity, variantDiscountPrice: discountPrice, variantSpecialPrice: specialPrice });
              break;
            }
          }
        }
        this.param.productVariantOptions = final;
        this.param.productVariants = this.selectedVaraintId;

      } else {
        this.param.productVariantOptions = [];
        this.param.productVariants = [];
      }
      this.param.productId = Number(this.editId);
      this.productSandbox.doProductUpdate(this.param);
      this.productSandbox.productVariantUpdateLoaded$.subscribe(val => {
        if (val) {
          // const params: any = {}
          // params.offset = 0;
          // params.limit = 0;
          // params.keyword = '';
          // this.productSandbox.getProductList({});
        }
      })
    }
    this.subscribe();
  }

  /**
   * unsubscribe the subscriptions
   *
   * Handles  'regDetailEvent' event. Calls productSandbox productDetails$ to
   * subscribe the response data.,then calls editProductForm function with the response data.
   *
   */
  regDetailEvent() {
    this.subscriptions.push(
      this.productSandbox.productDetails$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.selectedProducts = [];
          this.editProductForm(data);
          this.changeDetectRef.detectChanges();
        }
      })
    );
  }


  addProductData() {
    this.totalArray = [];
    if (this.selectedProducts) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i] && this.selectedProducts[i].productId) {
          this.totalArray.push(this.selectedProducts[i].productId);
        }
      }
    }
  }



  editProductForm(productDetail) {
    this.productTypeSelectedSlug = productDetail.productType;

    this.probabilitySubscribe();
    this.changeDetectRef.detectChanges();
    if (productDetail.productVariants && productDetail.productVariants.length > 0) {
      // this.existVariantId = productDetail.productVariants.filter(res =>res.id)
      this.isVariantExist = true;
      const getOptionDetails = []
      productDetail.productVariants.forEach(data => {
        const param: any = {}
        param.variantId = data.variantId
        param.id = data.id
        if (!this.selectedVaraintId.some(val => (val?.variantId == data.variantId))) {
          this.selectedVaraintId.push(param);
          this.oldVariantIds.push(param)
        }
      });
    }
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: false });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }



  public variantList() {
    const params: any = {};
    params.keyword = '';
    this.productSandbox.getVariantsList(params);
    this.productSandbox.productOptionsList$.subscribe(res => {
      if (res) {
        this.bulkVariantList = res;
        this.bulkVariantList = [...this.bulkVariantList];
        this.changeDetectRef.detectChanges();
      }
    })
  }

  // onCheckboxClick(event: MouseEvent) {
  //   if (this.orderFlag == 1) {
  //      const modalRef = this.popup.open(VariantAlertComponent, {
  //       size: 'sm', 
  //       windowClass: 'delete-confirm',
  //        backdrop: 'static', 
  //        modalDialogClass: 'modal-dialog-centered', 
  //        backdropClass: 'createcr'
  //     });
  //     event.stopPropagation();
  //     event.preventDefault();
  //   }
  // }

  
  // public selectVariant(checked, list, option) {
  //   if (this.orderFlag === 1) {
  //     return;
     
  //   } 
  //     const deleteValue = this.productItem.productVariants.find(val => (val.variantId == list.id))
  //     if (option == 'delete' && deleteValue) {
  //       const modelRef = this.popup.open(DeleteConfirmationDialogComponent, {
  //         size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
  //       });
  //       modelRef.componentInstance.key = '';
  //       modelRef.componentInstance.id = '';
  //       modelRef.componentInstance.variantMessage = 'Variant'
  //       modelRef.result.then(val => {
  //         if (val == 'deleted') {
  //           // if(option == 'delete'){
  //           if (deleteValue) {
  //             this.productVariantService.deleteProductVariant(deleteValue).subscribe(res => {
  //               if (res.message == 'Successfully Deleted Product Variant.') {
  //                 this.selectedVaraintId.forEach((res, index) => {
  //                   if (res.variantId == list.id) {
  //                     this.selectedVaraintId.splice(index, 1)
  //                   }
  //                 })
  //                 let mainSku = this.productItem.sku;
  //                 let defaultPrice = 0;
  //                 const params: any = {};
  //                 params.list = list;
  //                 params.mainSku = mainSku;
  //                 params.defaultPrice = defaultPrice;
  //                 this.productSandbox.selectVariant(params);
  //                 this.probabilitySubscribe();
  //                 this.changeDetectRef.detectChanges();

  //               }
  //             })
  //           }

  //           // }
  //         }
  //       })
  //     }

  //     if (checked == true) {
  //       // if(this.selectedVaraintId.length > 3){
  //       //   list.selected = false;
  //       // }
  //       if (list.selected === false) {
  //         const param1: any = {}
  //         param1.variantId = list.id;
  //         this.oldVariantIds.map(res => {
  //           if (res.variantId == param1.variantId) {
  //             param1.id = res.id
  //           }
  //         })
  //         this.selectedVaraintId.push(param1);
  //       }
  //       // else {
  //       // if (this.selectedVaraintId.length <= 3) {
  //       //   this.selectedVaraintId = this.selectedVaraintId.filter(data => {
  //       //     if (data === list.id) {
  //       //       return false;
  //       //     } else {
  //       //       return true;
  //       //     }
  //       //   });
  //       // } else {
  //       //   return;
  //       // }
  //       // }
  //     }
  //     if (checked == false) {
  //       this.selectedVaraintId.forEach((res, index) => {
  //         if (res.variantId == list.id) {
  //           this.selectedVaraintId.splice(index, 1)
  //         }
  //       })
  //     }
  //     // else {

  //     // }
  //     if (!deleteValue) {
  //       let mainSku = this.productItem.sku;
  //       let defaultPrice = 0;
  //       const params: any = {};
  //       params.list = list;
  //       params.mainSku = mainSku;
  //       params.defaultPrice = defaultPrice;
  //       this.productSandbox.selectVariant(params);
  //       this.probabilitySubscribe();
  //    }
    
  // }

  probabilitySubscribe() {
    this.subscriptions.push(this.productSandbox.probabiltyOptions$.subscribe(data => {
      if (data && data.length > 0) {
        this.probability = data;
        this.pushIntoFormArray(this.probability);
      } else {
        while (this.variantFormArray.length !== 0) {
          this.variantFormArray.removeAt(0);
        }

      }
    }));
  }

  pushIntoFormArray(details) {
    while (this.variantFormArray.length !== 0) {
      this.variantFormArray.removeAt(0);
    }
    this.variantFormArray.removeAt(0);
    this.variantItems = <UntypedFormArray>(
      this.variantForm.controls['variantItems']
    );
    this.variantForm.enable();
    this.optionImageArray = [];
    this.optionValueArray = [];
    this.toggleArray = [];
    details?.forEach((value: any, i) => {
      this.optionImageArray[i] = value.optionImage;
      this.optionValueArray[i] = value.value;
      const opts: any = {};
      const discountstart = value?.discountDateStart ? this.datePipe
        .transform(value?.discountDateStart, "dd-MM-yyyy")
        .split("-") : '';
      const disFinalstart = {
        day: +discountstart[0],
        month: +discountstart[1],
        year: +discountstart[2],
      };

      const discountEnd = value?.discountDateEnd ? this.datePipe
        .transform(value?.discountDateEnd, "dd-MM-yyyy")
        .split("-") : '';
      const disFinalEnd = {
        day: +discountEnd[0],
        month: +discountEnd[1],
        year: +discountEnd[2],
      };

      const specialEnd = value?.specialDateEnd ? this.datePipe
        .transform(value?.specialDateEnd, "dd-MM-yyyy")
        .split("-") : '';
      const splFinalEnd = {
        day: +specialEnd[0],
        month: +specialEnd[1],
        year: +specialEnd[2],
      };

      const specialStart = value?.spcialDateStart ? this.datePipe
        .transform(value?.spcialDateStart, "dd-MM-yyyy")
        .split("-") : '';
      const splFinalStart = {
        day: +specialStart[0],
        month: +specialStart[1],
        year: +specialStart[2],
      };

      opts.isActive = value.isActive;
      this.toggleArray[i] = opts;
      this.variantItems.push(
        this.fb.group({
          arrayId: value.arrayId,
          price: value.price ? +value.price : '',
          inventory: value.inventory,
          barcode: 0,
          isActive: value.isActive === 1 ? true : false,
          sku: value.sku,
          id: value.id,
          availedVarient: value.availedVarient ? value.availedVarient : 0,
          discountPrice: value.discountPrice ? +value.discountPrice : '',
          discountStart: disFinalstart,
          discountEnd: disFinalEnd,
          specialPrice: value.specialPrice ? +value.specialPrice : '',
          specialPriceStart: splFinalStart,
          specialPriceEnd: splFinalEnd
        })
      );
    });
    const groupItems: any = (this.variantForm.get('variantItems') as UntypedFormArray).controls;
    for (const item of groupItems) {
      item.controls['sku'].setValidators(Validators.required);
      item.controls['sku'].updateValueAndValidity();
      item.controls['inventory'].setValidators(Validators.required);
      item.controls['inventory'].updateValueAndValidity();
      item.controls['price'].setValidators(Validators.required);
      item.controls['price'].updateValueAndValidity();
    }
    this.changeDetectRef.detectChanges();

  }

  // uploadOptionImage(event, options, i) {
  //   const modalRef = this.popup.open(ImagemanagerpopupComponent, {
  //     backdrop: 'static',
  //     keyboard: false,
  //     size: 'lg'
  //   });
  //   modalRef.componentInstance.user = 'variant';
  //   modalRef.result.then(
  //     result => {

  //       if (result) {
  //         this.addImageToOptions(result, options, i);
  //       }
  //       this.changeDetectRef.detectChanges();
  //     },

  //   );
  // }

  addImageToOptions(image, option, index) {
    const params: any = {};
    params.image = image[0];
    params.image.defaultImage = 0
    const array = [];
    this.optionImageArray[index] = image;
  }

  removeOptionImage(options, i) {
    this.optionImageArray = this.optionImageArray.map((data, j) => {
      if (i === j) {
        return [];
      } else {
        return data;
      }
    });

  }



  // removeProbablityOption(option, index) {
  //   // if(option.value.availedVarient===1){
  //   //   this.toastr.error("You cannot delete this varient, as products are mapped to it");
  //   //   }
  //   const modelRef = this.popup.open(DeleteConfirmationDialogComponent, {
  //     size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
  //   });
  //   modelRef.componentInstance.key = '';
  //   modelRef.componentInstance.id = '';
  //   modelRef.componentInstance.variantMessage = 'SKU'
  //   modelRef.result.then(val => {
  //     if (val == 'deleted') {
  //       if (option.value.availedVarient === 0) {
  //         this.variantItems.removeAt(index);
  //         this.probability = this.probability.filter((data, i) => {
  //           if (i === index) {
  //             return false;
  //           } else {
  //             return true;
  //           }
  //         });
  //       }

  //       // this.optionImageArray = this.optionImageArray.filter((item, j) => {
  //       //   if (j === index) {
  //       //     return false;
  //       //   } else {
  //       //     return true;
  //       //   }
  //       // });

  //       // this.optionValueArray = this.optionValueArray.filter((item, k) => {
  //       //   if (k === index) {
  //       //     return false;
  //       //   } else {
  //       //     return true;
  //       //   }
  //       // // });

  //       // if (this.editId && this.isVariantExist === true) {
  //       if (!['', null, undefined].includes(option?.value?.id)) {
  //         const params: any = {};
  //         params.id = option.value.id;
  //         this.productSandbox.deleteProbabilityOption(params);
  //         this.productSandbox.deleteProbabilityOption$.subscribe(data => { })
  //       }

  //     }
  //   })

  //   // }
  //   // }
  // }

  checkLength(count) {
    const length = +count;
    const diff = 5 - length;
    this.emptyVariant = [];

    if (diff === 0) {
      return false;
    } else {
      for (let i = 0; i < diff; i++) {
        this.emptyVariant.push(i);
      }
      return true;
    }
  }



  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onskuchange(event) {
    this.variantForm.value.variantItems.forEach(data => {
      if (event === data.sku) {
      }
    })

  }


   // Approve Product
   approveProduct() {
    const param = {
      productIds: this.editId,
      approvalFlag: '1',
    };
    this.sandbox.approveProduct(param)
    this.subscriptions.push(this.sandbox.approveProduct$.subscribe(val => {
      if (val?.status == 1) {
        this.cancel();
      }
    }));
  }

  // Reject Product modal popup
  rejectComment() {
    const modalRef2 = this.popup.open(RejectsModelComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', centered: false, animation: false,
    });
    // this.productItem = {...this.productItem, vendorName: this.productItem.vendor.vendorName, companyName:this.productItem.vendor.companyName, companyLogoPath: this.productItem.vendor.companyLogoPath, companyLogo: this.productItem.vendor.companyLogo}
    modalRef2.componentInstance.fullData = this.productItem;
    modalRef2.componentInstance.sellerId = this.sellerId;
    modalRef2.result.then(result => {
      if (result === 'success') {
        this.cancel();
      }
    });
  }



  cancel() {
    if (this.routeName == 'AllProducts') {
      this.router.navigate(['/vendors/manage-products/seller-products'])
    }
    if (this.routeName == 'ApprovedProducts') {
      this.router.navigate(['/vendors/manage-products/approval'])
    }
    if (this.routeName == 'RejectedProducts') {
      this.router.navigate(['/vendors/manage-products/reject'])
    }
    if (this.routeName == 'WaitingForApproval') {
      this.router.navigate(['/vendors/manage-products/Waiting'])
    }
  }
  htmlTagConversion(data) {
    const val = data.replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;', "'")
      .replaceAll('&sbquo;', '‚')
      .replaceAll('&#61;', '=')
      .replaceAll('&#45;', '-')
      .replaceAll('&hellip;', '…')
      .replaceAll('&commat;', '@')
      .replaceAll('&copy;', '©')
      .replaceAll('&#35;', '#')
      .replaceAll('&ldquo;', '“')
      .replaceAll('&rsquo;', '’')
      .replaceAll('&lsquo;', '‘')
      .replaceAll('&trade;', '™')
      .replaceAll('&reg;', '®')
      .replaceAll('&ndash;', '–')
      .replaceAll('&eacute;', 'é')
      .replaceAll('&euro;', '€')
      .replaceAll('&pound;', '£');
    return val;
  }

  changeStatus(status, index) {
    this.variantForm.value.variantItems[index].isActive = status == true ? false : true;
  }

  ngOnDestroy() {
    this.productSandbox.ClearProductDetails();
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}



