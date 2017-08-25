import Ember from 'ember';

import UserRegistration from '../../validators/userRegistration';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';

const { inject: { service }, Component, set, get, computed } = Ember;

export default Component.extend({
  ajax: service(),
  store: service(),
  session: service(),
  flashMessages: service(),
  isLoading: false,
  registration: Ember.Object.create(),

  init() {
    this._super(...arguments);

    this.changeset = new Changeset(
      this.get('registration'),
      lookupValidator(UserRegistration),
      UserRegistration
    );
  },

  UserRegistration,

  actions: {
    register(changeset) {
      set(this, 'isLoading', true);
      changeset.save();
      this.get('ajax')
        .post('users/register/', { data: this.get('registration') })
        .then(data => {
          this.get('session').authenticate('authenticator:jwt', {
            identification: this.get('registration.username'),
            password: this.get('registration.password')
          });
        })
        .catch(data => {
          console.log(data);
          _opbeat('captureException', data);
          set(this, 'isLoading', false);
        });
    }
  }
});
