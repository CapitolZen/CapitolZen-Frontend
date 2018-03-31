import { set, get } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Service.extend({
  store: service(),
  ajax: service(),
  query: '',
  queries: [],
  results: false,

  /**
   * @private
   */
  searchBills: task(function*(terms) {
    let results = yield get(this, 'store').query('bill', { search: terms });
    set(this, 'results', results);
  }).drop(),

  /**
   * @public
   */
  search(terms) {
    set(this, 'query', terms);
    get(this, 'queries').addObject(terms);
    get(this, 'searchBills').perform(terms);
  }
});
