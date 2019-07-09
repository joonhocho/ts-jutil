import { nil } from 'tsdef';

export const getAuthorizationBearerToken = (
  authorization: string | nil
): string | null => {
  if (authorization) {
    if (authorization.startsWith('Bearer ')) {
      return authorization.substring(7) || '';
    }
    return '';
  }
  return null;
};
