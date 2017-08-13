import Ember from 'ember';
const { Component, computed, get } = Ember;
export default Component.extend({
  tagName: 'img',
  classNames: ['img-thumbnail', 'img-fluid'],
  attributeBindings: ['src', 'alt'],
  src: computed.alias('legislator.photoUrl'),
  alt: computed.alias('legislator.fullName')
});
