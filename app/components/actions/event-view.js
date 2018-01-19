import { get, set, computed } from '@ember/object';
import Base from './view-base';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Base.extend({
  currentUser: service(),
  postLoadHook(model) {
    get(this, 'loadCommittee').perform(model);
  },
  loadCommittee: task(function*(event) {
    let model = yield event.loadCommittee();
    set(this, 'committee', model);
  }),
  actions: {
    trackEvent() {
      get(this, 'currentUser').event('event:calendar');
    }
  }
});
