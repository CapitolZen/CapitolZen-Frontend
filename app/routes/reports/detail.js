import Route from '@ember/routing/route';
export default Route.extend({
  model({ report }) {
    return this.store.findRecord('report', report);
  }
});
