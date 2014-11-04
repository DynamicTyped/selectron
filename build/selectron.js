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
	  return SelectronContainer({toggleDrop: this.toggleDrop, className: className, showDrop: this.state.showDrop, options: options, selected: this.state.selected, 
	    toggleSelected: this.toggleSelected, setFilter: this.setFilter, placeholder: this.props.placeholder, filterPlaceholder: this.props.filterPlaceholder, taggable: this.props.taggable})
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
	      className = (this.props.className&&this.props.className + " ") + "selectable-container";
	      return (
	          React.DOM.div({className: className}, 
	            SelectronSelect({toggleDrop: this.props.toggleDrop, showDrop: this.props.showDrop, 
	              selected: this.props.selected, placeholder: this.props.placeholder, taggable: this.props.taggable, toggleSelected: this.props.toggleSelected}), 
	              
	            SelectronDropContainer({toggleDrop: this.props.toggleDrop, options: this.props.options, showDrop: this.props.showDrop, selected: this.props.selected, 
	              toggleSelected: this.props.toggleSelected, setFilter: this.props.setFilter, filterPlaceholder: this.props.filterPlaceholder, taggable: this.props.taggable})
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
	var SelectronTagItem = __webpack_require__(6); 

	var SelectronSelect = React.createClass({displayName: 'SelectronSelect',
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
	        _.map(this.props.selected, function(item, index){ return SelectronTagItem({option: item, toggleSelected: that.props.toggleSelected}) }) : 
	        _.map(this.props.selected, function(item, index){ return (index > 0 ? ", " : "") + item.text; });
	    }

	    var text = selectedItems||this.props.placeholder;
	    return (React.DOM.div({className: "selector", onClick: this.handleClick}, text));
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
	var SelectronList = __webpack_require__(7);

	var SelectronDropContainer = React.createClass({displayName: 'SelectronDropContainer',
	  render: function(){
	      var ret = this.props.showDrop ? SelectronList({options: this.props.options, toggleSelected: this.props.toggleSelected, selected: this.props.selected, 
	        setFilter: this.props.setFilter, filterPlaceholder: this.props.filterPlaceholder, taggable: this.props.taggable}) : "";

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

	var SelectronTagItem = React.createClass({displayName: 'SelectronTagItem',
	  handleClick: function(e){
	    this.props.toggleSelected(e.target.dataset.value);
	  },
	  render: function(){
	    return React.DOM.button({type: "button", className: "btn btn-primary", 'data-value': this.props.option.value, onClick: this.handleClick}, this.props.option.text)
	  }
	});

	module.exports = SelectronTagItem; 

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
	var SelectronListItem = __webpack_require__(8);
	var SelectronSearch = __webpack_require__(9);

	var SelectronList = React.createClass({displayName: 'SelectronList',
	  render: function(){
	      var that = this;
	      var options = (this.props.taggable ? _.difference(that.props.options, that.props.selected) : this.props.options).map(function(option, index){
	          return SelectronListItem({option: option, toggleSelected: that.props.toggleSelected, selected: that.props.selected})
	      });
	      //add search
	      options.unshift(React.DOM.li({className: "filter"}, SelectronSearch({setFilter: this.props.setFilter, filterPlaceholder: this.props.filterPlaceholder})))
	      return React.DOM.ul(null, options);
	  }
	});

	module.exports = SelectronList; 

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

	var React = __webpack_require__(1);

	var SelectronListItem = React.createClass({displayName: 'SelectronListItem',
	  handleClick: function(){
	      this.props.toggleSelected(this.props.option.value);
	  },
	  render: function(){
	    var className = (typeof _.findWhere(this.props.selected, {value: this.props.option.value}) === "undefined") ? "" : "checked";
	    return React.DOM.li({onClick: this.handleClick, className: className}, this.props.option.text)
	  }
	});

	module.exports = SelectronListItem; 

/***/ },
/* 9 */
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
