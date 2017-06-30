import Ember from 'ember';

const {
  set,
  inject: {
    service
  }
} = Ember;

/**
 *
 * @param property
 * @param tokens
 */
function updatePageProperty(property, tokens) {

  let value = "";

  if (Array.isArray(tokens)) {
    value = tokens.join(" ");
  } else if (typeof tokens === "string") {
    value = tokens;
  }

  if (property === "title") {
    set(this, 'uiGlobal.pageTitleRaw', value);
  } else if(property === "description") {
    set(this, 'uiGlobal.pageDescriptionRaw', value);
  }

}

/**
 *
 */
function clearPageProps() {
  set(this, 'uiGlobal.pageDescriptionRaw', null);
  set(this, 'uiGlobal.pageTitleRaw', null);
}

/**
 *
 */
export default Ember.Helper.extend({
  uiGlobal: service('ui-global'),

  compute(params, hash) {
    if (!Array.isArray(params)) {
      return null;
    }

    const property = hash.property;

    Ember.run.scheduleOnce('afterRender', this, updatePageProperty, property, params);

    return null;
  },

  destroy() {
    Ember.run.scheduleOnce('afterRender', this, clearPageProps);
  }

});
