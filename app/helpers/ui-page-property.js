import Ember from 'ember';

const { set, inject: { service }, Helper, run } = Ember;

/**
 *
 * @param property
 * @param tokens
 */
function updatePageProperty(property, tokens) {
  let value = '';

  if (Array.isArray(tokens)) {
    value = tokens.join(' ');
  } else if (typeof tokens === 'string') {
    value = tokens;
  }

  if (property === 'title') {
    set(this, 'uiGlobal.pageTitle', value);
    set(this, 'headData.title', `${value} | Capitol Zen`);
  } else if (property === 'description') {
    set(this, 'uiGlobal.pageDescription', value);
  }
}

/**
 *
 */
function clearPageProps() {
  set(this, 'uiGlobal.pageDescription', null);
  set(this, 'uiGlobal.pageTitle', null);
}

/**
 *
 */
export default Helper.extend({
  uiGlobal: service('ui-global'),
  headData: service(),
  compute(params, hash) {
    if (!Array.isArray(params)) {
      return null;
    }

    const property = hash.property;

    run.scheduleOnce('afterRender', this, updatePageProperty, property, params);

    return null;
  },

  destroy() {
    Ember.run.scheduleOnce('afterRender', this, clearPageProps);
  }
});
