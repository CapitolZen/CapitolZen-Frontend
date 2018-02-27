import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { all } from 'rsvp';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  inputType: 'one',
  selectedBills: A(),
  model: {
    billIds: null
  },
  createWrappers: task(function*(list) {}),
  parseInput: task(function*() {
    yield timeout(500);
    console.log(get(this, 'billIds'));
  }),

  searchTask: task(function*(term) {
    yield timeout(500);
    return get(this, 'store').query('bill', { search: term });
  }),
  actions: {
    submit(model) {
      console.log(model);
    },
    updateData(data) {
      get(this, 'parseInput').perform();
    },
    addSingleSelection(bill) {
      get(this, 'selectedBills').addObject(bill);
    }
  }
});
