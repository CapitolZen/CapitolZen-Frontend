import DS from 'ember-data';
import { computed, get } from '@ember/object';
import moment from 'moment';

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

    return map[get(this, 'eventType')];
  }),
  startsAt: computed('time', function() {
    return moment(get(this, 'time'));
  }),
  endsAt: computed('time', function() {
    let start = get(this, 'startsAt');
    return start.add(90, 'minutes');
  })
});
