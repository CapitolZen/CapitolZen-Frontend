import Component from '@ember/component';
import { get, computed } from '@ember/object';
export default Component.extend({
  tagName: 'img',
  classNames: ['img-thumbnail', 'img-fluid'],
  attributeBindings: ['src', 'alt'],
  src: computed.alias('legislator.photoUrl'),
  alt: computed.alias('legislator.fullName')
});
