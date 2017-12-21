/*
 * @Author: liyanfang
 * @Date:   2017-12-15 10:48:44
 * @Last Modified by:   liyanfang
 * @Last Modified time: 2017-12-15 17:22:25
 */
import Axios from 'axios';

const baseURL = process.env.domain;
const HTTP = Axios.create({
  baseURL,
  transformResponse: [
    data => JSON.parse(data),
  ],
  withCredentials: true,
});
// 获取商品详情
const getGoodsInfo = (data) => {
  const promise = new Promise((resolve, reject) => {
    HTTP.get('/procurement/wxhc/exhibitionPark/getItemDetail', { params: data })
            .then((response) => {
              if (response.data.status) {
                return resolve(response.data);
              }
              return reject(response.data.message);
            })
            .catch(() => reject('网络不稳定请刷新重试！'));
  });
  return promise;
};

/**
 * [增加一件商品 ]
 * @param  {[object]} {exhibitionParkId: 2, openId: "oQgby0EpLBmS8z7hTKnFepG9_Llc", openGid: "", itemId: 78}
 * @return {[type]}      [description]
 */
const increaseItemNum = (data) => {
  const promise = new Promise((resolve, reject) => {
    HTTP.post('/procurement/wxhc/cart/increaseItemNum', data)
            .then((response) => {
              if (response.data.status) {
                return resolve();
              }
              return reject(response.data.message);
            })
            .catch(() => reject('网络不稳定请刷新重试！'));
  });
  return promise;
};

/**
 * [减少一件商品 ]
 * @param  {[object]} {exhibitionParkId: 2, openId: "oQgby0EpLBmS8z7hTKnFepG9_Llc", openGid: "", itemId: 78}
 * @return {[type]}      [description]
 */
const reduceItemNum = (data) => {
  const promise = new Promise((resolve, reject) => {
    HTTP.post('/procurement/wxhc/cart/reduceItemNum', data)
            .then((response) => {
              if (response.data.status) {
                return resolve();
              }
              return reject(response.data.message);
            })
            .catch(() => reject('网络不稳定请刷新重试！'));
  });
  return promise;
};
/**
 * 更新商品数量
 * @param  {[object]} {exhibitionParkId: 2, openId: "oQgby0EpLBmS8z7hTKnFepG9_Llc", openGid: "", itemId: 78, num: 4}
 * @return {[type]}      [description]
 */
const updateItemNum = (data) => {
  const promise = new Promise((resolve, reject) => {
    HTTP.post('/procurement/wxhc/cart/updateItemNum', data)
            .then((response) => {
              if (response.data.status) {
                return resolve();
              }
              return reject(response.data.message);
            })
            .catch(() => reject('网络不稳定请刷新重试！'));
  });
  return promise;
};

export default {
  getGoodsInfo,
  increaseItemNum,
  reduceItemNum,
  updateItemNum,
};
