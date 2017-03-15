import * as types from './actionTypes';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course }; //In ES6 we can ommit the LHS of the property if it's the same as the value. 
                                     // = course: course
}