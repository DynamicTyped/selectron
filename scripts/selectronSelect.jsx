/** @jsx React.DOM */

/*
   Selectron - Select Component for React
   https://github.com/DynamicTyped/selectron
   Copyright (c) 2014 DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
*/

var React = require('react/addons');

var SelectronSelect = React.createClass({
  render: function(){
    //show placeholder or the text
	var selectedItems = "";

    if (this.props.selected && this.props.selected.length > 0){

    //get the current selected items into a comma separated list - it's very possible map reduce is overkill....
	selectedItems = _.reduce(_.map(this.props.selected, function(item){
			   //if it has a key named text use it -- otherwise just return the item
			   return item.text; 
			}), function(memo, item){
				return memo.length === 0 ? memo.text : (memo + (memo.length > 0 ? ", " : "") + item);
		});
    }

    var text = selectedItems||this.props.placeholder;
    return (<div className="selector" onClick={this.props.toggleDrop}>{text}</div>);
  }
});

module.exports = SelectronSelect; 