import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'tools/qb/filter-item',
  'Integration | Component | tools/qb/filter item',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tools/qb/filter-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tools/qb/filter-item}}
      template block text
    {{/tools/qb/filter-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
