/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var React = require('react/addons');
var SelectronTagItem = require('./selectronTagItem.jsx'); 

var SelectronSelect = React.createClass({
  handleClick: function(e){
    if(e.target.nodeName.toLowerCase() !== "button"){
      this.props.toggleDrop();
    }
  },
  render: function(){
    var that = this; 
    //show placeholder or the text
	var selectedItems = "";

    if (this.props.selected && this.props.selected.length > 0){

      var selectedItems = that.props.taggable ? 
        _.map(this.props.selected, function(item, index){ return <SelectronTagItem option={item} toggleSelected={that.props.toggleSelected} /> }) : 
        _.map(this.props.selected, function(item, index){ return (index > 0 ? ", " : "") + item.text; });
    }

    var text = selectedItems||this.props.placeholder;
    return (<div className="selector" onClick={this.handleClick}>{text}</div>);
  }
});

module.exports = SelectronSelect; 