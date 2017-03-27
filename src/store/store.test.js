import expect from 'expect';
import {createStore} from 'redux';
import * as courseActions from '../actions/CourseActions';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';

describe('Store', ()=> {
    it('Should handle creating courses', ()=> {
        //Arrange
        const store = createStore(rootReducer, initialState);
        const course = {
            title:"Clean code"
        };

        //act
        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);
        
        //asserts
        const state = store.getState();
        expect(state.courses.length).toEqual(1);
        expect(state.courses[0]).toEqual(course);
    });
});