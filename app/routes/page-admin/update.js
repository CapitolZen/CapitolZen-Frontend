import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: {
    title: 'Edit Update'
  },
  model({ update }) {
    return this.store.findRecord('update', update);
  }
});
