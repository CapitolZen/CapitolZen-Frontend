import { computed } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  _pageTitleValue: null,
  _pageDescriptionValue: null,
  _wrapperSize: 'full',

  wrapperSize: computed('_wrapperSize', {
    get(key = 'full') {
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

  pageTitle: computed('_pageTitleValue', {
    get(key) {
      return this.get('_pageTitleValue');
    },
    set(key, value) {
      this.set('_pageTitleValue', value);
      return value;
    }
  }),

  pageDescription: computed('_pageDescriptionValue', {
    get(key) {
      return this.get('_pageDescriptionValue');
    },
    set(key, value) {
      this.set('_pageDescriptionValue', value);
      return value;
    }
  })
});
