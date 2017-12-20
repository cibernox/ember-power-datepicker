import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getOwner from 'ember-owner/get';
import run from 'ember-runloop';
import $ from 'jquery';
import { clickTrigger } from 'ember-basic-dropdown/test-support/helpers';
import { assertionInjector, assertionCleanup } from '../../assertions';

moduleForComponent('power-datepicker', 'Integration | Component | power-datepicker', {
  integration: true,
  beforeEach() {
    assertionInjector(this);
    let calendarService = getOwner(this).lookup('service:power-calendar');
    calendarService.set('date', new Date(2013, 9, 18));
  },

  afterEach() {
    assertionCleanup(this);
  }
});

test('Can be open and closed clicking on the trigger', function(assert) {
  assert.expect(5);
  this.render(hbs`
    {{#power-datepicker selected=selected onSelect=(action (mut selected) value="date") as |dp|}}
      {{#dp.trigger}}Click me{{/dp.trigger}}
      {{#dp.content}}
        {{dp.nav}}
        {{dp.days}}
      {{/dp.content}}
    {{/power-datepicker}}
  `);

  assert.equal($('.ember-basic-dropdown-content').length, 0, 'The datepicker is closed');
  clickTrigger();
  assert.equal($('.ember-basic-dropdown-content').length, 1, 'The datepicker is open');
  assert.equal($('.ember-basic-dropdown-content .ember-power-calendar-nav').length, 1, 'It contains the nav');
  assert.equal($('.ember-basic-dropdown-content .ember-power-calendar-days').length, 1, 'It contains the days');
  clickTrigger();
  assert.equal($('.ember-basic-dropdown-content').length, 0, 'The datepicker is closed again');
});

test('Clicking on a day invokes the `onSelect` action', function(assert) {
  assert.expect(3);
  this.onSelect = (day, datepicker, e) => {
    assert.isDay(day, 'The first argument is a day');
    assert.isDatepicker(datepicker, 'The second argument is the calendar\'s public API');
    assert.ok(e instanceof Event, 'The third argument is an event');
  }
  this.render(hbs`
    {{#power-datepicker selected=selected onSelect=onSelect as |dp|}}
      {{#dp.trigger}}Click me{{/dp.trigger}}
      {{#dp.content}}
        {{dp.nav}}
        {{dp.days}}
      {{/dp.content}}
    {{/power-datepicker}}
  `);

  clickTrigger();
  run(() => $('.ember-power-calendar-day--current-month:contains(15)')[0].click());
});

test('Clicking on a day invokes selects it and closes the datepicker', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#power-datepicker selected=selected onSelect=(action (mut selected) value="date") as |dp|}}
      {{#dp.trigger}}{{compute dp.helpers.format-date}}{{/dp.trigger}}
      {{#dp.content}}
        {{dp.nav}}
        {{dp.days}}
      {{/dp.content}}
    {{/power-datepicker}}
  `);

  clickTrigger();
  assert.equal($('.ember-basic-dropdown-content').length, 1, 'The datepicker is open');
  run(() => $('.ember-power-calendar-day--current-month:contains(15)')[0].click());
  assert.equal($('.ember-basic-dropdown-content').length, 0, 'The datepicker is closed again');
  assert.equal(this.$('.ember-power-datepicker-trigger').text().trim(), '2013/10/15');
});

test('When passed `closeOnSelect=false` selecting a date doesn\'t close the datepicker', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#power-datepicker closeOnSelect=false selected=selected onSelect=(action (mut selected) value="date") as |dp|}}
      {{#dp.trigger}}{{compute dp.helpers.format-date}}{{/dp.trigger}}
      {{#dp.content}}
        {{dp.nav}}
        {{dp.days}}
      {{/dp.content}}
    {{/power-datepicker}}
  `);

  clickTrigger();
  assert.equal($('.ember-basic-dropdown-content').length, 1, 'The datepicker is open');
  run(() => $('.ember-power-calendar-day--current-month:contains(15)')[0].click());
  assert.equal($('.ember-basic-dropdown-content').length, 1, 'The datepicker is still opened');
  assert.equal(this.$('.ember-power-datepicker-trigger').text().trim(), '2013/10/15');
});
