/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable({
  providedIn: 'root',
})
export class ProductVariantService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();

  variantData: any;


  variantsList(param) {
    let reqOpts: any = {};
    reqOpts = param;

    return this.http.get(this.basUrl + '/variant', {
      params: reqOpts
    });
  }

  /**
   * Handles 'productOptionsList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from VariantsListModel
   */
  public variantsListCount(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/variant', {
      params: reqOpts
    });
  }

  /**
   * Handles 'productOptionsDelete' function. Calls delete method with specific api address
   * along its param.
   *
   * @param params from VariantsDeleteModel
   */
  variantsDelete(params: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { optionId: params.optionId }
    };

    return this.http.delete(
      this.basUrl + '/varients/delete-varient/' + params.id,
      httpOptions
    );
  }

  /**
   * Handles 'productOptionsAdd' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  variantsAdd(param) {
    return this.http.post(this.basUrl + '/varients/add-varients', param);
  }

  /**
   * Handles 'productOptionsUpdate' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  variantsUpdate(param) {
    return this.http.put(this.basUrl + '/varients/update-varients' + param.productId, param);
  }

  productVariantsUpdate(param) {
    return this.http.post(this.basUrl + '/vendor-product-variant/', param);
  }

  variantsDetails(param) {
    return this.http.get(this.basUrl + '/varients/varients-detail', { params: param });
  }

  productVariantDetail(param) {
    return this.http.get(this.basUrl + '/product-variant/product/' + param.id, { params: param });
  }

  /**
   * Handles 'productList' function. Calls get method with specific api address
   * along its param.
   *
  //  * @param params from RatingReviewListModel
   */
  public productList(params: any): Observable<any> {

    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-product-variant', {
      params: reqOpts
    });


  }

  /**
   * Handles 'productCount' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from RatingReviewListModel
   */
  public productCount(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-product-variant', {
      params: reqOpts
    });
  }

  variantsetdata(data) {
    this.variantData = data;
  }

  variantgetdata() {
    return this.variantData;
  }

  deleteProbabilityOption(params): Observable<any> {

    return this.http.delete(this.basUrl + '/vendor-product-variant/variant-option/' + params);
  }
  ///delete variant //
  public deleteProductVariant(param: any): Observable<any> {
    return this.http.delete(this.basUrl + '/vendor-product-variant/' + param.id);
  }

  ///delete variant //
  public GetVariantList(param: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-product-variant/variants');
  }
}
