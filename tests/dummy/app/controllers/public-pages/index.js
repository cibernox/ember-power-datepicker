import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';

export default class extends Controller {
  twoDaysAgo = moment().add(-2, 'days');

  twoWeeksFromNow = moment.add(2, 'weeks');

  log() {
    // console.debug(...arguments);
    // return false;
  }

  @action
  updateSelectedValue({ date }) {
    this.set('selected', date);
  }
}
