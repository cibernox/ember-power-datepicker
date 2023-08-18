import { assert } from '@ember/debug';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import { calendarSelect } from 'ember-power-calendar/test-support';
import { find } from '@ember/test-helpers';

export async function datepickerSelect(selector, selected) {
  assert('`datepickerSelect` expect a Date as second argument', selected);
  let el = await find(selector);
  assert(
    "`datepickerSelect` couln't find any element with selector: " + selector,
    el,
  );
  let trigger;
  if (!el.classList.contains('ember-power-datepicker-trigger')) {
    trigger = find(`${selector} .ember-power-datepicker-trigger`);
    assert(
      "`datepickerSelect` couln't find any datepicker within the selector " +
        selector,
      trigger,
    );
    selector = `${selector} .ember-power-datepicker-trigger`;
  }

  await clickTrigger(selector);
  await calendarSelect('.ember-power-datepicker-content', selected);
}
