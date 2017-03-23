import * as Types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';

export function loadAuthorsSuccess(authors) {
    return {type: Types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors() {
    return (dispatch) => {
        return AuthorApi.getAllAuthors().then((authors) => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch((error) => {
            throw(error);
        });
    };
}