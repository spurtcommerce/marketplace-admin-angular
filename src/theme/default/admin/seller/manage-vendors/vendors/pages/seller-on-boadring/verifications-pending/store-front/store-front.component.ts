import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { StoreVerifySandbox } from "../../../../../../../../../../../src/core/admin/manageseller/storeVerify/storeverify.sandbox";
import { ConfigService } from "src/core/admin/service/config.service";
import { CommentmodalComponent } from "../commentmodal/commentmodal.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-store-front",
  templateUrl: "./store-front.component.html",
  styleUrls: ["./store-front.component.scss"],
})
export class StoreFrontComponent implements OnInit {
  private subscription = new Subscription();

  //list
  listvalue: any = {};
  //details
  details: any;

  //country
  countryName: any;

  //imageUrls
  imageUrls: any;

  //imagelogo
  image: any;

  //imagecover
  coverimage: any;

  //textarae
  textarea: any;

  //CompanyName
  CompanyName: any;

  //checkedStatus:
  storeFrontStatuschecked: boolean;

  //disableState:
  storefrontDisableState: boolean;

  //loader;
  loader: any = false;
  storeFront: any;
  country: any;

  constructor(
    public sandbox: StoreVerifySandbox,
    public configService: ConfigService,
    private modalService: NgbModal,
    public router: Router,
    public titleService: Title
  ) {
    this.titleService.setTitle('Seller KYC Request');
  }

  ngOnInit(): void {
    this.getcompanyList();
    this.getCountry();
  }

  // modal
  opencommentlog(): void {
    var sellerId = sessionStorage.getItem("seller-Id");
    const modelRef = this.modalService.open(CommentmodalComponent, {
      size: "xl",
      windowClass: "commentlogmodal right",
      backdrop: "static",
      backdropClass: "createcr",
    });
    modelRef.componentInstance.id = sellerId;
    modelRef.componentInstance.name = "Storefront";
    modelRef.componentInstance.arrvalue = this.details;
  }

  //country

  getCountry() {
    this.countryName = sessionStorage.getItem("countryName");
    var companyName = sessionStorage.getItem("CompanyName");
    if (companyName) {
      this.CompanyName = companyName;
    }
    this.imageUrls = this.configService.getImageUrl();
  }

  //list

  getcompanyList() {
    var sellerId = sessionStorage.getItem("seller-Id");
    const params = {
      vendorId: sellerId ? sellerId : "",
    };
    if (!["", null, undefined].includes(params.vendorId)) {
      this.sandbox.storeverifyList(params);
    }

    this.subscription.add(
      this.sandbox.storeverifyList$.subscribe((ress) => {
        this.storeFront = ress?.verification?.storeFront;
        if (ress?.length == 0) {
          this.storefrontDisableState = true;
        }
        if (ress?.length == undefined) {
          this.storefrontDisableState = false;
        }

        if (ress.status == 1) {
          const res = ress.data;
          this.country = res?.countryName;
          this.listvalue = res;
          this.textarea = res.companyDescription;
          if ([null, "", undefined].includes(ress.companyLogoPath)) {
            this.image = "assets/img/default-ico.svg";
          } else {
            this.image =
              this.imageUrls +
              "?path=" +
              `${ress.companyLogoPath}` +
              "&name=" +
              `${ress.companyLogo}` +
              "&width=160&height=150";
          }

          if ([null, "", undefined].includes(ress.companyCoverImagePath)) {
            this.coverimage = "assets/img/default-ico.svg";
            this.storefrontDisableState = true;
          } else {
            this.coverimage =
              this.imageUrls +
              "?path=" +
              `${ress.companyCoverImagePath}` +
              "&name=" +
              `${ress.companyCoverImage}` +
              "&width=1920&height=524";
          }
          this.storeFrontStatuschecked =
          ress?.verification?.storeFront == 1
              ? true
              : false;
        }
      })
    );
  }

  verifyChecked(name: string) {
    const params = {
      id: sessionStorage.getItem("seller-Id"),
      storeFrontStatusVerify: this.storeFrontStatuschecked == true ? 1 : 0,
    };
    this.sandbox.storeverify(params);
    this.subscription.add(
      this.sandbox.storeverify$.subscribe((val) => {
        if (val.status == 1) {
          if (
            val?.data.verificationStatus?.storeFrontStatus.detailsInfo
              .storeFront == 1
          ) {
            this.storeFrontStatuschecked = true;
          } else {
            this.storeFrontStatuschecked = false;
          }
        }
      })
    );
  }

  VerifyButton() {
    this.loader = true;
    const params = {
      id: sessionStorage.getItem("seller-Id"),
      storeFrontStatusVerify: 1,
    };
    this.sandbox.storeverify(params);
    this.subscription.add(
      this.sandbox.storeverify$.subscribe((val) => {
        if (val.status == 1) {
          this.getcompanyList();
          this.loader = false;
        }
      })
    );
  }

  pervious() {
    this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/verify"]);
  }

  nextButton() {
    this.router.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/bank"]);
  }
}
