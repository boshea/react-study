/*eslint-disable strict */ // Disabling strict checking because we cant run in strict mode.  Need global variables.

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery');

var App = React.createClass(
    {
        render: function() {

            return (
                <div>
                    <Header />
                    <div className="container-fluid">
                        <RouteHandler />
                    </div>
                </div>
            );
        }
    }
);

module.exports = App;
