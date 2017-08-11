import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "user/claim-invite",
  "Integration | Component | user/claim invite",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user/claim-invite}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#user/claim-invite}}
      template block text
    {{/user/claim-invite}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
