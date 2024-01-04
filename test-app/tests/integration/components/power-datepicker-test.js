import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import { set } from '@ember/object';

module('Integration | Component | power-datepicker', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    let calendarService = this.owner.lookup('service:power-calendar');
    calendarService.set('date', new Date(2013, 9, 18));
  });

  test('Can be open and closed clicking on the trigger', async function (assert) {
    this.updateSelectedValue = ({ date }) => {
      set(this, 'selected', date);
    };
    await render(hbs`
      <PowerDatepicker @selected={{this.selected}} @onSelect={{this.updateSelectedValue}} as |dp|>
        <dp.Trigger>Click me</dp.Trigger>
        <dp.Content>
          <dp.Nav />
          <dp.Days />
        </dp.Content>
      </PowerDatepicker>
    `);

    assert
      .dom('.ember-basic-dropdown-content')
      .doesNotExist('The datepicker is closed');
    await clickTrigger();
    assert
      .dom('.ember-basic-dropdown-content')
      .exists({ count: 1 }, 'The datepicker is open');
    assert
      .dom('.ember-basic-dropdown-content .ember-power-calendar-nav')
      .exists({ count: 1 }, 'It contains the nav');
    assert
      .dom('.ember-basic-dropdown-content .ember-power-calendar-days')
      .exists({ count: 1 }, 'It contains the days');
    await clickTrigger();
    assert
      .dom('.ember-basic-dropdown-content')
      .doesNotExist('The datepicker is closed again');
  });

  test('Clicking on a day invokes the `onSelect` action', async function (assert) {
    this.onSelect = (day, datepicker, e) => {
      assert.isDay(day, 'The first argument is a day');
      assert.isDatepicker(
        datepicker,
        "The second argument is the calendar's public API",
      );
      assert.ok(e instanceof Event, 'The third argument is an event');
    };

    await render(hbs`
      <PowerDatepicker @selected={{this.selected}} @onSelect={{this.onSelect}} as |dp|>
        <dp.Trigger>Click me</dp.Trigger>
        <dp.Content>
          <dp.Nav />
          <dp.Days />
        </dp.Content>
      </PowerDatepicker>
    `);

    await clickTrigger();
    let el = findAll('.ember-power-calendar-day--current-month').find(
      (el) => el.textContent.trim() === '15',
    );
    await click(el);
  });

  test('Clicking on a day invokes selects it and closes the datepicker', async function (assert) {
    this.updateSelectedValue = ({ date }) => {
      set(this, 'selected', date);
    };

    await render(hbs`
      <PowerDatepicker @selected={{this.selected}} @onSelect={{this.updateSelectedValue}} as |dp|>
        <dp.Trigger>{{this.selected}}</dp.Trigger>
        <dp.Content>
          <dp.Nav />
          <dp.Days />
        </dp.Content>
      </PowerDatepicker>
    `);

    await clickTrigger();
    assert
      .dom('.ember-basic-dropdown-content')
      .exists({ count: 1 }, 'The datepicker is open');
    let el = findAll('.ember-power-calendar-day--current-month').find(
      (el) => el.textContent.trim() === '15',
    );
    await click(el);
    assert
      .dom('.ember-basic-dropdown-content')
      .doesNotExist('The datepicker is closed again');
    assert.dom('.ember-power-datepicker-trigger').hasText(/Oct 15 2013/);
  });

  test("When passed `closeOnSelect=false` selecting a date doesn't close the datepicker", async function (assert) {
    this.updateSelectedValue = ({ date }) => {
      set(this, 'selected', date);
    };

    await render(hbs`
      <PowerDatepicker @closeOnSelect={{false}} @selected={{this.selected}} @onSelect={{this.updateSelectedValue}} as |dp|>
        <dp.Trigger>{{this.selected}}</dp.Trigger>
        <dp.Content>
          <dp.Nav />
          <dp.Days />
        </dp.Content>
      </PowerDatepicker>
    `);

    await clickTrigger();
    assert
      .dom('.ember-basic-dropdown-content')
      .exists({ count: 1 }, 'The datepicker is open');
    let el = findAll('.ember-power-calendar-day--current-month').find(
      (el) => el.textContent.trim() === '15',
    );
    await click(el);
    assert
      .dom('.ember-basic-dropdown-content')
      .exists({ count: 1 }, 'The datepicker is still opened');
    assert.dom('.ember-power-datepicker-trigger').hasText(/Oct 15 2013/);
  });

  test('it honors `@matchTriggerWidth`', async function (assert) {
    this.updateSelectedValue = ({ date }) => {
      set(this, 'selected', date);
    };
    await render(hbs`
      <PowerDatepicker @selected={{this.selected}} @onSelect={{this.updateSelectedValue}} @matchTriggerWidth={{true}} as |dp|>
        {{! template-lint-disable no-inline-styles }}
        <dp.Trigger style="float: left;min-width: 600px">
          Click me!
        </dp.Trigger>
        <dp.Content>
          <dp.Nav />
          <dp.Days />
        </dp.Content>
      </PowerDatepicker>
    `);
    await clickTrigger();
    assert.dom('.ember-power-datepicker-content').hasStyle({ width: '300px' }); // 600px / 2 because of the 0.5 zoom of the container
  });
});
