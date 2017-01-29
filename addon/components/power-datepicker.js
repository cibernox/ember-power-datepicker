import Ember from 'ember';
import layout from '../templates/components/power-datepicker';
import service from 'ember-service/inject';

export default Ember.Component.extend({
  layout,
  moment: service(),
  format: 'YYYY/MM/DD',

  // Actions
  actions: {
    handleInput(dropdown, calendar, e) {
      let format =  this.get('format');
      let maybeDate = e.target.value;
      if (format.length > maybeDate.length) {
        return;
      }
      let parsedMoment = this.get('moment').moment(maybeDate, format);
      if (parsedMoment.isValid()) {
        calendar.actions.select({ moment: parsedMoment, date: parsedMoment.toDate() });
      }
    },

    handleSelect(dropdown, day, e) {
      this.get('onSelect')(day, dropdown, e);
      dropdown.actions.close();
    }
  },

  // Helpers
  formatDate(selected, format) {
    if (selected) {
      return moment(selected).format(format);
    }
  }
});
