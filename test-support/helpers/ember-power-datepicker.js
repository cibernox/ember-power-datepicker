import { registerAsyncHelper } from '@ember/test';
import { assert } from '@ember/debug';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import { calendarSelect } from 'ember-power-calendar/test-support';

export default function() {
  registerAsyncHelper('datepickerSelect', async function(app, selector, selected) {
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

    await clickTrigger(selector);
    await calendarSelect('.ember-power-datepicker-content', selected);
  });
}
