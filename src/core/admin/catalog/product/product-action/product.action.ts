/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';
// model
import { ProductListModel } from '../product-model/Product-list.model';
import { ProductDeleteModel } from '../product-model/product-delete.model';
import { ProductAddModel } from '../product-model/Product-add.model';
import { ProductUpdateModel } from '../product-model/Product-update.model';
import { DetailModel } from '../product-model/detail.model';
import { SearchOptionListModel } from '../product-model/option-List.model';

export const ActionTypes = {
  GET_PRODUCT_LIST: type('[List] Do Product list'),
  GET_PRODUCT_LIST_SUCCESS: type('[List] Do Product list Success'),
  GET_PRODUCT_LIST_FAIL: type('[List] Do Product list Fail'),

  GET_PRODUCT_COUNT: type('[List] Do Paination Count'),
  GET_PRODUCT_COUNT_SUCCESS: type('[List] Do Paination Count Success'),
  GET_PRODUCT_COUNT_FAIL: type('[List] Do Paination Count Fail'),

  DO_PRODUCT_DELETE: type('[Delete] Do Product Delete'),
  DO_PRODUCT_DELETE_SUCCESS: type('[Delete] Do Product Delete Success'),
  DO_PRODUCT_DELETE_FAIL: type('[Delete] Do Product Delete Fail'),

  DO_PRODUCT_ADD: type('[Add] Do Product Add'),
  DO_PRODUCT_ADD_SUCCESS: type('[Add] Do Product Add Success'),
  DO_PRODUCT_ADD_FAIL: type('[Add] Do Product Add Fail'),

  DO_PRODUCT_UPDATE: type('[Update] Do Product Update'),
  DO_PRODUCT_UPDATE_SUCCESS: type('[Update] Do Product Update Success'),
  DO_PRODUCT_UPDATE_FAIL: type('[Update] Do Product Update Fail'),

  GET_PRODUCT_DETAIL: type('[Detail] Do Product Detail'),
  GET_PRODUCT_DETAIL_SUCCESS: type('[Detail] Do Product Detail Success'),
  GET_PRODUCT_DETAIL_FAIL: type('[Detail] Do Product Detail Fail'),

  DO_PRODUCT_REMOVE_LIST: type('[PRemoveList] Do ProductList Remove'),
  DO_PRODUCT_ADD_LIST: type('[PAddList] Do ProductList Add'),


  DO_CLEAR_PRODUCT_DETAILS: type('[PRODUCT_DETAIL] DO CLEAR PRODUCT DETAIL'),

  GET_PRODUCT_RATING: type('[PRODUCT RATING] Get Product Rating'),
  GET_PRODUCT_RATING_SUCCESS: type(
    '[PRODUCT RATING] Get Product Rating Success'
  ),
  GET_PRODUCT_RATING_FAIL: type('[PRODUCT RATING] Get Product Rating Fail'),

  DO_PRODUCT_RATING_STATUS: type('[PRODUCT RATING STATUS] DO Rating Status'),
  DO_PRODUCT_RATING_STATUS_SUCCESS: type(
    '[PRODUCT RATING STATUS] DDO Rating Status SUCCESS'
  ),
  DO_PRODUCT_RATING_STATUS_FAIL: type(
    '[PRODUCT RATING STATUS] DO Rating Status FAIL'
  ),

  DO_PRODUCT_BULK_DELETE: type('[PRODUCT BULK DELETE] DO Product Bulk Delete'),
  DO_PRODUCT_BULK_DELETE_SUCCESS: type(
    '[PRODUCT BULK DELETE SUCCESS] Do Product Bulk Delete Success'
  ),
  DO_PRODUCT_BULK_DELETE_FAIL: type(
    '[PRODUCT BULK DELETE] Do Product Bulk Delete Fail'
  ),

  GET_PRODUCT_EXCEL: type('[PRODUCT EXCEL] DO Product Excel'),
  GET_PRODUCT_EXCEL_SUCCESS: type(
    '[PRODUCT EXCEL SUCCESS] Do Product Excel Success'
  ),
  GET_PRODUCT_EXCEL_FAIL: type('[PRODUCT EXCEL DELETE] Do Product Excel Fail'),

  GET_PRODUCT_ALL_EXCEL: type('[PRODUCT ALL EXCEL] DO Product All Excel'),
  GET_PRODUCT_ALL_EXCEL_SUCCESS: type(
    '[PRODUCT ALL EXCEL SUCCESS] Do Product All Excel Success'
  ),
  GET_PRODUCT_ALL_EXCEL_FAIL: type('[PRODUCT ALL EXCEL DELETE] Do Product All Excel Fail'),

  

  CLEAR_VARIABLE: type('[QUESTION]  CLEAR VARIABLE'),

  VIDEO_UPLOAD: type('[VIDEO] VIDEO UPLOAD'),
  VIDEO_UPLOAD_SUCCESS: type('[VIDEO] VIDEO UPLOAD Success'),
  VIDEO_UPLOAD_FAIL: type('[VIDEO] VIDEO UPLOAD FAIL'),

  VIDEO_PREVIEW: type('[VIDEO PREVIEW] VIDEO PREVIEW'),
  VIDEO_PREVIEW_SUCCESS: type('[VIDEO PREVIEW] VIDEO PREVIEW Success'),
  VIDEO_PREVIEW_FAIL: type('[VIDEO PREVIEW] VIDEO PREVIEW FAIL'),




};


// product list action
export class GetProductlistAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST;

  constructor(public payload: ProductListModel) { }
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

