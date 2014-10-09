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
      this.props.toggleSelected(this.props.option.value);
  },
  render: function(){
    var className = (typeof _.findWhere(this.props.selected, {value: this.props.option.value}) === "undefined") ? "" : "checked";
    return <li onClick={this.handleClick} className={className}>{this.props.option.text}</li>
  }
});

module.exports = SelectronListItem; 