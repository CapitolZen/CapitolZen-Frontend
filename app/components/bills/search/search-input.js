import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  billSearch: service(),
  currentQuery: alias('billSearch.query'),
  searchTerms: alias('billSearch.queries'),
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
