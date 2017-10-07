import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service('current-user'),
  classNames: ['header', 'nav-header', 'clearfix'],
  id: 'main-header',
  actions: {
    toggleMenuState() {
      get(this, 'toggler')();
    }
  }
});
