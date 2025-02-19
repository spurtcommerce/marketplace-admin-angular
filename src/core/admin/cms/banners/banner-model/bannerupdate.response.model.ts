/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class BannerupdateResponseModel {
  public title: string;
  public content: string;
  public image: string;
  public link: string;
  public position: string;
  public bannerId: number;
  public active: any;

  constructor(updateResponse: any) {
    this.title = updateResponse.title || '';
    this.content = updateResponse.content || '';
    this.image = updateResponse.image || '';
    this.link = updateResponse.link || '';
    this.position = updateResponse.position || '';
    this.bannerId = updateResponse.bannerId || '';
    this.active = updateResponse.isActive;
  }
}
