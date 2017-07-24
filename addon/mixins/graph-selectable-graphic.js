import Ember from 'ember';

/**
  Adds functionality to a component to make it a selectable graphic
  within it's parent nf-graph.
  @namespace mixins
  @class graph-selectable-graphic
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({
  _selected: false,

  /**
    Gets or sets whether or not the graphic is "selectable". Meaning can be "selected" on the nf-graph 
    via some action (usually click). The component will then show up in the nf-graph parent's selected 
    property.
    @property selectable
    @type Boolean
    @default false
  */
  selectable: false,

  /**
    Gets or sets whether or not the graphic is selected.
    @property selected
    @type Boolean
    @default false
  */
  selected: false,

  /**
    Alias of selected
    @property isSelected
    @deprecated use `selected`
  */
  isSelected: Ember.computed.alias('selected'),

  /**
    Makes calls to the parent nf-graph to update it's
    `selected` property. Observes changes to `selected` and also 
    fires on `didInsertElement`.
    @method _updateGraphSelected
    @private
  */
  _updateGraphSelected: Ember.on('didInsertElement', Ember.observer('selected', function() {
    Ember.run.once(this, function(){
      let selected = this.get('selected');
      let graph = this.get('graph');
      if(selected) {
        graph.selectGraphic(this);
      } else {
        graph.deselectGraphic(this);
      }
    });
  })),
});