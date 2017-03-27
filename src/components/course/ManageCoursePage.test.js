import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { ManageCoursePage } from './ManageCoursePage';

describe("Testing ManageCoursePage redux part", () => {
    it("Should show error message when trying to save course with empty title", () => {
        const props = {
            course: { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' },
            actions: {
                 saveCourse: () => { return Promise.resolve(); }
            },
            authors: []
        };
        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveBtn = wrapper.find("input").last();
        expect(saveBtn.prop("type")).toBe("submit");
        saveBtn.simulate("click");
        expect(wrapper.state().errors.title).toBe("Title must be at least 5 characters");
    });
});

