import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-primary'],
  groupList: [],
});
