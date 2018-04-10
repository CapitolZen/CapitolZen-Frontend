import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  session: service(),

  beforeModel(transition) {
    console.log(transition);
    let { params } = transition;
    let { id } = params['page.updates'];
    set(this, 'session.data.currentPageId', id);
  },
  actions: {
    error(err, { params }) {
      this.replaceWith('anon.page-access', params['page.updates'].id);
    }
  }
});
