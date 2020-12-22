import { axiosGet, axiosRequest } from '../../utils/https';

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

export { getUserList, addUserItem };
