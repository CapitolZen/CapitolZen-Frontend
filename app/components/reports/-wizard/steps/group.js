import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  features: service(),
  chooseOption: null,
  model: { newGroup: null, existingGroup: null },
  init() {
    this._super(...arguments);
    get(this, 'setupGroups').perform();
  },
  setupGroups: task(function*() {
    let groups = get(this, 'store').findAll('group');
    set(this, 'groups', groups);
    if (!groups.length) {
      set(this, 'chooseOption', 'new');
    }
  }),
  createAndSubmit: task(function*(groupName) {
    let group = yield get(this, 'store')
      .createRecord('group', {
        title: groupName,
        organization: get(this, 'currentUser.organization')
      })
      .save();
    get(this, 'onComplete')(0, { group: group.get('id') });
  }),
  actions: {
    submit({ newGroup, existingGroup }) {
      if (!newGroup && !existingGroup) {
        get(this, 'flashMessages').danger(
          `You must select a ${get(this, 'features.clientLabel')}`
        );
      } else {
        if (newGroup) {
          get(this, 'createAndSubmit').perform(newGroup);
        } else {
          get(this, 'onComplete')(get(this, 'step'), {
            group: existingGroup.get('id')
          });
        }
      }
    }
  }
});
