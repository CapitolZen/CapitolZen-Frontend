import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from '@ember/concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  eventId: false,
  didRecieveAttrs() {
    this._super(...arguments);
    if (get(this, 'eventId')) {
      get(this, 'fetchModel').perform(get(this, 'eventId'));
    }
  },
  fetchModel: task(function*(id) {
    let event = get(this, 'store').findRecord('event', id);
    set(this, 'model', event);
  })
});
