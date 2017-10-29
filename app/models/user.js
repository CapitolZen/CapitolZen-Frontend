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

  dismissWelcome() {
    set(this, 'meta.hasViewedDashboard', true);
    this.save();
  },

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
