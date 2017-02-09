import Ember from 'ember';
import layout from '../templates/components/power-datepicker';
import moment from 'moment';
import { fallbackAction } from '../utils/computed-properties';

export default Ember.Component.extend({
  layout,
  tagName: '',
  format: 'YYYY/MM/DD',
  onCenterChange: fallbackAction(function(day){
    this.set('center', day.date);
  }),

  // Helpers
  formatDate(selected, format) {
    if (selected) {
      return moment(selected).format(format);
    }
  }
});
