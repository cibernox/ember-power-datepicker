import Component from '@ember/component';
import { layout, tagName } from '@ember-decorators/component';
import { action } from '@ember/object';
import templateLayout from '../templates/components/power-datepicker';
import { fallbackAction } from '../utils/computed-properties';

export default @layout(templateLayout) @tagName('') class extends Component {
  closeOnSelect = true
  format = 'YYYY/MM/DD'
  @fallbackAction(function(day){
    this.set('center', day.date);
  }) onCenterChange

  // Actions
  @action
  handleSelect(day, datepicker, e) {
    let { onSelect, closeOnSelect } = this.getProperties('onSelect', 'closeOnSelect');
    let value = onSelect(day, datepicker, e);
    if (value === false || !closeOnSelect) {
      return;
    }
    datepicker.actions.close();
  }
}
