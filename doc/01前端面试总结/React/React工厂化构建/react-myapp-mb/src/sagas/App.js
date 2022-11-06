import { call, put, takeEvery } from 'redux-saga/effects';
import { APP_ERROR, FETCH_AGENT_DATA, APP_AGENT_DATA } from '../actions/App';
import { formatAgentData } from '../utils/agent';
import Api from '../api';

// 获取某个代理客户数据
function* getAgentData(action) {
  const { request } = action;
  const { unique_code, setTitle } = request;
  const requestParam = {
    pageStart: 1,
    pageSize: 1000000,
    unique_code,
  };
  try {
    const data = yield call(Api.getAgent, requestParam);
    const {
      data: { rows },
    } = data;
    const AgentRowData = formatAgentData(rows);
    yield put({ type: APP_AGENT_DATA, appAgentData: AgentRowData });
    // 写入缓存中
    sessionStorage.setItem('appAgentData', JSON.stringify(AgentRowData));
    // 设置网站的title
    const { shop_name } = AgentRowData;
    if (shop_name) {
      document.title = `${shop_name}生鲜选购平台`;
      setTitle(`欢迎光临${shop_name}生鲜`);
    } else {
      document.title = `潮味生鲜选购平台`;
      setTitle(`欢迎光临潮味生鲜`);
    }
  } catch (e) {
    yield put({ type: APP_ERROR, err: e.message });
  }
}

function* App() {
  yield takeEvery(FETCH_AGENT_DATA, getAgentData);
}

export default App;
