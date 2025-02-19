/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromGenralsetting from './generalsetting.reducer';

export const getGeneralSettingState = (state: AppState) => state.generalsetting;
export const getNewGeneralSettings = createSelector(
  getGeneralSettingState,
  fromGenralsetting.getNewGeneralsettings
);
export const getGeneralSettings = createSelector(
  getGeneralSettingState,
  fromGenralsetting.getGeneralsettings
);

export const mode = createSelector(
  getGeneralSettingState,
  fromGenralsetting.maintenaceMode
);

export const getSettingLoading = createSelector(
  getGeneralSettingState,
  fromGenralsetting.getSettingLoading
);
