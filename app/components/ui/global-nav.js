import Ember from 'ember';

const {inject: { service }, computed} = Ember;
export default Ember.Component.extend({
  session: service(),
  isAuthenticated: computed('session.isAuthenticated', function() {
    return this.get('session.isAuthenticated');
  })

});
