/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class ForgotResponseModel {
  // Declare Default Params

  public user: any = {};
  constructor(forgotFormResponse: any) {
    this.user = forgotFormResponse || '';
  }
}
