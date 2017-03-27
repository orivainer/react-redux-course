import expect from 'expect';
import * as types from './actionTypes';
import * as CourseActions from './CourseActions';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

describe('CourseActions Async actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('Should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done)=> {
        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id:'clean-code', title:'Clean Code'}]}}
        ];
        const store = mockStore({courses:[]},expectedActions);
        store.dispatch(CourseActions.loadCourses()).then(()=> {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
            done();
        });
    });
});