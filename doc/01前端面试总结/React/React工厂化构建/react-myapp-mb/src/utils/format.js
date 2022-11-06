export const formatSearchParam = searchParam => {
  let result = 0;
  if (searchParam) {
    const transArr = searchParam.split('=');
    const param = transArr[1].trim();
    result = isNaN(Number(param)) ? 0 : Number(param);
  }

  return result;
};

export const formatSearchParamStr = searchParam => {
  let result = '';
  if (searchParam) {
    const transArr = searchParam.split('=');
    const param = transArr[1].trim();
    result = param;
  }

  return result;
};
