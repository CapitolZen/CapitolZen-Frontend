import { inject as service } from '@ember/service';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: service(),
  currentUser: service('current-user'),

  authorize(data, block) {
    this._super(data, block);
    if (this.get('session.isAuthenticated') && data.data.token) {
      block('Authorization', `Bearer ${data.data.token}`);
    }

    if (this.get('currentUser.organization')) {
      block('X-Organization', this.get('currentUser.organization.id'));
    }
  }
});
