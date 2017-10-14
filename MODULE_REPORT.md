## Module Report
### Unknown Global

**Global**: `Ember.String`

**Location**: `app/adapters/json-base.js` at line 13

```js
  pathForType: function(type) {
    const underscored = underscore(type);
    return Ember.String.pluralize(underscored);
  },
  host: computed(function() {
```

### Unknown Global

**Global**: `Ember.String`

**Location**: `app/adapters/application.js` at line 13

```js
  pathForType: function(type) {
    const underscored = underscore(type);
    return Ember.String.pluralize(underscored);
  },
  host: computed(function() {
```

### Unknown Global

**Global**: `Ember.testing`

**Location**: `app/authorizers/application.js` at line 9

```js
  authorize(data, block) {
    this._super(data, block);
    if (Ember.testing) {
      block('Authorization', 'asdf');
    }
```
