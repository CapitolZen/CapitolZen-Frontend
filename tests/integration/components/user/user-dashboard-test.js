import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "user/user-dashboard",
  "Integration | Component | user/user dashboard",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user/user-dashboard}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#user/user-dashboard}}
      template block text
    {{/user/user-dashboard}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
