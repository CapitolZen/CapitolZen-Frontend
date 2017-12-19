import Component from '@ember/component';
import { get, computed } from '@ember/object';
export default Component.extend({
  classNames: ['my-1'],
  classNameBindings: ['sizeClass'],
  sizeClass: computed('presentation', 'size', function() {
    let classes = 'group-summary';

    classes += ' group-' + this.get('presentation');

    return classes;
  })
});
