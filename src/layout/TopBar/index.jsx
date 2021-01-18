import { NavLink } from 'react-router-dom';
import './style.scss';
const TopBar = props => {
  const { router } = props;
  // 退出登录
  const loginOutHandle = () => {
    sessionStorage.setItem('isLogin', '');
  };

  return (
    <div className="HomePage-TopBar">
      <div className="HomePage-TopBar__contain">顶部栏目</div>
      <div className="HomePage-TopBar__operation">
        <NavLink to="/login" exact onClick={loginOutHandle}>
          退出登录
        </NavLink>
      </div>
    </div>
  );
};

export default TopBar;
