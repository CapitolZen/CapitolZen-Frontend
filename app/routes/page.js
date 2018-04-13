import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  session: service(),

  beforeModel(transition) {
    let { params } = transition;

    let allowedRoutes = [
      'page.updates',
      'page.update',
      'page.bills',
      'page.bill'
    ];
    let id;
    allowedRoutes.forEach(r => {
      console.log(r);
      if (params.hasOwnProperty(r)) {
        id = params[r].id;
      }
    });

    set(this, 'session.data.currentPageId', id);
  },
  actions: {
    error(err, { params }) {
      let id;
      if (params.hasOwnProperty('page.updates')) {
        id = params['page.updates'];
      }

      if (params.hasOwnProperty('page.update')) {
        id = params['page.update'];
      }

      this.replaceWith('anon.page-access', id);
    }
  }
});
