import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HelpersTestingController extends Controller {
  @tracked selected1 = null;

  @action
  updateSelectedValue({ date }) {
    this.selected1 = date;
  }
}
