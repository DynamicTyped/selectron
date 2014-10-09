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
    var text = this.props.selected && this.props.selected.text !== "" ? this.props.selected.text : this.props.placeholder;
    return (<div className="selector" onClick={this.props.toggleDrop}>{text}</div>);
  }
});

module.exports = SelectronSelect; 