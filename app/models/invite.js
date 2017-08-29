import DS from 'ember-data';
import { memberAction, collectionAction } from 'ember-api-actions';

export default DS.Model.extend({
  created: DS.attr('date'),
  modified: DS.attr('date'),
  metadata: DS.attr(),
  organization: DS.belongsTo('organization'),
  organization_name: DS.attr('string'),
  email: DS.attr('string'),
  status: DS.attr('string', { default: 'unclaimed' }),

  //
  // Non-CRUD things
  claim: memberAction({ path: 'claim/', type: 'POST' }),
  action: memberAction({ path: 'actions/', type: 'POST' })
});
