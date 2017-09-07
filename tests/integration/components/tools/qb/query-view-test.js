import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'tools/qb/query-view',
  'Integration | Component | tools/qb/query view',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tools/qb/query-view}}`);

  assert.equal(
    this.$()
      .text()
      .trim(),
    ''
  );

  // Template block usage:
  this.render(hbs`
    {{#tools/qb/query-view}}
      template block text
    {{/tools/qb/query-view}}
  `);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text'
  );
});