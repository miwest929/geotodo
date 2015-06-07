/** @jsx React.DOM */

var React = require('react');

module.exports = TodoForm = React.createClass({
  getInitialState: function() {
    return {reminders: []};
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>When I am at:</label>
          <input type="text" className="form-control" placeholder="Enter name of place" ref="location" />
        </div>
        <div className="form-group">
          <label>Remind me to</label>
          <textarea className="form-control" rows="3" placeholder="What do you want to be reminded of?" ref="todo"></textarea>
        </div>
        <input type="submit" value="Create" />
      </form>
    );
  }
});

