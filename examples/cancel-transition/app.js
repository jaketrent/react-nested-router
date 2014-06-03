/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('../../lib/main');
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var RouteMixin = {
  render: function() {}
}

var FormRoute = React.createClass({
  mixins: [RouteMixin]
});

var Main = React.createClass({
  render: function() {
    return (
      <Routes handler={App}>
        <FormRoute name="form" handler={Form} />
        <Route name="about" handler={About} />
      </Routes>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <p><Link to="about">About</Link> | <Link to="form">Form</Link></p>
        <p>Go to the form, fill it out without submitting, then click the about link</p>
        {this.props.activeRoute}
      </div>
    );
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div>
        <h1>About</h1>
      </div>
    );
  }
});

var Form = React.createClass({
  mixins: [RouteHandler],

  handleTransitionOut: function(transition) {
    if (this.refs.email.getDOMNode().value !== '') {
      var leave = prompt("You have an unsubmitted form, are you sure you want to leave?");
      if (!leave) {
        transition.cancel();
      }
    }
  },

  handleSubmit: function() {
    ReactRouter.transitionTo('/');
  },

  render: function() {
    return (
      <div>
        <h1>Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email: <input ref="email"/></label>
        </form>
      </div>
    );
  }
});

React.renderComponent(<Main/>, document.body);

