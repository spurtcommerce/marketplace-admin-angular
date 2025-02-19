/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../action/productVariant.action';
import { catchError } from 'rxjs/operators';
// service
import { ProductVariantService } from '../productVariant.service';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';

@Injectable()
export class ProductVariantEffect {
  constructor(
    private action$: Actions,
    private service: ProductVariantService,
    private toastr: ToastrService,
    private appState$: Store<store.AppState>,
    public toaster: ToastrService
  ) { }

  // ----
  // Variants list
  
  variantlists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_VARIANTS_LIST),
    map((action: actions.GetVariantsListAction) => action.payload),
    switchMap(state => {
      return this.service.variantsList(state).pipe(
        switchMap(product => [
          new actions.GetVariantsListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.GetVariantsListFailAction(error))
        )
      );
    })
  ));
  // Variants list count
  
  variantcount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_VARIANTS_LIST_COUNT),
    map((action: actions.GetVariantsListCountAction) => action.payload),
    switchMap(state => {
      return this.service.variantsListCount(state).pipe(
        switchMap(product => [
          new actions.GetVariantsListCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.GetVariantsListCountFailAction(error))
        )
      );
    })
  ));

  // Variants delete
  
  doVariantsDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_VARIANTS_DELETE),
    map((action: actions.DoVariantsDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.variantsDelete(state).pipe(
        switchMap(user => [
          new actions.DoVariantsDeleteSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.DoVariantsDeleteFailAction(error))
        )
      );
    })
  ));
  // Variants add
  
  doVariantsAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_VARIANTS_ADD),
    map((action: actions.DoVariantsAddAction) => action.payload),
    switchMap(state => {


      return this.service.variantsAdd(state).pipe(
        switchMap(user => [new actions.DoVariantsAddSuccessAction(user)]),
        tap(data => {

          if (data) {
            this.toaster.success(data.payload['message']);
          }
        }),
        catchError(error =>
          of(new actions.DoVariantsAddFailAction(error))
        )
      );
    })
  ));
  // Variants update
  
  doVariantsUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_VARIANTS_UPDATE),
    map((action: actions.DoVariantsUpdateAction) => action.payload),
    switchMap(state => {

      return this.service.variantsUpdate(state).pipe(
        switchMap(user => [
          new actions.DoVariantsUpdateSuccessAction(user)
        ]),
        tap(data => {
          if (data) {
            this.toaster.success(data.payload['message']);
          }
        }),
        catchError(error =>
          of(new actions.DoVariantsUpdateFailAction(error))
        )
      );
    })
  ));

  
  variantDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_VARIANTS_DETAILS),
    map((action: actions.GetVariantsDetailsAction) => action.payload),
    switchMap(state => {
      return this.service.variantsDetails(state).pipe(
        tap(data => {
          if (data) {
            
          }
        }),
        switchMap(product => [
          new actions.GetVariantsDetailsSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.GetVariantsDetailsFailAction(error))
        )
      );
    })
  ));

  // Product list
  
  doprodlists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductlistAction) => action.payload),
    switchMap(state => {
      return this.service.productList(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(product => [
          new actions.GetProductlistSuccessAction(product)
        ]),
        catchError(error => of(new actions.GetProductlistFailAction(error)))
      );
    })
  ));

  // Product list count
  
  doprodlistscount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_COUNT),
    map((action: actions.GetProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        map(count => new actions.GetProductCountSuccessAction(count)),
        catchError(error => of(new actions.GetProductCountFailAction(error)))
      );
    })
  )); 


  // Product detail
  
  doDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetailAction) => action.payload),
    switchMap(state => {
      return this.service.productVariantDetail(state).pipe(
        switchMap(user => [new actions.GetProductDetailSuccess(user)]),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  ));

     // Variant update
     
     updateVariant$: Observable<Action> = createEffect(() => this.action$.pipe(
       ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
       map((action: actions.DoVariantsUpdateAction) => action.payload),
       switchMap(state => {
 
         return this.service.productVariantsUpdate(state).pipe(
           switchMap(user => [new actions.DoVariantsUpdateSuccessAction(user)]),
         tap(data => {
 
           if (data) {
             this.toaster.success(data.payload['message']);
           }
         }),
           catchError(error => of(new actions.DoVariantsUpdateFailAction(error)))
         );
       })
     ));
  
    
    deleteProbabilityOption$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.DELETE_PROBABILITY_OPTION),
      map((action: actions.DeleteProbabilityOption) => action.payload),
      switchMap(state => {
        return this.service.deleteProbabilityOption(state).pipe(
          switchMap(user => [new actions.DeleteProbabilityOptionSuccess(user)]),
          catchError(error => of(new actions.DeleteProbabilityOptionFail(error)))
        );
      })
    ));

    
    GetVariantList$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.ORIGINAL_VARIANT_LIST),
      map((action: actions.GetVariantList) => action.payload),
      switchMap(state => {
        return this.service.GetVariantList(state).pipe(
          switchMap(user => [new actions.GetVariantListSuccess(user)]),
          catchError(error => of(new actions.GetVariantListFail(error)))
        );
      })
    ));
}


