/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var React = require('react/addons');
var SelectronListItem = require('./SelectronListItem.jsx');
var SelectronSearch = require('./SelectronSearch.jsx');

var SelectronList = React.createClass({
  render: function(){
      var that = this;
      var options = this.props.options.map(function(option, index){
        debugger;
          return <SelectronListItem option={option} addToSelected={that.props.addToSelected} removeFromSelected={that.props.removeFromSelected}/>
      });
      //add search
      options.unshift(<li className="filter"><SelectronSearch setFilter={this.props.setFilter} filterPlaceholder={this.props.filterPlaceholder}/></li>)
      return <ul>{options}</ul>;
  }
});

module.exports = SelectronList; 