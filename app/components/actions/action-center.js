import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  ajax: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    get(this, 'fetchStats').perform();
  },
  fetchStats: task(function*() {
    let { data: { stats } } = yield get(this, 'ajax').request(
      '/actions/stats/'
    );
    console.log(stats);
    set(this, 'stats', stats);
  })
});
