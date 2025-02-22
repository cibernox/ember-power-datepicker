import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import type {
  DropdownActions,
  BasicDropdownDefaultBlock,
  BasicDropdownArgs,
} from 'ember-basic-dropdown/components/basic-dropdown';
import type { NormalizeCalendarValue } from 'ember-power-calendar/utils';
import type {
  CalendarDay,
  SelectedDays,
  PowerCalendarActions,
  PowerCalendarArgs,
  PowerCalendarAPI,
} from 'ember-power-calendar/components/power-calendar';
import type { PowerCalendarNavSignature } from 'ember-power-calendar/components/power-calendar/nav';
import type { PowerCalendarDaysSignature } from 'ember-power-calendar/components/power-calendar/days';
import type { ComponentLike } from '@glint/template';

interface PowerDatepickerSignature {
  Element: HTMLElement;
  Args: PowerDatepickerArgs;
  Blocks: {
    default: [PowerDatepickerDefaultBlock];
  };
}

interface PowerDatepickerArgs {
  initiallyOpened?: BasicDropdownArgs['initiallyOpened'];
  renderInPlace?: BasicDropdownArgs['renderInPlace'];
  verticalPosition?: BasicDropdownArgs['verticalPosition'];
  horizontalPosition?: BasicDropdownArgs['horizontalPosition'];
  destination?: BasicDropdownArgs['destination'];
  disabled?: BasicDropdownArgs['disabled'];
  matchTriggerWidth?: BasicDropdownArgs['matchTriggerWidth'];
  onOpen?: BasicDropdownArgs['onOpen'];
  onClose?: BasicDropdownArgs['onClose'];
  calculatePosition?: BasicDropdownArgs['calculatePosition'];

  locale?: PowerCalendarArgs['locale'];
  selected?: PowerCalendarArgs['selected'];
  onCenterChange?: PowerCalendarArgs['onCenterChange'];

  closeOnSelect?: boolean;
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
  Trigger: BasicDropdownDefaultBlock['Trigger'];
  Content: BasicDropdownDefaultBlock['Content'];
  Nav: ComponentLike<{
    Args: Omit<PowerCalendarNavSignature['Args'], 'calendar'>;
    Blocks: PowerCalendarNavSignature['Blocks'];
  }>;
  Days: ComponentLike<{
    Args: Omit<PowerCalendarDaysSignature['Args'], 'calendar'>;
    Blocks: PowerCalendarDaysSignature['Blocks'];
  }>;
}

export default class PowerDatepickerComponent extends Component<PowerDatepickerSignature> {
  @tracked center: Date | undefined;

  get closeOnSelect() {
    return this.args.closeOnSelect !== undefined
      ? this.args.closeOnSelect
      : true;
  }

  @action
  async onCenterChange(
    newCenter: NormalizeCalendarValue,
    calendar: PowerCalendarAPI,
    event: MouseEvent,
  ): Promise<void> {
    if (this.args.onCenterChange) {
      await this.args.onCenterChange(newCenter, calendar, event);
    }

    this.center = newCenter.date;
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
