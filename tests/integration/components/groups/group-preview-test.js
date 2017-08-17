import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'groups/group-preview',
  'Integration | Component | groups/group preview',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{groups/group-preview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#groups/group-preview}}
      template block text
    {{/groups/group-preview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
