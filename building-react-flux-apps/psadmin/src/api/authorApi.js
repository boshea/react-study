"use strict";

// This file is mocking a web API by hitting hard-coded data.
var authors = require('./authorData').authors;
var _ = require('lodash');

var _normalizeString = function(str) {
    return str.replace(/[^a-z]/gi, "-").toLowerCase();
};

// This would be performed on the server in a real app.  Just stubbing it in here.
var _generateId = function(author) {
    return _normalizeString(author.firstName) + '-' + _normalizeString(author.lastName);
};

var _clone = function(item) {
    return JSON.parse(JSON.stringify(item));  // Returns a cloned copy so that the item is passed by value instead of by reference.
};

var AuthorApi = {
    getAllAuthors: function() {
        return _clone(authors);
    },

    getAuthorById: function(id) {
        var author = _.find(authors, {id: id});
        return _clone(author);
    },

    saveAuthor: function(author) {
        // Pretend an AJAX call to a real web API is made here.
        console.log('Pretend this just saved the author in the DB via an AJAX call...');

        if (author.id) {
            var existingAuthorIndex = _.indexOf(authors, _.find(authors, {id: author.id}));
            authors.splice(existingAuthorIndex, 1, author);
        } else {
            // Just simulating creation here.
            // The server would generate IDs for new authors in a real app.
            // Cloning so copy returned is passed by value rather than by reference.
            author.id = _generateId(author);
            authors.push(author);
        }

        return _clone(author);
    },

    deleteAuthor: function(id) {
        console.log('Pretend this just deleted the author from the DB via an AJAX call...');
        _.remove(authors, {id: id});
    }
};

module.exports = AuthorApi;
