import DS from 'ember-data';
import { computed, get } from '@ember/object';
export default DS.Model.extend({
  bills: DS.hasMany('bill'),
  modified: DS.attr('string'),
  created: DS.attr('string'),
  name: DS.attr('string'),
  state: DS.attr('string'),
  chamber: DS.attr('string'),
  parent_id: DS.attr('string'),
  subcommittee: DS.attr('string'),
  meetings: DS.hasMany('event'),
  displayName: computed('name', 'subcommittee', function() {
    let name = get(this, 'name');
    if (get(this, 'subcommittee')) {
      name += `: ${get(this, 'subcommittee')}`;
    }
    return name;
  })
});
