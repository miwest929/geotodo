var JSX = require('node-jsx').install(),
  React = require('react'),
  GeoTodoApp = require('./components/GeoTodoApp.react');

module.exports = {
  index: function(req, res) {
    var markup = React.renderComponentToString(
      GeoTodoApp({todos: []})
    );

    res.render('home', {
      markup: markup,
      state: []
    });
  }
};
