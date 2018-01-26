import DS from 'ember-data';
import { computed, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { singularize } from 'ember-inflector';
import { assert } from '@ember/debug';
import { capitalize } from '@ember/string';

export default DS.Model.extend({
  created: DS.attr('string'),
  actionObject: DS.attr(),
  user: DS.belongsTo('user'),
  title: DS.attr('string'),
  priority: DS.attr('number'),
  state: DS.attr('string'),
  referencedModelName: computed('actionObject', function() {
    if (get(this, 'actionObject.type')) {
      return capitalize(singularize(get(this, 'actionObject.type')));
    }
    return false;
  }),
  modelId: alias('actionObject.id'),
  displayTitle: computed('title', function() {
    let titleMap = {
      'bill:introduced': 'Bill Introduced',
      'bill:updated': 'Bill Updated',
      'organization:user-add': 'User Joined',
      'organization:user-invite': 'User Invited',
      'user:mention': 'Mentioned',
      'committee:meeting': 'Committee Meeting'
    };
    return titleMap[get(this, 'title')];
  }),
  /**
   * Update state
   * @param newState
   * @return Promise
   */
  updateState(newState) {
    let allowedStates = ['active', 'dismissed', 'snoozed', 'flagged'];
    assert(
      `${newState} must be one of the allowed states`,
      allowedStates.indexOf(newState) >= 0
    );
    set(this, 'state', newState);
    return this.save();
  }
});
