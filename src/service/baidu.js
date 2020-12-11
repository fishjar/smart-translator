import api from "../api";

/**
 * 百度语言识别
 * @param {*} q
 */
const langDetect = (q) => {
  return api.baiduLangDetect(q);
};

export default {
  langDetect,
};
