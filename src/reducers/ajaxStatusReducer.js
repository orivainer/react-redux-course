import * as types from '../actions/actionTypes';
import initialState from './initialState';

function isActionTypeEndWithSuccess(type) {
    const _SUCCESS = "_SUCCESS";
    return (type.substring(type.length - _SUCCESS.length) == _SUCCESS);
}

export default function ajaxStatusReducer(state = initialState.numAjaxCallsInProgress, action) {
    if (action.type == types.BEGIN_AJAX_CALL) {
        return state + 1;
    }else if (isActionTypeEndWithSuccess(action.type)) {
        return state - 1;
    }else if (action.type == types.AJAX_CALL_ERROR) {
        return state - 1;
    }

    return state;
}