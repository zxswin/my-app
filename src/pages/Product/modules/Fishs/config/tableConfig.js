import Store from '../store';

// mobx缓存数据
const store = Store.getInstance();

const tableConfig = {
  // 固定表格头部
  // fixedHeader: {
  //   height: '400px',
  // },
  // 固定表格的右侧
  fixedRight: {
    fixedLen: 1,
    style: {
      width: '2800px',
    },
  },

  // 固定表格的左侧
  fixedLeft: {
    fixedLen: 2,
    style: {
      width: '2800px',
    },
  },

  // 是否展示分页器 是否展示分页器默认为true
  showPagination: true,

  // 是否进行本地分页 默认为false 进行服务端分页
  // localPaging: true,

  // 表头配置项
  columns: [
    {
      checkbox: true,
      align: 'center',
    },
    {
      field: 'id',
      title: '产品id',
      sort: true,
    },
    {
      field: 'name',
      title: '产品名称',
    },
    {
      field: 'order',
      title: '产品排列顺序',
    },
    {
      field: 'price',
      title: '产品价格',
    },
    {
      field: 'stock',
      title: '产品库存',
    },
    {
      field: 'sales_volume',
      title: '产品销量',
    },
    {
      field: 'icon_url',
      title: '产品图标',
      width: '200px',
    },
    {
      field: 'type',
      title: '产品类型',
    },
    {
      field: 'status',
      title: '产品状态',
    },
    {
      field: 'describe',
      title: '产品描述',
      width: '200px',
    },
    {
      field: 'standard',
      title: '产品标准规格',
      width: '200px',
    },
    {
      field: 'slide_imgs',
      title: '幻灯片图片集',
      width: '200px',
    },
    {
      field: 'content',
      title: '产品内容',
      width: '200px',
    },
    {
      field: 'video_url',
      title: '产品视频',
      width: '200px',
    },
    {
      field: 'created_at',
      title: '创建日期',
      width: '200px',
    },
    {
      field: 'updated_at',
      title: '更新日期',
      width: '200px',
    },
    {
      field: 'operation',
      title: '操作',
      width: '200px',
      formatter: (row, index, value) => {
        return (
          <div className="UI-Table__operation">
            <span className="icon detail" onClick={() => store.detailClick(row, index, value)}></span>
            <span className="icon modify" onClick={() => store.modifyClick(row, index, value)}></span>
            <span className="icon delete" onClick={() => store.deleteClick(row, index, value)}></span>
          </div>
        );
      },
    },
  ],
};

export default tableConfig;
