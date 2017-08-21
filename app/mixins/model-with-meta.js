import Ember from 'ember';
const { Mixin, get, set } = Ember;
export default Mixin.create({
  metaGet(prop) {
    return get(this, 'meta')[prop];
  },
  metaSet(prop, value) {
    let meta = get(this, 'meta');
    set(meta, prop, value);
    set(this, 'meta', meta);
  }
});
