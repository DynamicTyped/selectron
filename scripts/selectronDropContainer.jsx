/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var React = require('react/addons');
var SelectronList = require('./selectronList.jsx');

var SelectronDropContainer = React.createClass({
  render: function(){
      var ret = this.props.showDrop ? <SelectronList options={this.props.options} toggleSelected={this.props.toggleSelected} selected={this.props.selected} 
        setFilter={this.props.setFilter} filterPlaceholder={this.props.filterPlaceholder} taggable={this.props.taggable}/> : "";

      return(
        <div className="selectable-drop-container">
          {ret}
        </div>
      )
  }
});

module.exports = SelectronDropContainer; 