import Component from '@ember/component';
import { get, getWithDefault, set } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  wrapperList: null,
  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'wrapperList', getWithDefault(this, 'wrappers', A()));
  },
  actions: {
    billAdded({ wrapper }) {
      get(this, 'wrapperList').pushObject(wrapper);
    }
  }
});
