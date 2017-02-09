import computed from 'ember-computed';

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
