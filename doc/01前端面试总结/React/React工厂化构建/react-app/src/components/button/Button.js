import classnames from 'classnames';

import './style.scss';

const Button = props => {
  const { text = '', onClick = () => {}, theme = 'blur', className = '', disabled = false } = props;
  return (
    <button disabled={disabled} className={classnames(`UI-Button ${theme} ${className}`)} type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
