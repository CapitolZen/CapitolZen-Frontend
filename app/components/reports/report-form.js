import Ember from 'ember';
import { task } from 'ember-concurrency';
import moment from 'moment';

const { get, set, inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  router: service('-routing'),
  model: false,
  group: null,
  wrapperList: null,
  useAllWrappers: true,

  init() {
    this._super(...arguments);
    let m = get(this, 'model') || Ember.Object.create();
    set(this, 'model', m);
  },

  getWrappers: task(function*() {
    let wrappers = yield this.get('store').query('wrapper', {
      group: this.get('group')
    });

    this.set('wrapperList', wrappers);
  }),

  actions: {
    createReport(data) {
      let fields = data.getProperties('title', 'description');
      fields.group = get(this, 'group');
      fields.user = get(this, 'currentUser.user');
      fields.organization = get(this, 'currentUser.organization');
      fields.publishDate = moment().unix();
      fields.preferences = { logo: get(data, 'logoChoice') };
      let report = this.get('store').createRecord('report', fields);
      report
        .save()
        .then(() => {
          this.get('flashMessages').success('Report Created');
          this.get('router').transitionTo('reports', this.get('group'));
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePublishDate(date) {}
  }
});
