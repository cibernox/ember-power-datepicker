import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import type { CalculatePosition, VerticalPosition, HorizontalPosition } from 'ember-basic-dropdown/utils/calculate-position';
import type { NormalizeCalendarValue } from 'ember-power-calendar/utils';
import type { CalendarDay, PowerCalendarAPI, CalendarAPI, SelectedDays } from 'ember-power-calendar/components/power-calendar';
import type { ComponentLike } from '@glint/template';

interface PowerDatepickerSignature {
  Element: HTMLElement;
  Args: PowerDatepickerArgs;
  Blocks: {
    default: [
      {
        datepicker: any;
        Trigger: ComponentLike<any>;
        Content: ComponentLike<any>;
        Nav: ComponentLike<any>;
        Days: ComponentLike<any>;
      },
    ];
  };
}

interface PowerDatepickerArgs {
  initiallyOpened?: boolean;
  renderInPlace?: boolean;
  verticalPosition?: VerticalPosition;
  horizontalPosition?: HorizontalPosition;
  destination?: string;
  disabled?: boolean;
  matchTriggerWidth?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onOpen?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose?: Function;
  calculatePosition?: CalculatePosition;

  locale?: string;
  selected?: SelectedDays;
  closeOnSelect?: boolean;
  onCenterChange?: (
    newCenter: NormalizeCalendarValue
  ) => void;
  onSelect?: (
    day: CalendarDay,
    calendar: CalendarAPI,
    event: MouseEvent,
  ) => void | boolean;
}

export default class PowerDatepickerComponent extends Component<PowerDatepickerSignature> {
  @tracked center: Date | undefined;

  get closeOnSelect() {
    return this.args.closeOnSelect !== undefined
      ? this.args.closeOnSelect
      : true;
  }

  @action
  onCenterChange(day: NormalizeCalendarValue) {
    if (this.args.onCenterChange) {
      this.args.onCenterChange(day);
    }

    this.center = day.date;
  }

  @action
  handleSelect(day: CalendarDay, datepicker: PowerCalendarAPI, e: MouseEvent) {
    let value = this.args.onSelect && this.args.onSelect(day, datepicker, e);
    if (value === false || !this.closeOnSelect) {
      return;
    }
    // @ts-ignore Property 'close' does not exist on type 'PowerCalendarActions'.
    datepicker.actions.close();
  }
}
