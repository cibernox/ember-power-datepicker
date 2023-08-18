/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  contentFor(type, config) {
    let emberBasicDropdown = this.addons.find(
      (a) => a.name === 'ember-basic-dropdown',
    );
    return emberBasicDropdown.contentFor(type, config);
  },
};
