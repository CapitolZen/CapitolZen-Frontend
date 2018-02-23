import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { all } from 'rsvp';

export default Component.extend({
  store: service(),
  model: {
    billIds: null
  },
  createWrappers: task(function*(list) {}),
  parseInput: task(function*() {
    timeout(500);
    console.log(get(this, 'billIds'));
  }),
  actions: {
    submit(model) {
      console.log(model);
    },
    updateData(data) {
      get(this, 'parseInput').perform();
    }
  }
});
