
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public id:any;
  private subscription = new Subscription();

  constructor( public router : Router
   
  ) {
    this.router.events.subscribe((url:any) => {
      this.id=+this.router.url.split('?')[0].split('/').pop()
    }); 
  }

  currentURL: any;
  breadcrumbs: any;




  

  ngOnInit(): void {

    // this.getUrl()
    this.breadcrumbs="Approval Pending List"
  }


  ngAfterViewChecked(){
    
    this.getUrl()
  }
  

  getUrl(){
    this.currentURL = window.location.hash;

    if (this?.currentURL?.split("?") == "#/seller/manage-seller/seller/seller-onboarding/verification") {
      this.breadcrumbs = "Approval Pending List"
    }

    if (this?.currentURL?.split("?") == "#/seller/manage-seller/seller/seller-onboarding/approved") {
      this.breadcrumbs = "Approved Sellers List"
    }

    if (this?.currentURL?.split("?") == "#/seller/manage-seller/seller/seller-onboarding/rejected") {
      this.breadcrumbs = "Rejected Sellers List"
    }

  }

  sellerIDClear() {
    this.getUrl()
    sessionStorage.removeItem('seller-Id');
    sessionStorage.removeItem('breadcrumbs');
    sessionStorage.removeItem('countryName');
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
