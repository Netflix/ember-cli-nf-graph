import Ember from 'ember';
import HasGraphParent from 'ember-nf-graph/mixins/graph-has-graph-parent';

/**
  A container and manager for `nf-range-marker` components.
  Used to draw an association between `nf-range-marker` components so they 
  can be laid out in a manner in which they don't collide.
  @namespace components
  @class nf-range-markers
  @extends Ember.Component
  @uses mixins.graph-has-graph-parent
*/
export default Ember.Component.extend(HasGraphParent, {
  tagName: 'g',
  
  /**
    Used by `nf-range-marker` to identify the `nf-range-markers` container
    @property isRangeMarkerContainer
    @type Boolean
    @default true
    @readonly
  */
  isRangeMarkerContainer: true,

  /**
    Sets the orientation of the range markers.

    - `'bottom'` - Range markers start at the bottom and stack upward
    - `'top'` - Range markers start at the top and stack downward
    @property orient
    @type String
    @default 'bottom'
  */
  orient: 'bottom',

  /**
    The margin, in pixels, between the markers
    @property markerMargin
    @type Number
    @default 10
  */
  markerMargin: 10,

  /**
    The marker components registered with this container
    @property markers
    @type Array
    @readonly
  */
  markers: Ember.computed(function() {
    return Ember.A();
  }),

  /**
    Adds the passed marker to the `markers` list, and sets the `prevMarker` and `nextMarker`
    properties on the marker component and it's neighbor.
    @method registerMarker
    @param marker {nf-range-marker} the range marker to register with this container
  */
  registerMarker: function(marker) {
    let markers = this.get('markers');
    let prevMarker = markers[markers.length - 1];
    
    if(prevMarker) {
      marker.set('prevMarker', prevMarker);
      prevMarker.set('nextMarker', marker);
    }

    markers.pushObject(marker);
  },

  /**
    Removes the marker from the `markers` list. Also updates the `nextMarker` and `prevMarker`
    properties of it's neighboring components.
    @method unregisterMarker
    @param marker {nf-range-marker} the range marker to remove from the `markers` list.
  */
  unregisterMarker: function(marker) {
    if(marker) {
      let next = marker.nextMarker;
      let prev = marker.prevMarker;
      if(prev) {
        prev.set('nextMarker', next);
      }
      if(next) {
        next.set('prevMarker', prev);
      }
      this.get('markers').removeObject(marker);
    }
  },
});