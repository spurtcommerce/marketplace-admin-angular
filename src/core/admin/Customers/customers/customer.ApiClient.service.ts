/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class CustomersApiClientService extends Api {
  public params: any = {};
  public userdata: any;
  public pagesize: number;
  public editcustomerdata: any;
  public delCustvalue: number;
  public ischecked: boolean;

  // url Address
  url = this.getBaseUrl();

  setcusteditdata(data) {
    this.editcustomerdata = data;
  }

  getcusteditdata() {
    return this.editcustomerdata;
  }

  /**
   * Handles 'customersList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params form customerList Data
   */
  customersList(params: any): Observable<any> {

    return this.http.get(this.url + '/admin-customer', {
      params: params
    });
  }

  /**
   * Handles 'addcustomer' function. Calls put method with specific api address
   * along its param.
   *
   * @param value from model
   */
  addcustomer(param) {
    return this.http.post(this.url + '/admin-customer', param);
  }

  /**
   * Handles 'updatecustomer' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  updatecustomer(params): Observable<any> {
    return this.http.put(
      this.url + '/admin-customer/'+params.customerId,params);
  }

  /**
   * Handles 'deleteCustomer' function. Calls put method with specific api address
   * along its param.
   * @param params from model
   */
  public deleteCustomer(param: any, Id: number): Observable<any> {
    return this.http.delete(
      this.url + '/admin-customer/' + Id,
      param
    );
  }

  /**
   * Handles 'addAddressList' function. Calls put method with specific api address
   * along its param.
   * @param params from model
   */
  addAddressList(params: any, customerId: number): Observable<any> {
    return this.http.get(this.url + '/address/' + customerId, {params});
  }

  /**
   * Handles 'customer detail' function. Calls put method with specific api address
   * along its param.
   */
  customerDetail(params: any, Id: number): Observable<any> {
    return this.http.get(this.url + '/admin-customer/customer-detail/' + Id, params);
  }

  /**
   * Handles 'addAddressPagination' function. Calls put method with specific api address
   * along its param.
   * @param params from model
   */
  addAddressPagination(params: any, customerId: number): Observable<any> {
    return this.http.get(this.url + '/address/' + customerId, {
      params: params
    });
  }

  /**
   * Handles 'addaddressAdd' function. Calls put method with specific api address
   * along its param.
   * @param params from model
   */
  addaddressAdd(param) {
    return this.http.post(this.url + '/address', param);
  }

  /**
   * Handles 'updateAddAddress' function. Calls put method with specific api address
   * along its param.
   * @param params from model
   */
  updateAddAddress(params): Observable<any> {
    return this.http.put(
      this.url + '/address/' + params.addressId,
      params
    );
  }

  /**
   * Handles 'updateAddAddress' function. Calls put method with specific api address
   * along its param.
   * @param params from model
   * @param Id from addressId
   */
  public deleteAddAddress(param: any, Id: number): Observable<any> {
    return this.http.delete(this.url + '/address/' + Id, param);
  }

  /**
   * Handles 'productBulkDelete' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  customerBulkDelete(param) {
    return this.http.post(this.url + '/admin-customer/delete-customer', param);
  }

  /**
   * Handles 'CustomerExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */

  public customerExcel(params): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.url + '/admin-customer/customer-excel-list/', reqOpts);
  }


  public customerAllExcel(params): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'blob';
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.url + '/admin-customer/allcustomer-excel-list/', reqOpts);
  }

  public viewCustomerProduct(param: any): Observable<any> {
    return this.http.get(this.url + '/admin-customer/product-view-log-list', { params: param });
  }
  public viewCustomerProductCount(param: any): Observable<any> {
    return this.http.get(this.url + '/admin-customer/product-view-log-list', { params: param });
  }
  public viewOrderProduct(param: any): Observable<any> {
    return this.http.get(this.url + '/admin-customer/order-product-list', { params: param });
  }
  public viewOrderProductCount(param: any): Observable<any> {
    return this.http.get(this.url + '/admin-customer/order-product-list', { params: param });
  }
}
