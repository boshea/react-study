"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass(
    {
        mixins: [
            Router.Navigation
        ],

        statics: {
            willTransitionFrom: function(transition, component) {
                if (component.state.dirty && !confirm('Leave without saving?')) {
                    transition.abort();
                }
            }
        },

        getInitialState: function() {
            return {
                course: { id: '', title: '', watchHref: '', author: null, length: '', category: '' },
                errors: {},
                dirty:  false
            };
        },

        componentWillMount: function() {
            var courseId = this.props.params.id;  // From the router path '/course/:id'

            if (courseId) {
                this.setState({ course: CourseStore.getCourseById(courseId) });
            }
        },

        setCourseState: function(event) {
            this.setState({dirty: true});

            // debugger;

            var field = event.target.name;
            var value = event.target.value;

            if (field === "authorMenu") {
                var updatedAuthorId = value;
                var updatedAuthor = AuthorStore.getAuthorById(updatedAuthorId);
                var updatedName = updatedAuthor.firstName + " " + updatedAuthor.lastName;

                this.state.course.author = {id: updatedAuthorId, name: updatedName};
            } else {
                this.state.course[field] = value;
            }

            return this.setState({course: this.state.course});
        },

        courseFormIsValid: function() {
            var formIsValid = true;

            this.state.errors = {};  // Clear any previous errors.

            if (this.state.course.title.length < 1) {
                this.state.errors.title = 'Course title must be at least one character long';
                formIsValid = false;
            }

            if (this.state.course.watchHref.length < 1) {
                this.state.errors.watchHref = 'Course watch link must be set';
                formIsValid = false;
            }

            if (this.state.course.author == null) {
                this.state.errors.author = 'Course author must be set';
                formIsValid = false;
            }

            if (this.state.course.length < 1) {
                this.state.errors.length = 'Course length must be set';
                formIsValid = false;
            }

            if (this.state.course.category < 1) {
                this.state.errors.category = 'Course category must be greater than one character long';
                formIsValid = false;
            }

            this.setState({errors: this.state.errors});

            return formIsValid;
        },

        saveCourse: function(event) {
            event.preventDefault();

            if (!this.courseFormIsValid()) {
                return;
            }

            // If the course's ID is already set, it means that the course
            // already exists, and we are just updating it with new data.
            if (this.state.course.id) {
                CourseActions.updateCourse(this.state.course);
            } else {
                // Otherwise, we are creating a new course and we need to
                // create it.
                CourseActions.createCourse(this.state.course);
            }
            this.setState({dirty: false});

            toastr.success('Course saved: ' + this.state.course.title);

            this.transitionTo('courses');
        },

        render: function() {
            return (
                <CourseForm
                    course={this.state.course}
                    onChange={this.setCourseState}
                    onSave={this.saveCourse}
                    errors={this.state.errors} />
            );
        }
    }
);

module.exports = ManageCoursePage;
