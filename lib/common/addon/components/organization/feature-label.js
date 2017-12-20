import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/organization/feature-label';
import { ORGANIZATION_FEATURES } from 'common/constants';

export default Component.extend({
  tagName: 'span',
  layout,
  map: ORGANIZATION_FEATURES,
  label: computed('map', 'feature', function() {
    return this.get('map')[this.get('feature')];
  })
});
