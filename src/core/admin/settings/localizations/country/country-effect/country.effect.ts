/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { CountryService } from '../country.service';
import * as actions from '../country-action/country.action';
import { Router } from '@angular/router';

@Injectable()
export class CountryEffect {
  // NEW COUNTRY
  
  doAddCountry$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_COUNTRY),
    map((action: actions.DoNewCountryAction) => action.payload),
    switchMap(state => {
      return this.service.addCountry(state).pipe(
        tap(val => {
          this.router.navigate(['/settings/local/countries']);
        }),
        switchMap(role => [new actions.DoNewCountrySuccessAction(role)]),
        catchError(error => of(new actions.DoNewCountryFailAction(error)))
      );
    })
  ));
  // UPDATE COUNTRY
  
  doUpdateCountry$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_COUNTRY),
    map((action: actions.DoUpdateCountrySuccessAction) => action.payload),
    switchMap(state => {
      return this.service.updateCountry(state).pipe(
        tap(val => {
          this.router.navigate(['/settings/local/countries']);
        }),
        map(analysis => new actions.DoUpdateCountrySuccessAction(analysis)),
        catchError(error => of(new actions.DoUpdateCountryFailAction(error)))
      );
    })
  ));
  // COUNTRY LIST
  
  docountrylists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_COUNTRY_LIST),
    map((action: actions.GetCountrylistAction) => action.payload),
    switchMap(state => {
      return this.service.countrylist(state).pipe(
        switchMap(user => [new actions.GetCountrylistSuccessAction(user)]),
        catchError(error => of(new actions.GetCountrylistFailAction(error)))
      );
    })
  ));
  // PAGINATION COUNTRY
  
  docountrypagination$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_COUNTRY_COUNT_ACTION),
    map((action: actions.GetCountryCountAction) => action.payload),
    switchMap(state => {
      return this.service.countrypagiantion(state).pipe(
        switchMap(user => [new actions.GetCountryCountSuccessAction(user)]),
        catchError(error => of(new actions.GetCountryCountFailAction(error)))
      );
    })
  ));
  // COUNTRY DELETE
  
  doCountryDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_COUNTRY_DELETE),
    map((action: actions.DoCountryDeleteAction) => action.payload),
    switchMap(state => {
      const countryId = state.countryId;
      return this.service.deletecountry(state, countryId).pipe(
        switchMap(user => [new actions.DoCountryDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoCountryDeleteFailAction(error)))
      );
    })
  ));

  constructor(
    private action$: Actions,
    private service: CountryService,
    public router: Router
  ) {}
}
