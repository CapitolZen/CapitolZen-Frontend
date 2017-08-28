import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(...arguments);
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload = payload['results'];
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
