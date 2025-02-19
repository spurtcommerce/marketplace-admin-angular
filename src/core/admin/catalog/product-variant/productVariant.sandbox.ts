/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as productVariantActions from './action/productVariant.action';
// app state
import * as store from '../../../app.state.interface';

import {
  // variants add selectors
  getProductAdd,
  ProductAddFailed,
  ProductAddLoaded,
  ProductAddLoading,

  // variants delete selectors
  getProductDelete,
  ProductDeleteFailed,
  ProductDeleteLoaded,
  ProductDeleteLoading,

  // variants list selectors
  getProductList,
  getProductListCount,
  ProductListFailed,
  ProductListLoaded,
  ProductListLoading,
  // variants update selectors
  getProductUpdate,
  ProductUpdateFailed,
  ProductUpdateLoaded,
  ProductUpdateLoading,
  variantsDetails,

  getProductVariantList,
  getProductVariantListLoaded,
  getProductCount,

  getProductDetails,

  selectedVariant,
  probabiltyOptions,
  skuArrayList,
  selectedVariantId,
  deleteProbabilityOption,
  deleteProbabilityOptionLoading,
  deleteProbabilityOptionLoaded,
  deleteProbabilityOptionFailed,

  ProductVariantUpdateFailed,
  ProductVariantUpdateLoaded,
  ProductVariantUpdateLoading,
  getProductVariantUpdate,
  productListLoading,
  productListLoaded,
  originalVariantList,
  GetVariantList,
  GetVariantListLoading,
  GetVariantListLoaded,
  GetVariantListFailed,
} from './reducer/productVariant.selector';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Injectable()
export class ProductVariantSandbox {

  public productOptionsList$ = this.appState.select(getProductList);
  public getProductOptionsListCount$ = this.appState.select(
    getProductListCount
  );
  public deleteVariant$ = this.appState.select(getProductDelete);
  public productOptionsAdd$ = this.appState.select(getProductAdd);
  public productOptionsUpdate$ = this.appState.select(getProductUpdate);

  public productOptionsListLoading$ = this.appState.select(ProductListLoading);
  public productOptionsListLoaded$ = this.appState.select(ProductListLoaded);
  public productOptionsListFailed$ = this.appState.select(ProductListFailed);

  public productOptionsDeleteLoading$ = this.appState.select(
    ProductDeleteLoading
  );
  public productOptionsDeleteLoaded$ = this.appState.select(
    ProductDeleteLoaded
  );
  public productOptionsDeleteFailed$ = this.appState.select(
    ProductDeleteFailed
  );

  public productOptionsAddLoading$ = this.appState.select(ProductAddLoading);
  public productOptionsAddLoaded$ = this.appState.select(ProductAddLoaded);
  public productOptionsAddFailed$ = this.appState.select(ProductAddFailed);

  public productOptionsUpdateLoading$ = this.appState.select(
    ProductUpdateLoading
  );
  public productOptionsUpdateLoaded$ = this.appState.select(
    ProductUpdateLoaded
  );
  public productOptionsUpdateFailed$ = this.appState.select(
    ProductUpdateFailed
  );

  public variantsDetails$ = this.appState.select(variantsDetails);


  public productList$ = this.appState.select(getProductVariantList);
  public productListLoading$ = this.appState.select(productListLoading)
  public productListLoaded$ = this.appState.select(productListLoaded);
  public productCount$ = this.appState.select(getProductCount);

  public productDetails$ = this.appState.select(getProductDetails);


  public selectedVariant$ = this.appState.select(selectedVariant);

  public probabiltyOptions$ = this.appState.select(probabiltyOptions);


  public skuArrayList$ = this.appState.select(skuArrayList);
  public selectedVariantId$ = this.appState.select(selectedVariantId);

