import Component from '@ember/component';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  keyword: alias('value.title__icontains'),
  actions: {
    save(value) {
      get(this, 'update')({ bill__title__icontains: value });
    }
  }
});
