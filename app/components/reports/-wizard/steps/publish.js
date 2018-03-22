import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  currentUser: service(),
  reportModel: computed('config', function() {
    let { groupId } = get(this, 'config');

    return get(this, 'store').createRecord('report', {
      organization: get(this, 'currentUser.organization'),
      group: groupId
    });
  })
});
