import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  billSearch: service(),
  router: service(),
  transition: false,
  currentQuery: alias('billSearch.query'),
  searchTerms: alias('billSearch.queries'),
  buttonType: 'primary',
  actions: {
    search() {
      let term = get(this, 'currentQuery');
      get(this, 'billSearch').search(term);
      if (get(this, 'transition')) {
        get(this, 'router').transitionTo('bills.search');
      }
    },
    searchFromPrevious(term) {
      set(this, 'currentQuery', term);
      get(this, 'billSearch').search(term);
    }
  }
});
