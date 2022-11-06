import Validator from 'validatorjs';

/**
 * 空字段校验相关字段
 * @param {object} data 要校验的数据
 * @param {object} fieldInfo 字段信息
 */
export const checkEmptyField = (data, fieldInfo) => {
  let errMsg = '';
  const checkData = {};
  for (let key in fieldInfo) {
    checkData[key] = 'required';
  }

  // 相关字段校验
  const validator = new Validator(data, checkData);
  // 自定义属性名
  validator.setAttributeNames(fieldInfo);
  // 校验失败
  validator.fails();

  const checkObj = validator.errors.all();
  const failField = Object.keys(checkObj)[0];

  if (failField) {
    const failTip = checkObj[failField][0];
    errMsg = failTip.substring(0, failTip.length - 1);
  }

  return errMsg;
};
