import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';
export default Controller.extend({
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
