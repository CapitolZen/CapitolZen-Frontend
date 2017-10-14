import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';
export default Component.extend({
  tagName: 'img',
  classNames: ['img-thumbnail', 'img-fluid'],
  attributeBindings: ['src', 'alt'],
  src: alias('legislator.photoUrl'),
  alt: alias('legislator.fullName')
});
