import api from "../api";

/**
 * 谷歌翻译
 * @param {*} param0
 */
const translate = ({ q, tl = "zh_CN" }) => {
  return api.googleTranslate({ q, tl });
};

export default {
  translate,
};
