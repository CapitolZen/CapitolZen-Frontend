import Component from '@ember/component';
import { empty } from '@ember/object/computed';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  isNew: empty('value'),
  didReceiveAttrs() {
    this._super(...arguments);
    if (get(this, 'isNew')) {
      set(this, 'newDoc', true);
      set(this, 'doc', null);
    } else {
      set(this, 'doc', get(this, 'value.doc'));
    }
  }
});
