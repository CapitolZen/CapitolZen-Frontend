import Ember from 'ember';
import { task } from 'ember-concurrency';

const { inject: { service }, Component, computed, get, set } = Ember;
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
