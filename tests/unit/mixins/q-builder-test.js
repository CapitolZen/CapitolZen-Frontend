import Ember from 'ember';
import QBuilderMixin from 'capitolzen-client/mixins/q-builder';
import { module, test } from 'qunit';

module('Unit | Mixin | q builder');

// Replace this with your real tests.
test('it works', function(assert) {
  let QBuilderObject = Ember.Object.extend(QBuilderMixin);
  let subject = QBuilderObject.create();
  assert.ok(subject);
});
