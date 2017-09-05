import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidations from '../../validators/user';

export default Component.extend({
  flashMessages: service(),
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(
      get(this, 'user'),
      lookupValidator(UserValidations),
      UserValidations
    );
  },
  actions: {
    submit(changeset) {
      changeset.execute();
      changeset
        .save()
        .then(() => {
          get(this, 'flashMessages').success('Account Updated');
        })
        .catch(() => {
          get(this, 'flashMessages').success(
            'Error Updating Account, Someone is on the case!'
          );
          get(this, 'organization.errors').forEach(({ attribute, message }) => {
            changeset.pushErrors(attribute, message);
          });
        });
    }
  }
});
