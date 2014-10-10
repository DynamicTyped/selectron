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
      var options = (this.props.taggable ? _.difference(that.props.options, that.props.selected) : this.props.options).map(function(option, index){
          return <SelectronListItem option={option} toggleSelected={that.props.toggleSelected} selected={that.props.selected}/>
      });
      //add search
      options.unshift(<li className="filter"><SelectronSearch setFilter={this.props.setFilter} filterPlaceholder={this.props.filterPlaceholder}/></li>)
      return <ul>{options}</ul>;
  }
});

module.exports = SelectronList; 