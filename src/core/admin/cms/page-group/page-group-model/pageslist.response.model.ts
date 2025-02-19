/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class PageslistResponseModel {
  public content: string;
  public metaTagContent: string;
  public isActive: number;
  public title: string;
  public pageId: number;
  public metaTagTitle: string;
  public metaTagKeyword: string;

  constructor(listResponse: any) {
    this.content = listResponse.content || '';
    this.metaTagContent = listResponse.metaTagContent || '';
    this.metaTagKeyword = listResponse.metaTagKeyword || '';
    this.metaTagTitle = listResponse.metaTagTitle || '';
    this.isActive = listResponse.isActive || 0;
    this.pageId = listResponse.pageId || 0;
    this.title = listResponse.title || '';
  }
}
