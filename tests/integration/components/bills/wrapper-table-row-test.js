import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "bills/wrapper-table-row",
  "Integration | Component | bills/wrapper table row",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bills/wrapper-table-row}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#bills/wrapper-table-row}}
      template block text
    {{/bills/wrapper-table-row}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
