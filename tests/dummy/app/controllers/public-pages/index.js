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
  actions: {
    log() {
      // console.debug(...arguments);
      // return false;
    }
  }
});
