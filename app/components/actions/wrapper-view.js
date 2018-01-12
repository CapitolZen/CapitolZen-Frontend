import Base from './view-base';
import { get, getWithDefault, set, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Base.extend({
  displayTitle: 'Bill Updated',
  dismiss({ length }) {},
  hasCommittee: computed(function() {
    return getWithDefault(this, 'referencedModel.metadata.committee-id', false);
  }),
  referencedCommittee: false,
  fetchCommittee: task(function*() {})
});
