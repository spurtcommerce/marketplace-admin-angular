import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
// sandbox
import { documentVerifySandbox } from "../../../../../../../../../../../src/core/admin/manageseller/documents/document.sandbox";
import { companyVerifySandbox } from "../../../../../../../../../../../src/core/admin/manageseller/companyverify/companyverify.sandbox";

//service
import { documentVerifyService } from "../../../../../../../../../../../src/core/admin/manageseller/documents/document.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Custom } from "./document.constant";
import { Subscription } from "rxjs";
import { CommentmodalComponent } from "../commentmodal/commentmodal.component";
import { environment } from "src/environments/environment";
import { DataService } from "../data.service";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements OnInit {
  private subscription = new Subscription();
  private subscriptions: Array<Subscription> = [];
  //Table
  custom: any = Custom;
  //storing value for data
  data: any = [];
  checked: boolean;
  ischeck: any;
  //storing value for details
  detailsData: any;
  //country
  countryName: any;
  //seller-info
  sellerinfo: any;
  DocumentId: any;
  //checkBox
  DocumentCheckedStatus: any = {};
  DataArray: any = [];


  //loader:
  loader: boolean = false;
  pdfData: any;
  myFilesObj: any;
  baseUrl = environment.baseUrl
  documentVerifyStatus: any;
  documentStatusVerify: any;
  country: any;
  DocumenData: any;
  dataSharing: any = {};
  verifiyDetails: any = {};

  StatusName:any;
  constructor(
    public route: Router,
    public modalService: NgbActiveModal,
    private model: NgbModal,
    public sandbox: documentVerifySandbox,
    public Sandbox: companyVerifySandbox,
    public service: documentVerifyService,
    public http: HttpClient,
    private ref: ChangeDetectorRef,
    private services: DataService,
    public titleService: Title
  ) {
    this.titleService.setTitle('Seller KYC Request');
  }

  ngOnInit(): void {
    this.getList();

  }

  //buttonAction
  buttonAction(e: any) {
    switch (e.key) {
      case "checkBox":
        this.documentVerify(e);
        break;
      case "buttonGroup":

        this.pdfDocumentView(e)
        break;
    }
  }

  //details
  getList() {
    var sellerId = sessionStorage.getItem("seller-Id");
    const params = {
      vendorId: sellerId ? sellerId : "",
    };
    this.Sandbox.companyVerifyList(params);
    this.subscriptions.push(
      this.Sandbox.companyVerifyList$.subscribe((ress: any) => {

        if (ress.status == 1) {
          const res = ress.data;
          this.documentStatusVerify = res?.verification?.document;
          ress.data.vendorDocuments.forEach(val => {
            val.documentTitle = val.document.name;
          })
          this.DocumenData = ress.data.vendorDocuments
          this.DocumenData = [...this.DocumenData]
          this.ref.detectChanges();
          this.country = res.countryName
          this.sellerinfo = res;
          this.detailsData = res;
          var countryNames = sessionStorage.getItem("countryName");
          if (countryNames) {
            this.countryName = countryNames;
          }
          this.dataSharing = ress.data?.verification;
          this.StatusName = ress.data?.verification?.document == 1 ? 1 : 0
          this.verifiyDetails = ress?.data;
          this.DataShare();
          this.VerifyShare();
        }
      })
    );
  }


  // verify
  documentVerify(item: any): void {
    var sellerId = sessionStorage.getItem("seller-Id");

    let finalData: any = {
      vendorId: sellerId ? sellerId : "",
      documents: [
        {
          documentId: +item.target.value,
          status: item.target.checked == true ? 1 : 0,
        }
      ]
    }
    this.sandbox.DocumentVerifynew(finalData);
    this.sandbox.DocumentVerifynew$.subscribe(res => {
      if (res?.status == 1) {
        this.getList()
      }
    })
  }

  documentVerifybutton(value) {
    this.loader = false
    const params = {
      id: sessionStorage.getItem('seller-Id'),
      document: value,
    };
    this.sandbox.documentVerifyChecked(params);
    this.sandbox.documentVerifyChecked$.subscribe(res => {

      if (res?.status == 1) {
        this.loader = false
        this.getList()
      } else {
      }
    })
  }

  // modal
  opencommentlog(): void {
    var vendorId = sessionStorage.getItem('seller-Id')
    const modelRef = this.model.open(CommentmodalComponent, {
      size: 'xl', windowClass: 'commentlogmodal right', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.id = vendorId;
    modelRef.componentInstance.name = "Document";
    modelRef.componentInstance.decision = 0;
    modelRef.componentInstance.arrvalue = this.data;
  }

  // DataShare
  DataShare() {
    this.services.setNewUserInfo(this.dataSharing);
  }

  //VerifyShare
  VerifyShare() {
    this.services.setUserInfo(this.verifiyDetails)
  }

  //cancel
  cancel() {
    this.route.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/bank"]);
  }

  //next
  next() {
    this.route.navigate(["/seller/manage-seller/seller/seller-onboarding/verify/decision"]);
  }

  pdfDocumentView(data) {
    window.open(`${this.baseUrl}/media/document?key=${data.filePath}${data.fileName}`)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(val => val.unsubscribe())
  }


}
