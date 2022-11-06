import { connect } from 'react-redux';
import App from '../App';
import { setAppData, fetchAppData } from '../actions/App';
import { setConcatData, fetchConcatData } from '../actions/Contact';

const mapStateToProps = state => {
  const {
    App: { appData, appErr },
    Contact: { concatData },
  } = state;

  return {
    appData,
    appErr,
    concatData,
  };
};

const mapDispatchToProps = {
  setAppData,
  fetchAppData,
  setConcatData,
  fetchConcatData,
};

const Contain = connect(mapStateToProps, mapDispatchToProps)(App);

export default Contain;
