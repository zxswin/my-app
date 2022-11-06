/** 菜单类型列表  */
export const MenuTypelist = [
  { value: 'fish', label: '海鱼', status: 1 },
  { value: 'shrimp', label: '海虾', status: 1 },
  { value: 'oyster', label: '生蚝', status: 1 },
  { value: 'squid', label: '鱿鱼', status: 1 },
  { value: 'crab', label: '螃蟹', status: 1 },
  { value: 'beef_balls', label: '牛肉丸', status: 1 },
  { value: 'dumpling', label: '海鲜水饺', status: 1 },
  { value: 'laver', label: '紫菜海苔', status: 1 },
  { value: 'supplements', label: '干货补品', status: 1 },
  { value: 'greens', label: '青菜', status: 1 },
  { value: 'melon', label: '瓜类', status: 1 },
  { value: 'tomato', label: '番茄', status: 1 },
  { value: 'potato', label: '地瓜', status: 1 },
];

/** 菜单类型状态  */
export const MenuTypeStatusList = [
  { value: 0, label: '停用' },
  { value: 1, label: '启用' },
];

/** 产品状态  */
export const ProductStatusList = [
  { value: 0, label: '售罄' },
  { value: 1, label: '在售' },
];

/** 评论状态  */
export const CommentStatusList = [
  { value: 0, label: '待审核' },
  { value: 1, label: '已审核' },
  { value: 2, label: '审核不通过' },
];

/** 评论标示  */
export const CommentFlagList = [
  { value: 0, label: '中评' },
  { value: 1, label: '好评' },
  { value: 2, label: '差评' },
];

/** 操作权限类型  */
export const OpermissionTypeList = [
  { value: 0, label: '查询' },
  { value: 1, label: '新增' },
  { value: 2, label: '修改' },
  { value: 3, label: '删除' },
  { value: 4, label: '评论' },
];

/** 操作权限状态  */
export const OpermissionStatusList = [
  { value: 0, label: '禁用' },
  { value: 1, label: '启用' },
];

/** 用户角色类型  */
export const RolesTypeList = [
  { value: 0, label: '超级管理员' },
  { value: 1, label: '普通管理员' },
  { value: 2, label: '特殊权限管理员' },
  { value: 3, label: '微信小程序用户' },
];

/** 用户角色状态  */
export const RolesStatusList = [
  { value: 0, label: '停用' },
  { value: 1, label: '正常' },
];

/** 用户状态  */
export const UsersStatusList = [
  { value: 0, label: '注销' },
  { value: 1, label: '正常' },
];

/** 代理用户类型  */
export const AgentTypeList = [
  { value: 0, label: '普通代理' },
  { value: 1, label: '铜牌代理' },
  { value: 2, label: '银牌代理' },
  { value: 3, label: '金牌代理' },
];
