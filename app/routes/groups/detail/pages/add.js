import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  currentUser: service(),
  model() {
    let parent_params = this.paramsFor('groups.detail');
    let group = this.store.peekRecord('group', parent_params.id);
    let page = this.store.createRecord('page', {
      group: group,
      organization: this.get('currentUser.organization')
    });

    return hash({
      page,
      group
    });
  }
});
