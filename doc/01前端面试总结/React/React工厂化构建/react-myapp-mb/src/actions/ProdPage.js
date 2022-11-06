export const PROD_PAGE_DATA = 'PROD_PAGE_DATA';
export const FETCH_PROD_PAGE_DATA = 'FETCH_PROD_PAGE_DATA';

// 获取某个产品明细数据
export function getProdData(request) {
  return {
    type: FETCH_PROD_PAGE_DATA,
    request,
  };
}
