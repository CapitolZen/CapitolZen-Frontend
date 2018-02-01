import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  ajax: service(),
  store: service(),
  group: false,
  init() {
    this._super(...arguments);
    let id = get(this, 'group.id');
    get(this, 'fetchStats').perform(id);
  },
  fetchStats: task(function*(id) {
    let { data: { stats } } = yield get(this, 'ajax').request(
      `groups/${id}/stats/`
    );
    set(this, 'stats', stats);
    console.log(stats);
  })
});
