import Datetime from 'react-datetime';
import 'moment/locale/zh-cn';
import 'react-datetime/css/react-datetime.css';
import './style.scss';

const DTPicker = props => {
  /* 默认属性 */
  const defaultProps = {
    // input控件的相关属性
    inputProps: {
      placeholder: '请选择日期',
    },
    dateFormat: 'DD/MM/YYYY', // 日期格式化
    timeFormat: false, // 禁止选择时间
    // 不能选中周六日
    isValidDate: current => {
      return current.day() !== 0 && current.day() !== 6;
    },
    // 选中日期后关闭面板
    closeOnSelect: true,
  };

  return (
    <div className="UI-DTPicker">
      <Datetime className="UI-DTPicker__Datetime" {...defaultProps} {...props} />
      <span className="UI-DTPicker-icon-date"></span>
    </div>
  );
};

export default DTPicker;
