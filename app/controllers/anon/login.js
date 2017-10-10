import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

import userLogin from '../../validators/user-login';
import SingleFormState from '../../mixins/single-form-state';

export default Controller.extend(SingleFormState, {
  session: service(),
  flashMessages: service(),
  init() {
    this._super(...arguments);
    this.model = {
      identification: null,
      password: null
    };
    this.changeset = new Changeset(
      this.get('model'),
      lookupValidator(userLogin),
      userLogin
    );
  },
  userLogin,
  actions: {
    login(changeset) {
      this.setFormState('pending');

      changeset.execute();
      const authenticator = 'authenticator:jwt';
      let model = this.get('model');

      return this.get('session')
        .authenticate(authenticator, model)
        .then(() => {
          this.transitionToRoute('dashboard');
        })
        .catch(() => {
          get(this, 'flashMessages').danger(
            'Your email or password was incorrect. Please try again.'
          );
          this.setFormState('default');
        });
    }
  }
});
