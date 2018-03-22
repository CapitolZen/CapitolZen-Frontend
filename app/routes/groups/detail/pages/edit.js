import Route from '@ember/routing/route';

export default Route.extend({
  model({ page }) {
    return this.store.findRecord('page', page);
  }
});
