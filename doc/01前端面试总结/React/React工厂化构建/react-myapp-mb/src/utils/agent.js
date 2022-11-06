// 格式化代理用户数据
export const formatAgentData = agentData => {
  let resultJson = {};

  if (agentData.length) {
    resultJson = agentData[0];

    const { qr_code_url } = resultJson;

    const qrcodeJson = JSON.parse(qr_code_url);

    resultJson.qrCodeUrl = `${qrcodeJson.src}`;
  }

  return resultJson;
};

// 获取缓存中的unique_code数据
export const getUniqueCode = () => {
  const agentDataStr = sessionStorage.getItem('appAgentData');
  const appAgentData = agentDataStr ? JSON.parse(agentDataStr) : {};
  const { unique_code } = appAgentData;
  return unique_code;
};
