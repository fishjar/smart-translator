import api from "../api";

/**
 * 谷歌翻译
 * @param {*} q
 * @param {*} tl
 */
const translate = (q, tl = "zh_CN") => {
  return api.googleTranslate(q, tl);
};

export default {
  translate,
};
