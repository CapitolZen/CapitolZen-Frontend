import { moduleFor, test } from "ember-qunit";

moduleFor(
  "route:organization/billing",
  "Unit | Route | organization/billing",
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  }
);

test("it exists", function(assert) {
  let route = this.subject();
  assert.ok(route);
});
