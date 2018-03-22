import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { equal } from '@ember/object/computed';

export default Component.extend({
  currentUser: service(),
  isGuest: equal('currentUser.user.organization_role', 'Guest')
});