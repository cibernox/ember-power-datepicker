import Controller from '@ember/controller';
// eslint-disable-next-line ember/no-test-support-import
import {} from 'ember-power-calendar/test-support';

import { action, set } from '@ember/object';

export default class IndexController extends Controller {
  selected = null;

  @action
  updateSelectedValue({ date }) {
    set(this, 'selected', date);
  }
}
