import Ember from 'ember';
const {inject: {service}} = Ember;

export default Ember.Controller.extend({
  session: service(),
  actions: {
    register(user) {
      let newUser = this.store.createRecord('user', user);
      newUser.save()
        .then(() => {
          this.get('session')
            .authenticate('authenticator:token', {
              identification: newUser.get('email'),
              password: newUser.get('password')
            })
            .then(() => {
              this.transitionToRoute('index');
            });
        });
    }
  }
});
