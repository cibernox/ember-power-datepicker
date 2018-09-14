import { computed } from '@ember/object';

export function fallbackAction(fallback) {
  return computed({
    get() {
      return fallback.bind(this);
    },
    set(_, v) {
      return v === undefined ? fallback.bind(this) : v;
    }
  });
}
