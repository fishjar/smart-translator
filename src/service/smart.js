import google from "./google";
import bing from "./bing";
import youdao from "./youdao";
import logger from "../utils/logger";

/**
 * 词典
 * @param {*} q
 * @param {*} tl
 */
const dict = async (q, tl = "cn") => {
  const promiseBing = bing.dict(q);
  const promiseYoudao = youdao.dict(q, tl);
  const [resBing, resYoudao] = await Promise.all([promiseBing, promiseYoudao]);
  const data = [];
  if (resBing) {
    try {
      data.push({
        source: "bing",
        phoneticUS: resBing["phonetic_US"],
        phoneticUK: resBing["phonetic_UK"],
        results: resBing.translation.map((item) => item.pos + " " + item.def),
        variants: resBing.variant.map((item) => `${item.pos}: ${item.def}`),
      });
    } catch (err) {
      logger.error(
        `[resBing解析错误] ${err.message} ${JSON.stringify(resBing)}`
      );
    }
  }
  if (resYoudao) {
    try {
      data.push({
        source: "youdao",
        phoneticUS: resYoudao["phonetic_US"],
        phoneticUK: resYoudao["phonetic_UK"],
        results: resYoudao.translation,
        variants: resYoudao.variant,
      });
    } catch (err) {
      logger.error(
        `[resYoudao解析错误] ${err.message} ${JSON.stringify(resYoudao)}`
      );
    }
  }
  return data;
};

/**
 * 翻译
 * @param {*} q
 * @param {*} tl
 */
const translate = async (q, tl = "cn") => {
  const googleBing = google.translate(q, tl === "en" ? "en" : "zh_CN");
  const promiseBing = bing.translate(q, tl === "en" ? "en" : "zh-Hans");
  const promiseYoudao = youdao.translate(q);
  const [resGoogle, resBing, resYoudao] = await Promise.all([
    googleBing,
    promiseBing,
    promiseYoudao,
  ]);
  const data = [];
  if (resGoogle) {
    try {
      data.push({
        source: "google",
        result: resGoogle.sentences[0].trans,
      });
    } catch (err) {
      logger.error(
        `[resGoogle解析错误] ${err.message} ${JSON.stringify(resGoogle)}`
      );
    }
  }
  if (resBing) {
    try {
      data.push({
        source: "bing",
        result: resBing[0].translations[0].text,
      });
    } catch (err) {
      logger.error(
        `[resBing解析错误] ${err.message} ${JSON.stringify(resBing)}`
      );
    }
  }
  if (resYoudao) {
    try {
      data.push({
        source: "youdao",
        result: resYoudao.translateResult[0][0].tgt,
      });
    } catch (err) {
      logger.error(
        `[resYoudao解析错误] ${err.message} ${JSON.stringify(resYoudao)}`
      );
    }
  }

  return data;
};

export default {
  dict,
  translate,
};
