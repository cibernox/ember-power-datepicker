import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import type { DropdownActions } from 'ember-basic-dropdown/components/basic-dropdown';
import type {
  CalculatePosition,
  VerticalPosition,
  HorizontalPosition,
} from 'ember-basic-dropdown/utils/calculate-position';
import type { NormalizeCalendarValue } from 'ember-power-calendar/utils';
import type {
  CalendarDay,
  SelectedDays,
  PowerCalendarActions,
} from 'ember-power-calendar/components/power-calendar';
import type { ComponentLike } from '@glint/template';

interface PowerDatepickerSignature {
  Element: HTMLElement;
  Args: PowerDatepickerArgs;
  Blocks: {
    default: [PowerDatepickerDefaultBlock];
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onOpen?: Function;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onClose?: Function;
  calculatePosition?: CalculatePosition;

  locale?: string;
  selected?: SelectedDays;
  closeOnSelect?: boolean;
  onCenterChange?: (newCenter: NormalizeCalendarValue) => void;
  onSelect?: (
    day: CalendarDay,
    calendar: PowerDatepickerCalendar,
    event: MouseEvent,
  ) => void | boolean;
}

interface PowerDatepickerActions
  extends DropdownActions,
    PowerCalendarActions {}

export interface PowerDatepickerCalendar {
  uniqueId: string;
  disabled: boolean;
  isOpen: boolean;
  calendarUniqueId: string;
  selected?: SelectedDays;
  loading: boolean;
  center: Date;
  locale: string;
  actions: PowerDatepickerActions;
}

export interface PowerDatepickerDefaultBlock extends PowerDatepickerCalendar {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Trigger: ComponentLike<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Content: ComponentLike<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Nav: ComponentLike<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Days: ComponentLike<any>;
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
  handleSelect(
    day: CalendarDay,
    datepicker: PowerDatepickerCalendar,
    e: MouseEvent,
  ) {
    const value = this.args.onSelect && this.args.onSelect(day, datepicker, e);
    if (value === false || !this.closeOnSelect) {
      return;
    }

    datepicker.actions.close();
  }
}
