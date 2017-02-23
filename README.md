# ember-power-datepicker

This addon it's the last member of the [Ember Power Project](http://www.ember-power-select.com/support-the-project) family and it
combines [ember-basic-dropdown](http://www.ember-basic-dropdown.com) and [ember-power-calendar](http://www.ember-power-calendar.com) 
into a single datepicker component that exposes the public APIs of both components as one.

As the components this one is born from, it aims to be flexible and customizable so you can
taylor your perfect datepicker. For that it extrictly follows DDAU approach and all its
subcomponents can be omitted or replaced by your own.

## Disclaimer

This addon is in active development so expect some churn.
A changelog file will be maintained to surface what changed and when and ease updates.

[Small demo](https://ember-datepicker.development.pagefrontapp.com/)

## Installation

* `ember install ember-power-datepicker`

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
  {{#power-datepicker selected=selected onSelect=(action (mut selected) value="date") as |dp|}}
    {{#dp.trigger tabindex="-1"}}
      <input type="text" class="form-control" readonly value={{moment-format selected}}>
    {{/dp.trigger}}

    {{#dp.content class="dropdown-menu demo-datepicker-small"}}
      {{dp.nav}}
      {{dp.days}}
    {{/dp.content}}
  {{/power-datepicker}}
```

The `{{dp.trigger}}` and `{{dp.content}}` come from [ember-basic-dropdown](www.ember-basic-dropdown.com). 
You can learn more about them here: https://www.ember-basic-dropdown.com/docs/how-to-use-it

The `{{dp.nav}}` and `dp.days` components along with the `selected` and `onSelect` properties 
come from [ember-power-calendar](www.ember-power-calendar.com).
You can learm more about them it here: http://www.ember-power-calendar.com/docs/action-handling

The `selected` and `onSelect` are the only mandatory options. You can omit them, but if
you do and you don't allow users to select a date, what do you want a datepicker for?

## Ember and Browser support

This addon is only tested back to Ember 2.8. It may or may not work in older versions.
Javascript wise the addon should work back to IE10, but CSS wise the default styles use
flexbox, so expect only IE11 support unless you roll out your own template using `<table>`,
which you can.

## Testing

In testing it requires phantomjs 2.0+. This addon also provides a convenient 
`datepickerSelect('selector', dateOrMoment)` test helper to interact with the component in 
acceptance tests.

To import this helpers, import and invoke the function in your `/tests/helpers/start-app.js`

```js
import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import registerPowerDatepickerHelpers from '../../tests/helpers/ember-power-datepicker';

registerPowerDatepickerHelpers();

export default function startApp(attrs) {
  //...
}
```

## Contributing

Contributions are welcomes. However if your contribution involves adding a new feature, 
please open an issue before to share your idea and agree the details of the feature before starting implementing it.
