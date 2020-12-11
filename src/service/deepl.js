import api from "../api";

/**
 * DEEPL翻译
 * @param {*} q
 * @param {*} tl
 */
const translate = (q, tl = "ZH") => {
  return api.deeplTranslate(q, tl);
};

/**
 * DEEPL分句
 * @param {*} q
 */
const splitInto = (q) => {
  return api.deeplSplit(q);
};

export default {
  translate,
  splitInto,
};
