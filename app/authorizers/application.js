import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';

export default Base.extend({
  session: Ember.inject.service(),
  authorize(data, block) {
    this._super(data, block);
    if (Ember.testing) {
      block('Authorization', 'asdf');
    }
    if (this.get('session.isAuthenticated') && data.data.token) {
      block('Authorization', `Bearer ${data.data.token}`);
    }
  }
});
