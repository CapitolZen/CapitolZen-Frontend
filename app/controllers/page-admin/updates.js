import Controller from '@ember/controller';

export default Controller.extend({
  addedUpdate: false,
  actions: {
    didAddUpdate(update) {
      this.set('addedUpdate', update);
    }
  }
});
