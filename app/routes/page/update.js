import Route from '@ember/routing/route';

export default Route.extend({
  model({ update }) {
    return this.store.findRecord('update', update);
  }
});
