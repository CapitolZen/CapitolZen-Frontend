import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  totalActive: computed('users', function() {
    return get(this, 'users').get('length');
  }),
  userSortDesc: ['name:desc'],
  sortedUsers: computed.sort('users', 'userSortDesc')
});
