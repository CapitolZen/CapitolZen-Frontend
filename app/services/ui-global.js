import Ember from 'ember';

export default Ember.Service.extend({
  _pageTitleValue: null,
  _pageDescriptionValue: null,
  _wrapperSize: 'full',

  wrapperSize: Ember.computed('_wrapperSize', {
    get(key) {
      let sizemap = {
        full: 'col-md-12',
        half: 'col-md-6 offset-md-3'
      };

      return sizemap[this.get('_wrapperSize')];
    },
    set(key, value) {
      this.set('_wrapperSize', value);
      return this.get('wrapperSize');
    }
  }),

  pageTitle: Ember.computed('_pageTitleValue', {
    get(key) {
      return this.get('_pageTitleValue');
    },
    set(key, value) {
      this.set('_pageTitleValue', value);
      return value;
    }
  }),

  pageDescription: Ember.computed('_pageDescriptionValue', {
    get(key) {
      return this.get('_pageDescriptionValue');
    },
    set(key, value) {
      this.set('_pageDescriptionValue', value);
      return value;
    }
  })
});
