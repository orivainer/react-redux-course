import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving = false) {
    let props = {
        saving: saving,
        course: {},
        errors: {},
        onSave: () => { },
        onChange: () => { }
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<CourseForm {...props} />);
    let output = renderer.getRenderOutput();
    return {
        props, output, renderer
    };
}

describe('CourseForm via React Test Utils', () => {
    it('renders form and h1', () => {
        const { output } = setup();
        expect(output.type).toBe('form');
        let [h1] = output.props.children;
        expect(h1.type).toBe('h1');
    });
    it('Save button should display "Save" when not saving', () => {
        const { output } = setup(false);
        const submitionButton = output.props.children[5];
        expect(submitionButton.props.value).toBe('Save');
    });
    it('Save button should display "Saving..." when saving', () => {
        const { output } = setup(true);
        const submitionButton = output.props.children[5];
        expect(submitionButton.props.value).toBe('Saving...');
    });
});