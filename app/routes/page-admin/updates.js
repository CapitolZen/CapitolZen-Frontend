import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: {
    title: 'Send New Update'
  },
  model({ id }) {
    return this.store.findRecord('page', id);
  }
});
