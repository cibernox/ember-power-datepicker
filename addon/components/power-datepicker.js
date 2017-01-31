import Ember from 'ember';
import layout from '../templates/components/power-datepicker';
import service from 'ember-service/inject';
import moment from 'moment';
import computed from 'ember-computed';

function fallbackAction(fallback) {
  return computed({
    get() {
      return fallback.bind(this);
    },
    set(_, v) {
      return v === undefined ? fallback.bind(this) : v;
    }
  });
}

export default Ember.Component.extend({
  layout,
  moment: service(),
  format: 'YYYY/MM/DD',
  onCenterChange: fallbackAction(function(day){
    this.set('center', day.date);
  }),

  // // Actions
  // actions: {
  //   handleInput(dropdown, calendar, e) {
  //     let format =  this.get('format');
  //     let maybeDate = e.target.value;
  //     if (format.length > maybeDate.length) {
  //       return;
  //     }
  //     let parsedMoment = this.get('moment').moment(maybeDate, format);
  //     if (parsedMoment.isValid()) {
  //       calendar.actions.select({ moment: parsedMoment, date: parsedMoment.toDate() });
  //     }
  //   }
  // },

  // Helpers
  formatDate(selected, format) {
    if (selected) {
      return moment(selected).format(format);
    }
  }
});
