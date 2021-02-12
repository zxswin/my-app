import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import QueryPanel from 'components/QueryPanel';
import Table from 'components/Table';
import Button from 'components/Button';
import Store from './store';
import tableConfig from './config/tableConfig';
import queryPanelConfig from './config/queryPanelConfig';
import './style.scss';

// mobx缓存数据
const store = Store.getInstance();

const Fishs = () => {
  const currentPageChange = () => {};
  const pageSizeChange = () => {};

  useEffect(() => {
    // 组件挂载的时候回去查询数据
    store.onQueryClick(store.queryData);
  }, []);

  return (
    <div className="Product-Fishs">
      <div className="Product-Fishs__query-panel">
        <QueryPanel configList={queryPanelConfig} onQueryClick={store.onQueryClick} />
      </div>
      <div className="Product-Fishs__operation">
        <Button onClick={store.addClick} text="新增" />
      </div>
      <div className="Product-Fishs__query-table">
        <Table
          data={store.tableData}
          dataTotal={store.total}
          config={tableConfig}
          pageSizeOptions={[10, 20, 30, 50]}
          currentPageChange={currentPageChange}
          pageSizeChange={pageSizeChange}
        />
      </div>
    </div>
  );
};

export default observer(Fishs);
