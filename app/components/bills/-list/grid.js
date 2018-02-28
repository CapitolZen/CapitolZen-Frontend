import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    get(this, 'loadBills').perform();
  },
  params: {},
  billList: A(),
  loadBills: task(function*() {
    let params = get(this, 'params');

    if (!params.page_size) {
      params.page_size = 10;
    }
    let bills = yield get(this, 'store').query('bill', params);
    set(this, 'billList', bills);
  })
});
