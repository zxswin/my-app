import axios from 'axios';
// import qs from 'qs'; // 表单提交请求可能会用到

// 设置全局拦截器
// 拦截请求参数
axios.interceptors.request.use(
  function (config) {
    console.log('请求发送前执行的动作', config);
    return config;
  },
  function (error) {
    console.log('请求发生错误的时候执行');
    return Promise.reject(error);
  }
);

// 拦截响应数据
axios.interceptors.response.use(
  function (response) {
    console.log('获取响应数据时候执行的动作', response);
    response.addData = '响应数据被拦截了';
    return response;
  },
  function (error) {
    console.log('响应发生错误的时候执行');
    return Promise.reject(error);
  }
);

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
