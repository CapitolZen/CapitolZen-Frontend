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
    get(this, 'fetchEvents').perform();
  },
  fetchStats: task(function*() {
    let { data: { stats } } = yield get(this, 'ajax').request(
      '/actions/stats/'
    );
    set(this, 'stats', stats);
  }),
  fetchEvents: task(function*() {
    let events = get(this, 'store').query('event', { future: true });
    set(this, 'events', events);
  })
});
