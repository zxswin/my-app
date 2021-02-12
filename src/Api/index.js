import APICONFIG from '../config/api/config';
import { axiosRequest } from '../utils/https';

const Api = {};

for (const apiConfigItem of APICONFIG) {
  const { name: fnName, url, method, type } = apiConfigItem;

  Api[fnName] = (data, onUploadProgress) => {
    if (method === 'post') {
      // 参数配置项
      const options = {
        url,
        method: 'post',
        data,
      };

      if (type === 'upload') {
        options.onUploadProgress = onUploadProgress ? onUploadProgress : () => {}; // 上传文件的进度事件
      }
      return new Promise((resolve, reject) => {
        axiosRequest({
          options,
          success(data) {
            resolve(data);
          },
          error(err) {
            reject(err);
          },
        });
      });
    } else if (method === 'get') {
      return new Promise((resolve, reject) => {
        // 参数配置项
        const options = {
          url,
          method: 'get',
          params: data,
        };
        axiosRequest({
          options,
          success(data) {
            resolve(data);
          },
          error(err) {
            reject(err);
          },
        });
      });
    }
  };
}

export default Api;
