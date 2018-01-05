export function initialize(application) {
  application.inject('controller', 'features', 'service:features');
  application.inject('component', 'features', 'service:features');
  application.inject('route', 'features', 'service:features');
  application.inject('view', 'features', 'service:features');
}

export default {
  initialize
};
