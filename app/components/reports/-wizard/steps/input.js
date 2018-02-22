import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { all } from 'rsvp';

export default Component.extend({
  store: service(),
  model: {
    wrappers: []
  },
  createWrappers: task(function*() {}),
  actions: {
    submit(model) {
      console.log(model);
    }
  }
});
