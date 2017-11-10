import { get, computed } from '@ember/object';
import DS from 'ember-data';
export default DS.Model.extend({
  title: DS.attr('string'),
  sponsor: DS.belongsTo('legislator'),
  cosponsors: DS.attr(),
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
  currentCommittee: DS.belongsTo('committee'),
  computedStatus: computed('remoteStatus', function() {
    let history = get(this, 'history');

    if (!history) {
      return false;
    }
    let last = history[history.length - 1];

    if (
      last.action.toLowerCase().startsWith('bill electronically reproduced')
    ) {
      let secondToLast = history[history.length - 2];
      return {
        action: secondToLast.action.toLowerCase(),
        actor: secondToLast.actor
      };
    }

    return {
      action: last.action.toLowerCase(),
      actor: last.actor
    };
  })
});
