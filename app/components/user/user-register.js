import Ember from 'ember';

import UserRegistration from '../../validators/userRegistration';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';

const { inject: { service }, Component, get, computed } = Ember;

export default Component.extend({
  ajax: service(),
  store: service(),
  session: service(),
  flashMessages: service(),

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
      console.log(changeset);
      console.log(this.get('registration'));
      changeset.save();
      console.log(this.get('registration'));
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
        });
    }
  }
});
