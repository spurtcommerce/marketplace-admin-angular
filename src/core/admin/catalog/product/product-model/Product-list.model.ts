/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ProductListModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public sku: string;
  public status: string;
  public price: number;
  public count: boolean;
  // public productType: string;
  public productName: string;
  public categoryName: string;

  constructor(fromProductList: any) {
    this.productName= fromProductList.productName || '';
    this.limit = fromProductList.limit || 0;
    this.offset = fromProductList.offset || 0;
    this.keyword = fromProductList.keyword || '';
    this.sku = fromProductList.sku || '';
    this.status = fromProductList.status || '';
    this.price = fromProductList.price || 0;
    this.count = fromProductList.count || false;
    // this.productType = fromProductList.productType || '';
    this.categoryName = fromProductList.categoryName || '';
  }
}
