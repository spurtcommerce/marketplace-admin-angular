// Angular Imports
import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

// Third Party Imports
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import * as _moment from "moment";

// Sandbox
import { bankVerifySandbox } from "../../../../../../../../../../../src/core/admin/manageseller/bankVerify/bankVerify.sandbox";
import { companyVerifySandbox } from "../../../../../../../../../../../src/core/admin/manageseller/companyverify/companyverify.sandbox";
import { DataService } from "../data.service";
import { SellerService } from "src/core/admin/vendor/pages/seller/seller.service";

// component
import { CommentmodalComponent } from "../commentmodal/commentmodal.component";

// Constant 
import { getFormControlsFields, getTypes } from "src/theme/default/admin/shared/components/common-form/common-form.constant";
import { bankFields } from "./bank.constant";
import { CompanyVerifyService } from "src/core/admin/manageseller/companyverify/companyverify.service";


@Component({
  selector: "app-bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.scss"],
})
export class BankComponent implements OnInit {

  //form
  dynamicFormGroup: any;
  model: any = bankFields;
  dynamicControls: any = [];
  submitted: any = false;
  data: any;

  //details value
  details: any;

  //seller-info
  sellerinfo: any;

  //checked
  bankAccountVerify: any;

  //checkedStatus
  bankcheckStatus: boolean;

  //country
  countryName: any;

  //companyName
  CompanyName: any;

  //disableState:
  bankDisableState: boolean;

  //loader
  loader: boolean = false;
  bankVerify: any;
  country: any;
  dataSharing: any = {};
  verifiyDetails: any = {};

  private subscription = new Subscription();
  countryId: any;
  zoneId: any;
  empty: any = [undefined, null, ''];
  kycStatus: any;

  StatusName:any;

  constructor(
    public fb: UntypedFormBuilder,
    public sandbox: bankVerifySandbox,
    public router: Router,
    public sandboxcompany: companyVerifySandbox,
    private modalService: NgbModal,
    private service: DataService,
    public titleService: Title,
    private Service: SellerService,
    private CompanyVerifyService: CompanyVerifyService
  ) {
    this.titleService.setTitle('Seller KYC Request');
  }

  ngOnInit(): void {
    this.buildForm();
    // this.bankData();
    this.getList();

    this.subscription.add(this.CompanyVerifyService.verificationSettingApi({}).subscribe((val) => {
      if (val && val?.status == 1) {
        this.kycStatus = val?.data[0].kycMandate
      }
    }));



  }

  //form
  private buildForm(): void {
    const formGroupFields = getFormControlsFields(this.model);
    this.dynamicFormGroup = this.fb.group(formGroupFields);
    this.model.forEach((element: any) => {
      const val = getTypes(element, this.dynamicFormGroup);
      this.dynamicControls = [...this.dynamicControls, val];
    });
  }
  //list

