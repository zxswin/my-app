import './style.scss';

const Textarea = props => {
  const { value = '', placeholder = '', className = '', onChange, disabled = false } = props;

  const onTextChange = e => {
    const value = e.currentTarget.value;
    onChange && onChange(value);
  };
  return (
    <div className="UI-Textarea">
      <textarea
        disabled={disabled}
        className={`UI-Textarea__textarea ${className}`}
        placeholder={placeholder}
        onChange={e => onTextChange(e)}
        value={value}
      />
    </div>
  );
};

export default Textarea;
