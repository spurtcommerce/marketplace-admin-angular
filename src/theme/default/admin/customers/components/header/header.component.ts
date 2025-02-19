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
import { permissionConfigs } from '../../../shared/components/services/permission.constant';

@Component({
  selector: 'app-cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerHeaderComponent implements OnInit {
  checked: boolean;
  permissionVals: any = permissionConfigs;
appHideIfUnauthorized: any;

  constructor(public titleService: Title) { }
  
  
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.checked = false;
  }

  ngOnInit() {
    this.titleService.setTitle('Customer');
  }
  onClick(e) {
    this.checked = true;
  } 
  combineArrays(...arrays: any[]): any[] {
    return [].concat(...arrays);
  }
}
