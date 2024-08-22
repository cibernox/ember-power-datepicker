import '@glint/environment-ember-loose';

import type { EmbroiderUtilRegistry } from '@embroider/util';

export interface AssignRegistry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmbroiderUtilRegistry /* other registries here */ {
    // ...
  }

  export default interface Registry
    extends AssignRegistry /* other registries here */ {
    // ...
  }
}
