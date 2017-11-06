import { get, computed } from '@ember/object';
import DS from 'ember-data';
export default DS.Model.extend({
  title: DS.attr('string'),
  sponsor: DS.belongsTo('legislator'),
  state: DS.attr('string'),
  stateId: DS.attr('string'),
  history: DS.attr(),
  documents: DS.attr(),
  remoteStatus: DS.attr('string'),
  chamber: DS.attr('string'),
  actionDates: DS.attr(),
  lastActionDate: DS.attr('string'),
  type: DS.attr('string'),
  sources: DS.attr(),
  votes: DS.attr(),
  remoteUrl: DS.attr('string'),
  billVersions: DS.attr(),
  introducedDate: DS.attr('string'),
  wrappers: DS.hasMany('wrappers'),
  computedStatus: computed('remoteStatus', function() {
    return get(this, 'remoteStatus');
  })
});
