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
      "dataChanged": null,
      "singleSelectSame": false
    }
},
getInitialState: function(){
  //these are items that are passed in via props
  //but we will need to maintain as state inside this component
  //this is generally an anti-pattern if synchonization is the goal but it is really not here
  var retItem =  {
    "selected": this.props.selected,
    "showDrop": this.props.showDrop,
    "filteredOptions": this.props.filteredOptions,
    "filter": this.props.filter
  };
  return retItem;
},
toggleSelected: function(value){
  var result = _.where(this.state.selected, { value: value});
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
    if (result.length > 0 && !this.props.singleSelectSame){
      return; 
    }

    //modifying the props directly because we're storing it right after
    this.state.selected = [];
    this.addToSelected(value);
  }
},
addToSelected: function(value){
  var results = _.where(options, { value: value}).concat(this.state.selected);
  this.props.dataChanged&&this.props.dataChanged(results);
  this.setState({selected: results||[], showDrop: false, filter: "", filteredOptions: [] });
},
removeFromSelected: function(value){
  var results = _.where(options, { value: value});
  var remaining = _.without(this.state.selected, results[0])||[];
  this.props.dataChanged&&this.props.dataChanged(remaining);
  if(results.length > 0){
    this.setState({selected: remaining, showDrop: false, filter: "", filteredOptions: [] });
  }
},
setFilter: function(value){          
  var filtered = _.filter(this.props.options, function(item){
    return (item.text.toLowerCase().indexOf(value.toLowerCase()) >= 0)||(item.value.toLowerCase().indexOf(value.toLowerCase()) >= 0)
  });

  this.setState({filteredOptions: filtered, filter:value})
},
toggleDrop: function(){
    this.setState({showDrop: false==this.state.showDrop});
},
render: function(){
  options = (this.state.filteredOptions&&this.state.filteredOptions.length>0) ? this.state.filteredOptions : this.props.options;
  className = this.props.taggable ? "taggable" : this.props.multiSelect ? "multiselect" : "" ;
  return <SelectronContainer toggleDrop={this.toggleDrop} className={className} showDrop={this.state.showDrop} options={options} selected={this.state.selected} 
    toggleSelected={this.toggleSelected} setFilter={this.setFilter} placeholder={this.props.placeholder} filterPlaceholder={this.props.filterPlaceholder} taggable={this.props.taggable}/>
}
});

module.exports = Selectron;