import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/CourseActions';

describe('Course reducer', () => {
    it('Should add a course when passed CREATE_COURSE_SUCCESS', () => {
        const initialState = [
            { title: 'A' },
            { title: 'B' }
        ];
        const newCourse = { title: 'C' };
        const action = actions.createCourseSuccess(newCourse);
        const newState = courseReducer(initialState, action);
        expect(newState.length).toEqual(3);
        expect(newState[0].title).toBe('A');
        expect(newState[1].title).toBe('B');
        expect(newState[2].title).toBe('C');
    });

    it('Should update a course when passed UPDATE_COURSE_SUCCESS', () => {
        const initialState = [
            { id: 'A', title: 'A' },
            { id: 'B', title: 'B' }
        ];
        const action = actions.updateCourseSuccess({ id: 'A', title: 'New title' });
        const newState = courseReducer(initialState, action);
        expect(newState.length).toEqual(2);
        expect(newState.find(a=> a.id == 'A').title).toBe('New title');
        expect(newState.find(a=> a.id == 'B').title).toBe('B');
    });
});