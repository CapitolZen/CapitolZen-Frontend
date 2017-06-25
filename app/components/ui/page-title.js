import Ember from 'ember';

const {inject: {service}, computed } = Ember;

export default Ember.Component.extend({
  pageMeta: service(),
  availableProps: ['title', 'editable', 'isEditing'],
  propertyHash: {},

  /**
   * @private
   */
  __titleDisplay: computed.readOnly('title', 'propertyHash.title', function() {
    return this.get('title') || this.get('propertyHash.title') || false;
  }),

  /**
   * @private
   */
  __editable: computed.readOnly('editable', 'propertyHash.editable', function() {
    return this.get('editable') || this.get('propertyHas.editable') | false;
  })
});
