import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    this.set('token', params.token);
  },
  setupController(controller) {
    this._super(...arguments);
    controller.set('token', this.get('token'));
  }
});
