import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { equal } from '@ember/object/computed';

export default Component.extend({
  currentUser: service(),
  session: service(),
  router: service(),
  updateId: computed('router.currentRouteName', function() {
    let routeName = this.get('router.currentRouteName'),
      url = this.get('router.currentURL');

    if (routeName === 'page.update') {
      return url.split('/').pop();
    } else {
      return false;
    }
  }),
  showBigLogo: false,
  isGuest: equal('currentUser.user.organization_role', 'Guest'),
  showContextMenu: computed('session.isAuthenticated', 'isGuest', function() {
    return this.get('session.isAuthenticated') && !this.get('isGuest');
  })
});
