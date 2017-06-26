import Ember from 'ember';

const {inject: {service}} = Ember;

export default Ember.Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  isEditing: false,
  toggleEnabled: true,
  init() {
    this.get('currentUser');
    this._super(...arguments);
  },
  actions: {
    saveGroup(data) {
      data.save()
        .then(() => {
          this.get('flashMessages').success('Group Updated')
        })
        .catch(() => {
          this.get('flashMessagess').danger("We're sorry, there is an error and our team is notified!");
        })
    },
    createGroup(data) {
      let curorg = this.get('currentUser.organization');
      let org = this.get('store').peekRecord('organization', curorg.get('id'));
      data.set('organization', org);

      data.save().then(() => {
        this.get('flashMessages').success('Group Created!')
      })
        .catch(() => {
          this.get('flashMessages').danger("We're sorry, there is an error and our team is notified!")
        });
    },
    toggleEditing() {
      this.toggleProperty('isEditing')
    }
  }
});
