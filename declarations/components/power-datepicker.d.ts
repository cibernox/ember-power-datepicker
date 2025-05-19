import Component from '@glimmer/component';
import type { DropdownActions, BasicDropdownDefaultBlock, BasicDropdownArgs } from 'ember-basic-dropdown/components/basic-dropdown';
import type { NormalizeCalendarValue } from 'ember-power-calendar/utils';
import type { CalendarDay, SelectedDays, PowerCalendarActions, PowerCalendarArgs, PowerCalendarAPI, PowerCalendarDefaultBlock } from 'ember-power-calendar/components/power-calendar';
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
    onSelect?: (day: CalendarDay, calendar: PowerDatepickerCalendar, event: MouseEvent) => void | boolean;
}
interface PowerDatepickerActions extends DropdownActions, PowerCalendarActions {
}
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
    Nav: PowerCalendarDefaultBlock['Nav'];
    Days: PowerCalendarDefaultBlock['Days'];
}
export default class PowerDatepickerComponent extends Component<PowerDatepickerSignature> {
    center: Date | undefined;
    get closeOnSelect(): boolean;
    onCenterChange(newCenter: NormalizeCalendarValue, calendar: PowerCalendarAPI, event: MouseEvent): Promise<void>;
    handleSelect(day: CalendarDay, datepicker: PowerDatepickerCalendar, e: MouseEvent): void;
}
export {};
//# sourceMappingURL=power-datepicker.d.ts.map