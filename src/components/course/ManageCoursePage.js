import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/CourseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: Object.assign({}, props.course),
            errors: {}
        };
        
        this.upadteCourseState = this.upadteCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) { //React might trigger this life cycle even if no change was made to the props so this check is vital
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    upadteCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course:course});
    }

    render() {
        return (
            <CourseForm
                course={this.state.course}
                errors={this.state.errors}
                allAuthors={this.props.authors}
                onChange={this.upadteCourseState}
                onSave={this.saveCourse}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, courseId) {
    const course = courses.filter(course => course.id === courseId);
    if (course.length) {
        return course[0];
    }
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };
    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }
    
    const authorsFormattedForDropdown = state.authors.map((author) => {
        return {
            value: author.id,
            text: author.firstName + " " + author.lastName
        };
    });
    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);