const APICONFIG = [
  // 数据库操作相关
  // ==================================
  // ==================================

  // 测试接口
  {
    name: 'getAppData',
    url: '/api/fasixs/list',
    method: 'get',
  },

  // 创建表
  {
    name: 'createTables',
    url: '/api/mysql/createtables',
    method: 'get',
  },

  // 用户管理类
  // ==================================
  // ==================================

  // 用户登录
  {
    name: 'userLogin',
    url: '/api/users/login',
    method: 'post',
  },

  // 用户查询
  {
    name: 'getUserList',
    url: '/api/users/list',
    method: 'get',
  },

  // 修改用户信息
  {
    name: 'modifyUser',
    url: '/api/users/modify',
    method: 'post',
  },

  // 新增用户信息
  {
    name: 'addUser',
    url: '/api/users/add',
    method: 'post',
  },

  // 删除用户信息
  {
    name: 'deleteUser',
    url: '/api/users/delete',
    method: 'post',
  },

  // 操作权限管理类
  // ==================================
  // ==================================

  // 操作权限查询
  {
    name: 'getPermission',
    url: '/api/permission/list',
    method: 'get',
  },

  // 修改操作权限信息
  {
    name: 'modifyPermission',
    url: '/api/permission/modify',
    method: 'post',
  },

  // 新增操作权限信息
  {
    name: 'addPermission',
    url: '/api/permission/add',
    method: 'post',
  },

  // 删除操作权限信息
  {
    name: 'deletePermission',
    url: '/api/permission/delete',
    method: 'post',
  },

  // 用户角色管理
  // ==================================
  // ==================================

  // 用户角色查询
  {
    name: 'getRole',
    url: '/api/role/list',
    method: 'get',
  },

  // 修改用户角色信息
  {
    name: 'modifyRole',
    url: '/api/role/modify',
    method: 'post',
  },

  // 新增用户角色信息
  {
    name: 'addRole',
    url: '/api/role/add',
    method: 'post',
  },

  // 删除用户角色信息
  {
    name: 'deleteRole',
    url: '/api/role/delete',
    method: 'post',
  },

  // 产品管理类
  // ==================================
  // ==================================

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

  // 菜单管理类
  // ==================================
  // ==================================

  // 查询产品菜单列表
  {
    name: 'getProductMenu',
    url: '/api/productmenu/list',
    method: 'get',
  },

  // 新增产品菜单信息
  {
    name: 'addProductMenu',
    url: '/api/productmenu/add',
    method: 'post',
  },

  // 修改产品菜单信息
  {
    name: 'modifyProductMenu',
    url: '/api/productmenu/modify',
    method: 'post',
  },

  // 删除产品菜单信息
  {
    name: 'deleteProductMenu',
    url: '/api/productmenu/delete',
    method: 'post',
  },

  // 产品评论操作类
  // ==================================
  // ==================================

  // 产品评论查询
  {
    name: 'getProductComment',
    url: '/api/productcomment/list',
    method: 'get',
  },

  // 修改产品评论信息
  {
    name: 'modifyProductComment',
    url: '/api/productcomment/modify',
    method: 'post',
  },

  // 新增产品评论信息
  {
    name: 'addProductComment',
    url: '/api/productcomment/add',
    method: 'post',
  },

  // 删除产品评论信息
  {
    name: 'deleteProductComment',
    url: '/api/productcomment/delete',
    method: 'post',
  },

  // 订单管理类
  // ==================================
  // ==================================

  // 查询订单
  {
    name: 'getOrderList',
    url: '/api/order/list',
    method: 'get',
  },

  // 修改订单
  {
    name: 'modifyOrder',
    url: '/api/order/modify',
    method: 'post',
  },

  // 新增订单
  {
    name: 'addOrder',
    url: '/api/order/add',
    method: 'post',
  },

  // 删除订单
  {
    name: 'deleteOrder',
    url: '/api/order/delete',
    method: 'post',
  },

  // 优惠券管理类
  // ==================================
  // ==================================

  // 查询优惠券
  {
    name: 'getCouponList',
    url: '/api/coupon/list',
    method: 'get',
  },

  // 修改优惠券
  {
    name: 'modifyCoupon',
    url: '/api/coupon/modify',
    method: 'post',
  },

  // 新增优惠券
  {
    name: 'addCoupon',
    url: '/api/coupon/add',
    method: 'post',
  },

  // 删除优惠券
  {
    name: 'deleteCoupon',
    url: '/api/coupon/delete',
    method: 'post',
  },

  // 代理客户管理类
  // ==================================
  // ==================================

  // 代理客户查询
  {
    name: 'getAgent',
    url: '/api/agent/list',
    method: 'get',
  },

  // 修改代理客户信息
  {
    name: 'modifyAgent',
    url: '/api/agent/modify',
    method: 'post',
  },

  // 新增代理客户信息
  {
    name: 'addAgent',
    url: '/api/agent/add',
    method: 'post',
  },

  // 删除代理客户信息
  {
    name: 'deleteAgent',
    url: '/api/agent/delete',
    method: 'post',
  },

  // 微信公众平台相关接口
  // ==================================
  // ==================================

  // 创建微信公众平台自定义菜单接口
  {
    name: 'wxCreateMenu',
    url: '/api/wx/createmenu',
    method: 'post',
  },

  // 获取微信自动回复模版
  {
    name: 'wxGetTemplate',
    url: '/api/wx/gettemplate',
    method: 'get',
  },

  // 设置微信自动回复模版
  {
    name: 'wxSetTemplate',
    url: '/api/wx/settemplate',
    method: 'post',
  },
];

export default APICONFIG;
