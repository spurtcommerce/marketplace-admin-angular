/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CategorycountForm {

  public keyword: string;
  public sortOrder: string;
  public count: string;
  public status: boolean;
  public name: string;
  
  constructor(categorycountForm: any) {
    this.keyword = categorycountForm.keyword || '';
    this.sortOrder = categorycountForm.sortOrder || 0;
    this.count = categorycountForm.count || 1;
    this.status = categorycountForm.status || '';
    this.name = categorycountForm.name || '';

  }
}
