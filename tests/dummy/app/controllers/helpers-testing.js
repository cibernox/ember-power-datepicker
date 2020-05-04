import Controller from '@ember/controller';

import { action } from '@ember/object';

export default class HelpersTestingController extends Controller {
  selected1 = null;

  @action
  updateSelectedValue({ date }) {
    this.set('selected1', date);
  }
}
