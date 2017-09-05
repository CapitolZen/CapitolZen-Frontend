import { computed, set, get } from '@ember/object';
import RSVP from 'rsvp';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service(),
  session: service(),
  store: service(),
  intercom: service(),
  user: null,
  organization: null,
  intercomUserProps: ['email', 'user_id', 'name'],
  email: computed('user.username', function() {
    return get(this, 'user.username');
  }),

  user_id: computed('user.id', function() {
    return get(this, 'user.id');
  }),

  name: computed('user.name', function() {
    return get(this, 'user.name');
  }),

  intercomData: computed('user', 'organization', function() {
    return this.getProperties(get(this, 'intercomUserProps'));
  }),

  load() {
    if (get(this, 'session.isAuthenticated')) {
      return get(this, 'store')
        .queryRecord('user', { currentUser: true })
        .then(user => {
          return get(user, 'organizations').then(orgs => {
            set(this, 'user', user);
            set(this, 'organization', orgs.get('firstObject'));
            get(this, 'intercom').set('user', get(this, 'intercomData'));
            _opbeat('setUserContext', {
              id: `{{${get(this, 'user_id')}}`
            });
            _opbeat('setExtraContext', {
              org_id: `{{${get(this, 'organization.id')}`
            });
          });
        });
    } else {
      return RSVP.resolve();
    }
  },

  loadOrganization() {
    if (get(this, 'session.isAuthenticated')) {
      return get(this, 'store').queryRecord('organization', {
        currentOrg: true
      });
    } else {
      return RSVP.resolve();
    }
  }
});
