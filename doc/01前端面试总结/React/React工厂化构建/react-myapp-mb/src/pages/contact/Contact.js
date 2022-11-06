import React from 'react';
import contactQrcode from '../../static/img/pic/contact-qrcode.jpg';
import styles from './style.scss';

const Contact = props => {
  const { haveCopyOrderList, shopCarList } = props;
  const agentDataStr = sessionStorage.getItem('appAgentData');
  const appAgentData = agentDataStr ? JSON.parse(agentDataStr) : {};
  const { qrCodeUrl } = appAgentData;
  return (
    <div className={styles.Contact}>
      <div>
        <h2>长按下面的二维码添加并联系我吧!</h2>
        <h2>顺丰发货,广东省内用户隔天到货！</h2>
        <h2>广东省内满200包邮,寄省外需补邮差</h2>
        {haveCopyOrderList && !!shopCarList.length && <h2 className={styles.red}>您的购物清单已经复制,发送给我吧！</h2>}
      </div>
      <img src={qrCodeUrl ? qrCodeUrl : contactQrcode} />
    </div>
  );
};

export default Contact;
