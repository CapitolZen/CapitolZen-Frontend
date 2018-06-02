import Component from '@ember/component';

export default Component.extend({
  classNames: [
    'card-editor',
    'bg-lighter',
    'p-3',
    'w-100',
    'm-auto',
    'rounded'
  ],
  link: null,
  comment: null,
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get('payload')) {
      this.set('link', this.get('payload.link'));
      this.set('comment', this.get('payload.comment'));
    }
  },
  actions: {
    save() {
      this.saveCard(this.getProperties('link', 'comment'));
      this.cancelCard();
    }
  }
});
