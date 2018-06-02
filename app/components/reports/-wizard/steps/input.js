import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { allSettled } from 'rsvp';
import { A } from '@ember/array';
import moment from 'moment';

export default Component.extend({
  store: service(),
  currentUser: service(),
  inputType: 'one',
  selectedBills: A(),
  model: {
    billIds: null
  },
  createWrappers: task(function*(list) {
    let bills = get(this, 'selectedBills');
    let group = yield get(this, 'store').findRecord(
      'group',
      get(this, 'config.groupId')
    );

    let metadata = {
      savedby: get(this, 'currentUser.currentUser.name'),
      saveddate: moment().unix()
    };

    let promises = bills.map(bill => {
      let wrapper = get(this, 'store').createRecord('wrapper', {
        group,
        bill,
        metadata
      });
      return wrapper.save();
    });

    let wrappers = yield allSettled(promises);

    let created = wrappers.map(w => {
      if (w.state === 'fulfilled') {
        return w.value;
      }
    });
    get(
      this,
      'onComplete'
    )(get(this, 'step'), { wrappers: created, wrappersCreated: true });
  }),
  parseInput: task(function*() {
    yield timeout(500);
  }),

  searchTask: task(function*(term) {
    yield timeout(500);
    return get(this, 'store').query('bill', { search: term });
  }).restartable(),
  actions: {
    updateData(data) {
      get(this, 'parseInput').perform();
    },
    addSingleSelection(bill) {
      get(this, 'selectedBills').addObject(bill);
    }
  }
});
