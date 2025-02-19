import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { companyVerifySandbox } from "../../../../../../../../../../core/admin/manageseller/companyverify/companyverify.sandbox";
import { PendingLayoutSandox } from "../../../../../../../../../../core/admin/manageseller/pending-layouts/pending-layout.sandbox";
import { DataService } from "../data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { environment } from "src/environments/environment";
@Component({
  selector: "app-pending-layouts",
  templateUrl: "./pending-layouts.component.html",
  styleUrls: ["./pending-layouts.component.scss"],
})
export class PendingLayoutsComponent implements OnInit {
  valueCheck: boolean;
  private subscription = new Subscription();
  imageUrl: any

  constructor(
    public sandbox: PendingLayoutSandox,
    public cd: ChangeDetectorRef,
    public service: DataService,
    public verifySandbox: companyVerifySandbox,
    public ref: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    private _location: Location
  ) { }

  breadcrumbs: any;

  arrvalue: any;
  updateUserInfo: any = {};
  documentOverallVerify: any;
  listvalue: any;

  ngOnInit(): void {
    //  this.companylist();
    this.service.getNewUserInfo().subscribe((info) => {

      this.documentOverallVerify = info?.documentStatus;
      this.updateUserInfo = info;
      this.ref.detectChanges();
    });


    this.service.getUserInfo().subscribe((inf) => {

      this.listvalue = inf


      if (inf && inf?.customerDetail && !['', null, undefined].includes(inf?.customerDetail?.avatar)) {
        this.imageUrl = environment.imageUrl + '?path=' + `${inf?.customerDetail?.avatarPath}` + '&name=' + `${inf?.customerDetail?.avatar}` + '&width=160&height=150';
      } else {
        this.imageUrl = ''
      }


    
    })

    var data = sessionStorage.getItem("breadcrumbs");

    if (data) {
      this.breadcrumbs = data;
    }
    const params = {
      id: sessionStorage.getItem("seller-Id"),
    };

    this.sandbox.pendingLayoutsList(params);
    this.sandbox.pendingLayoutsList$.subscribe((val) => {
      this.cd.detectChanges();
    });
  }

  Back() {
    this.router.navigate(['/seller/manage-seller/seller/seller-onboarding/verification'])
  }

  companylist(): void {
    this.updateUserInfo = {};
    const sellerId = sessionStorage.getItem("seller-Id");
    const params = {
      vendorId: sellerId ? sellerId : "",
    };
    this.verifySandbox.companyVerifyList(params);
    this.verifySandbox.companyVerifyList$.subscribe((ress) => {
      this.updateUserInfo = ress?.data?.verification;
      this.updateUserInfo = { ...this.updateUserInfo };
      this.ref.detectChanges();
    });
  }
}
