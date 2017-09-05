import Component from '@ember/component';
import { get } from '@ember/object';
export default Component.extend({
  tagName: 'button',
  classNames: ['close'],
  'aria-label': 'close',
  click() {
    get(this, 'close')();
  }
});
