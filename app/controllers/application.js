import Ember from 'ember';

const {
  Controller,
  inject: {
    service
  },
  get
} = Ember;

export default Controller.extend({
  session: service(),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
  }

});
