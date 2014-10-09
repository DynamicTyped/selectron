/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var React = require('react/addons');
var SelectronContainer = require('./selectronContainer.jsx');
var _ = require('underscore');

var emptySelected = {text: '', value: ''};

var Selectron = React.createClass({
getDefaultProps: function(){
    return {
      "showDrop": false,
      "options": [],
      "filteredOptions": [],
      /* should be {text: ___, value: ____} */
      "selected": [],
      "filter": "",
      "placeholder": "Please choose",
      "filterPlaceholder":"filter",
      "type": "select"
    }
},
addToSelected: function(value){
  var results = _.where(options, { value: value}).concat(this.props.selected);;
  debugger; 
  this.setProps({selected: results||[], showDrop: false, filter: "", filteredOptions: [] });
},
removeFromSelected: function(value){
  var results = _.where(options, { value: value});
  this.setProps({selected: _.without(this.props.selected, results)||[], showDrop: false, filter: "", filteredOptions: [] });
},
setFilter: function(value){          
  var filtered = _.filter(this.props.options, function(item){
    return (item.text.toLowerCase().indexOf(value.toLowerCase()) >= 0)||(item.value.toLowerCase().indexOf(value.toLowerCase()) >= 0)
  });

  this.setProps({filteredOptions: filtered, filter:value})
},
toggleDrop: function(){
    this.setProps({showDrop: false==this.props.showDrop});
},
render: function(){
  options = (this.props.filteredOptions&&this.props.filteredOptions.length>0) ? this.props.filteredOptions : this.props.options;
  return <SelectronContainer toggleDrop={this.toggleDrop} showDrop={this.props.showDrop} options={options} selected={this.props.selected} 
    addToSelected={this.addToSelected} removeFromSelected={this.removeFromSelected} setFilter={this.setFilter} placeholder={this.props.placeholder} filterPlaceholder={this.props.filterPlaceholder}/>
}
});

module.exports = Selectron;