"use strict";

var React = require('react');
var AuthorStore = require('../../stores/authorStore');

var AuthorMenu = React.createClass(
    {
        propTypes: {
            label:      React.PropTypes.string.isRequired,
            name:       React.PropTypes.string.isRequired,
            authorId:   React.PropTypes.string.isRequired,
            onChange:   React.PropTypes.func.isRequired
        },

        render: function() {
            var currentAuthorId = this.props.authorId;
            var authorList = AuthorStore.getAllAuthors();
            var authorSelectOptions = authorList.map(
                function(author) {
                    return (
                        <option id={author.id} key={author.id} value={author.id}>
                            {author.firstName} {author.lastName}
                        </option>
                    );
                }
            );

            return (
                <div>
                    <label htmlFor="{this.props.name}">{this.props.label}</label>
                    <br />
                    <select
                        required
                        defaultValue={currentAuthorId}
                        onChange={this.props.onChange}
                        name={this.props.name} >

                        {authorSelectOptions}
                    </select>
                </div>
            );
        }
    }
);

module.exports = AuthorMenu;
