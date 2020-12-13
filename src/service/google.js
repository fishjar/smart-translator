import api from "../api";

/**
 * 谷歌翻译
 * @param {*} q
 * @param {*} tl
 */
const translate = (q, tl = "zh-CN") => {
  return api.googleTranslate(q, tl);
};

/**
 * 谷歌翻译(自动识别语言)
 * @param {*} q
 * @param {*} tl
 */
const auto = async (q, tl = "zh-CN") => {
  let res = await api.googleTranslate(q, tl);
  if (!res) {
    return null;
  }
  const sl = res.src;
  if (sl === "zh-CN") {
    tl = "en";
    res = await api.googleTranslate(q, tl);
  }
  return {
    q,
    sl: sl === "zh-CN" ? "zh" : sl,
    tl: tl === "zh-CN" ? "zh" : tl,
    trans: res.sentences.map((item) => item.trans).filter(Boolean),
    isWord: sl === "en" && !!q.match(/\w+/g) && q.match(/\w+/g).length === 1,
  };
};

export default {
  translate,
  auto,
};
