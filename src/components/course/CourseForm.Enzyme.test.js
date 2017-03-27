import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import CourseForm from './CourseForm';

function setup(saving = false) {
    const props = {
        saving: saving,
        course: {},
        errors: {},
        onSave: () => { },
        onChange: () => { }
    };
    return shallow(<CourseForm {...props} />);
}

describe("CourseForm via Enzyme", () => {
    it('renders form and h1', () => {
        const wrapper = setup(false);
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find("h1").text()).toEqual("Manage Course");
    });

    it("Should display Save when not saving", () => {
        const wrapper = setup(false);
        expect(wrapper.find("input").props().value).toEqual("Save");
    });

    it("Should display Saving... when saving", () => {
        const wrapper = setup(true);
        expect(wrapper.find("input").props().value).toEqual("Saving...");
    });
});