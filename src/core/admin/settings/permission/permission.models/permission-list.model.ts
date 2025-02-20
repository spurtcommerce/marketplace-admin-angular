/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class PermissionListModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;
  public status: number;

  constructor(permissionlistForm: any) {
    this.limit = permissionlistForm.limit || 0;
    this.offset = permissionlistForm.offset || 0;
    this.keyword = permissionlistForm.keyword || '';
    this.count = permissionlistForm.count || 0;
    this.status = permissionlistForm.status || '';
  }
}
