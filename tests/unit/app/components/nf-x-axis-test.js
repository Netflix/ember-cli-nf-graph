import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';


moduleForComponent('nf-x-axis', {
  // specify the other units that are required for this test
  needs: ['component:nf-graph']
});

test('nf-x-axis tickData should call tickFactory if available', function(assert) {
  var args;

  Ember.run(() => {
    //HACK: couldn't find a great, documented way of mocking readonly and aliased propertied
    // so I override them here.
    var axis = this.factory().extend({
      uniqueXData: [1,2,3,4,5],
      xScale: 'xScale',
      graph: Ember.computed((key, value) => ({
        xScaleType: 'xScaleType'
      })),
      tickCount: 42,
      tickFactory: function() {
        args = [].slice.call(arguments);
        return 'expected result';
      }
    }).create();

    var tickData = axis.get('tickData');
    assert.equal(tickData, 'expected result');
    assert.deepEqual(args, ['xScale', 42, [1,2,3,4,5], 'xScaleType']);
  });
});

test('nf-x-axis hasBlock if template.blockParams', function(assert) {
  Ember.run(() => {
    var axis = this.factory().extend({
      graph: Ember.computed((key, value) => ({
        xScaleType: 'xScaleType'
      }))
    }).create();

    axis.set('template', Ember.Object.create({
      blockParams: true
    }));

    assert.equal(axis.get('hasBlock'), true);
  });
});


test('nf-x-axis hasBlock if template is undefined', function(assert) {
  Ember.run(() => {
    var axis = this.factory().extend({
      graph: Ember.computed((key, value) => ({
        xScaleType: 'xScaleType'
      })),

      hasBlock: true
    }).create();

    assert.equal(axis.get('template'), undefined);
    assert.equal(axis.get('hasBlock'), true);
  });
});
