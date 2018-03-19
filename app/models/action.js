import DS from 'ember-data';
import { computed, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { singularize } from 'ember-inflector';
import { assert } from '@ember/debug';
import { capitalize } from '@ember/string';

export default DS.Model.extend({
  created: DS.attr('string'),
  actionObject: DS.attr(),
  user: DS.belongsTo('user', { async: false }),
  bill: DS.belongsTo('bill', { async: false }),
  wrapper: DS.belongsTo('wrapper', { async: false }),
  event: DS.belongsTo('event', { async: false }),
  title: DS.attr('string'),
  priority: DS.attr('number'),
  state: DS.attr('string'),

  referencedModelType: computed('actionObject', function() {
    let models = ['bill', 'wrapper', 'event'];
    let selected = false;
    models.forEach(m => {
      if (get(this, m)) {
        selected = m;
      }
    });

    return selected;
  }),

  day: computed('created', function() {
    return this.get('created').split('T')[0];
  }),

  referencedModel: computed('referencedModelName', function() {
    let name = get(this, 'referencedModelName');
    return get(this, name);
  }),
  displayTitle: computed('title', function() {
    let titleMap = {
      'bill:introduced': 'Bill Introduced',
      'wrapper:updated': 'Saved Bill Updated',
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
