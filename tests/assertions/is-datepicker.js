export default function isDatepicker(context, datepicker, message) {
  let result = !!datepicker
    && Object.prototype.hasOwnProperty.call(datepicker, 'center')
    && typeof datepicker.loading === 'boolean'
    && Object.prototype.hasOwnProperty.call(datepicker, 'locale')
    && Object.prototype.hasOwnProperty.call(datepicker, 'selected')
    && Object.prototype.hasOwnProperty.call(datepicker, 'uniqueId')
    && Object.prototype.hasOwnProperty.call(datepicker, 'calendarUniqueId')
    && Object.prototype.hasOwnProperty.call(datepicker, 'actions')
    && !Object.prototype.hasOwnProperty.call(datepicker, 'helpers')
    && !Object.prototype.hasOwnProperty.call(datepicker, 'trigger')
    && !Object.prototype.hasOwnProperty.call(datepicker, 'content')
    && !Object.prototype.hasOwnProperty.call(datepicker, 'nav')
    && !Object.prototype.hasOwnProperty.call(datepicker, 'content');

  this.pushResult({
    result,
    actual: result,
    expected: true,
    message
  });
}
