import Ember from 'ember';
import layout from '../templates/components/power-datepicker';
import moment from 'moment';
import { fallbackAction } from '../utils/computed-properties';

export default Ember.Component.extend({
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
  },

  // Helpers
  formatDate(selected, format) {
    if (selected) {
      return moment(selected).format(format);
    }
  }
});
