import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<BasicDropdown\n  @disabled={{@disabled}}\n  @onOpen={{@onOpen}}\n  @onClose={{@onClose}}\n  @destination={{@destination}}\n  @initiallyOpened={{@initiallyOpened}}\n  @horizontalPosition={{@horizontalPosition}}\n  @calculatePosition={{@calculatePosition}}\n  @verticalPosition={{@verticalPosition}}\n  @renderInPlace={{@renderInPlace}}\n  @matchTriggerWidth={{@matchTriggerWidth}}\n  ...attributes\n  as |dd|\n>\n  <PowerCalendar\n    @center={{this.center}}\n    @locale={{@locale}}\n    @onCenterChange={{this.onCenterChange}}\n    @onSelect={{this.handleSelect}}\n    @selected={{@selected}}\n    as |cal|\n  >\n    {{#let\n      (hash\n        uniqueId=dd.uniqueId\n        calendarUniqueId=cal.uniqueId\n        isOpen=dd.isOpen\n        disabled=dd.disabled\n        selected=cal.selected\n        loading=cal.loading\n        center=cal.center\n        locale=cal.locale\n        actions=(assign dd.actions cal.actions)\n      )\n      as |datepicker|\n    }}\n      {{yield\n        (assign\n          datepicker\n          (hash\n            Trigger=(component\n              (ensure-safe-component dd.Trigger)\n              dropdown=datepicker\n              defaultClass=\"ember-power-datepicker-trigger\"\n            )\n            Content=(component\n              (ensure-safe-component dd.Content)\n              dropdown=datepicker\n              defaultClass=\"ember-power-datepicker-content\"\n            )\n            Nav=(component (ensure-safe-component cal.Nav) calendar=datepicker)\n            Days=(component\n              (ensure-safe-component cal.Days) calendar=datepicker\n            )\n          )\n        )\n      }}\n    {{/let}}\n  </PowerCalendar>\n</BasicDropdown>");

class PowerDatepickerComponent extends Component {
  static {
    g(this.prototype, "center", [tracked]);
  }
  #center = (i(this, "center"), undefined);
  get closeOnSelect() {
    return this.args.closeOnSelect !== undefined ? this.args.closeOnSelect : true;
  }
  async onCenterChange(newCenter, calendar, event) {
    if (this.args.onCenterChange) {
      await this.args.onCenterChange(newCenter, calendar, event);
    }
    this.center = newCenter.date;
  }
  static {
    n(this.prototype, "onCenterChange", [action]);
  }
  handleSelect(day, datepicker, e) {
    const value = this.args.onSelect && this.args.onSelect(day, datepicker, e);
    if (value === false || !this.closeOnSelect) {
      return;
    }
    datepicker.actions.close();
  }
  static {
    n(this.prototype, "handleSelect", [action]);
  }
}
setComponentTemplate(TEMPLATE, PowerDatepickerComponent);

export { PowerDatepickerComponent as default };
//# sourceMappingURL=power-datepicker.js.map
