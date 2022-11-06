export const USER_INFO = 'USER_INFO';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';

export function fetchUserInfo(data) {
  return {
    type: FETCH_USER_INFO,
    data,
  };
}
