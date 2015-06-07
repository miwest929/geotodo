/** @jsx React.DOM */

var React = require('react');
var TodoForm = require('./TodoForm.react');

module.exports = GeoTodoApp = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div>
        <h1>GeoTODO</h1>
        <TodoForm onTodoSubmit={this.handleTodoSubmit} />
      </div>
    );
  }
});
