export const CONTACT_DATA = 'CONTACT_DATA';
export const FETCH_CONCAT_DATA = 'FETCH_CONCAT_DATA';

export function setConcatData(concatData) {
  return {
    type: CONTACT_DATA,
    concatData,
  };
}

export function fetchConcatData(request) {
  return {
    type: FETCH_CONCAT_DATA,
    request,
  };
}
