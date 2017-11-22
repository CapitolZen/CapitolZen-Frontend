import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';

export default Component.extend({
  store: service(),
  getUsers: task(function*() {
    let userList = get(this, 'value');
    let promises = userList.map(u => {
      return get(this, 'store').findRecord('user', u);
    });

    let users = yield all(promises);
    set(this, 'users', users);
  }).on('init')
});
