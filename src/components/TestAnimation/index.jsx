import { useState, useCallback } from 'react';
import classnames from 'classnames';
import './style.scss';

const TestAnimation = () => {
  const [show, setShow] = useState(true);
  const handleToggole = useCallback(() => {
    setShow(!show);
  }, [show]);
  return (
    <div className="TestAnimation">
      <div
        className={classnames('text-contain', {
          show: show,
          hide: !show,
        })}
      >
        <div>动画效果展示文字</div>
        <div>动画效果展示文字</div>
        <div>动画效果展示文字</div>
        <div>动画效果展示文字</div>
        <div>动画效果展示文字</div>
        <div>动画效果展示文字</div>
        <div>动画效果展示文字</div>
      </div>
      <button onClick={handleToggole}>切换过渡动画</button>
    </div>
  );
};

export default TestAnimation;
