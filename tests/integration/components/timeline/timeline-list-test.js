import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'timeline/timeline-list',
  'Integration | Component | timeline/timeline list',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{timeline/timeline-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#timeline/timeline-list}}
      template block text
    {{/timeline/timeline-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
