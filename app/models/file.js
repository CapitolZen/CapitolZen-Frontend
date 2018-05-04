import DS from 'ember-data';
import { alias } from '@ember/object/computed';

export default DS.Model.extend({
  organization: DS.belongsTo('organization', { async: false }),
  user: DS.belongsTo('user', { async: false }),
  group: DS.belongsTo('group', { async: false }),
  name: DS.attr('string'),
  userPath: DS.attr('string', { default: '' }),
  metadata: DS.attr(),
  file: DS.attr('string'),
  created: DS.attr('string'),
  modified: DS.attr('string'),
  description: DS.attr('string'),
  url: alias('file'),
  previewStatus: alias('metadata.preview.status'),
  previewSrc: alias('metadata.preview.preview.url')
});
