import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../templates/components/global/static-nav';

export default Component.extend({
  layout,
  currentUser: service('current-user'),
  session: service('session'),
  classNames: ['header', 'nav-header', 'clearfix'],
  id: 'main-header',
  actions: {
    toggleMenuState() {
      get(this, 'toggler')();
    },
    invalidateSession() {
      get(this, 'session').invalidate();
    }
  }
});
