import Controller from '@ember/controller';

import { action, set } from '@ember/object';

export default class HelpersTestingController extends Controller {
  selected1 = null;

  @action
  updateSelectedValue({ date }) {
    set(this, 'selected1', date);
  }
}
