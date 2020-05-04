import Controller from '@ember/controller';

import { action } from '@ember/object';

export default class IndexController extends Controller {
  selected = null;

  @action
  updateSelectedValue({ date }) {
    this.set('selected', date);
  }
}
