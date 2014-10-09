/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var react = require('react/addons');

var SelectronSearch = React.createClass({
  handleChange: function(event){
    this.props.setFilter(event.target.value);
  },
  render: function(){
    return(<input type="text" onChange={this.handleChange} placeholder={ this.props.filterPlaceholder}/>)
  }
});

module.exports = SelectronSearch;