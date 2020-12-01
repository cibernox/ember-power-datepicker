import Component from '@ember/component';
import templateLayout from '../templates/components/power-datepicker';

import { layout, tagName } from '@ember-decorators/component';
import { action, set } from '@ember/object';

import { fallbackAction } from '../utils/computed-properties';

export default @layout(templateLayout) @tagName('') class extends Component {
  closeOnSelect = true
  format = 'YYYY/MM/DD'

  @fallbackAction(function(day){
    set(this, 'center', day.date);
  }) onCenterChange

  // Actions
  @action
  handleSelect(day, datepicker, e) {
    let { onSelect, closeOnSelect } = this;
    let value = onSelect(day, datepicker, e);
    if (value === false || !closeOnSelect) {
      return;
    }
    datepicker.actions.close();
  }
}
