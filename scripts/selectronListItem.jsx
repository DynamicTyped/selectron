 /** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/      

var React = require('react/addons');

var SelectronListItem = React.createClass({
  handleClick: function(){
      this.props.addToSelected(this.props.option.value);
  },
  render: function(){
    return <li onClick={this.handleClick}>{this.props.option.text}</li>
  }
});

module.exports = SelectronListItem; 