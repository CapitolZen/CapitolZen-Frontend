import EmberObject from '@ember/object';
import QBuilderMixin from 'capitolzen-client/mixins/q-builder';
import { module, test } from 'qunit';

module('Unit | Mixin | q builder');

// Replace this with your real tests.
test('it works', function(assert) {
  let QBuilderObject = EmberObject.extend(QBuilderMixin);
  let subject = QBuilderObject.create();
  assert.ok(subject);
});
