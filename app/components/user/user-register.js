import Ember from 'ember';

const {inject: {service}} = Ember;
export default Ember.Component.extend({
  store: service(),
  session: service(),
  router: service('-routing'),
  defaultObject: Ember.Object.create(),
  actions: {
    register(user) {
      let { email:username, password, name, organizationName } = user;
      let newUser = this.get('store').createRecord('user', {
        username: username,
        password: password,
        name: name
      });
      newUser.save()
        .then(() => {
          this.get('session')
            .authenticate('authenticator:jwt', {
              identification: username,
              password: password
            })
            .then(() => {
              let newOrg = this.get('store').createRecord('organization', {name: organizationName})
              newOrg.save()
            });
        });
    },
  }

});
