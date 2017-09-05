import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  billSearch: service(),
  results: computed.alias('billSearch.results'),
  currentQuery: computed.alias('billSearch.query'),
  searchTerms: computed.alias('billSearch.queries'),
  actions: {
    search() {
      let term = get(this, 'currentQuery');
      get(this, 'billSearch').search(term);
    },
    searchFromPrevious(term) {
      set(this, 'currentQuery', term);
      get(this, 'billSearch').search(term);
    }
  }
});
