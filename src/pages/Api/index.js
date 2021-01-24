import { axiosGet, axiosRequest } from '../../utils/https';

/**
 * 用户登录
 */

function userLogin(username, password) {
  return new Promise((resolve, reject) => {
    axiosRequest({
      options: {
        url: '/api/users/login',
        method: 'post',
        data: {
          username,
          password,
        },
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

/**
 * 查询产品数据
 */

function getProduct(queryData) {
  return new Promise((resolve, reject) => {
    axiosRequest({
      options: {
        url: '/api/product/list',
        method: 'get',
        params: queryData,
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

/** 修改产品信息  */
function modifyProduct(modifyData) {
  return new Promise((resolve, reject) => {
    axiosRequest({
      options: {
        url: '/api/product/modify',
        method: 'post',
        data: modifyData,
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

/** 新增产品信息  */
function addProduct(addData) {
  return new Promise((resolve, reject) => {
    axiosRequest({
      options: {
        url: '/api/product/add',
        method: 'post',
        data: addData,
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

/** 删除产品信息  */
function deleteProduct(deleteData) {
  return new Promise((resolve, reject) => {
    axiosRequest({
      options: {
        url: '/api/product/delete',
        method: 'post',
        data: deleteData,
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

/** 产品文件上传  */
function uploaderProduct(uploadData, onUploadProgress) {
  return new Promise((resolve, reject) => {
    axiosRequest({
      options: {
        url: '/api/uploader/product',
        method: 'post',
        data: uploadData,
        onUploadProgress: onUploadProgress ? onUploadProgress : () => {}, // 上传文件的进度事件
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

function getUserList() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: '/api/users/list?pageStart=1&pageSize=10',
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

function addUserItem() {
  return new Promise((resolve, reject) => {
    axiosRequest({
      options: {
        url: '/api/users/add',
        method: 'post',
        data: {
          username: 'xiaohong',
          password: 123456,
          email: '1577820766@qq.com',
          role_id: 1,
        },
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

export { userLogin, getUserList, addUserItem, getProduct, modifyProduct, uploaderProduct, addProduct, deleteProduct };
