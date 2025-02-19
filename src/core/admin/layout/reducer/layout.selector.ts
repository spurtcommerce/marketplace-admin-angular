/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// store
import { AppState } from '../../../app.state.interface';
import { createSelector } from 'reselect';
// reducer
import * as fromLayout from './layout.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getLayoutState = (state: AppState) => state.layout;
export const getSettingsResponse = createSelector(getLayoutState, fromLayout.getSettings);
export const settingDetails = createSelector(getLayoutState, fromLayout.settingDetails);

export const getUserResponse = createSelector(getLayoutState, fromLayout.userDetail);
export const getChangePayment = createSelector(
    getLayoutState,
    fromLayout.getChangePayment
  );
  export const getChangePaymentLoaded = createSelector(
    getLayoutState,
    fromLayout.getChangePaymentLoaded
  );
  export const getChangePaymentLoading = createSelector(
    getLayoutState,
    fromLayout.getChangePaymentLoading
  );
  export const getChangePaymentFailed = createSelector(
    getLayoutState,
    fromLayout.getChangePaymentFailed
  );

  //**Language List**//

  export const languageList = createSelector(
    getLayoutState,
    fromLayout.languageList
  );
  export const languageListLoading = createSelector(
   getLayoutState,
   fromLayout.languageListLoading
  );
  export const languageListLoaded = createSelector(
    getLayoutState,
    fromLayout.languageListLoaded
  );
  export const languageListFailed = createSelector(
    getLayoutState,
    fromLayout. languageListFailed
  );
