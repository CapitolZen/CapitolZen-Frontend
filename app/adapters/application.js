import Ember from 'ember';
import DRFAdapter from './drf';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';

export default DRFAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  pathForType: function (type) {
    const underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  }
});
