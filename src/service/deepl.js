import api from "../api";

/**
 * DEEPL翻译
 * @param {*} param0
 */
const translate = ({ q, tl = "ZH" }) => {
  return api.deeplTranslate({ q, tl });
};

export default {
  translate,
};
