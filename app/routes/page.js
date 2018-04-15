import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { on } from '@ember/object/evented';

export default Route.extend({
  session: service(),

  beforeModel(transition) {
    let { params } = transition;
    let id = this.getIdFromChild(params);
    set(this, 'session.data.currentPageId', id);
  },
  getIdFromChild(params) {
    let allowedRoutes = [
      'page.updates',
      'page.update',
      'page.bills',
      'page.bill'
    ];
    let id;
    allowedRoutes.forEach(r => {
      if (params.hasOwnProperty(r)) {
        id = params[r].id;
      }
    });
    return id;
  },
  unsetCurrentPage: on('deactivate', function() {
    set(this, 'session.data.currentPageId', false);
  }),
  actions: {
    error(err, { params }) {
      let id = this.getIdFromChild(params);
      this.replaceWith('anon.page-access', id);
    }
  }
});
