import Component from '@ember/component';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
  store: service(),
  currentUser: service(),
  updates: A(),
  isNew: true,
  didReceiveAttrs() {
    this._super(...arguments);
    this.generateNewUpdate();
    get(this, 'loadUpdates').perform();
  },
  loadUpdates: task(function*() {
    let group_page = get(this, 'page.id');
    let updates = yield get(this, 'store').query('update', { group_page });
    get(this, 'updates').addObjects(updates);
  }),
  generateNewUpdate() {
    let update = get(this, 'store').createRecord('update', {
      page: get(this, 'page'),
      group: get(this, 'page.group'),
      organization: get(this, 'page.group.organization'),
      user: get(this, 'currentUser.user')
    });

    set(this, 'newUpdate', update);
  },
  actions: {
    resetUpdate(model) {
      get(this, 'updates').unshiftObject(model);
      this.generateNewUpdate();
    }
  }
});
