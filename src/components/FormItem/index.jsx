import './style.scss';

const FormItem = props => {
  const { children = null, label = '', className = '', width = '300px' } = props;

  const style = {
    width,
  };

  return (
    <div className={`UI-FormItem ${className}`} style={style}>
      <div className="UI-FormItem_label">{label}</div>
      <div className="UI-FormItem_form-item">{children}</div>
    </div>
  );
};

export default FormItem;
