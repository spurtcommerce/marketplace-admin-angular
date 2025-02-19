import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UntypedFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommentmodalComponent } from "../commentmodal/commentmodal.component";
import { verifyField } from "./verify.constant";
import {
  getFormControlsFields,
  getTypes,
} from "../../../../../../../../../../theme/default/admin/shared/components/common-form/common-form.constant";
import { companyVerifySandbox } from "../../../../../../../../../../../src/core/admin/manageseller/companyverify/companyverify.sandbox";

import { DataService } from "../data.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  private subscription = new Subscription();
  private subscriptions: Array<Subscription> = [];
  //form
  dynamicFormGroup: any;
  model: any = verifyField;
  dynamicControls: any = [];
  public value: any;

  //list value
  listvalue: any = [];

  //details
  details: any;

  //submit
  submitted: any = false;

  //country
  countryName: any;

  //CompanyName
  CompanyName: any;

  //checked
  companyverfifyCheckedStatus: boolean;
  BusinessAddressCheckedStatus: boolean;
  gstPanVerifyCheckedStatus: boolean;

  //disableState:
  companyverfiyDisableState: boolean = false;
  BusinessDisableState: boolean = false;
  TaxDisableState: boolean = false;

  //loader
  loader: any = false;
  dataSharing: any = {};
  companyVerify: any;
  country: any;

  verifiyDetails: any = {};

  statusName: any;
  constructor(
    private modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public http: HttpClient,
    public sandbox: companyVerifySandbox,
    public router: Router,
    private service: DataService,
    public titleService: Title
  ) {
    this.titleService.setTitle('Seller KYC Request');
  }
  ngOnInit(): void {
    this.buildForm();
    this.companylist();
  }

  // form
  private buildForm(): void {
    const formGroupFields = getFormControlsFields(this.model);
    this.dynamicFormGroup = this.fb.group(formGroupFields);
    this.model.forEach((element: any) => {
      const val = getTypes(element, this.dynamicFormGroup);
      this.dynamicControls = [...this.dynamicControls, val];
    });
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
    modelRef.componentInstance.name = "Company Details";
    modelRef.componentInstance.arrvalue = this.details;
  }
  /*list*/
  companylist(): void {
    const sellerId = sessionStorage.getItem("seller-Id");
    if (!["", null, undefined].includes(sellerId)) {
      const params = {
        vendorId: sellerId ? sellerId : "",
      };

      this.sandbox.companyVerifyList(params);
    }
    this.subscriptions.push(
      this.sandbox.companyVerifyList$.subscribe((ress) => {
        this.companyVerify = ress?.data?.verification?.companyDetail;
        if (ress.status == 1) {
          this.getCountry();
          var res = ress.data;
          this.country = res.countryName;

          this.dynamicFormGroup.controls["companyRegisteredCountry"]?.setValue(
            res?.countryName
          );
          this.dynamicFormGroup.controls["businessName"]?.setValue(
            res?.companyName
          );
          this.dynamicFormGroup.controls["businessTypes"]?.setValue(
            res?.businessType
          );
          this.dynamicFormGroup.controls["businessSegment"]?.setValue(
            res?.businessSegment
          );
          this.dynamicFormGroup.controls["industry"]?.setValue(
            res?.industryName
          );
          this.dynamicFormGroup.controls["productCategory"]?.setValue(
            res?.productCategory
          );
          this.dynamicFormGroup.controls["sellerLegalName"]?.setValue(
            res?.customerDetail?.firstName + res?.customerDetail?.lastName
          );
          this.dynamicFormGroup.controls["businessDisplayName"]?.setValue(
            res?.displayNameUrl
          );
          this.dynamicFormGroup.controls["address1"]?.setValue(
            res?.companyAddress1
          );
          this.dynamicFormGroup.controls["address2"]?.setValue(
            res?.companyAddress2
          );
          this.dynamicFormGroup.controls["area"]?.setValue(
            res?.companyLocation
          );
          this.dynamicFormGroup.controls["city"]?.setValue(res?.companyCity);
          this.dynamicFormGroup.controls["stateName"]?.setValue(
            res?.stateName
          );
          this.dynamicFormGroup.controls["pincode"]?.setValue(res?.pincode);
          this.dynamicFormGroup.controls["countryName"]?.setValue(
            res?.countryName
          );
          this.dynamicFormGroup.controls["phoneNumber"]?.setValue(
            res?.customerDetail?.mobileNumber
          );
          this.dynamicFormGroup.controls["gstNumber"]?.setValue(
            res?.companyTaxNumber
          );
          this.dynamicFormGroup.controls["panNumber"]?.setValue(
            res?.businessNumber
          );
          this.statusName = res?.verification?.companyDetail == 1 ? 1 : 0

          this.companyverfifyCheckedStatus =
            res?.verificationStatus?.companyDetailStatus?.detailsInfo
              ?.companyDetails == 1
              ? true
              : false;
          this.BusinessAddressCheckedStatus =
            res?.verificationStatus?.companyDetailStatus?.detailsInfo
              ?.businessAddress == 1
              ? true
              : false;
          this.gstPanVerifyCheckedStatus =
            res?.verificationStatus?.companyDetailStatus?.detailsInfo
              ?.gstPanNumbers == 1
              ? true
              : false;
          this.listvalue = res;

          this.details = res;
        }
        this.dataSharing = ress.data?.verification;
        this.verifiyDetails = res;
        this.DataShare();
        this.VerifyShare();
      })
    );
  }

  // DataShare
  DataShare() {
    this.service.setNewUserInfo(this.dataSharing);
  }

  //VerifyShare
  VerifyShare() {
    this.service.setUserInfo(this.verifiyDetails);
  }

  //country

  getCountry() {
    this.countryName = sessionStorage.getItem("countryName");
    var companyName = sessionStorage.getItem("CompanyName");
    if (companyName) {
      this.CompanyName = companyName;
    }
  }
  //next
  next() {
    this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/bank"]);
  }

  verifySingle(value) {
    this.statusName = value
    this.loader = true;
    this.submitted = true;
    if (this.dynamicFormGroup.invalid) {
      return;
    }
    const params = {
      id: sessionStorage.getItem("seller-Id"),
      companyDetail: value,
    };
    this.sandbox.companyVerifychecked(params);
    this.subscriptions.push(
      this.sandbox.companyVerifychecked$.subscribe((val) => {
        if (val?.status == 1) {
          this.companylist();
          this.loader = false;
        } else {
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((val) => {
      val.unsubscribe();
    });
  }


}
