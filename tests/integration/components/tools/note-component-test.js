import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tools/note-component', 'Integration | Component | tools/note component', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tools/note-component}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tools/note-component}}
      template block text
    {{/tools/note-component}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
