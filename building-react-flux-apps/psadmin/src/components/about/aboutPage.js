"use strict";

var React = require('react');

var About = React.createClass(
    {
        render: function() {
            return (
                <div>
                    <div>
                        This application uses the following technologies:
                        <ul>
                            <li>React</li>
                            <li>React Router</li>
                            <li>Flux</li>
                            <li>Node</li>
                            <li>Gulp</li>
                            <li>Browserify</li>
                            <li>Bootstrap</li>
                        </ul>
                    </div>
                </div>
            );
        }
    }
);

module.exports = About;
