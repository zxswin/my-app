import * as Dictionary from 'config/dictionary';

/**
 * 数据字典转换
 * @param {string} dicname 要转换的数据字典
 * @param {string | number} value 要转换的数据字典值
 */
export const translateDiction = (dicname, value) => {
  let dict = '';
  const item = Dictionary[dicname].find(item => item.value === value);

  if (item) {
    dict = item.label;
  }

  return dict;
};
