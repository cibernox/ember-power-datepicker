import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class extends Controller {
  twoDaysAgo = moment().add(-2, 'days');

  twoWeeksFromNow = moment().add(2, 'weeks');

  @tracked selected;

  log() {
    // console.debug(...arguments);
    // return false;
  }

  @action
  updateSelectedValue({ date }) {
    this.selected = date;
  }
}
