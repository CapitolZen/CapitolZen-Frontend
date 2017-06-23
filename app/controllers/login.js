import Ember from 'ember';
const {inject: {service}} = Ember;

export default Ember.Controller.extend({
  session: service(),
  actions: {
    login(user) {
      let data = user.getProperties('identification', 'password'),
        authenticator = 'authenticator:token';

      this.get('session').authenticate(authenticator, data).then(() => {
        this.transitionToRoute('index');
      })
    }
  }
});
