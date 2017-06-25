
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-meta-setter', 'helper:page-meta-setter', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{page-meta-setter inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

