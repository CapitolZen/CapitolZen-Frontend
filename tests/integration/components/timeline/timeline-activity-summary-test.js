import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'timeline/timeline-activity-summary',
  'Integration | Component | timeline/timeline activity summary',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{timeline/timeline-activity-summary}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#timeline/timeline-activity-summary}}
      template block text
    {{/timeline/timeline-activity-summary}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
