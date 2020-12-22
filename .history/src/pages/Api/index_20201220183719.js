import { axiosGet } from '../../utils/https';

function getUserList() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: '/api/users/list?pageStart=1&pageSize=10',
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(errr);
      },
    });
  });
}
