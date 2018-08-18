"use strict";

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror(
    {
        // App actions
        INITIALIZE: null,

        // Author actions
        CREATE_AUTHOR: null,
        UPDATE_AUTHOR: null,
        DELETE_AUTHOR: null,

        // Course actions
        CREATE_COURSE: null,
        UPDATE_COURSE: null,
        DELETE_COURSE: null
    }
);
