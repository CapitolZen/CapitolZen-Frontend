import Ember from 'ember';
import ModelWithMetaMixin from 'capitolzen-client/mixins/model-with-meta';
import { module, test } from 'qunit';

module('Unit | Mixin | model with meta');

// Replace this with your real tests.
test('it works', function(assert) {
  let ModelWithMetaObject = Ember.Object.extend(ModelWithMetaMixin);
  let subject = ModelWithMetaObject.create();
  assert.ok(subject);
});
