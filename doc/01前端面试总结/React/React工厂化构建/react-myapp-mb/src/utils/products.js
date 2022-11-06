import _ from 'lodash';
import NP from 'number-precision';
import GLOBALCONFIG from '../config/globalConfig';
import store from '../store';

/**
 * 产品数据格式化处理
 */
export const formatProdData = (prodData, shopCarList) => {
  const { websiteUrl } = GLOBALCONFIG;
  const formatProdList = [];
  // 产品列表
  prodData.forEach(prod => {
    const { content, icon_url, slide_imgs, video_url } = prod;
    const contentJson = JSON.parse(content);
    const iconUrlJson = JSON.parse(icon_url);
    const videoUrlJson = video_url ? JSON.parse(video_url) : {};
    const iconSrc = `${websiteUrl}${iconUrlJson.src}`;
    const slideImgsJson = JSON.parse(slide_imgs);
    const videoSrc = `${websiteUrl}${videoUrlJson.src}`;

    contentJson.forEach(item => {
      item.src = `${websiteUrl}${item.src}`;
    });

    slideImgsJson.forEach(item => {
      item.image = `${websiteUrl}${item.src}`;
    });

    const prodItem = { ...prod, contentJson, iconUrlJson, slideImgsJson, iconSrc, videoSrc };

    // 当前产品在购物车中的数量
    const shopCarItem = shopCarList.find(item => item.id === prod.id);
    if (shopCarItem) {
      prodItem.currShopAmout = shopCarItem.shopAmout;
    }
    formatProdList.push(prodItem);
  });

  return formatProdList;
};

// 菜单列表格式化处理
export const formatMenuList = (menuList, shopCarList) => {
  const agentDataStr = sessionStorage.getItem('appAgentData');
  const appAgentData = agentDataStr ? JSON.parse(agentDataStr) : {};

  const { add_price_ratio } = appAgentData;

  console.log('add_price_ratio=========', add_price_ratio);

  const formaMenutList = [];
  const formatProdList = [];

  // 过滤不需要展示的菜单
  let filterMenuList = menuList.filter(item => item.status !== 0);
  // 根据顺序排序 数字越大排得越前
  filterMenuList = _.orderBy(filterMenuList, ['order'], ['desc']);

  filterMenuList.forEach(menuItem => {
    const { websiteUrl } = GLOBALCONFIG;
    const { icon_url, name, type, status, products } = menuItem;

    // 菜单列表
    const urlJson = JSON.parse(icon_url);
    formaMenutList.push({
      src: `${websiteUrl}${urlJson.src}`,
      name,
      type,
      status,
    });

    // 过滤掉已经售罄的产品
    let filterProduct = products.filter(item => item.status !== 0);
    // 根据顺序排序 数字越大排得越前
    filterProduct = _.orderBy(filterProduct, ['order'], ['desc']);
    // 产品列表
    filterProduct.forEach(prod => {
      const { content, icon_url, slide_imgs, video_url } = prod;
      const contentJson = JSON.parse(content);
      const iconUrlJson = JSON.parse(icon_url);
      const videoUrlJson = video_url ? JSON.parse(video_url) : {};
      const iconSrc = `${websiteUrl}${iconUrlJson.src}`;
      const slideImgsJson = JSON.parse(slide_imgs);
      const videoSrc = `${websiteUrl}${videoUrlJson.src}`;

      contentJson.forEach(item => {
        item.src = `${websiteUrl}${item.src}`;
      });

      slideImgsJson.forEach(item => {
        item.image = `${websiteUrl}${item.src}`;
      });

      const prodLen = formatProdList.length;
      const prodItem = { ...prod, contentJson, iconUrlJson, slideImgsJson, iconSrc, index: prodLen, videoSrc };

      // 当前产品在购物车中的数量
      const shopCarItem = shopCarList.find(item => item.id === prod.id);
      if (shopCarItem) {
        prodItem.currShopAmout = shopCarItem.shopAmout;
      }

      // 更新为代理设置的价格
      if (add_price_ratio && !isNaN(Number(add_price_ratio))) {
        const addPriceRatio = NP.divide(add_price_ratio, 100);
        const addPrice = NP.times(prodItem.price, addPriceRatio);
        prodItem.price = NP.plus(prodItem.price, Math.round(addPrice));
        prodItem.disablePrice = `${prodItem.price}元`;
      } else {
        prodItem.disablePrice = `${prodItem.price}元`;
      }

      formatProdList.push(prodItem);
    });
  });

  return {
    formaMenutList,
    formatProdList,
  };
};

// 购物车列表格式化处理
export const formatShopCarList = shopCarList => {
  // 购买的商品总数量
  let totalAmout = 0;
  // 购买商品的总价格
  let totalPrice = 0;
  shopCarList.forEach(shopItem => {
    const { shopAmout, totalPrice: price } = shopItem;
    totalAmout = NP.plus(totalAmout, shopAmout);
    totalPrice = NP.plus(totalPrice, price);
  });

  return {
    totalAmout,
    totalPrice,
  };
};

// 生成订单列表复制数据
export const orderListCopyData = (orderList, totalAmout, totalPrice) => {
  let copyOrderListStr = ``;

  orderList.forEach((order, i) => {
    const { name, standard, shopAmout, totalPrice, price } = order;
    // const orderStr = `${i + 1}.${name}(${standard})\n数量${shopAmout} x ${price}元  小计:${totalPrice}元\n`;
    const orderStr = `${name} ${shopAmout}斤\r\n`;
    copyOrderListStr += orderStr;
  });

  // const orderStr = `商品总计: ${totalPrice}元`;
  // copyOrderListStr += orderStr;

  return copyOrderListStr;
};
