import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'legislator/l-name',
  'Integration | Component | legislator/l name',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{legislator/l-name}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#legislator/l-name}}
      template block text
    {{/legislator/l-name}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
