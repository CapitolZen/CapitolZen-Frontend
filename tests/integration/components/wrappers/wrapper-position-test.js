import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "wrappers/wrapper-position",
  "Integration | Component | wrappers/wrapper position",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{wrappers/wrapper-position}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#wrappers/wrapper-position}}
      template block text
    {{/wrappers/wrapper-position}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
