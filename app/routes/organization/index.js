import Ember from 'ember';

const {inject: {service}} = Ember;
export default Ember.Route.extend({
  currentUser: service(),
  model() {
    let currentOrg = this.get('currentUser.organization');
    if (currentOrg) {
      return currentOrg;
    }


  }
});
