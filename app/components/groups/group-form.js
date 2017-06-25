import Ember from 'ember';

const {inject: {service}} = Ember;

export default Ember.Component.extend({
  store: service(),
  isEditing: false,
  toggleEnabled: true,
  actions: {
    saveGroup(data) {
      data.save()
    },
    toggleEditing() {
      this.toggleProperty('isEditing')
    }
  }
});
