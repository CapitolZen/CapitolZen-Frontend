import Session from 'ember-simple-auth/services/session';
export default Session.extend({
  invalidate() {
    this._super(...arguments);
    this.set('data.currentOrganizationId', false);
    this.set('data.currentPageId', false);
  }
});
