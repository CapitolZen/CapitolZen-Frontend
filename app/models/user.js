import Ember from 'ember';
import DS from 'ember-data';
const { computed, get, set } = Ember;

export default DS.Model.extend({
  created: DS.attr('date'),
  modified: DS.attr('date'),
  metadata: DS.attr(),

  username: DS.attr('string'),
  dateJoined: DS.attr('date'),
  name: DS.attr('string'),
  organizations: DS.hasMany('organization'),

  isActive: DS.attr('boolean'),
  firstLogin: computed('metadata', function() {
    let meta = get(this, 'metadata');
    return !meta['hasViewedDashboard'];
  }),

  savedGroups: computed('meta', function() {
    return get(this, 'meta.savedGroups');
  }),

  dismissWelcome() {
    set(this, 'meta.hasViewedDashboard', true);
    this.save();
  }
});
