import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { alias, gte, oneWay } from '@ember/object/computed';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';
import { copy } from '@ember/object/internals';

const filters = {
  search: '',
  sponsor_party: '',
  page: ''
};

export default Component.extend({
  store: service(),
  router: service(),
  facetsCollapsed: false,
  filters: null,
  model: null,
  currentPage: alias('filters.page'),
  totalPages: 1,
  recordType: 'bill',
  //_page is required to force the component to update
  _page: null,
  maxPageDisplay: computed('totalPages', 'currentPage', function() {
    return this.totalPages > 10 ? this.currentPage + 5 : this.totalPages;
  }),
  minPageDisplay: computed('currentPage', function() {
    return this.currentPage < 10 ? 2 : this.currentPage - 5;
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    if (!this.filters) {
      this.set('filters', filters);
    }
    this.get('query').perform();
  },

  hasMorePages: computed('currentPage', 'maxPage', function() {
    return (
      Number(this.getWithDefault('currentPage', 0)) <= Number(this.totalPages)
    );
  }),

  updateParams() {
    console.log(this.filters);
    this.get('router').transitionTo({ queryParams: this.filters });
  },

  cleanQueryObject(query) {
    let output = {};

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        let element = query[key];
        if (
          typeOf(element) !== 'null' &&
          element !== '' &&
          typeOf(element) !== 'undefined' &&
          element !== 0
        ) {
          output[key] = element;
        }
      }
    }
    return output;
  },

  query: task(function*() {
    this.set('model', A());
    let query = this.cleanQueryObject(this.filters);
    let results = yield this.get('store').query(this.recordType, query);
    let {
      pagination: { pages, page }
    } = results.get('meta');
    this.set('totalPages', pages);
    this.set('currentPage', page);
    this.set('model', results);
  }).drop(),

  actions: {
    scrolledBottom() {
      if (this.hasMorePages) {
        this.incrementProperty('currentPage');
        this.updateParams();
      }
    },
    resetFilters() {
      this.set('filters', filters);
      this.updateParams();
    },
    increasePage() {
      this.incrementProperty('filters.page');
      this.updateParams();
    },
    decreasePage() {
      this.decrementProperty('filters.page');
      this.updateParams();
    },
    goToPage(page) {
      console.log(page);
      this.set('currentPage', page);
      this.updateParams();
    },
    submitFilters() {
      this.set('filters.page', 1);
      this.updateParams();
    }
  }
});
