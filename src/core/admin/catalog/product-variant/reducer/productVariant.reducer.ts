/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../action/productVariant.action';
// state
import {
  ProductVariantState,
  ProductVariantStateRecord
} from './productVariant.state';
export const initialState: ProductVariantState = new ProductVariantStateRecord() as unknown as ProductVariantState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ProductVariantState {
  if (!type) {
    return state;
  }

  switch (type) {

    // product add action
    case actions.ActionTypes.DO_VARIANTS_ADD: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_VARIANTS_ADD_SUCCESS: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        variantsAdded: payload
      });
    }
    case actions.ActionTypes.DO_VARIANTS_ADD_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: false,
        addFailed: true
      });
    }
    // product list action
    case actions.ActionTypes.GET_VARIANTS_LIST: {
      return Object.assign({}, state, {
        variantListLoading: true,
        variantListLoaded: false,
        variantListFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIANTS_LIST_SUCCESS: {
      let listArray = [];
      if (payload.data && payload.data.length > 0) {
        listArray = payload.data.map(data => {
          return { ...data, selected: false };
        });
      }
      return Object.assign({}, state, {
        variantListLoading: false,
        variantListLoaded: true,
        variantListFailed: false,
        variantsList: listArray,
        originalVariantList: listArray
      });
    }
    case actions.ActionTypes.GET_VARIANTS_LIST_FAIL: {
      return Object.assign({}, state, {
        variantListLoading: false,
        variantListLoaded: false,
        variantListFailed: true
      });
    }
    // product list count action
    case actions.ActionTypes.GET_VARIANTS_LIST_COUNT: {
      return Object.assign({}, state, {
        listCountLoading: true,
        listCountLoaded: false,
        listCountFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIANTS_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        listCountLoading: false,
        listCountLoaded: true,
        listCountFailed: false,
        variantsListCount: payload.data
      });
    }
    case actions.ActionTypes.GET_VARIANTS_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        listCountLoading: false,
        listCountLoaded: false,
        listCountFailed: true
      });
    }

    // product delete action
    case actions.ActionTypes.DO_VARIANTS_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_VARIANTS_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false,
        variantsDelete: payload
      });
    }
    case actions.ActionTypes.DO_VARIANTS_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true,
      });
    }
    // product update action
    case actions.ActionTypes.DO_VARIANTS_UPDATE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_VARIANTS_UPDATE_SUCCESS: {



      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false,
        variantsUpdate: payload
      });
    }
    case actions.ActionTypes.DO_VARIANTS_UPDATE_FAIL: {

      
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }


    case actions.ActionTypes.GET_VARIANTS_DETAILS: {
      return Object.assign({}, state, {
        variantsDetails: {},
        detailsLoading: true,
        detailsLoaded: false,
        detailsFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIANTS_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        variantsDetails: payload.data,
        detailsLoading: false,
        detailsLoaded: true,
        detailsFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIANTS_DETAILS_FAIL: {
      return Object.assign({}, state, {
        detailsLoading: false,
        detailsLoaded: false,
        detailsFailed: true
      });
    }

    case actions.ActionTypes.RESET_VARIANTS: {
      return Object.assign({}, state, {
        variantsUpdate: {}
      });
    }

    // <-------------GET PRODUCT LIST--------------> //

    case actions.ActionTypes.GET_PRODUCT_LIST: {


      return Object.assign({}, state, {
        productList: [],
        productListLoading: true,
        productListLoaded: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_SUCCESS: {

      
      return Object.assign({}, state, {
        productList: payload,
        productListLoading: false,
        productListLoaded: true
      });
    }

    // <-------------GET PRODUCT LIST COUNT--------------> //

    case actions.ActionTypes.GET_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        productCount: 0
        
      });
    }

    case actions.ActionTypes.GET_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        productCount: payload.data
      });
    }

    // <-------------GET PRODUCT DETAILS--------------> //

    case actions.ActionTypes.GET_PRODUCT_DETAIL: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_SUCCESS: {
      const tempVariantList = state.variantsList;
      const tempSelectedVariant = [];
      const tempSelectedVariantId = [];
      let tempProbabilityArray: any = [];
      let tempProductVariantList: any = [];
      let skuArray: any = [];
      if (payload.data) {
        if (tempVariantList && tempVariantList.length > 0) {
          tempProductVariantList = payload.data.productVariantList;
          tempVariantList.map(data => {
            payload.data.productVariants.forEach(item => {
              if (item.variantId === data.id) {
                const opts = { ...data, selected: true };
                Object.assign(data, opts);
                tempSelectedVariant.push(data);
                tempSelectedVariantId.push(data.id);
              }
            });
          });
         
          if (tempProductVariantList.length > 0) {
            tempProductVariantList = tempProductVariantList?.map((opt, i) => {
              
              const obj: any = {};
              obj.arrayId = 'id' + i;
              obj.value = opt.productVarientOptionDetails;
              obj.sku = opt.skuName;
              obj.price = opt.price;
              obj.barcode = '';
              obj.inventory = opt.quantity;
              obj.isActive = opt.isActive;
              obj.optionImage = opt.optionImage;
              obj.id = opt.id;
              opt.discountPrice?.forEach(res =>{
                obj.discountPrice = res.price
                obj.productDiscountId = res.productDiscountId
                obj.discountDateStart = res.dateStart
                obj.discountDateEnd = res.dateEnd
                obj.skuId = res.skuId
              })
              opt.specialPrice?.forEach(val =>{
                obj.specialPrice = val.price
                obj.productSpecialId = val.productSpecialId
                obj.spcialDateStart = val.dateStart
                obj.specialDateEnd = val.dateEnd
              })
              skuArray.push(opt.skuName);
              return obj;
            });
          }
          
          tempProbabilityArray = tempProductVariantList?.map(data => {
            const array = [];
            data.value?.map(item => {
              const opts = { id: item.variantValueId, value: item.value };
              array.push(opts);
            });
            return { ...data, value: array };
          });
        }
        if ((tempVariantList && tempVariantList.length == 0) && tempProductVariantList.length == 0) {
          skuArray.push(payload.data.sku);
        }
      }
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: true,
        detailFailed: false,
        productDetail: payload.data,
        variantList: tempVariantList,
        selectedVariant: tempSelectedVariant,
        selectedVariantOriginal: tempSelectedVariant,
        probabiltyOptions: tempProbabilityArray,
        originalProbabiltyArray: tempProbabilityArray,
        skuArrayList: skuArray,
        selectedVariantId: tempSelectedVariantId
      });
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_FAIL: {
      return Object.assign({}, state, {});
    }


    // <-------------CLEAR PRODUCT DETAILS--------------> //

    case actions.ActionTypes.DO_CLEAR_PRODUCT_DETAILS: {
      return Object.assign({}, state, {
        productDetail: {},
        variantList: [],
        selectedVariant: [],
        selectedVariantOriginal: [],
        probabiltyOptions: [],
        originalProbabiltyArray: [],
        skuArrayList: [],
        selectedVariantId: []

      });
    }

    // <-------------SELECT VARAINT TO MAKE PROBABILITY ARRAY--------------> //
    case actions.ActionTypes.SELECT_VARIANT: {
      let tempSelectedVariant: any = [];
      let tempProbabilityArray: any = [];
      if (state.selectedVariant) {
        tempSelectedVariant = state.selectedVariant;
      }
      if (payload.list) {
        if (!payload.list.selected) {
          state.variantsList = state.variantsList.map(data => {
            if (data.id === payload.list.id) {
              const opts = { ...data, selected: true };
              tempSelectedVariant.push(opts);
              return opts;
            } else {
              return data;
            }
          });

        } else {
          tempSelectedVariant = tempSelectedVariant.filter(data => {
            if (data.id === payload.list.id) {
              const opts = { ...data, selected: false };
              Object.assign({}, data, opts);
              return false;
            } else {
              const opts = { ...data, selected: true };
              Object.assign({}, data, opts);
              return true;
            }
          });
          state.variantsList = state.variantsList.map(item => {
            if (item.id === payload.list.id) {
              return { ...item, selected: false };
            } else {
              return item;
            }
          });
        }
      }
      if (tempSelectedVariant.length === 0) {
        tempProbabilityArray = [];

      } else if (tempSelectedVariant.length === 1) {
        tempProbabilityArray = tempSelectedVariant[0].varientsValue.map((data, i) => {
          const array = [];
          const obj: any = {};
          const opts = { id: data.id, value: data.value };
          array.push(opts);
          obj.value = array;
          obj.arrayId = 'id' + i;
          obj.sku = payload.mainSku ? payload.mainSku + '-0' + (i + 1) : '';
          obj.price = payload.defaultPrice ? payload.defaultPrice : '';
          obj.barcode = '';
          obj.inventory = '';
          obj.isActive = 1;
          obj.optionImage = [];
          return obj;
        });
      } else {
        let sections = tempSelectedVariant.map(variant => {
          return variant.varientsValue.map(val => ({ id: val.id, value: val.value }));
        });
        tempProbabilityArray = sections.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));
        tempProbabilityArray = tempProbabilityArray.map((data, i) => {
          const obj: any = {};
          obj.arrayId = 'id' + i;
          obj.value = data;
          obj.sku = payload.mainSku ? payload.mainSku + '-0' + (i + 1) : '';
          obj.price = payload.defaultPrice ? payload.defaultPrice : '';
          obj.barcode = '';
          obj.inventory = '';
          obj.isActive = 1;
          obj.optionImage = [];
          return obj;
        });
      }

      return Object.assign({}, state, {
        selectedVariant: tempSelectedVariant,
        selectedVariantOriginal: tempSelectedVariant,
        probabiltyOptions: tempProbabilityArray,
        originalProbabiltyArray: tempProbabilityArray
      });
    }

    // <-------------DELETE PROBABILITY ACTION--------------> //

    case actions.ActionTypes.DELETE_PROBABILITY_OPTION: {
      return Object.assign({}, state, {
        deleteProbabilityOption: [],
        deleteProbabilityOptionLoading: true,
        deleteProbabilityOptionLoaded: false,
        deleteProbabilityOptionFailed: false,
      });
    }

    case actions.ActionTypes.DELETE_PROBABILITY_OPTION_SUCCESS: {
      return Object.assign({}, state, {
        deleteProbabilityOption: payload,
        deleteProbabilityOptionLoading: false,
        deleteProbabilityOptionLoaded: true,
        deleteProbabilityOptionFailed: false,
      });
    }

    case actions.ActionTypes.DELETE_PROBABILITY_OPTION_FAIL: {
      return Object.assign({}, state, {
        deleteProbabilityOption: [],
        deleteProbabilityOptionLoading: false,
        deleteProbabilityOptionLoaded: false,
        deleteProbabilityOptionFailed: true,
      });
    }

    // <-------------REMOVE PROBABILITY VARIANT--------------> //

    case actions.ActionTypes.REMOVE_PROBABILITY_OPTION: {
      let tempProbabilityArray = [];
      tempProbabilityArray = state.originalProbabiltyArray;
      if (payload) {

        tempProbabilityArray = tempProbabilityArray.filter(data => {
          if (data.arrayId === payload.option.arrayId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        variantListLoading: false,
        variantListLoaded: false,
        variantListFailed: true,
        probabiltyOptions: tempProbabilityArray,
        originalProbabiltyArray: tempProbabilityArray
      });
    }

    // <-------------UPDATE PRODUCT--------------> //

    case actions.ActionTypes.DO_PRODUCT_UPDATE: {
      return Object.assign({}, state, {
        updateProductLoading: true,
        updateProductLoaded: false,
        updateProductFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_SUCCESS: {

      return Object.assign({}, state, {
        updateProductLoading: false,
        updateProductLoaded: true,
        updateProductFailed: false,
        productUpdate: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateProductLoading: false,
        updateProductLoaded: false,
        updateProductFailed: true,
        productUpdate: {}
      });
    }



        // <-------------Variant List-------------> //

        case actions.ActionTypes.ORIGINAL_VARIANT_LIST: {
          return Object.assign({}, state, {
            GetVariantListLoading: true,
            GetVariantListLoaded: false,
            GetVariantListFailed: false
          });
        }
    
        case actions.ActionTypes.ORIGINAL_VARIANT_LIST_SUCCESS: {
    

          return Object.assign({}, state, {
            GetVariantListLoading: false,
            GetVariantListLoaded: true,
            GetVariantListFailed: false,
            GetVariantList:payload
          });
        }
    
        case actions.ActionTypes.ORIGINAL_VARIANT_LIST_FAIL: {
          return Object.assign({}, state, {
            GetVariantListLoading: false,
            GetVariantListLoaded: false,
            GetVariantListFailed: true
          });
        }
    
    
	     // <-------------CLEAR VARIANT RELATED VARIABLES--------------> //
       case actions.ActionTypes.CLEAR_VARIANT: {
        return Object.assign({}, state, {
          originalProbabiltyArray: [],
          probabiltyOptions: [],
          selectedVariant: [],
          variantsList: [],})}


    default: {
      return state;
    }
  }
}

// product list action
export const getProductList = (state: ProductVariantState) => state.variantsList;
export const getProductListCount = (state: ProductVariantState) =>
  state.variantsListCount;
export const getProductListLoading = (state: ProductVariantState) =>
  state.listLoading;
export const getProductListLoaded = (state: ProductVariantState) =>
  state.listLoaded;
export const getProductListFailed = (state: ProductVariantState) =>
  state.listFailed;

// product delete action
export const getProductDelete = (state: ProductVariantState) =>
  state.variantsDelete;
export const getProductDeleteLoading = (state: ProductVariantState) =>
  state.deleteLoading;
export const getProductDeleteLoaded = (state: ProductVariantState) =>
  state.deleteLoaded;
export const getProductDeleteFailed = (state: ProductVariantState) =>
  state.deleteFailed;

// product add action
export const getProductAdd = (state: ProductVariantState) => state.variantsAdded;
export const getProductAddLoading = (state: ProductVariantState) =>
  state.addLoading;
export const getProductAddLoaded = (state: ProductVariantState) =>
  state.addLoaded;
export const getProductAddFailed = (state: ProductVariantState) =>
  state.addFailed;

// product update action
export const getProductUpdate = (state: ProductVariantState) =>
  state.variantsUpdate;
export const getProductUpdateLoading = (state: ProductVariantState) =>
  state.updateLoading;
export const getProductUpdateLoaded = (state: ProductVariantState) =>
  state.updateLoaded;
export const getProductUpdateFailed = (state: ProductVariantState) =>
  state.updateFailed;


export const variantsDetails = (state: ProductVariantState) =>
  state.variantsDetails;


// product list action
export const getProductVariantList = (state: ProductVariantState) => state.productList;
export const productListLoading = (state:ProductVariantState) => state.productListLoading;
export const productListLoaded = (state:ProductVariantState) => state.productListLoaded

// product count action
export const getProductCount = (state: ProductVariantState) => state.productCount;


// product detail action
export const getProductDetail = (state: ProductVariantState) => state.productDetail;

export const selectedVariant = (state: ProductVariantState) =>
  state.selectedVariant;


export const probabiltyOptions = (state: ProductVariantState) =>
  state.probabiltyOptions;

export const skuArrayList = (state: ProductVariantState) =>
  state.skuArrayList;

export const selectedVariantId = (state: ProductVariantState) =>
  state.selectedVariantId;



export const deleteProbabilityOption = (state: ProductVariantState) => state.deleteProbabilityOption;
export const deleteProbabilityOptionLoading = (state: ProductVariantState) => state.deleteProbabilityOptionLoading;
export const deleteProbabilityOptionLoaded = (state: ProductVariantState) => state.deleteProbabilityOptionLoaded;
export const deleteProbabilityOptionFailed = (state: ProductVariantState) => state.deleteProbabilityOptionFailed;

export const GetVariantList = (state: ProductVariantState) => state.GetVariantList;
export const GetVariantListLoading = (state: ProductVariantState) => state.GetVariantListLoading;
export const GetVariantListLoaded = (state: ProductVariantState) => state.GetVariantListLoaded;
export const GetVariantListFailed = (state: ProductVariantState) => state.GetVariantListFailed;

// product Variant update action
export const getProductVariantUpdate = (state: ProductVariantState) => state.productUpdate;
export const getProductVariantUpdateLoading = (state: ProductVariantState) =>
  state.updateLoading;
export const getProductVariantUpdateLoaded = (state: ProductVariantState) =>
  state.updateLoaded;
export const getProductVariantUpdateFailed = (state: ProductVariantState) =>
  state.updateFailed;

export const originalVariantList = (state: ProductVariantState) =>
  state.originalVariantList;