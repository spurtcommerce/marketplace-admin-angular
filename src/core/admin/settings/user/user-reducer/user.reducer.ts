/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../../user/user-action/user.action';
import { UserState, UserRecordState } from './user.state';
import { UserListResponseModel } from '../user-model/userlist.response.model';
import { UserResponseModel } from '../user-model/user.response.model';

export const initialState: UserState = new UserRecordState() as unknown as UserState;

export function reducer(
  state = initialState,
  { type, payload }: any
): UserState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_NEW_USER: {
      return Object.assign({}, state, {
        newUser:{},
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_USER: {
      return Object.assign({}, state, {
        updateUser:{},
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_USER_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_USER_GROUP_LIST: {
      return Object.assign({}, state, {
        groupListLoading: true,
        groupListLoaded: false,
        groupListFailed: false
      });
    }
    case actions.ActionTypes.DO_USER_COUNT_ACTION: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_NEW_USER_SUCCESS: {
      const newUser = new UserResponseModel(payload.data);
      return Object.assign({}, state, {
        newUser: payload,
        newUserData: newUser,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_USER_SUCCESS: {
      return Object.assign({}, state, {
        updateUser: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_USER_LIST_SUCCESS: {
      let userList = [];
      if (payload.data) {
        userList = payload.data.map(_users => {
          const tempListModel = new UserListResponseModel(_users);
          return tempListModel;
        });
      }
      return Object.assign({}, state, {
        userList: userList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_USER_GROUP_LIST_SUCCESS: {
      return Object.assign({}, state, {
        userGroupList: payload.data,
        groupListLoading: false,
        groupListLoaded: true,
        groupListFailed: false
      });
    }
    case actions.ActionTypes.DO_USER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        userPagination: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }

    case actions.ActionTypes.DO_NEW_USER_FAIL: {
      return Object.assign({}, state, {
        newUser: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }

    case actions.ActionTypes.DO_UPDATE_USER_FAIL: {
      return Object.assign({}, state, {
        updateUser: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }

    case actions.ActionTypes.GET_USER_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    case actions.ActionTypes.GET_USER_GROUP_LIST_FAIL: {
      return Object.assign({}, state, {
        groupListLoading: false,
        groupListLoaded: true,
        groupListFailed: true
      });
    }
    case actions.ActionTypes.DELETE_USER: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DELETE_USER_SUCCESS: {
      return Object.assign({}, state, {
        userDelate: payload
      });
    }
    case actions.ActionTypes.DELETE_USER_FAIL: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.CLEAR_VARIABLE: {
      return Object.assign({}, state, {
        userGroupList: []
      });
    }
    default: {
      return state;
    }
  }
}

export const getNewUser = (state: UserState) => state.newUser;
export const getNewUserData = (state: UserState) => state.newUserData;
export const getUpdateUser = (state: UserState) => state.updateUser;
export const getUserList = (state: UserState) => state.userList;
export const getUserGroupList = (state: UserState) => state.userGroupList;
export const userPagination = (state: UserState) => state.userPagination;

export const getUserListLoading = (state: UserState) => state.listLoading;
export const getUserListLoaded = (state: UserState) => state.listLoaded;
export const getUserListFailed = (state: UserState) => state.listFailed;

export const getUserCountLoading = (state: UserState) => state.countLoading;
export const getUserCountLoaded = (state: UserState) => state.countLoaded;
export const getUserCountFailed = (state: UserState) => state.countFailed;

export const getUserAddLoading = (state: UserState) => state.addLoading;
export const getUserAddLoaded = (state: UserState) => state.addLoaded;
export const getUserAddFailed = (state: UserState) => state.addFailed;

export const getUserUpdateLoading = (state: UserState) => state.updateLoading;
export const getUserUpdateLoaded = (state: UserState) => state.updateLoaded;
export const getUserUpdateFailed = (state: UserState) => state.updateFailed;

export const getUserGroupLoading = (state: UserState) => state.userGroupLoading;
export const getUserGroupLoaded = (state: UserState) => state.userGroupLoaded;
export const getUserGroupFailed = (state: UserState) => state.userGroupFailed;
export const getUserDelate = (state: UserState) => state.userDelate;
