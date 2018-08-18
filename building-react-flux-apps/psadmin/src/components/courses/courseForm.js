"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var AuthorMenu = require('../authors/authorMenu');

var CourseForm = React.createClass(
    {
        propTypes: {
            course:     React.PropTypes.object.isRequired,
            onSave:     React.PropTypes.func.isRequired,
            onChange:   React.PropTypes.func.isRequired,
            errors:     React.PropTypes.object
        },

        render: function() {
            return (
                <form>
                    <h1>Manage Course</h1>

                    <TextInput
                        name="title"
                        label="Title"
                        value={this.props.course.title}
                        onChange={this.props.onChange}
                        error={this.props.errors.title} />
                    <br />

                    <AuthorMenu
                        name="authorMenu"
                        label="Authors"
                        authorId={this.props.course.author.id}
                        onChange={this.props.onChange} />
                    <br />
                    <br />

                    <TextInput
                        name="category"
                        label="Category"
                        value={this.props.course.category}
                        onChange={this.props.onChange}
                        error={this.props.errors.category} />
                    <br />

                    <TextInput
                        name="length"
                        label="Length"
                        value={this.props.course.length}
                        onChange={this.props.onChange}
                        error={this.props.errors.length} />
                    <br />

                    <input
                        type="submit"
                        value="Save"
                        className="btn btn-default"
                        onClick={this.props.onSave} />
                </form>
            );
        }
    }
);

module.exports = CourseForm;
