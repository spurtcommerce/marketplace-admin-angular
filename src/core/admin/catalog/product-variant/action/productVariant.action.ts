/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';
export const ActionTypes = {
    GET_VARIANTS_LIST: type('[PRODUCT_VARIANT] Do Variants list'),
    GET_VARIANTS_LIST_SUCCESS: type(
        '[PRODUCT_VARIANT] Do Variants list Success'
    ),
    GET_VARIANTS_LIST_FAIL: type('[PRODUCT_VARIANT] Do Variants list Fail'),

    GET_VARIANTS_LIST_COUNT: type('[PRODUCT_VARIANT] Do Variants list count'),
    GET_VARIANTS_LIST_COUNT_SUCCESS: type(
        '[PRODUCT_VARIANT] Do Variants list count Success'
    ),
    GET_VARIANTS_LIST_COUNT_FAIL: type(
        '[PRODUCT_VARIANT] Do Variants list count Fail'
    ),

    DO_VARIANTS_DELETE: type('[PRODUCT_VARIANT] Do Variants Delete'),
    DO_VARIANTS_DELETE_SUCCESS: type(
        '[PRODUCT_VARIANT] Do Variants Delete Success'
    ),
    DO_VARIANTS_DELETE_FAIL: type(
        '[PRODUCT_VARIANT] Do Variants Delete Fail'
    ),

    DO_VARIANTS_ADD: type('[PRODUCT_VARIANT] Do Variants Add'),
    DO_VARIANTS_ADD_SUCCESS: type('[PRODUCT_VARIANT] Do Variants Add Success'),
    DO_VARIANTS_ADD_FAIL: type('[PRODUCT_VARIANT] Do Variants Add Fail'),

    DO_VARIANTS_UPDATE: type('[PRODUCT_VARIANT] Do Variants Update'),
    DO_VARIANTS_UPDATE_SUCCESS: type(
        '[PRODUCT_VARIANT] Do Variants Update Success'
    ),
    DO_VARIANTS_UPDATE_FAIL: type(
        '[PRODUCT_VARIANT] Do Variants Update Fail'
    ),

    RESET_VARIANTS: type('[PRODUCT_VARIANT] DO Reset Variants'),

    GET_VARIANTS_DETAILS: type('[PRODUCT_VARIANT] Do Variants details'),
    GET_VARIANTS_DETAILS_SUCCESS: type(
        '[PRODUCT_VARIANT] Do Variants details Success'
    ),
    GET_VARIANTS_DETAILS_FAIL: type('[PRODUCT_VARIANT] Do Variants details Fail'),


    GET_PRODUCT_LIST: type('[PRODUCT_VARIANT] Do Product list'),
    GET_PRODUCT_LIST_SUCCESS: type('[PRODUCT_VARIANT] Do Product list Success'),
    GET_PRODUCT_LIST_FAIL: type('[PRODUCT_VARIANT] Do Product list Fail'),

    GET_PRODUCT_COUNT: type('[PRODUCT_VARIANT] Do Paination Count'),
    GET_PRODUCT_COUNT_SUCCESS: type('[PRODUCT_VARIANT] Do Paination Count Success'),
    GET_PRODUCT_COUNT_FAIL: type('[PRODUCT_VARIANT] Do Paination Count Fail'),

    GET_PRODUCT_DETAIL: type('[PRODUCT_VARIANT] Do Product Detail'),
    GET_PRODUCT_DETAIL_SUCCESS: type('[PRODUCT_VARIANT] Do Product Detail Success'),
    GET_PRODUCT_DETAIL_FAIL: type('[PRODUCT_VARIANT] Do Product Detail Fail'),

    DO_CLEAR_PRODUCT_DETAILS: type('[PRODUCT_VARIANT] DO CLEAR PRODUCT DETAIL'),

    SELECT_VARIANT: type('[PRODUCT_VARIANT] SELECT VARIANT'),
    DESELECT_VARIANT: type('[PRODUCT_VARIANT] DESELECT VARIANT'),
    ADD_IMAGE_FOR_VARIANT: type('[PRODUCT_VARIANT] ADD IMAGE FOR VARIANT'),

    REMOVE_PROBABILITY_OPTION: type('[PRODUCT_VARIANT] REMOVE PROBABIITY OPTION'),

    CHANGE_PROBABILITY_OPTION_STATUS: type('[PRODUCT_VARIANT] CHANGE PROBABIITY OPTION STATUS'),

    REMOVE_OPTION_IMAGE: type('[PRODUCT_VARIANT] REMOVE OPTION IMAGE'),

    CLEAR_VARIANT: type('[PRODUCT_VARIANT] Clear Variant'),

    DELETE_PROBABILITY_OPTION: type('[PRODUCT_VARIANT] DELETE PROBABIITY OPTION'),
    DELETE_PROBABILITY_OPTION_SUCCESS: type('[PRODUCT_VARIANT] DELETE PROBABIITY OPTION Success'),
    DELETE_PROBABILITY_OPTION_FAIL: type('[PRODUCT_VARIANT] DELETE PROBABIITY OPTION FAIL'),

    DO_PRODUCT_UPDATE: type('[PRODUCT_VARIANT] Do Product Update'),
    DO_PRODUCT_UPDATE_SUCCESS: type('[PRODUCT_VARIANT] Do Product Update Success'),
    DO_PRODUCT_UPDATE_FAIL: type('[PRODUCT_VARIANT] Do Product Update Fail'),


    ORIGINAL_VARIANT_LIST: type('[PRODUCT_VARIANT]  Variant'),
    ORIGINAL_VARIANT_LIST_SUCCESS: type('[PRODUCT_VARIANT] Variant Success'),
    ORIGINAL_VARIANT_LIST_FAIL: type('[PRODUCT_VARIANT] Variant Fail'),
};

