export function initialize(application) {
  application.inject('controller', 'media', 'service:media');
  application.inject('component', 'media', 'service:media');
}

export default {
  initialize
};
