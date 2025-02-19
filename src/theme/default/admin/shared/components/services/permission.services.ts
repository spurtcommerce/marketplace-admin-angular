/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';

import { Api } from '../../../../../../core/admin/providers/api/api';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class PermissionServices extends Api {
  private URL = environment.baseUrl;
  permissions: any = []; // Store the actions for which this user has permission
  currentUser: any;
  public permissionConfig: any;


  getPermissionConfig() {
    return this.permissionConfig;
  }


  initializePermissionConfig() {}

  hasPermission(authGroup: string): Promise<boolean> | boolean {

    this.permissions = localStorage.getItem('permissions')? JSON.parse(localStorage.getItem('permissions')):JSON.parse(sessionStorage.getItem('permissions'));
    const role: number = localStorage.getItem('adminUser')?JSON.parse(localStorage.getItem('adminUser')) :JSON.parse(sessionStorage.getItem('adminUser'));
    const permissionKeys = this.permissions
      ? Object.keys(this.permissions)
      : [];



    if (role['userGroup']?.groupId === 1) {
      return true;
    } else if (
      permissionKeys.length > 0 &&
      permissionKeys.indexOf(authGroup) > -1 &&
      this.permissions[authGroup]
    ) {
      return true;
    }
  }

  // This method is called once and a list of permissions is stored in the permissions property
  initializePermissions() {
    return new Promise((resolve, reject) => {
      // Call API to retrieve the list of actions this user is permitted to perform.
      // In this case, the method returns a Promise, but it could have been implemented as an Observable
      this.http
      .get<any>(this.URL + '/permission-module/permission-me')
        .subscribe(
          response => {
            
            const permissions = response.data;
              sessionStorage.setItem('permissions', JSON.stringify(permissions ? permissions:{}));
          },
          err => {
            reject(err);
          }
        );
    });
  }

  
  getPermissionValues() {
    return JSON.parse(sessionStorage.getItem('permissions')) ?? {};
   }

}
