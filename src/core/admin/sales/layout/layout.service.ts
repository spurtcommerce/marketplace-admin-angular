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
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../service/config.service';
import { Api } from '../../providers/api/api';

@Injectable()
export class LayoutService extends Api {
  params: any = {};
  // private URL = this.configService.get('api').baseUrl;
  private URL = this.getBaseUrl();

  /* get product list count api*/
  public getOrderListCount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = {
      count: 'true',
      customerName: '',
      dateAdded: '',
      keyword: '',
      limit: '',
      offset: '',
      orderId: '',
      totalAmount: '',
      orderStatusId: ''
    };
    return this.http.get(this.URL + '/order', reqOpts);
  }

  /* get product list count api*/
  public getTodayOrderListCount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/today-order-count', reqOpts);
  }

  /* get product list count api*/
  public getTotalOrderAmount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/total-order-amount', reqOpts);
  }

  /* get product list count api*/
  public getTodayOrderAmount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/today-order-amount', reqOpts);
  }
    /* change payment api*/
    public changePayment(filterParam: any): Observable<any> {
      return this.http.post(this.URL + '/order/update-payment-status', filterParam);
    }

     /* get Sales count api*/

  public getSalesCount(): Observable<any> {
    return this.http.get(this.URL + '/order/order-count');
  }
}
