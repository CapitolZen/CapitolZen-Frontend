import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  breadCrumb: {
    title: 'Add Page'
  },
  currentUser: service(),
  model({ group }) {
    let page = this.store.createRecord('page', {
      organization: this.get('currentUser.organization'),
      author: this.get('currentUser.user')
    });

    if (group) {
      let groupModel = this.store.peekRecord('group', group);
      page.set('group', groupModel);
    }
    return page;
  }
});
