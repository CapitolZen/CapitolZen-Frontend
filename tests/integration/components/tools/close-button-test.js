import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "tools/close-button",
  "Integration | Component | tools/close button",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tools/close-button}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#tools/close-button}}
      template block text
    {{/tools/close-button}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
