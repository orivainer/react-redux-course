import * as Types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
    return {type: Types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return AuthorApi.getAllAuthors().then((authors) => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch((error) => {
            throw(error);
        });
    };
}