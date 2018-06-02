import Component from '@ember/component';
import { get, getWithDefault, set } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  wrapperList: null,
  didReceiveAttrs() {
    this._super(...arguments);
    // Note: DS recordArrays are immutable, so need to munge it a bit...
    let list = getWithDefault(this, 'wrappers', A());
    list = list.toArray();
    set(this, 'wrapperList', A(list));
  },
  actions: {
    billAdded({ wrapper }) {
      get(this, 'wrapperList').pushObject(wrapper);
    }
  }
});
