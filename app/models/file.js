import DS from 'ember-data';
import { alias } from '@ember/object/computed';

export default DS.Model.extend({
  organization: DS.belongsTo('organization'),
  user: DS.belongsTo('user'),
  name: DS.attr('string'),
  userPath: DS.attr('string', { default: '' }),
  file: DS.attr('string'),
  created: DS.attr('string'),
  modified: DS.attr('string'),
  previewUrl: DS.attr('string'),
  description: DS.attr('string'),
  url: alias('file')
});
