import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    this.set('token', params.token);
  },
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('token', this.get('token'));
  }
});
