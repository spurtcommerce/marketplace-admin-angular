/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ZoneForm {
  public countryId: number;
  public code: string;
  public name: String;
  public status: number;
  public zoneId: number;

  constructor(zoneForm: any) {
    this.countryId = zoneForm.country || 0;
    this.code = zoneForm.zonecode || '';
    this.name = zoneForm.zonename || '';
    this.status = zoneForm.status || 1;
    if (zoneForm && zoneForm.zoneId) {
      this.zoneId = zoneForm.zoneId || '';
    }
  }
}
