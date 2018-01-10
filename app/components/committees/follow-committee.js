import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { assert } from '@ember/debug';
import { task } from 'ember-concurrency';

const Button = Component.extend({
  currentUser: service(),
  flashMessages: service(),
  tagName: 'button',
  committee: null,
  classNames: ['btn'],
  classNameBindings: ['isFollowing:btn-primary:btn-outline-primary'],
  user: alias('currentUser.user'),
  init() {
    this._super(...arguments);
    assert('Must provide a valid `Committee` model', get(this, 'committee'));
  },
  isFollowingAll: computed('user', function() {
    let notificationArray = get(this, 'user.committeeNotifications');
    return notificationArray[0] === 'all';
  }),
  isFollowing: computed('user', 'committee', function() {
    let notificationArray = get(this, 'user.committeeNotifications');
    console.log(get(this, 'user'));
    let id = get(this, 'committee.id');
    return notificationArray.includes(id);
  }),
  click() {
    let isFollowing = get(this, 'isFollowing');
    get(this, 'currentUser').event('committee:subscribed');
    get(this, 'updatePreferences').perform(isFollowing);
  },
  updatePreferences: task(function*(isFollowing) {
    let committeeId = get(this, 'committee.id');
    let user = get(this, 'user');
    let committeeArray = get(user, 'committeeNotifications');
    if (isFollowing) {
      let index = committeeArray.indexOf(committeeId);
      committeeArray.splice(index, 1);
    } else {
      committeeArray.push(committeeId);
    }
    set(user, 'notificationPreferences.committee_meeting', committeeArray);
    yield user.save();
    this.notifyPropertyChange('user');
  })
});

Button.reopenClass({
  positionalParams: ['committee']
});

export default Button;
