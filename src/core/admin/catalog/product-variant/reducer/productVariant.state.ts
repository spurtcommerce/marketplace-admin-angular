/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface ProductVariantState extends Map<string, any> {

    variantsList: any;
    listLoading: boolean;
    listLoaded: boolean;
    listFailed: boolean;

    variantsAdded: any;
    addLoading: boolean;
    addLoaded: boolean;
    addFailed: boolean;

    variantsUpdate: any;
    updateLoading: boolean;
    updateLoaded: boolean;
    updateFailed: boolean;

    variantsDelete: any;
    deleteLoading: boolean;
    deleteLoaded: boolean;
    deleteFailed: boolean;

    variantsListCount: any;

    variantsDetails: any;
    detailsLoading: boolean;
    detailsLoaded: boolean;
    detailsFailed: boolean;

    productList: any;
    productListLoading:any 
    productListLoaded:any

    productCount: any;
    productDetail: any;

    selectedVariant: any;
    originalVariantList: any;
    selectedVariantOriginal: any;
    probabiltyOptions: any;
    originalProbabiltyArray: any;

    skuArrayList: any;
    selectedVariantId: any;

    deleteProbabilityOption: any;
    deleteProbabilityOptionLoading: boolean;
    deleteProbabilityOptionLoaded: boolean;
    deleteProbabilityOptionFailed: boolean;


    GetVariantList: any;
    GetVariantListLoading: boolean;
    GetVariantListLoaded: boolean;
    GetVariantListFailed: boolean;

    updateProductLoading: boolean;
    updateProductLoaded: boolean;
    updateProductFailed: boolean;

    productUpdate: any;
}

export const ProductVariantStateRecord = Record({
    productList: [],
    productListLoading: false ,
    productListLoaded: false,
    
    productCount: 0,

    variantslistCount: {},

    variantsList: [],
    listLoading: false,
    listLoaded: false,
    listFailed: false,

    variantsAdded: {},
    addLoading: false,
    addLoaded: false,
    addFailed: false,

    variantsUpdate: {},
    updateLoading: false,
    updateLoaded: false,
    updateFailed: false,

    variantsDelete: {},
    deleteLoading: false,
    deleteLoaded: false,
    deleteFailed: false,

    variantsDetails: {},
    detailsLoading: false,
    detailsLoaded: false,
    detailsFailed: false,

    productDetail: {},

    selectedVariant: [],
    originalVariantList: [],
    selectedVariantOriginal: [],
    probabiltyOptions: [],
    originalProbabiltyArray: [],

    skuArrayList: [],
    selectedVariantId: [],

    deleteProbabilityOption: [],
    deleteProbabilityOptionLoading: false,
    deleteProbabilityOptionLoaded: false,
    deleteProbabilityOptionFailed: false,

    GetVariantList: [],
    GetVariantListLoading: false,
    GetVariantListLoaded: false,
    GetVariantListFailed: false,

    updateProductLoading: false,
    updateProductLoaded: false,
    updateProductFailed: false,
    productUpdate: {},
});
