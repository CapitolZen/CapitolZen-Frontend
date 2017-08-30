import Ember from 'ember';
const { Component, get } = Ember;
export default Component.extend({
  tagName: 'button',
  classNames: ['close'],
  'aria-label': 'close',
  click() {
    get(this, 'close')();
  }
});
