import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "bills/vote-list",
  "Integration | Component | bills/vote list",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bills/vote-list}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#bills/vote-list}}
      template block text
    {{/bills/vote-list}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
