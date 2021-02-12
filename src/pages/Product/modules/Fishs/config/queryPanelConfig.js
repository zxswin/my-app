// 查询面板参数配置
const queryPanelConfig = [
  {
    type: 'input',
    label: '产品名称',
    field: 'name',
    props: {
      value: '',
      placeholder: '请输入产品名称',
      disabled: false,
    },
  },
  {
    type: 'input',
    label: '起步价格',
    field: 'startPrice',
    props: {
      value: '',
      placeholder: '请输入价格',
      disabled: false,
    },
  },
  {
    type: 'input',
    label: '最高价格',
    field: 'endPrice',
    props: {
      value: '',
      placeholder: '请输入价格',
      disabled: false,
    },
  },
  {
    type: 'input',
    label: '产品库存',
    field: 'stock',
    props: {
      value: '',
      placeholder: '请输入库存',
      disabled: false,
    },
  },
  {
    type: 'select',
    label: '产品状态',
    field: 'status',
    props: {
      placeholder: '请选择产品状态',
      type: '',
      value: { label: '', value: '' },
      options: [
        { label: '选项1', value: '01' },
        { label: '选项2', value: '02' },
        { label: '选项3', value: '03' },
      ],
    },
  },
  {
    type: 'input',
    label: '产品销量',
    field: 'sales_volume',
    props: {
      value: '',
      placeholder: '请输入库存',
      disabled: false,
    },
  },
];

export default queryPanelConfig;
