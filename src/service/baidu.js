import api from "../api";

/**
 * 百度语言识别
 * @param {*} param0
 */
const langDetect = ({ q }) => {
  return api.baiduLangDetect({ q });
};

export default {
  langDetect,
};
