import { connect } from 'react-redux';
import Contact from '../pages/contact';
import { fetchUserInfo } from '../actions/Contact';

const mapStateToProps = state => {
  const {
    App: { haveCopyOrderList, appAgentData },
    ProductLists: { shopCarList },
    Contact: { userInfo },
  } = state;

  return {
    userInfo,
    haveCopyOrderList,
    shopCarList,
    appAgentData,
  };
};

const mapDispatchToProps = {
  fetchUserInfo,
};

const Contain = connect(mapStateToProps, mapDispatchToProps)(Contact);

export default Contain;
