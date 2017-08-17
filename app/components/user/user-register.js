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
          console.log(data);
        })
        .catch(data => {
          console.log(data);
        });
      /*
      let {
        email: username,
        password,
        confirmPassword,
        name,
        organizationName
      } = user;

      if (password.length < 8 || confirmPassword !== password) {
        get(this, "flashMessages").danger("Please supply a valid password");
      } else {
        let newUser = get(this, "store").createRecord("user", {
          username: username,
          password: password,
          name: name
        });
        newUser.save().then(() => {
          get(this, "session")
            .authenticate("authenticator:jwt", {
              identification: username,
              password: password
            })
            .then(() => {
              let newOrg = get(this, "store").createRecord("organization", {
                name: organizationName
              });
              newOrg.save();
            });
        });
      }
      */
    }
  }
});
