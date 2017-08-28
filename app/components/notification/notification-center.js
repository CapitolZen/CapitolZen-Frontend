import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['notification-center-wrapper', 'nav-item', 'dropdown'],
  unReadNotifications: 5,

  store: service(),

  recentUnreadNotifications: computed(function() {
    return this.get('store').query('activity-group', {
      limit: 4,
      feed: 'user:current:notification'
    });
  })
});
