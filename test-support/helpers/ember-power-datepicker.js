import Test from 'ember-test';
import { assert } from 'ember-metal/utils';
import registerBasicDropdownHelpers from './ember-basic-dropdown';
import registerPowerCalendarHelpers from './ember-power-calendar';

export default function() {
  registerBasicDropdownHelpers();
  registerPowerCalendarHelpers();

  Test.registerAsyncHelper('datepickerSelect', function(app, selector, selected) {
    assert('`datepickerSelect` expect a Date or MomentJS object as second argument', selected);
    let $selector = find(selector);
    assert('`datepickerSelect` couln\'t find any element with selector: ' + selector, $selector.length);
    let $trigger;
    if ($selector.hasClass('ember-power-datepicker-trigger')) {
      $trigger = $selector;
    } else {
      $trigger = find(`${selector} .ember-power-datepicker-trigger`);
      assert('`datepickerSelect` couln\'t find any datepicker within the selector ' + selector, $trigger.length);
      selector = `${selector} .ember-power-datepicker-trigger`;
    }

    clickDropdown(selector);

    andThen(function() {
      calendarSelect('.ember-power-datepicker-content', selected);
    });
  });
}
