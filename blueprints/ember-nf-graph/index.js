/* globals module */
module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'd3', target: '~3.5.17' },
      { name: 'rxjs', target: '~4.1.0' }
    ]);
  }
};
