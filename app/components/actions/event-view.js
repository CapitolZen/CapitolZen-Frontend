import { get, set, computed } from '@ember/object';
import Base from './view-base';
import { task } from 'ember-concurrency';

export default Base.extend({
  postLoadHook(model) {
    get(this, 'loadCommittee').perform(model);
  },
  loadCommittee: task(function*(event) {
    let model = yield event.loadCommittee();
    set(this, 'committee', model);
  })
});
