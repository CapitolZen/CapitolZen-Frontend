import DS from 'ember-data';
import Ember from 'ember';

const { computed, get, set } = Ember;
export default DS.Model.extend({
  bill: DS.belongsTo('bill'),
  group: DS.belongsTo('group'),
  organization: DS.belongsTo('organization'),
  notes: DS.attr(),
  position: DS.attr('string', { defaultValue: 'neutral' }),
  starred: DS.attr('boolean', { defaultValue: false }),
  summary: DS.attr('string'),
  positionDetail: DS.attr('string')
});
