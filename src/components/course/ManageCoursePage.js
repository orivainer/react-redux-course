import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/CourseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';


export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false
        };

        this.upadteCourseState = this.upadteCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) { //React might trigger this life cycle even if no change was made to the props so this check is vital
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    isFormValid() {
        let formIsValid = true;
        let errors = {title: ""};
        if (this.state.course.title.length < 5) {

            errors.title = "Title must be at least 5 characters";
            this.setState({errors:errors});
            formIsValid = false;
        }
        return formIsValid;
    }

    saveCourse(event) {
        event.preventDefault();
        //Validation:
        if (!this.isFormValid()) {
            return;
        }
        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.course)
            .then(() => {
                this.redirect();
            })
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success("Course saved");
        this.context.router.push('/courses');
    }

    upadteCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    render() {
        return (
            <CourseForm
                course={this.state.course}
                errors={this.state.errors}
                allAuthors={this.props.authors}
                onChange={this.upadteCourseState}
                onSave={this.saveCourse}
                saving={this.state.saving}
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
    const formattedAuthorsForDropdown = authorsFormattedForDropdown(state.authors);
      
    return {
        course: course,
        authors: formattedAuthorsForDropdown
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);