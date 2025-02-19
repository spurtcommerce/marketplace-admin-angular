/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { relatedProductsRoutes } from 'add-ons/add-ons.constant';
import { permissionConfigs } from '../../../shared/components/services/permission.constant';

@Component({
  selector: 'app-marketing-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingHeaderComponent implements OnInit {
  checked: boolean;
  crossSellingChecked: boolean;
  routerLinkCheck:any = {};
  permissionVals: any = permissionConfigs;
  constructor(public titleService: Title) { }
  
  
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.checked = false;
    this.crossSellingChecked = false;
  }

  ngOnInit() {
    this.routerLinkCheck.relatedProducts = relatedProductsRoutes
    this.titleService.setTitle('Customer');
  }
  onClick(e) {
    this.checked = true;
    this.crossSellingChecked = false;
  }
  onManageCrossSellingClick(e) {
    this.crossSellingChecked = true;
    this.checked = false;
    
  }

  combineArrays(...arrays: any[]): any[] {
    return [].concat(...arrays);
  }
}
