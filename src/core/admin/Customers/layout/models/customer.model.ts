/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CustomerModel {
  public limit: number;
  public offset: number;
  public name: string;
  public email: string;
  public customerGroup: string;
  public date: string;
  public count: string;
  public status: string;

  constructor(customerlistform: any) {
    this.customerGroup = customerlistform.customerGroup || '';
    this.date = customerlistform.date || '';
    this.email = customerlistform.email || '';
    this.name = customerlistform.name || '';
    this.limit = customerlistform.limit || '';
    this.offset = customerlistform.offset || '';
    this.count = customerlistform.count || '';
    if (customerlistform.status === 0) {
      this.status = customerlistform.status;
    } else {
      this.status = customerlistform.status || '';
    }
  }
}