// product list action
export class GetVariantsListAction implements Action {
    type = ActionTypes.GET_VARIANTS_LIST;

    constructor(public payload: any) { }
}

export class GetVariantsListSuccessAction implements Action {
    type = ActionTypes.GET_VARIANTS_LIST_SUCCESS;

    constructor(public payload: any) { }
}

export class GetVariantsListFailAction implements Action {
    type = ActionTypes.GET_VARIANTS_LIST_FAIL;

    constructor(public payload: any = null) { }
}
// product list count action
export class GetVariantsListCountAction implements Action {
    type = ActionTypes.GET_VARIANTS_LIST_COUNT;

    constructor(public payload: any) { }
}

export class GetVariantsListCountSuccessAction implements Action {
    type = ActionTypes.GET_VARIANTS_LIST_COUNT_SUCCESS;

    constructor(public payload: any) { }
}

export class GetVariantsListCountFailAction implements Action {
    type = ActionTypes.GET_VARIANTS_LIST_COUNT_FAIL;

    constructor(public payload: any = null) { }
}

// product delete action
export class DoVariantsDeleteAction implements Action {
    type = ActionTypes.DO_VARIANTS_DELETE;

    constructor(public payload: any) { }
}

export class DoVariantsDeleteSuccessAction implements Action {
    type = ActionTypes.DO_VARIANTS_DELETE_SUCCESS;

    constructor(public payload: any) { }
}

export class DoVariantsDeleteFailAction implements Action {
    type = ActionTypes.DO_VARIANTS_DELETE_FAIL;

    constructor(public payload: any = null) { }
}

// product add action
export class DoVariantsAddAction implements Action {
    type = ActionTypes.DO_VARIANTS_ADD;

    constructor(public payload: any) { }
}

export class DoVariantsAddSuccessAction implements Action {
    type = ActionTypes.DO_VARIANTS_ADD_SUCCESS;

    constructor(public payload: any) { }
}

export class DoVariantsAddFailAction implements Action {
    type = ActionTypes.DO_VARIANTS_ADD_FAIL;

    constructor(public payload: any = null) { }
}

// Variants Update action
export class DoVariantsUpdateAction implements Action {
    type = ActionTypes.DO_VARIANTS_UPDATE;

    constructor(public payload: any) { }
}

export class DoVariantsUpdateSuccessAction implements Action {
    type = ActionTypes.DO_VARIANTS_UPDATE_SUCCESS;

    constructor(public payload: any) { }
}

export class DoVariantsUpdateFailAction implements Action {
    type = ActionTypes.DO_VARIANTS_UPDATE_FAIL;

    constructor(public payload: any = null) { }
}

// Reset Product Option
export class DoResetVariants implements Action {
    type = ActionTypes.RESET_VARIANTS;

    constructor(public payload: any = null) { }
}


// varinat details
export class GetVariantsDetailsAction implements Action {
    type = ActionTypes.GET_VARIANTS_DETAILS;

    constructor(public payload: any) { }
}

export class GetVariantsDetailsSuccessAction implements Action {
    type = ActionTypes.GET_VARIANTS_DETAILS_SUCCESS;

    constructor(public payload: any) { }
}

export class GetVariantsDetailsFailAction implements Action {
    type = ActionTypes.GET_VARIANTS_DETAILS_FAIL;

    constructor(public payload: any = null) { }
}


// product list action
export class GetProductlistAction implements Action {
    type = ActionTypes.GET_PRODUCT_LIST;

    constructor(public payload: any) { }
}

export class GetProductlistSuccessAction implements Action {
    type = ActionTypes.GET_PRODUCT_LIST_SUCCESS;

