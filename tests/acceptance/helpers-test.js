import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | helpers | datepickerSelect');

test('`datepickerSelect` selects the given date', function(assert) {
  visit('/helpers-testing');

  andThen(function() {
    datepickerSelect('.datepicker-select-1', new Date(2013, 8, 3));
  });

  andThen(function() {
    assert.equal(find('.ember-power-calendar-nav-title').text().trim(), 'September 2013', 'The nav component has updated');
    assert.equal(find('[data-date=2013-09-01]').length, 1, 'The days component has updated');
    assert.ok(find('[data-date=2013-09-03]').hasClass('ember-power-calendar-day--selected'), 'The 3rd of september is selected');
    assert.equal(find('.datepicker-select-1 input').val(), '2013/09/03', 'The input has updated');
  });
});
