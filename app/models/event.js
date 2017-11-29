import DS from 'ember-data';
import { computed, get } from '@ember/object';

export default DS.Model.extend({
  chamber: DS.attr('string'),
  state: DS.attr('string'),
  time: DS.attr('string'),
  eventType: DS.attr('string'),
  locationText: DS.attr('string'),
  description: DS.attr('string'),
  committee: DS.belongsTo('committee'),
  url: DS.attr('string'),
  attachments: DS.attr(),
  created: DS.attr('string'),
  metadata: DS.attr(),
  name: computed('eventType', function() {
    let map = {
      'committee:meeting': 'Committee - Meeting'
    };

    let type = get(this, 'eventType');
    return map[type];
  })
});
