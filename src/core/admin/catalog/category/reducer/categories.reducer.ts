/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import * as actions from '../action/categories.action';
// state
import { CategoriesState, CategoriesStateRecord } from './categories.state';
// model
import { CategorylistResponseModel } from '../models/categorylist.response.model';

export const initialState: CategoriesState = new CategoriesStateRecord() as unknown as CategoriesState;
export function reducer(
  state = initialState,
  { type, payload }: any
): CategoriesState {
  if (!type) {
    return state;
  }

  switch (type) {
    // <----------------CATEGORY LIST ------------------> //
    case actions.ActionTypes.DO_CATEGORIES_LIST: {
      return Object.assign({}, state, {
        categoryList: [],
        categoryDetails:{},
        categoriesListResponse: false,
        categoriesListRequestLoading: true,
        categoriesListRequestLoaded: false,
        categoriesListRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CATEGORIES_LIST_SUCCESS: {
      const categoriesModel = payload.data.map(list => {
        const tempcategoriesModel = new CategorylistResponseModel(list);
        return tempcategoriesModel;
      });
      let categoriesFilterModel = [];
      if (!state.categoryListFilter) {
        categoriesFilterModel = payload.data.map(list => {
          const tempcategoriesFilterModel = new CategorylistResponseModel(list);
          return tempcategoriesFilterModel;
        });
      } else {
        categoriesFilterModel = state.categoryListFilter;
      }
      return Object.assign({}, state, {
        categoryList: categoriesModel,
        categoryListFilter: categoriesFilterModel,
        categoriesListResponse: true,
        categoriesListRequestLoading: false,
        categoriesListRequestLoaded: false,
        categoriesListRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CATEGORIES_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryList: [],
        categoriesListResponse: false,
        categoriesCountResponse: false,
        categoriesCountRequestLoading: false,
        categoriesCountRequestLoaded: true,
        categoriesCountRequestFailed: true
      });
    }

    // <----------------DELETE CATEGORY LIST ------------------> //

    case actions.ActionTypes.DO_DELETE_CATEGORIES: {
      return Object.assign({}, state, {
        deleteCategoriesResponse: false,
        deleteCategoriesRequestLoading: true,
        deleteCategoriesRequestLoaded: false,
        deleteCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_DELETE_CATEGORIES_SUCCESS: {
      return Object.assign({}, state, {
        categoryDoDelete: payload,
        deleteCategoriesResponse: true,
        deleteCategoriesRequestLoading: false,
        deleteCategoriesRequestLoaded: false,
        deleteCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_DELETE_CATEGORIES_FAIL: {
      return Object.assign({}, state, {
        deleteCategoriesResponse: false,
        deleteCategoriesRequestLoading: false,
        deleteCategoriesRequestLoaded: true,
        deleteCategoriesRequestFailed: true
      });
    }

    // <----------------ADD CATEGORY ------------------> //

    case actions.ActionTypes.DO_ADDCATEGORIES: {
      return Object.assign({}, state, {
        addCategoriesResponse: false,
        addCategoriesRequestLoading: true,
        addCategoriesRequestLoaded: false,
        addCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_ADDCATEGORIES_SUCCESS: {
      return Object.assign({}, state, {
        addCatagoryStatus: payload,
        addCategoriesRequestLoading: false,
        addCategoriesRequestLoaded: true,
        addCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_ADDCATEGORIES_FAIL: {
      return Object.assign({}, state, {
        addCategoriesResponse: false,
        addCategoriesRequestLoading: false,
        addCategoriesRequestLoaded: true,
        addCategoriesRequestFailed: true
      });
    }

    // <----------------UPDATE CATEGORY ------------------> //

    case actions.ActionTypes.DO_UPDATECATEGORIES: {
      return Object.assign({}, state, {
        updateCategoriesResponse: false,
        updateCategoriesRequestLoading: true,
        updateCategoriesRequestLoaded: false,
        updateCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATECATEGORIES_SUCCESS: {
      return Object.assign({}, state, {
        updateCatagory: payload,
        updateCategoriesResponse: true,
        updateCategoriesRequestLoading: false,
        updateCategoriesRequestLoaded: false,
        updateCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATECATEGORIES_FAIL: {
      return Object.assign({}, state, {
        updateCategoryBadresponse: payload,
        updateCategoriesResponse: false,
        updateCategoriesRequestLoading: false,
        updateCategoriesRequestLoaded: true,
        updateCategoriesRequestFailed: true
      });
    }
   
    
    // <----------------CATEGORY TRANSLATION ------------------> //

    case actions.ActionTypes.GET_CATEGORY_TRANSLATION_LIST: {
      return Object.assign({}, state, {
        getCategoryTranslationList: {},
        getCategoryTranslationListLoading: true,
        getCategoryTranslationListLoaded: false,
        getCategoryTranslationListFailed: false
      });
    }
    case actions.ActionTypes.GET_CATEGORY_TRANSLATION_LIST_SUCCESS: {
      return Object.assign({}, state, {
        getCategoryTranslationList: payload.data,
        getCategoryTranslationListLoading: false,
        getCategoryTranslationListLoaded: true,
        getCategoryTranslationListFailed: false
      });
    }
    case actions.ActionTypes.GET_CATEGORY_TRANSLATION_LIST_FAIL: {
      return Object.assign({}, state, {
        getCategoryTranslationList: payload,
        getCategoryTranslationListLoading: false,
        getCategoryTranslationListLoaded: true,
        getCategoryTranslationListFailed: true
      });
    }
   
       
    // <----------------Translation Detail ------------------> //

    case actions.ActionTypes.TRANSALTION_DETAIL: {
      return Object.assign({}, state, {
        translationDetail: {},
        translationDetailLoading: true,
        translationDetailLoaded: false,
        translationDetailFailed: false
      });
    }
    case actions.ActionTypes.TRANSALTION_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        translationDetail: payload.data,
        translationDetailLoading: false,
        translationDetailLoaded: true,
        translationDetailFailed: false
      });
    }
    case actions.ActionTypes.TRANSALTION_DETAIL_FAIL: {
      return Object.assign({}, state, {
        translationDetail: payload,
        translationDetailLoading: false,
        translationDetailLoaded: true,
        translationDetailFailed: true
      });
    }

       // <----------------add_Translation------------------> //

       case actions.ActionTypes.ADD_TRANSLATION: {
        return Object.assign({}, state, {
         add_Translation: {},
         add_TranslationLoading: true,
         add_TranslationLoaded: false,
         add_TranslationFailed: false
        });
      }
      case actions.ActionTypes.ADD_TRANSLATION_SUCCESS: {
        return Object.assign({}, state, {
         add_Translation: payload,
         add_TranslationLoading: false,
         add_TranslationLoaded: true,
         add_TranslationFailed: false
        });
      }
      case actions.ActionTypes.ADD_TRANSLATION_FAIL: {
        return Object.assign({}, state, {
         add_Translation: payload,
         add_TranslationLoading: false,
         add_TranslationLoaded: true,
         add_TranslationFailed: true
        });
      }

         // <----------------Edit_Translation------------------> //

         case actions.ActionTypes.EDIT_TRANSLATION: {
          return Object.assign({}, state, {
           edit_Translation: {},
           edit_TranslationLoading: true,
           edit_TranslationLoaded: false,
           edit_TranslationFailed: false
          });
        }
        case actions.ActionTypes.EDIT_TRANSLATION_SUCCESS: {
          return Object.assign({}, state, {
           edit_Translation: payload.data,
           edit_TranslationLoading: false,
           edit_TranslationLoaded: true,
           edit_TranslationFailed: false
          });
        }
        case actions.ActionTypes.EDIT_TRANSLATION_FAIL: {
          return Object.assign({}, state, {
           edit_Translation: payload,
           edit_TranslationLoading: false,
           edit_TranslationLoaded: true,
           edit_TranslationFailed: true
          });
        }
    
           // <----------------COUNT_Translation------------------> //

           case actions.ActionTypes.GET_CATEGORY_TRANSLATIONS_COUNT: {
            return Object.assign({}, state, {
             getCategoryTranslationCount: {},
             getCategoryTranslationCountLoading: true,
             getCategoryTranslationCountLoaded: false,
             getCategoryTranslationCountFailed: false
            });
          }
          case actions.ActionTypes.GET_CATEGORY_TRANSLATIONS_COUNT_SUCCESS: {
            return Object.assign({}, state, {
             getCategoryTranslationCount: payload.data,
             getCategoryTranslationCountLoading: false,
             getCategoryTranslationCountLoaded: true,
             getCategoryTranslationCountFailed: false
            });
          }
          case actions.ActionTypes.GET_CATEGORY_TRANSLATIONS_COUNT_FAIL: {
            return Object.assign({}, state, {
             getCategoryTranslationCount: payload,
             getCategoryTranslationCountLoading: false,
             getCategoryTranslationCountLoaded: true,
             getCategoryTranslationCountFailed: true
            });
          }
      


    // <----------------REMOVE CATEGORY FROM PRODUCT ADD COMPONENT------------------> //

    case actions.ActionTypes.DO_PRODUCT_REMOVE: {
      const Data: any = state.categoryList;
      for (let i = 0; i < Data.length; i++) {
        if (i === payload) {
          Data.splice(payload, 1);
        }
      }
      return Object.assign({}, state, {
        productRemoveList: Data,
        productRemoveResponse: false,
        productRemoveRequestLoading: true,
        productRemoveRequestLoaded: false,
        productRemoveRequestFailed: false
      });
    }

    // <----------------ADD CATEGORY FROM PRODUCT ADD COMPONENT------------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD: {
      const Data: any = state.categoryList;
      Data.push(payload);
      return Object.assign({}, state, {
        categoryList: Data,
        productAddResponse: false,
        productAddRequestLoading: true,
        productAddRequestLoaded: false,
        productAddRequestFailed: false
      });
    }

    // <----------------CATEGORY LIST COUNT------------------> //

    case actions.ActionTypes.DO_CATEGORIESCOUNT: {
      return Object.assign({}, state, {
        categoriesCountResponse: false,
        categoriesCountRequestLoading: true,
        categoriesCountRequestLoaded: false,
        categoriesCountRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CATEGORIESCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        categoryListCount: payload.data['productCount'],
        categoriesCountResponse: true,
        categoriesCountRequestLoading: false,
        categoriesCountRequestLoaded: false,
        categoriesCountRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CATEGORIESCOUNT_FAIL: {
      return Object.assign({}, state, {
        categoriesCountResponse: false,
        categoriesCountRequestLoading: false,
        categoriesCountRequestLoaded: true,
        categoriesCountRequestFailed: true
      });
    }

    // <----------------GET CATEGORY DETAILS------------------> //

    case actions.ActionTypes.GET_CATEGORY_DETAILS: {
      return Object.assign({}, state, {
        categoryDetails:{},
        categoryDetailsLoading: true,
        categoryDetailsLoaded: false,
        categoryDetailsFailed: false,
      });
    }
    case actions.ActionTypes.GET_CATEGORY_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
       
        categoryDetails: payload.data,
        categoryDetailsLoading: false,
        categoryDetailsLoaded: true,
        categoryDetailsFailed: false,
      });
    }
    case actions.ActionTypes.GET_CATEGORY_DETAILS_FAIL: {
      return Object.assign({}, state, {
        categoryDetailsLoading: false,
        categoryDetailsLoaded: false,
        categoryDetailsFailed: true,
      });
    }
    // categoryDetailsRemove
    case actions.ActionTypes.GET_CATEGORY_DETAILS_FAIL: {
      return Object.assign({}, state, {
        categoryDetailsRemove:{}
      });
    }

    // <----------------FILTER CATEGORY------------------> //

    case actions.ActionTypes.FILTER_CATEGORY: {
      let tempCategoryArray = [];
      let catArray = [];
      if (payload && state.categoryList !== undefined) {
        tempCategoryArray = JSON.parse(JSON.stringify(state.categoryList));
        catArray = tempCategoryArray.filter((elem) => !payload.find(({ categoryId }) => elem.categoryId === categoryId));
      }
      return Object.assign({}, state, {
        categoryList: catArray

      });
    }


    // <----------------Export Excel------------------> //

    case actions.ActionTypes.CATEGORY_EXPORT_EXCEL: {
      return Object.assign({}, state, {
        CategoryExportExcelLoading: true,
        CategoryExportExcelLoaded: false,
        CategoryExportExcelFailed: false,
      });
    }
    case actions.ActionTypes.CATEGORY_EXPORT_EXCEL_SUCCESS: {
      return Object.assign({}, state, {
        CategoryExportExcel: payload.data,
        CategoryExportExcelLoading: false,
        CategoryExportExcelLoaded: true,
        CategoryExportExcelFailed: false,
      });
    }
    case actions.ActionTypes.CATEGORY_EXPORT_EXCEL_FAIL: {
      return Object.assign({}, state, {
        CategoryExportExcelLoading: false,
        CategoryExportExcelLoaded: false,
        CategoryExportExcelFailed: true,
      });
    }



    // <----------------Export Excel------------------> //

    case actions.ActionTypes.EXPORT_ALL_EXCEL: {
      return Object.assign({}, state, {
        ExportAllExcelLoading: true,
        ExportAllExcelLoaded: false,
        ExportAllExcelFailed: false,
      });
    }
    case actions.ActionTypes.EXPORT_ALL_EXCEL_SUCCESS: {
      return Object.assign({}, state, {
        ExportAllExcel: payload.data,
        ExportAllExcelLoading: false,
        ExportAllExcelLoaded: true,
        ExportAllExcelFailed: false,
      });
    }
    case actions.ActionTypes.EXPORT_ALL_EXCEL_FAIL: {
      return Object.assign({}, state, {
        ExportAllExcelLoading: false,
        ExportAllExcelLoaded: false,
        ExportAllExcelFailed: true,
      });
    }

    

    // <----------------IndustryList------------------> //

    case actions.ActionTypes.INDUSTRY_LIST: {
      return Object.assign({}, state, {
        IndustryListLoading: true,
        IndustryListLoaded: false,
        IndustryListFailed: false,
      });
    }
    case actions.ActionTypes.INDUSTRY_LIST_SUCCESS: {
      return Object.assign({}, state, {
        IndustryList: payload.data,
        IndustryListLoading: false,
        IndustryListLoaded: true,
        IndustryListFailed: false,
      });
    }
    case actions.ActionTypes.INDUSTRY_LIST_FAIL: {
      return Object.assign({}, state, {
        IndustryListLoading: false,
        IndustryListLoaded: false,
        IndustryListFailed: true,
      });
    }

    // <----------------industryBasedCategory------------------> //

    case actions.ActionTypes.INDUSTRY_BASED_CATEGORY: {
      return Object.assign({}, state, {
        industryBasedCategoryLoading: true,
        industryBasedCategoryLoaded: false,
        industryBasedCategoryFailed: false,
      });
    }
    case actions.ActionTypes.INDUSTRY_BASED_CATEGORY_SUCCESS: {
      return Object.assign({}, state, {
        industryBasedCategory: payload.data,
        industryBasedCategoryLoading: false,
        industryBasedCategoryLoaded: true,
        industryBasedCategoryFailed: false,
      });
    }
    case actions.ActionTypes.INDUSTRY_BASED_CATEGORY_FAIL: {
      return Object.assign({}, state, {
        industryBasedCategoryLoading: false,
        industryBasedCategoryLoaded: false,
        industryBasedCategoryFailed: true,
      });
    }


    default: {
      return state;
    }
  }
}

// category count action
export const getCategoryListCount = (state: CategoriesState) =>
  state.categoryListCount;
export const getCategoriesCountResponse = (state: CategoriesState) =>
  state.categoriesCountResponse;
export const getCategoriesCountRequestLoading = (state: CategoriesState) =>
  state.categoriesCountRequestLoading;
export const getCategoriesCountRequestLoaded = (state: CategoriesState) =>
  state.categoriesCountRequestLoaded;
export const getCategoriesCountRequestFailed = (state: CategoriesState) =>
  state.categoriesCountRequestFailed;
export const getCategoryCountdata = (state: CategoriesState) =>
  state.categoryCountData;
// category list action
export const getCategoryList = (state: CategoriesState) => state.categoryList;
// categoryListFilter
export const getCategoryFilterList = (state: CategoriesState) =>
  state.categoryListFilter;

export const getCategoriesListResponse = (state: CategoriesState) =>
  state.categoriesListResponse;
export const getCategoriesListRequestLoading = (state: CategoriesState) =>
  state.categoriesListRequestLoading;
export const getCategoriesListRequestLoaded = (state: CategoriesState) =>
  state.categoriesListRequestLoaded;
export const getCategoriesListRequestFailed = (state: CategoriesState) =>
  state.categoriesListRequestFailed;

// category delete action
export const getCategoryDoDelete = (state: CategoriesState) =>
  state.categoryDoDelete;
export const getDeleteCategoriesResponse = (state: CategoriesState) =>
  state.deleteCategoriesResponse;
export const getDeleteCategoriesRequestLoading = (state: CategoriesState) =>
  state.deleteCategoriesRequestLoading;
export const getDeleteCategoriesRequestLoaded = (state: CategoriesState) =>
  state.deleteCategoriesRequestLoaded;
export const getDeleteCategoriesRequestFailed = (state: CategoriesState) =>
  state.deleteCategoriesRequestFailed;
// category add action
export const getAddCatagoryStatus = (state: CategoriesState) =>
  state.addCatagoryStatus;
export const getAddCatagoryData = (state: CategoriesState) =>
  state.addCatagoryData;
export const getAddCategoriesResponse = (state: CategoriesState) =>
  state.addCategoriesResponse;
export const getAddCategoriesRequestLoading = (state: CategoriesState) =>
  state.addCategoriesRequestLoading;
export const getAddCategoriesRequestLoaded = (state: CategoriesState) =>
  state.addCategoriesRequestLoaded;
export const getAddCategoriesRequestFailed = (state: CategoriesState) =>
  state.addCategoriesRequestFailed;
// category update action
export const getUpdateCategoriesResponse = (state: CategoriesState) =>
  state.updateCategoriesResponse;
export const getUpdateCategoriesRequestLoading = (state: CategoriesState) =>
  state.updateCategoriesRequestLoading;
export const getUpdateCategoriesRequestLoaded = (state: CategoriesState) =>
  state.updateCategoriesRequestLoaded;
export const getUpdateCategoriesRequestFailed = (state: CategoriesState) =>
  state.updateCategoriesRequestFailed;
export const getUpdateCategoryBadresponse = (state: CategoriesState) =>
  state.updateCategoryBadresponse;
export const getUpdateCatagory = (state: CategoriesState) =>
  state.updateCatagory;

// category translation 
export const getCategoryTranslationList = (state: CategoriesState) =>
  state.getCategoryTranslationList ;
export const getCategoryTranslationListLoading = (state: CategoriesState) =>
  state.getCategoryTranslationListLoading;
export const getCategoryTranslationListLoaded = (state: CategoriesState) =>
  state.getCategoryTranslationListLoaded;
export const getCategoryTranslationListFailed = (state: CategoriesState) =>
  state.getCategoryTranslationListFailed;

// Translation Detail
export const translationDetail = (state: CategoriesState) =>
  state.translationDetail ;
export const translationDetailLoading = (state: CategoriesState) =>
  state.translationDetailLoading;
export const translationDetailLoaded = (state: CategoriesState) =>
  state.translationDetailLoaded;
export const translationDetailFailed = (state: CategoriesState) =>
  state.translationDetailFailed;

// Add Translation Detail
export const add_Translation = (state: CategoriesState) =>
  state.add_Translation ;
export const add_TranslationLoading = (state: CategoriesState) =>
  state.add_TranslationLoading;
export const add_TranslationLoaded = (state: CategoriesState) =>
  state.add_TranslationLoaded;
export const add_TranslationFailed = (state: CategoriesState) =>
  state.add_TranslationFailed;

// edit_Translation
export const edit_Translation = (state: CategoriesState) =>
  state.edit_Translation ;
export const edit_TranslationLoading = (state: CategoriesState) =>
  state.edit_TranslationLoading;
export const edit_TranslationLoaded = (state: CategoriesState) =>
  state.edit_TranslationLoaded;
export const edit_TranslationFailed = (state: CategoriesState) =>
  state.edit_TranslationFailed;


// getCategoryTranslationCount
export const getCategoryTranslationCount = (state: CategoriesState) =>
  state.getCategoryTranslationCount ;
export const getCategoryTranslationCountLoading = (state: CategoriesState) =>
  state.getCategoryTranslationCountLoading;
export const getCategoryTranslationCountLoaded = (state: CategoriesState) =>
  state.getCategoryTranslationCountLoaded;
export const getCategoryTranslationCountFailed = (state: CategoriesState) =>
  state.getCategoryTranslationCountFailed;






// product remove action
export const getProductRemoveResponse = (state: CategoriesState) =>
  state.productRemoveResponse;
export const getProductRemoveRequestLoading = (state: CategoriesState) =>
  state.productRemoveRequestLoading;
export const getProductRemoveRequestLoaded = (state: CategoriesState) =>
  state.productRemoveRequestLoaded;
export const getProductRemoveRequestFailed = (state: CategoriesState) =>
  state.productRemoveRequestFailed;
// product add action
export const getProductAddResponse = (state: CategoriesState) =>
  state.productAddResponse;
export const getProductAddRequestLoading = (state: CategoriesState) =>
  state.productAddRequestLoading;
export const getProductAddRequestLoaded = (state: CategoriesState) =>
  state.productAddRequestLoaded;
export const getProductAddRequestFailed = (state: CategoriesState) =>
  state.productAddRequestFailed;



export const categoryDetails = (state: CategoriesState) =>
  state.categoryDetails;
export const categoryDetailsLoading = (state: CategoriesState) =>
  state.categoryDetailsLoading;
export const categoryDetailsLoaded = (state: CategoriesState) =>
  state.categoryDetailsLoaded;
export const categoryDetailsFailed = (state: CategoriesState) =>
  state.categoryDetailsFailed;
export const categoriesListResponse = (state: CategoriesState) =>
  state.categoriesListResponse;


export const CategoryExportExcel = (state: CategoriesState) =>
  state.CategoryExportExcel;
export const CategoryExportExcelLoading = (state: CategoriesState) =>
  state.CategoryExportExcelLoading;
export const CategoryExportExcelLoaded = (state: CategoriesState) =>
  state.CategoryExportExceltLoaded;
export const CategoryExportExcelFailed = (state: CategoriesState) =>
  state.CategoryExportExcelFailed;
export const CategoryExportExcelResponse = (state: CategoriesState) =>
  state.CategoryExportExcelResponse;


export const ExportAllExcel = (state: CategoriesState) =>
  state.ExportAllExcel;
export const ExportAllExcelLoading = (state: CategoriesState) =>
  state.ExportAllExcelLoading;
export const ExportAllExcelLoaded = (state: CategoriesState) =>
  state.ExportAllExceltLoaded;
export const ExportAllExcelFailed = (state: CategoriesState) =>
  state.ExportAllExcelFailed;
export const ExportAllExcelResponse = (state: CategoriesState) =>
  state.ExportAllExcelResponse;

export const IndustryList = (state: CategoriesState) =>
  state.IndustryList;
export const IndustryListLoading = (state: CategoriesState) =>
  state.IndustryListLoading;
export const IndustryListLoaded = (state: CategoriesState) =>
  state.IndustryListLoaded;
export const IndustryListFailed = (state: CategoriesState) =>
  state.IndustryListFailed;

export const industryBasedCategory = (state: CategoriesState) =>
  state.industryBasedCategory;
export const industryBasedCategoryLoading = (state: CategoriesState) =>
  state.industryBasedCategoryLoading;
export const industryBasedCategoryLoaded = (state: CategoriesState) =>
  state.industryBasedCategoryLoaded;
export const industryBasedCategoryFailed = (state: CategoriesState) =>
  state.industryBasedCategoryFailed;

export const categoryDetailsRemove = (state: CategoriesState) =>
  state.categoryDetailsRemove;
