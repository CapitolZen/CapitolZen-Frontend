/* global document */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
  currentUser: service('current-user'),
  menuState: false,
  locked: false,
  actions: {
    toggleMenuState() {
      set(this, 'menuState', true);
    }
  }
});
