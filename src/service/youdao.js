import api from "../api";

/**
 * 有道翻译
 * @param {*} param0
 */
const translate = ({ q, tl = "AUTO" }) => {
  return api.youdaoTranslate({ q, tl });
};

export default {
  translate,
};
