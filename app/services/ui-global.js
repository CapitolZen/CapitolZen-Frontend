import Ember from 'ember';
const { Service, computed, get } = Ember;

export default Service.extend({
  pageTitleRaw: null,
  pageDescriptionRaw: null,

  pageTitle: computed.alias('pageTitleRaw'),
  pageDescription: computed.alias('pageDescriptionRaw')
});