    constructor(public payload: any) { }
}

export class GetProductlistFailAction implements Action {
    type = ActionTypes.GET_PRODUCT_LIST_FAIL;

    constructor(public payload: any = null) { }
}



// product count action
export class GetProductCountAction implements Action {
    type = ActionTypes.GET_PRODUCT_COUNT;

    constructor(public payload: any) { }
}

export class GetProductCountSuccessAction implements Action {
    type = ActionTypes.GET_PRODUCT_COUNT_SUCCESS;

    constructor(public payload: any) { }
}

export class GetProductCountFailAction implements Action {
    type = ActionTypes.GET_PRODUCT_COUNT_FAIL;

    constructor(public payload: any = null) { }
}


// product detail action
export class GetProductDetailAction implements Action {
    type = ActionTypes.GET_PRODUCT_DETAIL;

    constructor(public payload: any) { }
}

export class GetProductDetailSuccess implements Action {
    type = ActionTypes.GET_PRODUCT_DETAIL_SUCCESS;

    constructor(public payload: any) { }
}

export class GetProductDetailFail implements Action {
    type = ActionTypes.GET_PRODUCT_DETAIL_FAIL;

    constructor(public payload: any = null) { }
}


export class DOClearProductDetails implements Action {
    type = ActionTypes.DO_CLEAR_PRODUCT_DETAILS;

    constructor() { }
}

export class SelectVariant implements Action {
    type = ActionTypes.SELECT_VARIANT;
    constructor(public payload: any) { }
}

export class DeleteVariant implements Action {
    type = ActionTypes.DESELECT_VARIANT;
    constructor(public payload: any) { }
}

export class AddImageForVariant implements Action {
    type = ActionTypes.ADD_IMAGE_FOR_VARIANT;
    constructor(public payload: any) { }
}

export class RemoveProbabiltyOption implements Action {
    type = ActionTypes.REMOVE_PROBABILITY_OPTION;
    constructor(public payload: any) { }
}

export class ChangeProbabiltyOptionStatus implements Action {
    type = ActionTypes.CHANGE_PROBABILITY_OPTION_STATUS;
    constructor(public payload: any) { }
}

export class RemoveOptionImage implements Action {
    type = ActionTypes.REMOVE_OPTION_IMAGE;
    constructor(public payload: any) { }
}

export class Variantclear implements Action {
    type = ActionTypes.CLEAR_VARIANT;
    constructor(public payload: any = null) { }
}

// delete probability option

export class DeleteProbabilityOption implements Action {
    type = ActionTypes.DELETE_PROBABILITY_OPTION;
    constructor(public payload: any) { }
}
export class DeleteProbabilityOptionSuccess implements Action {
    type = ActionTypes.DELETE_PROBABILITY_OPTION_SUCCESS;
    constructor(public payload: any) { }
}
export class DeleteProbabilityOptionFail implements Action {
    type = ActionTypes.DELETE_PROBABILITY_OPTION_FAIL;
    constructor(public payload: any) { }
}

// Product Update action
export class DoProductUpdateAction implements Action {
    type = ActionTypes.DO_PRODUCT_UPDATE;

    constructor(public payload: any) { }
}

export class DoProductUpdateSuccessAction implements Action {
    type = ActionTypes.DO_PRODUCT_UPDATE_SUCCESS;

    constructor(public payload: any) { 
    }
}

export class DoProductUpdateFailAction implements Action {
    type = ActionTypes.DO_PRODUCT_UPDATE_FAIL;

    constructor(public payload: any = null) { }
}


// Variant List
export class GetVariantList implements Action {
    type = ActionTypes.ORIGINAL_VARIANT_LIST;

    constructor(public payload: any) { }
}

export class GetVariantListSuccess implements Action {
    type = ActionTypes.ORIGINAL_VARIANT_LIST_SUCCESS;

    constructor(public payload: any) { 

    }
}

export class GetVariantListFail implements Action {
    type = ActionTypes.ORIGINAL_VARIANT_LIST_FAIL;

    constructor(public payload: any = null) { }
}

export type Actions =
    | GetVariantsListAction
    | GetVariantsListSuccessAction
    | GetVariantsListFailAction
    | DoVariantsDeleteAction
    | DoVariantsDeleteSuccessAction
    | DoVariantsDeleteFailAction
    | DoVariantsAddAction
    | DoVariantsAddSuccessAction
    | DoVariantsAddFailAction
    | DoVariantsUpdateAction
    | DoVariantsUpdateSuccessAction
    | DoVariantsUpdateFailAction
    | GetVariantList
    | GetVariantListSuccess
    | GetVariantListFail
    | DoResetVariants;
