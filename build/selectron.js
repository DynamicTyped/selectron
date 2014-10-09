var Selectron =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	/*
	   Selectron - Select Component for React
	   https://github.com/DynamicTyped/selectron
	   Copyright (c) 2014 DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
	*/

	var React = __webpack_require__(1);
	var SelectronContainer = __webpack_require__(3);
	var _ = __webpack_require__(2);

	var emptySelected = {text: '', value: ''};

	var Selectron = React.createClass({displayName: 'Selectron',
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
	  return SelectronContainer({toggleDrop: this.toggleDrop, showDrop: this.props.showDrop, options: options, selected: this.props.selected, 
	    addToSelected: this.addToSelected, removeFromSelected: this.removeFromSelected, setFilter: this.setFilter, placeholder: this.props.placeholder, filterPlaceholder: this.props.filterPlaceholder})
	}
	});

	module.exports = Selectron;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = _;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	/*
	   Selectron - Select Component for React
	   https://github.com/DynamicTyped/selectron
	   Copyright (c) 2014 DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
	*/

	var react = __webpack_require__(1);
	var SelectronSelect = __webpack_require__(4);
	var SelectronDropContainer = __webpack_require__(5);

	var SelectronContainer = React.createClass({displayName: 'SelectronContainer',
	  render: function(){
	      return (
	          React.DOM.div({className: "selectable-container"}, 
	            SelectronSelect({toggleDrop: this.props.toggleDrop, showDrop: this.props.showDrop, selected: this.props.selected, placeholder: this.props.placeholder}), 
	            SelectronDropContainer({toggleDrop: this.props.toggleDrop, options: this.props.options, showDrop: this.props.showDrop, 
	              addToSelected: this.props.addToSelected, removeFromSelected: this.props.removeFromSelected, setFilter: this.props.setFilter, filterPlaceholder: this.props.filterPlaceholder})
	          )
	      );
	  }
	});

	module.exports = SelectronContainer; 

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	/*
	   Selectron - Select Component for React
	   https://github.com/DynamicTyped/selectron
	   Copyright (c) 2014 DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
	*/

	var React = __webpack_require__(1);

	var SelectronSelect = React.createClass({displayName: 'SelectronSelect',
	  render: function(){
	    //show placeholder or the text
	    var text = this.props.selected && this.props.selected.length > 0 && this.props.selected[0].text !== "" ? this.props.selected[0].text : this.props.placeholder;
	    return (React.DOM.div({className: "selector", onClick: this.props.toggleDrop}, text));
	  }
	});

	module.exports = SelectronSelect; 

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	/*
	   Selectron - Select Component for React
	   https://github.com/DynamicTyped/selectron
	   Copyright (c) 2014 DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
	*/

	var React = __webpack_require__(1);
	var SelectronList = __webpack_require__(6);

	var SelectronDropContainer = React.createClass({displayName: 'SelectronDropContainer',
	  render: function(){
	      var ret = this.props.showDrop ? SelectronList({options: this.props.options, addToSelected: this.props.addToSelected, removeFromSelected: this.props.removeFromSelected, 
	        setFilter: this.props.setFilter, filterPlaceholder: this.props.filterPlaceholder}) : "";

	      return(
	        React.DOM.div({className: "selectable-drop-container"}, 
	          ret
	        )
	      )
	  }
	});

	module.exports = SelectronDropContainer; 

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	/*
	   Selectron - Select Component for React
	   https://github.com/DynamicTyped/selectron
	   Copyright (c) 2014 DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
	*/

	var React = __webpack_require__(1);
	var SelectronListItem = __webpack_require__(7);
	var SelectronSearch = __webpack_require__(8);

	var SelectronList = React.createClass({displayName: 'SelectronList',
	  render: function(){
	      var that = this;
	      var options = this.props.options.map(function(option, index){
	          return SelectronListItem({option: option, addToSelected: that.props.addToSelected, removeFromSelected: that.props.removeFromSelected})
	      });
	      //add search
	      options.unshift(React.DOM.li({className: "filter"}, SelectronSearch({setFilter: this.props.setFilter, filterPlaceholder: this.props.filterPlaceholder})))
	      return React.DOM.ul(null, options);
	  }
	});

	module.exports = SelectronList; 

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	 /** @jsx React.DOM */

	/*
	   Selectron - Select Component for React
	   https://github.com/DynamicTyped/selectron
	   Copyright (c) 2014 DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
	*/      

	var React = __webpack_require__(1);

	var SelectronListItem = React.createClass({displayName: 'SelectronListItem',
	  handleClick: function(){
	      this.props.addToSelected(this.props.option.value);
	  },
	  render: function(){
	    return React.DOM.li({onClick: this.handleClick}, this.props.option.text)
	  }
	});

	module.exports = SelectronListItem; 

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	/*
	   Selectron - Select Component for React
	   https://github.com/DynamicTyped/selectron
	   Copyright (c) 2014 DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/selectron/master/LICENSE
	*/

	var react = __webpack_require__(1);

	var SelectronSearch = React.createClass({displayName: 'SelectronSearch',
	  handleChange: function(event){
	    this.props.setFilter(event.target.value);
	  },
	  render: function(){
	    return(React.DOM.input({type: "text", onChange: this.handleChange, placeholder:  this.props.filterPlaceholder}))
	  }
	});

	module.exports = SelectronSearch;

/***/ }
/******/ ])