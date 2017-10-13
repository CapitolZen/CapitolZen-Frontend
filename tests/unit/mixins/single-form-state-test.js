import Ember from 'ember';
import SingleFormStateMixin from 'capitolzen-client/mixins/single-form-state';
import { module, test } from 'qunit';

module('Unit | Mixin | single form state');

// Replace this with your real tests.
test('it works', function(assert) {
  let SingleFormStateObject = Ember.Object.extend(SingleFormStateMixin);
  let subject = SingleFormStateObject.create();
  assert.ok(subject);
});