import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import OrganizationValidations from '../../validators/organization';

const {inject: {service}, get, set} = Ember;

export default Ember.Component.extend({
  flashMessages: service(),
  isEditing: false,
  changeset: null,
  didReceiveAttrs() {
    this._super(...arguments);
    let org = get(this, 'org') || {};
    this.changeset = new Changeset(org, lookupValidator(OrganizationValidations), OrganizationValidations);
  },
  actions: {
    updateOrganization(changeset) {
      console.log("Hello from the other side. I must've called a thousand times");
      changeset.execute();
      changeset.save()
        .then(() => {
          get(this, 'flashMessages').success('Organization Updated');
          set(this, 'isEditing', false);
        })
        .catch(() => {
          console.log('uh oh...hot dog');
          get(this, 'flashMessages').success('Error Creating Organization');
          get(this, 'organization.errors').forEach(({attribute, message}) => {
            changeset.pushErrors(attribute, message);
          });
        });
    },
    toggleEditing() {
      this.toggleProperty('isEditing');
    }
  }
});
