/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map, mergeMap } from 'rxjs/operators';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit{

  public pageInfo;
  public dynamicInfo: any = {};

  public lastPath: any = '';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
     public breadcrumbService: BreadcrumbService
  ) {
    
    this.router.onSameUrlNavigation = 'reload';

    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .pipe(map(() => this.activatedRoute))
    //   .pipe(
    //     map(route => {
    //       this.pageInfo = {};
    //       route.url.subscribe(data => {
    //         if (data.length > 1) {
    //           this.lastPath = data[1].path;
    //         }
    //       });

    //       while (route.firstChild) {
    //         route = route.firstChild;
    //       }
    //       return route;
    //     })
    //   )
    //   .pipe(filter(route => route.outlet === 'primary'))
    //   .pipe(mergeMap(route => route.data))
    //   .subscribe(event => {
    //     if(this.dynamicInfo?.urls?.length > 0) {
    //       this.pageInfo = structuredClone(this.dynamicInfo);
    //     } else {
    //       this.pageInfo = event;
    //     }
    //   });


  }


  ngOnInit() {
    // Initial breadcrumb setup
    this.updateBreadcrumb(this.activatedRoute);

    // Subscribe to router events for dynamic updates
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb(this.activatedRoute);
      });

      this.breadcrumbService.breadcrumb$.subscribe((breadcrumbInfo) => {
        if (breadcrumbInfo?.type == 'update') {
          this.updateBreadcrumbInfo(breadcrumbInfo);
        } else if(breadcrumbInfo?.type === 'reset') {
          this.dynamicInfo = {urls: []};
          this.pageInfo = {urls: []};
        }
      });

  }


  private updateBreadcrumb(route: ActivatedRoute): void {
    const lastRoute = this.getLastChild(route);
    if (lastRoute) {
      const data = lastRoute.snapshot.data;
      if (data) {
        if(this.dynamicInfo?.urls?.length > 0) {
          this.pageInfo = structuredClone(this.dynamicInfo);
        } else {
          this.pageInfo = data;
        }
      }
    }
  }

  private getLastChild(route: ActivatedRoute): any {
    let lastChild = route;
    while (lastChild.firstChild) {
      lastChild = lastChild.firstChild;
    }
    return lastChild;
  }

  private updateBreadcrumbInfo(breadcrumbInfo: any): void {
    this.dynamicInfo = breadcrumbInfo.data;
    this.pageInfo =  breadcrumbInfo.data;
  }
  
}
