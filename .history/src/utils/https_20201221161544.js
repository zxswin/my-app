import axios from 'axios';
// import qs from 'qs';

function axiosGet(options) {
  axios(options.url)
    .then((res) => {
      console.log('响应数据', res);
      options.success(res.data);
    })
    .catch((err) => {
      options.error(err);
    });
}

export { axiosGet };
