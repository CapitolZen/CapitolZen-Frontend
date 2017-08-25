import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'reports/report-table-actions',
  'Integration | Component | reports/report table actions',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reports/report-table-actions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#reports/report-table-actions}}
      template block text
    {{/reports/report-table-actions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
