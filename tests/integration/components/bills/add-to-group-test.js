import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bills/add-to-group', 'Integration | Component | bills/add to group', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bills/add-to-group}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bills/add-to-group}}
      template block text
    {{/bills/add-to-group}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
