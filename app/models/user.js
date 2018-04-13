import { set, get, computed } from '@ember/object';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default DS.Model.extend({
  created: DS.attr('date'),
  modified: DS.attr('date'),
  metadata: DS.attr(),
  username: DS.attr('string'),
  dateJoined: DS.attr('date'),
  name: DS.attr('string'),
  avatar: DS.attr('string'),
  organizations: DS.hasMany('organization'),
  isActive: DS.attr('boolean'),
  features: DS.attr(),
  notificationPreferences: DS.attr(),
  //
  // Relationship to current organization
  // Owner || Admin || Member
  organization_role: DS.attr('string'),

  firstLogin: computed('metadata', function() {
    let meta = get(this, 'metadata');
    return !meta['hasViewedDashboard'];
  }),

  savedGroups: computed('meta', function() {
    return get(this, 'meta.savedGroups');
  }),

  title: computed('username', 'name', function() {
    if (get(this, 'name')) {
      return get(this, 'name');
    } else {
      return get(this, 'username');
    }
  }),

  billIntroductionNotification: computed('notificationPreferences', {
    get() {
      return this.get('notificationPreferences.bill-introduced');
    },
    set(key, value) {
      this.set('notificationPreferences.bill-introduced', value);
      this.notifyPropertyChange('notificationPreferences');
      return value;
    }
  }),
  wrapperUpdateNotification: computed('notificationPreferences', {
    get() {
      return this.get('notificationPreferences.wrapper-updated');
    },
    set(key, value) {}
  }),
  committeeNotifications: computed('notificationPreferences', {
    get() {
      return get(this, 'notificationPreferences.committee-meeting');
    },
    set(key, value) {
      this.set('notificationPreferences.committee-meeting', value);
      this.notifyPropertyChange('notificationPreferences');
      return value;
    }
  }),

  //
  // Actions
  change_password: memberAction({ path: 'change_password/', type: 'POST' }),
  login: memberAction({ path: 'login/', type: 'POST' }),
  change_status: memberAction({ path: 'change_status/', type: 'POST' }),
  change_organization_role: memberAction({
    path: 'change_organization_role/',
    type: 'POST'
  })
});
