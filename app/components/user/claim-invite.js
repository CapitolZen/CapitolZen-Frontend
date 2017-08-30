import Ember from 'ember';

const { get, set, Component, inject: { service } } = Ember;

export default Component.extend({
  flashMessages: service(),
  request: service(),
  store: service(),
  session: service(),
  defaultObject: null,
  init() {
    this._super(...arguments);
    let obj = Ember.Object.create({ email: get(this, 'invite.email') });
    set(this, 'defaultObject', obj);
  },
  actions: {
    acceptInvite(user) {
      let { email, password, confirmPassword, name } = user;

      if (password.length < 8 || confirmPassword !== password) {
        get(this, 'flashMessages').danger('Please supply a valid password');
      } else {
        let newUser = get(this, 'store').createRecord('user', {
          username: email,
          password: password,
          name: name
        });

        newUser
          .save()
          .then(() => {
            return get(this, 'session').authenticate('authenticator:jwt', {
              identification: email,
              password: password
            });
          })
          .then(() => {
            return get(this, 'request').post(
              `invites/${get(this, 'invite.id')}/claim/`
            );
          })
          .then(() => {
            get(this, 'flashMessages').success(
              `Welcome to ${get(this, 'invite.organizationName')}!`
            );
          })
          .catch(() => {
            get(this, 'flashMessages').danger(
              'Please contact your organization owner, something went wrong.'
            );
          });
      }
    }
  }
});
