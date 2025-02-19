/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { ConfigService } from '../../service/config.service';
import { environment } from '../../../../environments/environment';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: false
};

@Injectable()
export class Api {
  constructor(public http: HttpClient, public configService: ConfigService) {}

  protected getBaseUrl(): string {
    return environment.baseUrl;
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
