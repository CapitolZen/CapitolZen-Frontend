import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "tools/favorite-item",
  "Integration | Component | tools/favorite item",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tools/favorite-item}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#tools/favorite-item}}
      template block text
    {{/tools/favorite-item}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
