import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    return this._super(...arguments);
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let actual_payload = payload;

    payload = [];

    for (let result of actual_payload['results']) {
      payload = payload.concat(result['activities']);
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
