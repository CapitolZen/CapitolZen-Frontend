import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'notification/notification-summary',
  'Integration | Component | notification/notification summary',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{notification/notification-summary}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#notification/notification-summary}}
      template block text
    {{/notification/notification-summary}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
