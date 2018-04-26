import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: {
    title: 'Edit Page'
  },
  model({ id }) {
    return this.store.findRecord('page', id);
  }
});