  getList() {
    var sellerId = sessionStorage.getItem("seller-Id");
    const params = {
      vendorId: sellerId ? sellerId : "",
    };
    this.sandboxcompany.companyVerifyList(params);
    this.subscription.add(
      this.sandboxcompany.companyVerifyList$.subscribe((val) => {
        this.bankVerify = val?.data?.verification?.bankAccount;

        if (val.status == 1) {
          const res = val.data;
          this.sellerinfo = res;
          this.details = res;
          this.countryId = res.bankAccount.bankCountryId;
          this.zoneId = res.bankAccount.bankStateId;
          this.bankcheckStatus =
            res?.verificationStatus?.bankAccountStatus?.detailsInfo
              ?.bankAccountInfo == 1
              ? true
              : false;
          this.dynamicFormGroup.controls["accountHolderName"]?.setValue(
            res?.bankAccount?.accountHolderName
          );
          this.dynamicFormGroup.controls["accountNumber"]?.setValue(
            res?.bankAccount?.accountNumber
          );
          this.dynamicFormGroup.controls["accountSince"]?.setValue(res?.bankAccount?.accountCreatedOn)

          this.dynamicFormGroup.controls["addressLine1"]?.setValue(
            res?.bankAccount?.bankAddress1
          );
          this.dynamicFormGroup.controls["addressLine2"]?.setValue(
            res?.bankAccount?.bankAddress2
          );
          this.dynamicFormGroup.controls["branch"]?.setValue(
            res?.bankAccount?.branch
          );
          this.dynamicFormGroup.controls["city"]?.setValue(res?.bankAccount?.bankCity);
          this.dynamicFormGroup.controls["bankName"]?.setValue(
            res?.bankAccount?.bankName
          );
          this.dynamicFormGroup.controls["bicCode"]?.setValue(
            res?.bankAccount?.bic
          );
          this.dynamicFormGroup.controls["ifscCode"]?.setValue(
            res?.bankAccount?.ifsc
          );
          this.dynamicFormGroup.controls["area"]?.setValue(res?.bankAccount?.bankArea);
          this.dynamicFormGroup.controls["pincode"]?.setValue(res?.bankAccount?.bankPincode);
          var companyName = sessionStorage.getItem("CompanyName");
          if (companyName) {
            this.CompanyName = companyName ?? res.bankAccount.bankCountryId;
          }
          this.dataSharing = res?.verification;
          this.StatusName = res?.verification?.bankAccount == 1 ? 1 : 0
          this.verifiyDetails = res;
          this.getCountryList(res.bankAccount.bankCountryId);
          this.DataShare();
          this.VerifyShare();
        }
      })
    );
  }

  // Get Country List
  getCountryList(id) {
    const param: any = {};
    param.status = 1;
    this.Service.countrylist(param).subscribe((list) => {
      if (list.data) {
        list.data.forEach(data => {
          if (data?.countryId == id) {
            this.dynamicFormGroup.controls["country"]?.setValue(data?.name);
          };
        });
        if (!this.empty.includes(id))
          this.getZoneList(id)
      }
    });

  }

  // get zone list 
  getZoneList(id) {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.count = 0;
    params.keyword = '';
    params.countryId = id;
    this.Service.zoneList(params).subscribe((val) => {
      if (val.data) {
        val.data.forEach(zone => {
          if (zone.zoneId == this, this.zoneId)
            this.dynamicFormGroup.controls["state"]?.setValue(zone.name);
        })
      }
    });
  }

  // DataShare
  DataShare() {
    this.service.setNewUserInfo(this.dataSharing);
  }

  //VerifyShare
  VerifyShare() {
    this.service.setUserInfo(this.verifiyDetails);
  }

  dateFormatChange(date: string) {
    const formatDate = _moment(date, "DD/MM/YYYY")
      .format("DD/MM/YYYY")
      .split("/");
    return formatDate[0] + "/" + formatDate[1] + "/" + formatDate[2];
  }

  // modal
  opencommentlog(): void {
    var vendorId = sessionStorage.getItem("seller-Id");
    const modelRef = this.modalService.open(CommentmodalComponent, {
      size: "xl",
      windowClass: "commentlogmodal right",
      backdrop: "static",
      backdropClass: "createcr",
    });
    modelRef.componentInstance.id = vendorId;
    modelRef.componentInstance.name = "Bank Account Info";
    modelRef.componentInstance.decision = 0;
    modelRef.componentInstance.arrvalue = this.details;
  }

  pervious() {
    this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/verify"]);
  }

  //next
  next() {
    this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/documents"]);
  }

  //cancel
  cancel() {
    this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/documents"]);
  }

  apicall(value) {
    const params = {
      id: sessionStorage.getItem("seller-Id"),
      bankAccount: value,
    };

    this.sandbox.bankVerifyChecked(params);
    this.subscription.add(
      this.sandbox.bankVerifyChecked$.subscribe((val) => {
        if (val.status == 1) {
          this.getList();
          this.loader = false;
        }
      })
    );
  }

  withoutcondition() {


  }

  verifiedButton(value) {
    this.loader = true;
    this.submitted = true;

    // this.withoutcondition()

    if (this.kycStatus == 1) {
      if (this.dynamicFormGroup.invalid) {
        return;
      }
      this.apicall(value);
    } else {
      this.apicall(value);
    }



  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
