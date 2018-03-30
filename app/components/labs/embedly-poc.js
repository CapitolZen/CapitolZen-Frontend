import Component from '@ember/component';

export default Component.extend({
  rawUrl: '',

  actions: {
    generate() {
      let a = document.getElementById('#myCard');
      embedly('card', a);
    }
  }
});
