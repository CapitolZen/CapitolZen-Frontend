import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user/user-edit', 'Integration | Component | user/user edit', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user/user-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#user/user-edit}}
      template block text
    {{/user/user-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
