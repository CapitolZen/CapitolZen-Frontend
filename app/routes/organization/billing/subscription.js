import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  currentUser: service(),
  model() {
    return RSVP.hash({
      organization: this.get('currentUser.organization'),
      billing: this.get('currentUser.organization')
        .billing()
        .then(data => {
          if (data) {
            return data['data'];
          }
          return false;
        })
    });
  }
});
