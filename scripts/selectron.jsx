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
      "multiSelect": false,
      "taggable": false,
      "dataChanged": null
    }
},
toggleSelected: function(value){
  var result = _.where(this.props.selected, { value: value});
  //if this is in selected list, remove it. 
  //if this is not in list add it. 
  if(this.props.multiSelect || this.props.taggable){
    if(result.length > 0){
      this.removeFromSelected(value); 
    } else {
      this.addToSelected(value);
    }
  } else {
    //clear all and add if not currently selected
    if (result.length > 0){
      return; 
    }

    //modifying the props directly because we're storing it right after
    this.props.selected = [];
    this.addToSelected(value);
  }
},
addToSelected: function(value){
  var results = _.where(options, { value: value}).concat(this.props.selected);
  this.props.dataChanged&&this.props.dataChanged(results);
  this.setProps({selected: results||[], showDrop: false, filter: "", filteredOptions: [] });
},
removeFromSelected: function(value){
  var results = _.where(options, { value: value});
  var remaining = _.without(this.props.selected, results[0])||[];
  this.props.dataChanged&&this.props.dataChanged(remaining);
  if(results.length > 0){
    this.setProps({selected: remaining, showDrop: false, filter: "", filteredOptions: [] });
  }
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
  className = this.props.taggable ? "taggable" : this.props.multiSelect ? "multiselect" : "" ;
  return <SelectronContainer toggleDrop={this.toggleDrop} className={className} showDrop={this.props.showDrop} options={options} selected={this.props.selected} 
    toggleSelected={this.toggleSelected} setFilter={this.setFilter} placeholder={this.props.placeholder} filterPlaceholder={this.props.filterPlaceholder} taggable={this.props.taggable}/>
}
});

module.exports = Selectron;