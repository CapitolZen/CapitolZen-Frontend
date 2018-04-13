import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { equal, alias } from '@ember/object/computed';

export default Controller.extend({
  currentUser: service(),
  intercom: service(),
  isGuest: equal('currentUser.user.organization_role', 'Guest'),
  userName: alias('currentUser.user.name')
});
