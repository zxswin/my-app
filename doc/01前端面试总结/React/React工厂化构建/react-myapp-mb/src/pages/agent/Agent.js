import React, { useState } from 'react';
import _ from 'lodash';
import Api from '../../api';
import FormInput from '../../components/common/formInput';
import Button from '../../components/common/button';
import styles from './style.scss';

const Agent = props => {
  const { popupData, setGlobalPopupData, history } = props;
  const agentDataStr = sessionStorage.getItem('appAgentData');
  const appAgentData = agentDataStr ? JSON.parse(agentDataStr) : {};
  console.log('appAgentData====', appAgentData);

  const { phone_num, username, shop_name, add_price_ratio } = appAgentData;

  const [phoneNum, setPhoneNum] = useState('');
  const [uniqCode, setUniqCode] = useState('');
  const [showErr, setShowErr] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [priceRatio, setPriceRatio] = useState(add_price_ratio);
  const [shopName, setShopName] = useState(shop_name);

  const onPhoneNumChange = value => {
    setShowErr(false);
    setPhoneNum(value);
  };

  const onUniqCodeChange = value => {
    setShowErr(false);
    setUniqCode(value);
  };

  const onPriceRatioChange = value => {
    setShowErr(false);
    setPriceRatio(value);
  };

  const onShowNameChange = value => {
    setShopName(value);
  };

  const loginHandle = () => {
    const { phone_num, unique_code } = appAgentData;
    if (phoneNum === phone_num && uniqCode.length === 5 && unique_code.includes(uniqCode)) {
      setShowContent(true);
    } else {
      setShowErr(true);
    }
  };

  const setHandle = async () => {
    if (!priceRatio || isNaN(Number(priceRatio))) {
      setShowErr(true);
      return;
    }

    if (shopName && shopName.length > 2) {
      setShowErr(true);
      return;
    }

    const data = _.cloneDeep(appAgentData);

    data.add_price_ratio = Number(priceRatio);

    if (shopName) {
      data.shop_name = shopName;
    }

    const res = await Api.modifyAgent(data);

    if (res.status === 200) {
      const currPopupData = _.cloneDeep(popupData);
      currPopupData.info = '价格提高比例设置成功,前往商城主页查看！';
      currPopupData.isShow = true;
      currPopupData.confirm = () => {
        history.push(`/#888`);
      };
      setGlobalPopupData(currPopupData);
    }
  };

  return (
    <div className={styles.Agent}>
      {!showContent && (
        <div className={styles.agentContain}>
          <h2 className={styles.title}>代理设置登录平台</h2>
          <FormInput label="手机号" placeholder="请输入登录手机号" value={phoneNum} onChange={onPhoneNumChange} />
          <FormInput label="校验码" placeholder="请输入校验码" value={uniqCode} onChange={onUniqCodeChange} />
          {showErr && <div className={styles.err}>手机号或验证码校验失败!</div>}
          <div className={styles.buttonContain}>
            <div className={styles.label}></div>
            <Button text={'登录'} size={'fullSize'} onClick={loginHandle} />
          </div>
        </div>
      )}

      {showContent && (
        <div className={styles.setContent}>
          <FormInput label="用户名" value={username} disabled={true} />
          <FormInput label="手机号" value={phone_num} disabled={true} />
          <FormInput label="原商城" value={shop_name} disabled={true} />
          <FormInput label="商城" value={shopName} placeholder="请输入商城名称仅限两个字" onChange={onShowNameChange} />
          <FormInput label="原提价" value={add_price_ratio} disabled={true} />
          <FormInput
            label="提价"
            value={priceRatio}
            placeholder="请输入提价比例"
            type="number"
            percent={true}
            onChange={onPriceRatioChange}
          />
          {showErr && <div className={styles.err}>提价信息或商城名称输入有误,请检查!</div>}
          <div className={styles.buttonContain}>
            <div className={styles.label}></div>
            <Button text={'提交设置'} size={'fullSize'} onClick={setHandle} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent;
