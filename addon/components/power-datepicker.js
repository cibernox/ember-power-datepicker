import Component from '@ember/component';
import layout from '../templates/components/power-datepicker';
import { fallbackAction } from '../utils/computed-properties';

export default Component.extend({
  layout,
  closeOnSelect: true,
  tagName: '',
  format: 'YYYY/MM/DD',
  onCenterChange: fallbackAction(function(day){
    this.set('center', day.date);
  }),

  // Actions
  actions: {
    onSelect(day, datepicker, e) {
      let { onSelect, closeOnSelect } = this.getProperties('onSelect', 'closeOnSelect');
      let value = onSelect(day, datepicker, e);
      if (value === false || !closeOnSelect) {
        return;
      }
      datepicker.actions.close();
    }
  }
});
