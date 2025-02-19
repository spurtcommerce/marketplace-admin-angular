/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../action/dashboard.action';
import { catchError, tap } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';

@Injectable()
export class DashboardEffects {
  constructor(
    private action$: Actions,
    private dashboardService: DashboardService
  ) {}


  
  doTopSellingProducts$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOP_SELLING_PRODUCTS),
    map((action: actions.GetTopSellingProductsAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.getTopSellingProducts(state).pipe(
        switchMap(response => [
          new actions.GetTopSellingProductsSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTopSellingProductsFailAction(error))
        )
      );
    })
  ));

  
  doSalesOrderList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_SALES_ORDER_LIST),
    map((action: actions.GetSalesOrderAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.getSalesOrders(state).pipe(
        switchMap(response => [
          new actions.GetSalesOrderSuccessAction(response)
        ]),
        catchError(error => of(new actions.GetSalesOrderFailAction(error)))
      );
    })
  ));

  
  doVisitorLogs$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_VISITOR_LOG_LIST),
    map((action: actions.GetVisitorLogAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.getVisitorsList(state).pipe(
        switchMap(response => [
          new actions.GetVisitorLogSuccessAction(response)
        ]),
        catchError(error => of(new actions.GetVisitorLogFailAction(error)))
      );
    })
  ));

  
  doRecentVisitorList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_RECENT_VISITOR_LIST),
    map((action: actions.GetRecentVisitorListAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.getRecentVisitorsList(state).pipe(
        switchMap(response => [
          new actions.GetRecentVisitorListSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetRecentVisitorListFailAction(error))
        )
      );
    })
  ));

  
  doRecentSellingProducts$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_RECENT_SELLING_PRODUCT),
    map((action: actions.GetRecentSellingProductAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.getRecentSellingProductList(state).pipe(
        switchMap(response => [
          new actions.GetRecentSellingProductSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetRecentSellingProductFailAction(error))
        )
      );
    })
  ));

  
  doItemPageCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ITEMS_PAGECOUNT),
    map((action: actions.GetItemPerPageCountAction) => action.payload),
    switchMap(() => {
      return this.dashboardService.getItemsPerPageCount().pipe(
        tap(res => {
          sessionStorage.setItem('itemsPerPage', res.data[0].itemsPerPage);
          localStorage.setItem('itemsPerPage', res.data[0].itemsPerPage);
          localStorage.setItem('dateFormat', res.data[0].dateFormat ? res.data[0].dateFormat:'dd/MM/yyyy');
      localStorage.setItem('timeFormat', res.data[0].timeFormat ? res.data[0].timeFormat:'12 hrs');
        }),
        switchMap(user => {
          return [new actions.GetItemPerPageCountSuccessAction(user)];
        }),
        catchError(error =>
          of(new actions.GetItemPerPageCountFailAction(error))
        )
      );
    })
  ));

// get dashboard overall counts

  
  dashboardCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DASHBOARD_COUNT),
    map((action: actions.GetDashboardCountAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.getDashboardCount().pipe(
        switchMap(response => [
          new actions.GetDashboardCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetDashboardCountFailAction(error))
        )
      );
    })
  ));
// average Order Value
  
  averageOrderValue$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.AVERAGE_ORDER_VALUE),
    map((action: actions.averageOrderValueAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.averageOrderValue(state).pipe(
        switchMap(response => [
          new actions.averageOrderValueSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.averageOrderValueFailAction(error))
        )
      );
    })
  ));
            /*Total Customers*/
  
  totalCustomersList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.TOTAL_CUSTOMERS_LIST),
    map((action: actions.totalCustomersListAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.totalCustomersList(state).pipe(
        switchMap(response => [
          new actions.totalCustomersListSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.totalCustomersListFailAction(error))
        )
      );
    })
  ));


    
    getTopSellingProductListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.TOP_SELLING_PRODUCT_COUNT),
    map((action: actions.getTopSellingProductListCountAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.getTopSellingProductListCount(state).pipe(
        switchMap(response => [
          new actions.getTopSellingProductListCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.getTopSellingProductListCountFailAction(error))
        )
      );
    })
  ));

      /*Total Revenue*/
      
      totalRevenue$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.TOTAL_REVENUE),
      map((action: actions.totalRevenueAction) => action.payload),
      switchMap(state => {
        return this.dashboardService.totalRevenue(state).pipe(
          switchMap(response => [
            new actions.totalRevenueSuccessAction(response)
          ]),
          catchError(error =>
            of(new actions.totalRevenueFailAction(error))
          )
        );
      })
    ));

    /*Total Orders*/

    
    totalOrders$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.TOTAL_ORDERS),
    map((action: actions.totalOrdersAction) => action.payload),
    switchMap(state => {
      return this.dashboardService.totalOrders(state).pipe(
        switchMap(response => [
          new actions.totalOrdersSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.totalOrdersFailAction(error))
        )
      );
    })
  ));

