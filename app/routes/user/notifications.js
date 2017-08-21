import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Ember.Route.extend({
  currentUser: service('current-user'),
  model(params) {
    return this.get('store').query('activity', { feed: 'user-notifications' });
  }
});
