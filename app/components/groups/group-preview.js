import Ember from 'ember';
const { computed, Component, get } = Ember;
export default Component.extend({
  classNames: ['my-1'],
  classNameBindings: ['sizeClass'],
  sizeClass: computed('size', function() {
    let size = get(this, 'size') || 'half';
    if (size === 'full') {
      return 'col-12';
    } else {
      return 'col-lg-6';
    }
  })
});
