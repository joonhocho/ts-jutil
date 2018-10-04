import { isMetaKeySet } from './event';

describe('isMetaKeySet', () => {
  const e = { altKey: false, ctrlKey: false, metaKey: false, shiftKey: false };

  test('should test whether meta keys are set on key event', () => {
    expect(isMetaKeySet({ ...e })).toBe(false);
    expect(isMetaKeySet({ ...e, altKey: true })).toBe(true);
    expect(isMetaKeySet({ ...e, altKey: false })).toBe(false);
    expect(isMetaKeySet({ ...e, ctrlKey: true })).toBe(true);
    expect(isMetaKeySet({ ...e, ctrlKey: false })).toBe(false);
    expect(isMetaKeySet({ ...e, metaKey: true })).toBe(true);
    expect(isMetaKeySet({ ...e, metaKey: false })).toBe(false);
    expect(isMetaKeySet({ ...e, shiftKey: true })).toBe(true);
    expect(isMetaKeySet({ ...e, shiftKey: false })).toBe(false);
  });
});
