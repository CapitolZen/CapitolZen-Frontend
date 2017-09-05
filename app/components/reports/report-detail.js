import Component from '@ember/component';
import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  router: service('-routing'),
  flashMessages: service(),
  actions: {
    submit() {
      let report = get(this, 'model');
      let groupId = get(report, 'group').get('id');
      get(this, 'store')
        .findRecord('report', report.get('id'), { backgroundReload: false })
        .then(r => {
          r.destroyRecord();
          set(this, 'model', false);
          get(this, 'flashMessages').danger('Report deleted forever');
          get(this, 'router').transitionTo('reports');
        });
    }
  }
});
