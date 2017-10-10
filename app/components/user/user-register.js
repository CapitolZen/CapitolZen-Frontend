import { inject as service } from '@ember/service';
import Component from '@ember/component';
import EmberObject, { computed, get, set } from '@ember/object';
import SingleFormState from '../../mixins/single-form-state';
import UserRegistration from '../../validators/user-registration';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Component.extend(SingleFormState, {
  ajax: service(),
  store: service(),
  session: service(),
  flashMessages: service(),
  registration: EmberObject.create(),

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
      this.setFormState('pending');
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
          this.handleServerFormErrors(data);
          this.setFormState('default');
          _opbeat('captureException', data);
        });
    }
  }
});
