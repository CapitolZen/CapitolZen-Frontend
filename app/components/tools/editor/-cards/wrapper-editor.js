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
  wrapper: null,
  comment: null,
  didReceiveAttrs() {
    this._super(...arguments);
    console.log(this);
    if (this.get('payload')) {
      this.set('link', this.get('payload.wrapper'));
      this.set('comment', this.get('payload.comment'));
    }
  },
  actions: {
    save() {
      this.saveCard(this.getProperties('wrapper', 'comment'));
      this.cancelCard();
    }
  }
});
