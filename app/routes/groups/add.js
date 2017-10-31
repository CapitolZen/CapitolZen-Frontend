import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { hash } from 'rsvp';
export default Route.extend({
  currentUser: service(),
  model() {
    return hash({
      organization: get(this, 'currentUser.currentOrganization'),
      group: get(this, 'store').createRecord('group', { active: true })
    });
  }
});
