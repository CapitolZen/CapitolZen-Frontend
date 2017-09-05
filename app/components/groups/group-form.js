import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import { typeOf, isEmpty } from '@ember/utils';

export default Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  routing: service('-routing'),
  isEditing: false,
  toggleEnabled: true,
  changeLogo: false,
  init() {
    this.get('currentUser');
    this._super(...arguments);
    set(this, 'changeLogo', isEmpty(get(this, 'model.logo')));
  },
  logoName: computed({
    get() {
      let url = get(this, 'model.logo');

      if (!url || get(this, 'changeLogo')) {
        return false;
      }
      url = decodeURIComponent(url);
      let peices = url.split('/');
      return peices.pop();
    },
    set(key, val) {
      let url = decodeURIComponent(val);
      let pieces = url.split('/');
      return pieces.pop();
    }
  }),
  actions: {
    handleResponse({ headers: { location } }) {
      let model = get(this, 'model');
      model.set('logo', location);
      set(this, 'changeLogo', false);
      set(this, 'logoName', location);
    },
    changeLogo() {
      this.toggleProperty('changeLogo');
    },
    saveGroup(group) {
      if (!group.get('id')) {
        let props = group.getProperties(
          'title',
          'active',
          'description',
          'logo'
        );
        props.organization = get(this, 'currentUser.organization');
        group = get(this, 'store').createRecord('group', props);
      }
      group.save().then(() => {
        get(this, 'flashMessages').success('Client Updated!');
        get(this, 'routing').transitionTo('groups.index');
      });
    },
    saveGroupToUser() {}
  }
});
