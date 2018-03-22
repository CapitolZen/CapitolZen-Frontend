import Base from './base';
import { get, set, computed } from '@ember/object';

export default Base.extend({
  firstObject: computed('wrappers', function() {
    return get(this, 'wrappers.firstObject');
  })
});
