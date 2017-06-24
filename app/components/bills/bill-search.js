import Ember from 'ember';
import  { task } from 'ember-concurrency';

const {inject: {service}, set} = Ember;
export default Ember.Component.extend({
  store: service(),
  results: null,
  searchBills: task(function * ({terms}) {
    let results = yield this.get('store').query('bill', {search: terms});
    set(this, 'results', results);
  }).drop()
});