/*New Customers*/


newCustomers$: Observable<Action> = createEffect(() => this.action$.pipe(
ofType(actions.ActionTypes.NEW_CUSTOMERS),
map((action: actions.newCustomersAction) => action.payload),
switchMap(state => {
  return this.dashboardService.newCustomers(state).pipe(
    switchMap(response => [
      new actions.newCustomersSuccessAction(response)
    ]),
    catchError(error =>
      of(new actions.newCustomersFailAction(error))
    )
  );
})
));

// average Conversion Ratio

averageConversionRatio$: Observable<Action> = createEffect(() => this.action$.pipe(
  ofType(actions.ActionTypes.AVERAGE_CONVERSION_RATIO),
  map((action: actions.averageConversionRatioAction) => action.payload),
  switchMap(state => {
    return this.dashboardService.averageConversionRatio(state).pipe(
      switchMap(response => [
        new actions.averageConversionRatioSuccessAction(response)
      ]),
      catchError(error =>
        of(new actions.averageConversionRatioFailAction(error))
      )
    );
  })
));

    /*Transaction values*/
    
    transactionValues$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.TRANSACTION_VALUES),
      map((action: actions.transactionValuesAction) => action.payload),
      switchMap(state => {
        return this.dashboardService.transactionValues(state).pipe(
          switchMap(response => [
            new actions.transactionValuesSuccessAction(response)
          ]),
          catchError(error =>
            of(new actions.transactionValuesFailAction(error))
          )
        );
      })
    ));



          /*Vendor*/
        
        vendor$: Observable<Action> = createEffect(() => this.action$.pipe(
          ofType(actions.ActionTypes.VENDOR),
          map((action: actions.vendorAction) => action.payload),
          switchMap(state => {
            return this.dashboardService.vendor(state).pipe(
              switchMap(response => [
                new actions.vendorSuccessAction(response)
              ]),
              catchError(error =>
                of(new actions.vendorFailAction(error))
              )
            );
          })
        ));


        /*Sales graph*/
        
        salesgraph$: Observable<Action> = createEffect(() => this.action$.pipe(
          ofType(actions.ActionTypes.SALESGRAPH),
          map((action: actions.salesgraphAction) => action.payload),
          switchMap(state => {
            return this.dashboardService.salesgraph(state).pipe(
              switchMap(response => [
                new actions.salesgraphSuccessAction(response)
              ]),
              catchError(error =>
                of(new actions.salesgraphFailAction(error))
              )
            );
          })
        ));

      /*weekly sales product*/
  
      
      weeklysalesproduct$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.WEEKLYSALESPRODUCT),
        map((action: actions.weeklysalesproductAction) => action.payload),
        switchMap(state => {
          return this.dashboardService.weeklysalesproduct(state).pipe(
            switchMap(response => [
              new actions.weeklysalesproductSuccessAction(response)
            ]),
            catchError(error =>
              of(new actions.weeklysalesproductFailAction(error))
            )
          );
        })
      ));

      /*Top 10 Weekly Products*/
      
      toptenweeklyproducts$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.TOPTENWEEKLYPRODUCTS),
        map((action: actions.toptenweeklyproductsAction) => action.payload),
        switchMap(state => {
          return this.dashboardService.toptenweeklyproducts(state).pipe(
            switchMap(response => [
              new actions.toptenweeklyproductsSuccessAction(response)
            ]),
            catchError(error =>
              of(new actions.toptenweeklyproductsFailAction(error))
            )
          );
        })
      ));
}


