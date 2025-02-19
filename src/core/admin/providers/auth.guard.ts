/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { PermissionServices } from '../../../theme/default/admin/shared/components/services/permission.services';
import { apiResponse, hasTrueValue } from 'src/theme/default/admin/shared/components/services/permission.constant';

@Injectable()
export class AuthGuard {
  constructor(
    private router: Router, public permissionServices: PermissionServices,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkLogin(state.url, route.data['permissionKey'], route.data['permissionForRoot']);
  } 
  checkLogin(url: string, permissionKey: string = '', permissionForRoot: Array<any> = []): Promise<boolean> | boolean {

    let permission: any = this.permissionServices.getPermissionConfig();
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
      let value = localStorage.getItem('keepMeSignIn')
      if (!['', null, undefined, 'false'].includes(value)) {
        currentUser = localStorage.getItem('adminUserdetail') ? JSON.parse(localStorage.getItem('adminUserdetail')) : null;
      } else {
        currentUser = sessionStorage.getItem('adminUserdetail') ? JSON.parse(sessionStorage.getItem('adminUserdetail')) : null;
      }
    }

    let permissionValue = !['',null,undefined,{},'{}'].includes(sessionStorage.getItem('permissions'))?JSON.parse(sessionStorage.getItem('permissions')):apiResponse

    if (!['', null, undefined].includes(currentUser)) {
      if (url === '/auth/login' || url === '/auth/forgot-password') {
        this.router.navigate(['/dashboard']);
        return false;
      }
   
      if (permissionForRoot.length > 0 && !hasTrueValue(permissionForRoot)) {
        return false
      }

      const val = this.permissionServices.getPermissionValues();
     
      if (permissionKey && !permissionValue[permissionKey]) {

        return false;
      }
      return true;

    } else {
      if (url === '/auth/login' || url === '/auth/forgot-password') {
        return true;
      }
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
