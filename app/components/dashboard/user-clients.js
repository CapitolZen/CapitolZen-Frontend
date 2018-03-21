import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  classNames: ['list-group'],
  store: service(),
  currentUser: service(),
  clients: null,
  init() {
    this._super(...arguments);
    this.get('loadClients').perform();
  },
  loadClients: task(function*() {
    let groups = yield get(this, 'store').query('group', {
      active: true,
      assigned_to: get(this, 'currentUser.user_id'),
      sort: 'title'
    });

    this.set('clients', groups);
  })
});
