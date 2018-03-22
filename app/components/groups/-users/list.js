import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  guests: false,
  init() {
    this._super(...arguments);
    get(this, 'loadGuests').perform();
  },
  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'guests', A());
  },
  loadGuests: task(function*() {
    let guests = yield get(this, 'store').query('user', {
      guest: get(this, 'group.id'),
      is_active: true
    });

    get(this, 'guests').addObjects(guests);
  }),
  deleteUser: task(function*(user) {
    user.set('isActive', false);
    yield user.save();

    let payload = {
      data: {
        type: 'users',
        attributes: {
          status: status
        }
      }
    };

    user.change_status(payload);

    get(this, 'guests').removeObject(user);
  }),
  actions: {
    submit(data) {
      set(this, 'modal', false);
      let model = get(this, 'store').push(data);
      get(this, 'guests').addObject(model);
    }
  }
});
