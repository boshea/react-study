"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass(
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
                author: { id: '', firstName: '', lastName: '' },
                errors: {},
                dirty:  false
            };
        },

        componentWillMount: function() {
            var authorId = this.props.params.id;  // From the router path '/author/:id'

            if (authorId) {
                this.setState({ author: AuthorStore.getAuthorById(authorId) });
            }
        },

        setAuthorState: function(event) {
            this.setState({dirty: true});

            var field = event.target.name;
            var value = event.target.value;
            this.state.author[field] = value;

            return this.setState({author: this.state.author});
        },

        authorFormIsValid: function() {
            var formIsValid = true;

            this.state.errors = {};  // Clear any previous errors.

            if (this.state.author.firstName.length < 1) {
                this.state.errors.firstName = 'First name must be at least one character long';
                formIsValid = false;
            }

            if (this.state.author.lastName.length < 1) {
                this.state.errors.lastName = 'Last name must be at least one character long';
                formIsValid = false;
            }

            this.setState({errors: this.state.errors});

            return formIsValid;
        },

        saveAuthor: function(event) {
            event.preventDefault();

            if (!this.authorFormIsValid()) {
                return;
            }

            // If the author's ID is already set, it means that the author
            // already exists, and we are just updating it with new data.
            if (this.state.author.id) {
                AuthorActions.updateAuthor(this.state.author);
            } else {
                // Otherwise, we are creating a new author and we need to
                // create it.
                AuthorActions.createAuthor(this.state.author);
            }
            this.setState({dirty: false});

            toastr.success(
                'Author saved: ' +
                this.state.author.firstName + ' ' +
                this.state.author.lastName);

            this.transitionTo('authors');
        },

        render: function() {
            return (
                <AuthorForm
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor}
                    errors={this.state.errors} />
            );
        }
    }
);




module.exports = ManageAuthorPage;
