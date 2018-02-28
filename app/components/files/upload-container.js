import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  actions: {
    selectFile(model) {
      get(this, 'flashMessages').success('File Created');
      get(this, 'router').transitionTo('files.detail', model.get('id'));
    }
  }
});
