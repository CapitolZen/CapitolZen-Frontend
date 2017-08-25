import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  uiGlobal: service('ui-global'),
  classNames: ['page-header', 'mb-lg-3', 'mb-2', 'mt-2'],
  size: computed('uiGlobal.wrapperSize', function() {
    return this.get('uiGlobal.wrapperSize');
  })
});
