import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['group', 'type'],
  group: null,
  type: null
});
