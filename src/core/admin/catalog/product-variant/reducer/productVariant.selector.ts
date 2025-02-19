/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromProductVariant from './productVariant.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getProductVariantState = (state: AppState) => state.variantList;

// product list action
export const getProductList = createSelector(  getProductVariantState, fromProductVariant.getProductList);
export const productListLoading = createSelector (getProductVariantState, fromProductVariant.productListLoading);
export const productListLoaded = createSelector (getProductVariantState,fromProductVariant.productListLoaded)

export const getProductListCount = createSelector(
    getProductVariantState,
    fromProductVariant.getProductListCount
);
export const ProductListLoading = createSelector(
    getProductVariantState,
    fromProductVariant.getProductListLoading
);
export const ProductListLoaded = createSelector(
    getProductVariantState,
    fromProductVariant.getProductListLoaded
);
export const ProductListFailed = createSelector(
    getProductVariantState,
    fromProductVariant.getProductListFailed
);

// product delete action
export const getProductDelete = createSelector(
    getProductVariantState,
    fromProductVariant.getProductDelete
);
export const ProductDeleteLoading = createSelector(
    getProductVariantState,
    fromProductVariant.getProductDeleteLoading
);
export const ProductDeleteLoaded = createSelector(
    getProductVariantState,
    fromProductVariant.getProductDeleteLoaded
);
export const ProductDeleteFailed = createSelector(
    getProductVariantState,
    fromProductVariant.getProductDeleteFailed
);

// product add action
export const getProductAdd = createSelector(
    getProductVariantState,
    fromProductVariant.getProductAdd
);
export const ProductAddLoading = createSelector(
    getProductVariantState,
    fromProductVariant.getProductAddLoading
);
export const ProductAddLoaded = createSelector(
    getProductVariantState,
    fromProductVariant.getProductAddLoaded
);
export const ProductAddFailed = createSelector(
    getProductVariantState,
    fromProductVariant.getProductAddFailed
);

// product update action
export const getProductUpdate = createSelector(
    getProductVariantState,
    fromProductVariant.getProductUpdate
);
export const ProductUpdateLoading = createSelector(
    getProductVariantState,
    fromProductVariant.getProductUpdateLoading
);
export const ProductUpdateLoaded = createSelector(
    getProductVariantState,
    fromProductVariant.getProductUpdateLoaded
);
export const ProductUpdateFailed = createSelector(
    getProductVariantState,
    fromProductVariant.getProductUpdateFailed
);

export const variantsDetails = createSelector(
    getProductVariantState,
    fromProductVariant.variantsDetails
);


// product list action
export const getProductVariantList = createSelector(
    getProductVariantState,
    fromProductVariant.getProductVariantList
);
export const getProductVariantListLoaded = createSelector(getProductVariantState,
    fromProductVariant.getProductVariantList)
// product count action
export const getProductCount = createSelector(
    getProductVariantState,
    fromProductVariant.getProductCount
);


export const getProductDetails = createSelector(
    getProductVariantState,
    fromProductVariant.getProductDetail
);

export const selectedVariant = createSelector(
    getProductVariantState,
    fromProductVariant.selectedVariant
);

export const probabiltyOptions = createSelector(
    getProductVariantState,
    fromProductVariant.probabiltyOptions
);
export const skuArrayList = createSelector(
    getProductVariantState,
    fromProductVariant.skuArrayList
);
export const selectedVariantId = createSelector(
    getProductVariantState,
    fromProductVariant.selectedVariantId
);

export const deleteProbabilityOption = createSelector(
    getProductVariantState,
    fromProductVariant.deleteProbabilityOption
);
export const deleteProbabilityOptionLoading = createSelector(
    getProductVariantState,
    fromProductVariant.deleteProbabilityOptionLoading
);
export const deleteProbabilityOptionLoaded = createSelector(
    getProductVariantState,
    fromProductVariant.deleteProbabilityOptionLoaded
);
export const deleteProbabilityOptionFailed = createSelector(
    getProductVariantState,
    fromProductVariant.deleteProbabilityOptionFailed
);




export const GetVariantList = createSelector(
    getProductVariantState,
    fromProductVariant.GetVariantList
);
export const GetVariantListLoading = createSelector(
    getProductVariantState,
    fromProductVariant.GetVariantListLoading
);
export const GetVariantListLoaded = createSelector(
    getProductVariantState,
    fromProductVariant.GetVariantListLoaded
);
export const GetVariantListFailed = createSelector(
    getProductVariantState,
    fromProductVariant.GetVariantListFailed
);





// product variant update action
export const getProductVariantUpdate = createSelector(
    getProductVariantState,
    fromProductVariant.getProductUpdate
);
export const ProductVariantUpdateLoading = createSelector(
    getProductVariantState,
    fromProductVariant.getProductVariantUpdateLoading
);
export const ProductVariantUpdateLoaded = createSelector(
    getProductVariantState,
    fromProductVariant.getProductVariantUpdateLoaded
);
export const ProductVariantUpdateFailed = createSelector(
    getProductVariantState,
    fromProductVariant.getProductVariantUpdateFailed
);

export const originalVariantList = createSelector(
    getProductVariantState,
    fromProductVariant.originalVariantList
);
