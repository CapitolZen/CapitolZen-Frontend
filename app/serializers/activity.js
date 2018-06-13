import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    payload = payload['results'];
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
