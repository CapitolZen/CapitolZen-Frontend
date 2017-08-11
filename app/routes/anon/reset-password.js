import Ember from "ember";
const { inject: { service }, get, Route } = Ember;

export default Route.extend({
  model({ hash }) {
    return { hash: hash };
  },
  setupController(controller, model) {
    this._super(...arguments);
    controller.set("token", model);
  }
});
