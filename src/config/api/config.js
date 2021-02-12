const APICONFIG = [
  // 用户登录
  {
    name: 'userLogin',
    url: '/api/users/login',
    method: 'post',
  },

  // 添加用户
  {
    name: 'addUserItem',
    url: '/api/users/add',
    method: 'post',
  },

  // 产品查询
  {
    name: 'getProduct',
    url: '/api/product/list',
    method: 'get',
  },

  // 修改产品信息
  {
    name: 'modifyProduct',
    url: '/api/product/modify',
    method: 'post',
  },

  // 新增产品信息
  {
    name: 'addProduct',
    url: '/api/product/add',
    method: 'post',
  },

  // 删除产品信息
  {
    name: 'deleteProduct',
    url: '/api/product/delete',
    method: 'post',
  },

  // 文件上传
  {
    name: 'uploaderProduct',
    url: '/api/uploader/product',
    method: 'post',
    type: 'upload',
  },
];

export default APICONFIG;
