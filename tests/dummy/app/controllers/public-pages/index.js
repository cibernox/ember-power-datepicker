import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default class extends Controller {
  @computed(function() {
    return moment().add(-2, 'days');
  }) twoDaysAgo

  @computed(function() {
    return moment().add(2, 'weeks');
  }) twoWeeksFromNow

  log() {
    // console.debug(...arguments);
    // return false;
  }
}
