import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { datepickerSelect } from 'ember-power-datepicker/test-support';

module('Acceptance | helpers | datepickerSelect', function(hooks) {
  setupApplicationTest(hooks);

  test('`datepickerSelect` selects the given date', async function(assert) {
    await visit('/helpers-testing');

    await datepickerSelect('.datepicker-select-1', new Date(2013, 8, 3));
    assert.dom('.ember-power-calendar-nav-title').hasText('September 2013', 'The nav component has updated');
    assert.dom('[data-date="2013-09-01"]').exists({ count: 1 }, 'The days component has updated');
    assert.dom('[data-date="2013-09-03"]').hasClass('ember-power-calendar-day--selected', 'The 3rd of september is selected');
    assert.dom('.datepicker-select-1 input').hasValue(/Sep 03 2013/, 'The input has updated');
  });
});
