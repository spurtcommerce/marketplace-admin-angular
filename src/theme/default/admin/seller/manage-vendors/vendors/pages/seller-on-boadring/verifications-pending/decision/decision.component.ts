// Angular Imports
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

// Third Party Imports
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";

// Service
import { DataService } from "../data.service";

// Sandbox
import { companyVerifySandbox } from "../../../../../../../../../../../src/core/admin/manageseller/companyverify/companyverify.sandbox";
import { DecisionVerifySandbox } from "../../../../../../../../../../../src/core/admin/manageseller/decisionverify/decisionverify.sandbox";
import { SellerManagementSandbox } from "../../../../../../../../../../../src/core/admin/manageseller/sellermanagement/sellermanagement.sandbox";
import { VendorGroupSandbox } from "../../../../../../../../../../../src/core/admin/vendor/pages/vendor-group/vendor-group.sandbox";

// Constant
import { DecisionField } from "./decision.constant";

@Component({
  selector: "app-decision",
  templateUrl: "./decision.component.html",
  styleUrls: ["./decision.component.scss"],
})
export class DecisionComponent implements OnInit, OnDestroy {

  approvedSellerDisble: boolean = false;
  sellerGroupId: any;
  sellerForm: any;

  //list value
  listvalue: any = [];

  //details
  details: any;

  //country
  countryName: any;

  //form
  dynamicFormGroup: any;
  model: any = DecisionField;
  dynamicControls: any = [];
  public value: any;

  //verificationStatus
  verificationStatus: any;
  companyDetailStatus: boolean;
  BankAccountInfo: boolean;
  Documents: boolean;
  SubscriptionPlan: boolean;
  Policies: boolean;
  Categories: boolean;
  Storefront: boolean;
  DeliveryMethods: boolean;
  DistributionPoints: boolean;
  PaymentInfo: boolean;
  decision: Boolean

  //StatusChecking
  approvedState: boolean;

  //submit
  submitted: any = false;
  //  commentlist
  commentlist: any;
  other_content: any;
  //commentstate
  commentstate: any;
  //submit
  submit: any;
  commentsLength: any = [];
  //CompanyName
  CompanyName: any;

  // subscription
  private subscription = new Subscription();


  // verification
  dataSharing: any = {}
  approvedBtnhide: any;
  rejectedBtnhide: any;
  AllCommentstate: any = [];


  verifiyDetails: any = {};

  constructor(
    public sandbox: DecisionVerifySandbox,
    public sandboxcompany: companyVerifySandbox,
    public router: Router,
    public sandoxcomment: SellerManagementSandbox,
    public toaster: ToastrService,
    private ref: ChangeDetectorRef,
    private service: DataService,
    public vendorGroupList: VendorGroupSandbox,
    public titleService: Title
  ) {
    this.titleService.setTitle('Seller KYC Request');
  }

  ngOnInit(): void {
    this.companylist();
    this.getVendorGroupList();
  }

  //country
  getCountry() {
    this.countryName = sessionStorage.getItem("countryName");
    var companyName = sessionStorage.getItem("CompanyName");
    if (companyName) {
      this.CompanyName = companyName;
    }
  }

  getVendorGroupList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = '';
    param.status = '';
    param.count = 0;
    this.vendorGroupList.vendorGroupList(param);
  }

  /*list*/
  companylist(): void {
    var sellerId = sessionStorage.getItem("seller-Id");
    const params = {
      vendorId: sellerId ? sellerId : "",
    };
    this.sandboxcompany.companyVerifyList(params);

    this.subscription.add(
      this.sandboxcompany.companyVerifyList$.subscribe((ress) => {

        if (ress.status == 1) {
          // this.subscription.add(this.getCountry());
          var res = ress?.data;
          this.commentstate = res?.verificationComment[res?.verificationComment.length - 1]?.comment;
          this.AllCommentstate = res?.verificationComment;
          this.details = res;
          this.commentlist = res?.verificationDetailComment;
          this.commentsLength = this.commentlist?.length;
          this.verificationStatus = res?.verificationStatus;
          this.companyDetailStatus = res?.verification?.companyDetail == 1 ? true : false;
          this.BankAccountInfo = res?.verification?.bankAccount == 1 ? true : false;
          this.Documents = res?.verification?.document == 1 ? true : false;
          this.SubscriptionPlan = res?.verificationStatus?.subscriptionPlanStatus == 1 ? true : false;
          this.Policies = res?.verificationStatus?.policieStatus == 1 ? true : false;
          this.Categories = res?.verificationStatus?.categoryStatus == 1 ? true : false;
          this.Storefront = res?.verificationStatus?.storeFrontStatus == 1 ? true : false;
          this.DeliveryMethods = res?.verificationStatus?.deliveryMethodStatus == 1 ? true : false;
          this.DistributionPoints = res?.verificationStatus?.distributionPointStatus == 1 ? true : false;
          this.PaymentInfo = res?.verificationStatus?.paymentInfoStatus == 1 ? true : false;
          this.decision = res?.verification?.decision;
          this.approvedBtnhide = res?.kycStatus == 'verified' ? true : false;
          this.rejectedBtnhide = res?.approvalFlag == 2 ? true : false;
          this.dataSharing = res?.verification;
          this.sellerGroupId = res?.vendorGroupId ? res?.vendorGroupId : null;
          this.DataShare();
          this.verifiyDetails = res;
          this.VerifyShare();
          this.ref.detectChanges();
        }
        this.checkedStatusUpdate();
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

  checkedStatusUpdate() {
    this.approvedState = this.companyDetailStatus == true && this.BankAccountInfo == true && this.Documents == true;
    this.approvedState = !this.approvedState;
    this.ref.detectChanges();
  }

  ApprovedSeller() {
    if (this.commentstate?.length == 0 || this.commentstate?.length == undefined) {
      this.submit = true;
      return;
    } else {
      const params = {
        comment: this.commentstate,
        kycStatus: 'verified',
        vendorId: sessionStorage.getItem("seller-Id"),
        deliveryMethod: 1,
        subscriptionPlan: 1,
        distributionPoint: 1,
        policy: 1,
        storeFront: 1,
        paymentInfo: 1,
        decision: 1,
        category: 1,
        vendorGroupId: this.sellerGroupId
      };
      this.sandoxcomment.comment(params);
      this.sandoxcomment.comment$.subscribe((val) => {
        if (val.status == 1) {
          this.approvedSellerDisble = true;
          this.companylist();
          this.router.navigate(['seller/manage-seller/seller/seller-onboarding/approved'])
        }
      });
    }
  }

  RejectedSeller() {
    if (this.commentstate?.length == 0 || this.commentstate?.length == undefined
    ) {
      this.submit = true;
      return;
    } else {
      this.submit = false;
      const params = {
        comment: this.commentstate,
        kycStatus: 'rejected',
        vendorId: sessionStorage.getItem("seller-Id"),
        deliveryMethod: 1,
        subscriptionPlan: 1,
        distributionPoint: 1,
        policy: 1,
        storeFront: 1,
        paymentInfo: 1,
        decision: 1,
        category: 1,
        vendorGroupId: this.sellerGroupId
      };

      this.sandoxcomment.comment(params);
      this.sandoxcomment.comment$.subscribe((val) => {
        if (val.status == 1) {
          this.companylist();
          this.approvedSellerDisble = true;
          this.router.navigate(['seller/manage-seller/seller/seller-onboarding/rejected'])
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
