/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var React = require('react/addons');

var SelectronTagItem = React.createClass({
  handleClick: function(e){
    this.props.toggleSelected(e.target.dataset.value);
  },
  render: function(){
    return <button type="button" class="btn btn-primary" data-value={this.props.option.value} onClick={this.handleClick}>{this.props.option.text}</button>
  }
});

module.exports = SelectronTagItem; 