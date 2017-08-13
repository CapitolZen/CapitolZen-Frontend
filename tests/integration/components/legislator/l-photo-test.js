import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'legislator/l-photo',
  'Integration | Component | legislator/l photo',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{legislator/l-photo}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#legislator/l-photo}}
      template block text
    {{/legislator/l-photo}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
