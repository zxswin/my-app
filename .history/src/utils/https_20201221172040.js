import axios from 'axios';
// import qs from 'qs'; // 表单提交请求可能会用到

// 一个get请求
function axiosGet(options) {
  axios(options.url)
    .then((res) => {
      options.success(res.data);
    })
    .catch((err) => {
      options.error(err);
    });
}

// 通用请求
function axiosRequest(config) {
  const { options, success, error } = config;
  axios(options)
    .then((res) => {
      success(res);
    })
    .catch((err) => {
      error(err);
    });
}

export { axiosGet, axiosRequest };
