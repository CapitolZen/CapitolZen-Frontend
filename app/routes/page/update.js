import Route from '@ember/routing/route';

export default Route.extend({
  model({ update }) {
    return this.store
      .query('update', { id: update, pageable: true })
      .then(data => {
        return data.get('firstObject');
      });
  }
});
