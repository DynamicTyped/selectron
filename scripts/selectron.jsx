/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var React = require('react/addons');
var SelectronContainer = require('./selectronContainer.jsx');

var Selectron = React.createClass({
getDefaultProps: function(){
    return {
      "showDrop": false,
      "options": [],
      "filteredOptions": [],
      /* should be {text: ___, value: ____} */
      "selected": {text: '', value: ''},
      "filter": "",
      "placeholder": "Please choose",
      "filterPlaceholder":"filter"
    }
},
setValue: function(value){
  var results = _.where(options, { value: value});
  //set it to the result item if its there otherwise set it to empty (because we'll be using same method to clear)
  this.setProps({selected:(results&&results[0])||emptySelected, showDrop: false, filter: "", filteredOptions: [] });
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
  return <SelectronContainer toggleDrop={this.toggleDrop} showDrop={this.props.showDrop} options={options} selected={this.props.selected} setValue={this.setValue} setFilter={this.setFilter} placeholder={this.props.placeholder} filterPlaceholder={this.props.filterPlaceholder}/>
}
});

module.exports = Selectron;