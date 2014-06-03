/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('../../lib/main');
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var Main = React.createClass({
  render: function() {
    return (
      <Routes handler={App}>
        <Route name="form" handler={Form} />
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
        {this.props.activeRoute || <h1>Index</h1>}
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

console.log(ReactRouter.RouteHandler);

var Form = React.createClass({
  mixins: [ReactRouter.RouteHandler],

  componentWillTransition: function(transition) {
    if (this.refs.email.getDOMNode().value !== '') {
      var leave = confirm("You have an unsubmitted form, are you sure you want to leave?");
      if (!leave) {
        transition.cancel();
      }
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.refs.email.getDOMNode().value = '';
    this.transitionTo('/');
  },

  render: function() {
    return (
      <div>
        <h1>Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email: <input ref="email"/></label>
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }
});

React.renderComponent(<Main/>, document.body);

