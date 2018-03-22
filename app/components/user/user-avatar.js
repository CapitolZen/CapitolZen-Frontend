import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['user-avatar'],
  classNameBindings: ['avatarRounded'],
  avatarRounded: false
});
