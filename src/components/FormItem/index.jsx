import './style.scss';

const FormItem = props => {
  const { children = null, label = '', className = '' } = props;

  return (
    <div className={`UI-FormItem ${className}`}>
      <div className="UI-FormItem_label">{label}</div>
      <div className="UI-FormItem_form-item">{children}</div>
    </div>
  );
};

export default FormItem;
