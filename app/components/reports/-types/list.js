import Base from './base';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Base.extend({
  preview: false
});
