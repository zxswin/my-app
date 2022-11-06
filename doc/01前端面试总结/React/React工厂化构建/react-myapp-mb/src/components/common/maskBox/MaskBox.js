import React from 'react';
import IconSvg from '../../common/iconSvg';
import styles from './style.scss';

const MaskBox = props => {
  const { children, type = 'center' } = props;

  // 点击遮罩层关闭遮罩
  const maskClickHandle = () => {
    const { onMaskClick } = props;
    onMaskClick && onMaskClick();
  };

  // 点击关闭按钮
  const closeMaskHandle = () => {
    const { onClose } = props;
    onClose && onClose();
  };

  // 点击内容区域阻止事件冒泡
  const contentClickHandle = e => {
    e.stopPropagation();
  };
  return (
    <div className={styles.MaskBox} onClick={maskClickHandle}>
      {/* 内容区在中间 */}
      {type === 'center' && (
        <div className={styles.contain} onClick={contentClickHandle}>
          {/* 关闭按钮 */}
          <IconSvg type={'close'} theme={styles} onClick={closeMaskHandle} />
          {/* 内容区域 */}
          {children}
        </div>
      )}
      {/* 内容区在底部 */}
      {type === 'bottom' && (
        <div className={styles.bottomContain} onClick={contentClickHandle}>
          {children}
        </div>
      )}
    </div>
  );
};
export default MaskBox;
