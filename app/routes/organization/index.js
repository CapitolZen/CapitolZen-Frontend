import Ember from 'ember';

const {inject: {service}, RSVP} = Ember;
export default Ember.Route.extend({
  currentUser: service(),
  model() {
    return RSVP.hash({
      user: this.get('currentUser').load(),
      organization: this.get('currentUser.organization')
    })
  }
});
