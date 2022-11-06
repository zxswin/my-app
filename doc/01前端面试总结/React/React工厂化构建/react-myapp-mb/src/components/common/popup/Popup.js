import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import Button from '../button';
import styles from './style.scss';

const Popup = props => {
  const { popupData, setGlobalPopupData } = props;
  const { info, close, confirm, type = 'confirm' } = popupData;

  // 点击关闭或取消按钮
  const closeHandle = () => {
    const currPopupData = _.cloneDeep(popupData);
    currPopupData.isShow = false;
    setGlobalPopupData(currPopupData);
    close && close();
  };

  // 点击确认按钮
  const confirmHandle = () => {
    const currPopupData = _.cloneDeep(popupData);
    currPopupData.isShow = false;
    setGlobalPopupData(currPopupData);
    confirm && confirm();
  };

  return (
    <div className={classnames(styles.Popup)}>
      <div className={styles.popupContain}>
        <div className={styles.info}>{info}</div>
        <div className={styles.buttonBox}>
          {type === 'confirm' && (
            <div className={styles.buttonContain}>
              <Button className={styles.button} type={'default'} text={'取消'} onClick={closeHandle} />
              <Button className={styles.button} text={'确认'} onClick={confirmHandle} />
            </div>
          )}
          {type === 'tip' && (
            <div className={styles.buttonContain}>
              <Button className={styles.button} type={'default'} text={'关闭'} onClick={closeHandle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Popup;
