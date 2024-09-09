import Component from '@glimmer/component';
import type { DropdownActions } from 'ember-basic-dropdown/components/basic-dropdown';
import type { CalculatePosition, VerticalPosition, HorizontalPosition } from 'ember-basic-dropdown/utils/calculate-position';
import type { NormalizeCalendarValue } from 'ember-power-calendar/utils';
import type { CalendarDay, SelectedDays, PowerCalendarActions } from 'ember-power-calendar/components/power-calendar';
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
    onOpen?: Function;
    onClose?: Function;
    calculatePosition?: CalculatePosition;
    locale?: string;
    selected?: SelectedDays;
    closeOnSelect?: boolean;
    onCenterChange?: (newCenter: NormalizeCalendarValue) => void;
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
    Trigger: ComponentLike<any>;
    Content: ComponentLike<any>;
    Nav: ComponentLike<any>;
    Days: ComponentLike<any>;
}
export default class PowerDatepickerComponent extends Component<PowerDatepickerSignature> {
    center: Date | undefined;
    get closeOnSelect(): boolean;
    onCenterChange(day: NormalizeCalendarValue): void;
    handleSelect(day: CalendarDay, datepicker: PowerDatepickerCalendar, e: MouseEvent): void;
}
export {};
//# sourceMappingURL=power-datepicker.d.ts.map