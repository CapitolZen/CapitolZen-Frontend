import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  viewers: false,
  page: false,
  init() {
    this._super(...arguments);
    get(this, 'loadviewers').perform();
  },
  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'viewers', A());
  },
  loadviewers: task(function*() {
    let viewers = yield get(this, 'store').query('user', {
      viewer: get(this, 'page.id'),
      is_active: true
    });

    get(this, 'viewers').addObjects(viewers);
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

    get(this, 'viewers').removeObject(user);
  }),
  actions: {
    submit(data) {
      set(this, 'modal', false);
      let model = get(this, 'store').push(data);
      get(this, 'viewers').addObject(model);
    }
  }
});
