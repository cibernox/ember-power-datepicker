import Controller from '@ember/controller';

import { action, set } from '@ember/object';

export default class IndexController extends Controller {
  selected = null;

  @action
  updateSelectedValue({ date }) {
    set(this, 'selected', date);
  }
}
