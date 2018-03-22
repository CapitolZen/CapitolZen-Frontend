import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const parent_params = this.paramsFor('groups.detail');
    return this.store.query('page', { group: parent_params.id }).then(data => {
      return data.get('firstObject');
    });
  },
  afterModel(model = false) {
    if (!model) {
      this.transitionTo('groups.detail.pages.add');
    }
  }
});
