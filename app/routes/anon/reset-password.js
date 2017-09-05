import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Route from '@ember/routing/route';

export default Route.extend({
  model({ hash }) {
    return { hash: hash };
  },
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('token', model);
  }
});
