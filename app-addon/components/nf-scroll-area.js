import Ember from 'ember';
import ScrollAreaActionContext from '../utils/nf/scroll-area-action-context';

/**
	A component that emits actions and events when scrolled or resized.
	@namespace components
	@class nf-scroll-area
*/
export default Ember.Component.extend({
	/**
		The tag name of the component
		@property tagName
		@type String
		@default 'div'
	*/
	tagName: 'div',

	classNames: ['nf-scroll-area'],

	/**
		The name of the action to fire when scrolled
		@property scrollAction
		@type String
		@default null
	*/
	scrollAction: null,

	/**
		The name of the action to fire when resized
		@property resizeAction
		@type String
		@default null
	*/
	resizeAction: null,

	/**
		The name of the action to fire when scrolled *OR* resized
		@property changeAction
		@type String
		@default null
	*/
	changeAction: null,

	/**
		Gets or sets the height of the scroll area
		@property height
		@type Number
	*/
	height: function(key, value) {
		if(arguments.length > 1) {
			this._height = value;
			this.$().height(value);
		}
		return this._height;
	}.property(),


	/**
		Gets or sets the width of the scroll area
		@property width
		@type Number
	*/
	width: function(key, value) {
		if(arguments.length > 1) {
			this._width = value;
			this.$().width(value);
		}
		return this._width;
	}.property(),

	/**
		Gets or sets the scrollTop of the area
		@property scrollTop
		@type Number
		@default 0
	*/
	scrollTop: function(key, value) {
		if(arguments.length > 1) {
			this._scrollTop = value;
			this.$().scrollTop(value);
		}
		return this._scrollTop;
	}.property(),

	/**
		Gets or sets the scrollLeft of the area
		@property scrollLeft
		@type Number
		@default 0
	*/
	scrollLeft: function(key, value) {
		if(arguments.length > 1) {
			this._scrollLeft = value;
			this.$().scrollLeft(value);
		}
		return this._scrollLeft;
	}.property(),

	/**
		Gets the scrollHeight of the area
		@property scrollHeight
		@type Number
		@default 0
		@readonly
	*/
	scrollHeight: 0,

	/**
		Gets or sets the outerHeight of the area
		@property outerHeight
		@type Number
		@default 0
	*/
	outerHeight: function(key, value) {
		if(arguments.length > 1) {
			this._outerHeight = value;
			this.$().outerHeight(value);
		}
		return this._outerHeight;
	}.property(),

	/**
		Gets or sets the outerWidth of the area
		@property outerWidth
		@type Number
		@default 0
	*/
	outerWidth: function(key, value) {
		if(arguments.length > 1) {
			this._outerWidth = value;
			this.$().outerWidth(value);
		}
		return this._outerWidth;
	}.property(),

	/**
		The optional action data to send with the action contextl
		@property actionData
		@type Any
		@default null
	*/
	actionData: null,

	_onScroll: function(e){
		this.updateMeasurements();
		var context = this.createActionContext(e);
		this.trigger('didScroll', context);
		this.sendAction('scrollAction', context);
		this.sendAction('changeAction', context);
	},

	_onResize: function(e) {
		this.updateMeasurements();
		var context = this.createActionContext(e);
		this.trigger('didResize', context);
		this.sendAction('resizeAction', context);
		this.sendAction('changeAction', context);
	},

	/**
		Creates an action context to send with an action
		@method createActionContext
		@param e {Event} the original event object if there is one
		@return {utils.nf.scroll-area-action-context}
	*/
	createActionContext: function(e){
		var context = this.getProperties('width', 'height', 'scrollLeft', 'scrollTop', 'scrollWidth', 'scrollHeight', 'outerWidth', 'outerHeight');
		context.data = this.get('actionData');
		context.source = this;
		context.originalEvent = e;
		return ScrollAreaActionContext.create(context);
	},

	/**
		Updates the measurement properties. You probably don't need to call this, ever.
		@method updateMeasurements
		@private
	*/
	updateMeasurements: function(){
		var elem = this.$();
		this.set('scrollTop', elem.scrollTop());
		this.set('scrollHeight', elem[0].scrollHeight);
		this.set('outerHeight', elem.outerHeight());
		this.set('height', elem.height());
		this.set('scrollLeft', elem.scrollLeft());
		this.set('scrollWidth', elem[0].scrollWidth);
		this.set('outerWidth', elem.outerWidth());
		this.set('width', elem.width());
	},

	_setupElement: function() {
		var elem = this.$();
		elem.on('scroll', this._onScroll.bind(this));
		elem.on('resize', this._onResize.bind(this));
		this.updateMeasurements();
	}.on('didInsertElement'),

	_unsubscribeEvents: function(){
		var elem = this.$();
		elem.off('scroll', this._onScroll);
		elem.off('resize', this._onResize);
	}.on('willDestroyElement'),
});