// product delete action
export class DoProductDeleteAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE;

  constructor(public payload: ProductDeleteModel) { }
}

export class DoProductDeleteSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductDeleteFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_FAIL;

  constructor(public payload: any = null) { }
}

// product add action
export class DoProductAddAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD;

  constructor(public payload: ProductAddModel) {
  }
}

export class DoProductAddSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DoProductAddFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_FAIL;

  constructor(public payload: any = null) { }
}

// Product Update action
export class DoProductUpdateAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE;

  constructor(public payload: ProductUpdateModel) { }
}

export class DoProductUpdateSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductUpdateFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE_FAIL;

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

// product remove List action
export class DoProductremovelistAction implements Action {
  type = ActionTypes.DO_PRODUCT_REMOVE_LIST;

  constructor(public payload: any) { }
}

// product add List action
export class DoProductaddlistAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_LIST;

  constructor(public payload: any) { }
}

export class DOClearProductDetails implements Action {
  type = ActionTypes.DO_CLEAR_PRODUCT_DETAILS;

  constructor() { }
}

// Get Product Rating
export class GetProductRating implements Action {
  type = ActionTypes.GET_PRODUCT_RATING;

  constructor(public payload: any) { }
}

export class GetProductRatingSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_RATING_SUCCESS;

  constructor(public payload: any) { }
}

export class GetProductRatingFail implements Action {
  type = ActionTypes.GET_PRODUCT_RATING_FAIL;

  constructor(public payload: any = null) { }
}

// Do Rating Status
export class DoProductRatingStatus implements Action {
  type = ActionTypes.DO_PRODUCT_RATING_STATUS;

  constructor(public payload: any = null) { }
}

export class DoProductRatingStatusSuccess implements Action {
  type = ActionTypes.DO_PRODUCT_RATING_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductRatingStatusFail implements Action {
  type = ActionTypes.DO_PRODUCT_RATING_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

// Do Product Bulk Delete
export class DoProductBulkDelete implements Action {
  type = ActionTypes.DO_PRODUCT_BULK_DELETE;

  constructor(public payload: any = null) { }
}

export class DoProductBulkDeleteSuccess implements Action {
  type = ActionTypes.DO_PRODUCT_BULK_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductBulkDeleteFail implements Action {
  type = ActionTypes.DO_PRODUCT_BULK_DELETE_FAIL;

  constructor(public payload: any = null) { }
}

// get Product Excel
export class DoProductExcel implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL;

  constructor(public payload: any = null) { }
}

export class DoProductExcelSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductExcelFail implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL_FAIL;

  constructor(public payload: any = null) { }
}



// get Product Excel
export class DoProductAllExcel implements Action {
  type = ActionTypes.GET_PRODUCT_ALL_EXCEL;

  constructor(public payload: any = null) { }
}

export class DoProductAllExcelSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_ALL_EXCEL_SUCCESS;

  constructor(public payload: any) { }
}

export class DoProductAllExcelFail implements Action {
  type = ActionTypes.GET_PRODUCT_ALL_EXCEL_FAIL;

  constructor(public payload: any = null) { }
}

// clear variable action

export class ClearVariableAction implements Action {
  type = ActionTypes.CLEAR_VARIABLE;
  constructor(public payload: any = null) { }
}

// VIDEO UPLOAD
export class VideoUpload implements Action {
  type = ActionTypes.VIDEO_UPLOAD;
  constructor(public payload: any) { }
}
export class VideoUploadSuccess implements Action {
  type = ActionTypes.VIDEO_UPLOAD_SUCCESS;
  constructor(public payload: any) { }
}
export class VideoUploadFail implements Action {
  type = ActionTypes.VIDEO_UPLOAD_FAIL;
  constructor(public payload: any) { }
}

// VIDEO PREVIEW
export class videoPreview implements Action {
  type = ActionTypes.VIDEO_PREVIEW;
  constructor(public payload: any) { }
}
export class videoPreviewSuccess implements Action {
  type = ActionTypes.VIDEO_PREVIEW_SUCCESS;
  constructor(public payload: any) { }
}
export class videoPreviewFail implements Action {
  type = ActionTypes.VIDEO_PREVIEW_FAIL;
  constructor(public payload: any) { }
}

export type Actions =
  | GetProductlistAction
  | GetProductlistSuccessAction
  | GetProductlistFailAction
  | GetProductCountAction
  | GetProductCountSuccessAction
  | GetProductCountFailAction
  | DoProductDeleteAction
  | DoProductDeleteSuccessAction
  | DoProductDeleteFailAction
  | DoProductAddAction
  | DoProductAddSuccessAction
  | DoProductAddFailAction
  | DoProductUpdateAction
  | DoProductUpdateSuccessAction
  | DoProductUpdateFailAction
  | GetProductDetailAction
  | GetProductDetailSuccess
  | GetProductDetailFail
  | DoProductremovelistAction
  | DoProductaddlistAction
  | GetProductRating
  | GetProductRatingSuccess
  | GetProductRatingFail
  | DoProductRatingStatus
  | DoProductRatingStatusSuccess
  | DoProductRatingStatusFail
  | DoProductBulkDelete
  | DoProductBulkDeleteSuccess
  | DoProductBulkDeleteFail
  | DoProductExcel
  | DoProductExcelSuccess
  | DoProductBulkDeleteFail
  | DoProductAllExcel
  | DoProductAllExcelSuccess
  | DoProductAllExcelFail
  | ClearVariableAction

