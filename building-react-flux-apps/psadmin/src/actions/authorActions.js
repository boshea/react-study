"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');
var CourseStore = require('../stores/courseStore');
var toastr = require('toastr');

var AuthorActions = {
    createAuthor: function(author) {
        var newAuthor = AuthorApi.saveAuthor(author);

        // Instructs the dispatcher to tell the stores that an author was just created.
        Dispatcher.dispatch(
            {
                actionType: ActionTypes.CREATE_AUTHOR,
                author: newAuthor
            }
        );
    },

    updateAuthor: function(author) {
        var updatedAuthor = AuthorApi.saveAuthor(author);

        // Instructs the dispatcher to tell the stores that an author was just updated.
        Dispatcher.dispatch(
            {
                actionType: ActionTypes.UPDATE_AUTHOR,
                author: updatedAuthor
            }
        );
    },

    deleteAuthor: function(id) {
        var coursesWithAuthorId = CourseStore.getCoursesByAuthorId(id);

        if (coursesWithAuthorId.length > 0) {
            // Don't let the user delete an author who is listed as teaching one or more courses.
            toastr.error(
                "Can not delete because this author is teaching the following courses:<br/>\n" +
                "<ol>\n" +
                coursesWithAuthorId.map(
                    function(course) {
                        return ("<li>" + course.title + "</li>\n");
                    }
                ).join('') +
                "\n" +
                "</ol>\n"
            );

            return false;
        }

        AuthorApi.deleteAuthor(id);
        Dispatcher.dispatch(
            {
                actionType: ActionTypes.DELETE_AUTHOR,
                id: id
            }
        );

        return true;
    }
};

module.exports = AuthorActions;
