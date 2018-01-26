module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  overrides: [
    // node files
    {
      files: ['testem.js', 'ember-cli-build.js', 'config/**/*.js'],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    },
    // test files
    {
      files: ['tests/**/*.js'],
      excludedFiles: ['tests/dummy/**/*.js'],
      env: {
        embertest: true
      }
    }
  ],
  extends: ['prettier'],
  env: {
    browser: true
  },
  rules: {},
  globals: {
    Promise: true,
    document: true,
    Raven: true
  }
};
