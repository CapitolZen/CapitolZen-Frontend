import DS from 'ember-data';

export default DS.Model.extend({
  activities: DS.attr(),
  activity_count: DS.attr('number'),
  actor_count: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  group: DS.attr('string'),
  verb: DS.attr('string'),
  is_read: DS.attr('boolean'),
  is_seen: DS.attr('boolean')
});
