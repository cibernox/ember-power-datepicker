import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked center;

  get closeOnSelect() {
    return this.args.closeOnSelect !== undefined
      ? this.args.closeOnSelect
      : true;
  }

  @action
  onCenterChange(day) {
    if (this.args.onCenterChange) {
      this.args.onCenterChange(day);
    }

    this.center = day.date;
  }

  @action
  handleSelect(day, datepicker, e) {
    let value = this.args.onSelect(day, datepicker, e);
    if (value === false || !this.closeOnSelect) {
      return;
    }
    datepicker.actions.close();
  }
}
