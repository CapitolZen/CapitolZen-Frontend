module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
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
