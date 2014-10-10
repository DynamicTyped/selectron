/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var react = require('react/addons');
var SelectronSelect = require('./selectronSelect.jsx');
var SelectronDropContainer = require('./selectronDropContainer.jsx');

var SelectronContainer = React.createClass({
  render: function(){
      className = (this.props.className&&this.props.className + " ") + "selectable-container";

      return (
          <div className={className}>
            <SelectronSelect toggleDrop={this.props.toggleDrop} showDrop={this.props.showDrop} selected={this.props.selected} placeholder={this.props.placeholder}/>
            <SelectronDropContainer toggleDrop={this.props.toggleDrop} options={this.props.options} showDrop={this.props.showDrop} selected={this.props.selected}
              toggleSelected={this.props.toggleSelected} setFilter={this.props.setFilter} filterPlaceholder={this.props.filterPlaceholder}/>
          </div>
      );
  }
});

module.exports = SelectronContainer; 