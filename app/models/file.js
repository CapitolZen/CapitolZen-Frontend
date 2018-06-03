import DS from 'ember-data';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

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
  previewSrc: computed(
    'metadata.preview.preview.url',
    'previewUrl',
    function() {
      let preview = this.previewUrl;
      if (preview && JSON.parse(preview)) {
        return preview;
      }
      return this.get('metadata.preview.preview.url');
    }
  ),
  previewUrl: DS.attr('string')
});
