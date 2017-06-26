import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidations from '../../validators/user';

const {inject: {service}, get } = Ember;

export default Ember.Component.extend({
  flashMessages: service(),
  init() {
    this._super(...arguments);
    this.changeset = new Changeset(get(this, 'user'), lookupValidator(UserValidations), UserValidations)
  },
  actions: {
    submit(changeset) {
      changeset.execute();
      changeset.save()
        .then(() => {
          get(this, 'flashMessages').success('Account Updated');
        })
        .catch(() => {
          get(this, 'flashMessages').success('Error Updating Account, Someone is on the case!');
          get(this, 'organization.errors').forEach(({attribute, message}) => {
            changeset.pushErrors(attribute, message);
          });
        });
    }
  }
});