  public deleteProbabilityOption$ = this.appState.select(deleteProbabilityOption);
  public deleteProbabilityOptionLoading$ = this.appState.select(deleteProbabilityOptionLoading);
  public deleteProbabilityOptionLoaded$ = this.appState.select(deleteProbabilityOptionLoaded);
  public deleteProbabilityOptionFailed$ = this.appState.select(deleteProbabilityOptionFailed);

  public GetVariantList$ = this.appState.select(GetVariantList);
  public GetVariantListLoading$ = this.appState.select(GetVariantListLoading);
  public GetVariantListLoaded$ = this.appState.select(GetVariantListLoaded);
  public GetVariantListFailed$ = this.appState.select(GetVariantListFailed);

  public productVariantUpdateLoading$ = this.appState.select(ProductVariantUpdateLoading);
  public productVariantUpdateLoaded$ = this.appState.select(ProductVariantUpdateLoaded);
  public productVariantUpdateFailed$ = this.appState.select(ProductVariantUpdateFailed);

  public productVariantUpdate$ = this.appState.select(getProductVariantUpdate);

  public originalVariantList$ = this.appState.select(originalVariantList);

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
  ) {
    // ----
  }

  public getVariantsList(value) {
    this.appState.dispatch(
      new productVariantActions.GetVariantsListAction(value));
  }

  public getVariantsListCount(value) {
    this.appState.dispatch(
      new productVariantActions.GetVariantsListCountAction(value));
  }

  public doVariantsDelete(value) {
    this.appState.dispatch(
      new productVariantActions.DoVariantsDeleteAction(value));
  }

  public doVariantsAdd(value) {
    this.appState.dispatch(
      new productVariantActions.DoVariantsAddAction(value));
  }

  public doVariantsUpdate(value) {
    this.appState.dispatch(
      new productVariantActions.DoVariantsUpdateAction(value)
    );
  }

  public getVariantDetails(value) {
    this.appState.dispatch(
      new productVariantActions.GetVariantsDetailsAction(value)
    );
  }


  public resetVariants() {
    this.appState.dispatch(new productVariantActions.DoResetVariants());
  }

  subscribe() {
    this.productOptionsAdd$.subscribe(data => {
      if (data && data.status === 1) {
      }
    });
    this.productOptionsUpdate$.subscribe(data => {
      if (data && data.status === 1) {
      }
    });
  }

  public getProductList(value) {
    this.appState.dispatch(
      new productVariantActions.GetProductlistAction(value)
    );
  }

  public getProductDetail(value) {
    this.appState.dispatch(
      new productVariantActions.GetProductDetailAction(value)
    );
  }

  public getProductCount(value) {
    this.appState.dispatch(
      new productVariantActions.GetProductCountAction(value)
    );
  }


  // clear product details
  public ClearProductDetails() {
    this.appState.dispatch(new productVariantActions.DOClearProductDetails());
  }

  public selectVariant(value) {
    this.appState.dispatch(new productVariantActions.SelectVariant(value));
  }

  public deleteVariant(value) {
    this.appState.dispatch(new productVariantActions.DeleteVariant(value));
  }

  public addImageForVaraint(value) {
    this.appState.dispatch(new productVariantActions.AddImageForVariant(value));
  }

  public removeProbabiltyOption(value) {
    this.appState.dispatch(new productVariantActions.RemoveProbabiltyOption(value));
  }

  public changeProbabilityOptionStatus(value) {
    this.appState.dispatch(new productVariantActions.ChangeProbabiltyOptionStatus(value));
  }
  public removeOptionImage(value) {
    this.appState.dispatch(new productVariantActions.RemoveOptionImage(value));
  }
  public variantClear() {
    this.appState.dispatch(new productVariantActions.Variantclear());
  }

  public deleteProbabilityOption(value) {
    this.appState.dispatch(new productVariantActions.DeleteProbabilityOption(value));
  }

  public GetVariantList(value) {

    this.appState.dispatch(new productVariantActions.GetVariantList(value));
  }

  public doProductUpdate(value) {
    this.appState.dispatch(
      new productVariantActions.DoProductUpdateAction(value)
    );
  }

}
