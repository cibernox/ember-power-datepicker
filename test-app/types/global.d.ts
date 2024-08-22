import '@glint/environment-ember-loose';
import type EmberPowerDatepickerRegistry from 'ember-power-datepicker/template-registry';
import type EmberBasicDropdownRegistry from 'ember-basic-dropdown/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberBasicDropdownRegistry,
      EmberPowerDatepickerRegistry {}
}
