import Ember from 'ember';
import moment from 'moment';
const { computed } = Ember;
export default Ember.Controller.extend({
  moment: Ember.inject.service(),
  twoDaysAgo: computed(function() {
    return moment().add(-2, 'days');
  }),
  twoWeeksFromNow: computed(function() {
    return moment().add(2, 'weeks');
  }),
  init() {
    this._super();

    // loading a particular locale seems to set it as default across the app, so
    // overriding english as default.
    this.get('moment').setLocale('en');
  },
  actions: {
    log() {
      // console.debug(...arguments);
      // return false;
    }
  }
});
