import Ember from 'ember';
const {inject: {service}} = Ember;
export default Ember.Route.extend({
  currentUser: service(),
  model() {
    return this.get('store').createRecord('group');
  }
});
