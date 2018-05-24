import Component from '@ember/component';

const Embedly = Component.extend({
  rawUrl: '',

  actions: {
    generate() {
      let a = document.getElementById('#myCard');
      embedly('card', a);
    }
  }
});

Embedly.reopenClass({
  positionalParams: ['rawUrl']
});

export default Embedly;
