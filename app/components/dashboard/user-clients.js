import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['list-group'],

  store: service(),
  currentUser: service('current-user'),

  clients: computed(function() {
    return get(this, 'store').query('group', {
      active: true,
      assigned_to: get(this, 'currentUser.user_id'),
      sort: 'title'
    });
  })
});
