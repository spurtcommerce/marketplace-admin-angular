import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ExportService extends Api {

  private url: string = this.getBaseUrl();

  getExportList(params): Observable<any> {
  
    return this.http.get(this.url + '/export-log', { params });
  }

  getModulesList(params): Observable<any> {

    return this.http.post(this.url + '/export-log', { params });
  }

  getExportListCount(params): Observable<any> {
  
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/export-log', {
      params: reqOpts
    });
  }

  getProductId(type): Observable<any> {
    switch (type.key) {
      case 'Orders':
        return this.http.get(this.url + '/order', {
          params: type.param
        });
      case 'Failed Orders':
        return this.http.get(this.url + '/order/failed-order-list', {
          params: type.param
        });
      case 'Product Categories':
        return this.http.get(this.url + '/product', {
          params: type.param
        });
      case 'Category':
        return this.http.get(this.url + '/Category', {
          params: type.param
        });
    }
  }

  getFromModule(params): Observable<any> {
    if(params.type=='Orders') {
      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      if (params.data) {
        reqOpts.params = new HttpParams();
        for (const k in params.data) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params.data[k]);
          }
        }
      }
      return this.http.get(this.url + '/order/order-excel-list/', reqOpts);
    }

    if(params.type=='Failed Orders') {
      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      if (params.data) {
        reqOpts.params = new HttpParams();
        for (const k in params.data) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params.data[k]);
          }
        }
      }
      return this.http.get(this.url + '/order/order-excel-list/', reqOpts);
    }

    if(params.type=='Manage Products') {
      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      if (params.data) {
        reqOpts.params = new HttpParams();
        for (const k in params.data) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params.data[k]);
          }
        }
      }
      return this.http.post(this.url + '/admin-vendor-product/vendor-product-excel-list', params?.data, reqOpts);
    }

    if(params.type=='Product Categories') {
      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      // if (params.data) {
      //   reqOpts.params = new HttpParams();
      //   for (const k in params.data) {
      //     if (k) {
      //       reqOpts.params = reqOpts.params.set(k, params.data[k]);
      //     }
      //   }
      // }
      return this.http.get(this.url + '/category/category-excel-list', reqOpts);
    }

    if(params.type=='Archive Payments') {
      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      if (params.data) {
        reqOpts.params = new HttpParams();
        for (const k in params.data) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params.data[k]);
          }
        }
      }
      return this.http.get(this.url + '/payment/export-payment-archive-list', reqOpts);
    }

    if(params.type=='Manage Customers') {
      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      if (params.data) {
        reqOpts.params = new HttpParams();
        for (const k in params.data) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params.data[k]);
          }
        }
      }
      return this.http.get(this.url + '/admin-customer/customer-excel-list', reqOpts);
    }
    if(params.type=='Vendors') {
      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      if (params.data) {
        reqOpts.params = new HttpParams();
        for (const k in params.data) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params.data[k]);
          }
        }
      }
      return this.http.get(this.url + '/admin-vendor/vendor-excel-list', reqOpts);
    }
    
  }

  downloadExcel(params) {
    this.url = this.getBaseUrl();
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
    return this.http.get(this.url + '/media/download-file', { params });
  }
}
