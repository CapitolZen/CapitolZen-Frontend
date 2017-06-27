import Ember from 'ember';
const {
  inject:
      { service },
  get,
  set,
  computed,
  RSVP
  } = Ember;

export default Ember.Service.extend({
  ajax: service(),
  session: service(),
  store: service(),
  user: null,
  organization: null,

  email: computed('user.username', function() {
    return get(this, 'user.username');
  }),
  id: computed('user.id', function() {
    return get(this, 'user.id');
  }),
  name: computed('user.name', function () {
    return get(this, 'user.name')
  }),
  orgName: computed('organization.name', function() {
    return get(this, 'organization.name')
  }),
  orgId: computed('organization.id', function() {
    return get(this, 'organization.id')
  }),

  load() {
    if (get(this, 'session.isAuthenticated')) {
      return get(this, 'store').queryRecord('user', {currentUser: true})
        .then(user => {
          get(user, 'organizations').then(orgs => {
            set(this, 'user', user);
            set(this, 'organization', orgs.get('firstObject'));
          })
        })
    } else {
      return RSVP.resolve()
    }
  },
});
