import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent(
  "organization/org-invites",
  "Integration | Component | organization/org invites",
  {
    integration: true
  }
);

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{organization/org-invites}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#organization/org-invites}}
      template block text
    {{/organization/org-invites}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
