import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "bills/bill-table-status",
  "Integration | Component | bills/bill table status",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bills/bill-table-status}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#bills/bill-table-status}}
      template block text
    {{/bills/bill-table-status}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
