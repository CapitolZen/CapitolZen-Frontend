import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { A } from '@ember/array';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model() {
    const parent_params = this.paramsFor('groups.detail');
    return RSVP.hash({
      group: this.store.findRecord('group', parent_params.id),
      organization: get(this, 'currentUser.organization'),
      latest: this.store.query('wrapper', {
        group: parent_params.id,
        sort: '-bill__updated_at',
        page_size: 5
      })
    });
  }
});
