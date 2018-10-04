interface IKeyboardEvent {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

export const isMetaKeySet = (e: IKeyboardEvent): boolean =>
  Boolean(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey);
