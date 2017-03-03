/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-power-datepicker',

  contentFor(type, config) {
    let emberBasicDropdown = this.addons.find((a) => a.name === 'ember-basic-dropdown');
    return emberBasicDropdown.contentFor(type, config);
  }
};
