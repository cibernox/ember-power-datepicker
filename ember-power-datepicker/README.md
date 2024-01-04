# Ember Power Datepicker

[![CI](https://github.com/cibernox/ember-power-datepicker/actions/workflows/ci.yml/badge.svg)](https://github.com/cibernox/ember-power-datepicker/actions/workflows/ci.yml)
[![Ember Observer Score](http://emberobserver.com/badges/ember-power-datepicker.svg)](http://emberobserver.com/addons/ember-power-datepicker)
[![npm version](https://badge.fury.io/js/ember-power-datepicker.svg)](https://badge.fury.io/js/ember-power-datepicker)

This addon it's the last member of the [Ember Power Project](http://www.ember-power-select.com/support-the-project) family and it
combines [ember-basic-dropdown](http://www.ember-basic-dropdown.com) and [ember-power-calendar](http://www.ember-power-calendar.com)
into a single datepicker component that exposes the public APIs of both components as one.

As the components this one is born from, it aims to be flexible and customizable so you can
taylor your perfect datepicker. For that it extrictly follows DDAU approach and all its
subcomponents can be omitted or replaced by your own.

## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v18 or above

## Installation

* `ember install ember-basic-dropdown ember-power-calendar ember-power-datepicker`

## Setup

If you are using sass, you can import the styles in your app.scss

```scss
@import "ember-power-datepicker";
```
This component [doesn't has any style of itself](https://github.com/cibernox/ember-power-datepicker/blob/master/app/styles/ember-power-datepicker.scss), so the only thing this import is doing is
in turn importing the styles of **ember-basic-dropdown** and **ember-power-calendar**, so
this is just a convenience.
If you already use and import the styles of those addons yourself, you don't have to
import these.

## Usage

The API of the component will remind you the APIs of its both parents. It leverages
contextual components and most of the options you can pass to the original components
are accepted by this addon.

Let's see a basic example:

```hbs
<PowerDatepicker @selected={{this.selected}} @onSelect={{this.onSelect}} as |dp|>
  <dp.Trigger tabindex="-1">
    <input type="text" class="my-input-class" readonly value={{moment-format selected}}>
  </dp.Trigger>

  <dp.Content class="demo-datepicker-small">
    <dp.Nav />
    <dp.Days />
  </dp.Content>
</PowerDatepicker>
```

The `{{dp.trigger}}` and `{{dp.content}}` come from [ember-basic-dropdown](https://www.ember-basic-dropdown.com).
You can learn more about them here: https://www.ember-basic-dropdown.com/docs/how-to-use-it

The `{{dp.nav}}` and `dp.days` components along with the `selected` and `onSelect` properties
come from [ember-power-calendar](https://www.ember-power-calendar.com).
You can learm more about them it here: http://www.ember-power-calendar.com/docs/action-handling

The `selected` and `onSelect` are the only mandatory options. You can omit them, but if
you do and you don't allow users to select a date, what do you want a datepicker for?