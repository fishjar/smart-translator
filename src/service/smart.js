import google from "./google";
import bing from "./bing";
import youdao from "./youdao";
import logger from "../utils/logger";

/**
 * 词典
 * @param {*} q
 * @param {*} tl
 */
const dict = async (q, tl = "zh") => {
  const promiseBing = bing.dict(q);
  const promiseYoudao = youdao.dict(q, tl === "en" ? "en" : "cn");
  const [resBing, resYoudao] = await Promise.all([promiseBing, promiseYoudao]);
  const data = [];
  if (resBing) {
    try {
      data.push({
        bot: "bing",
        botName: "微软词典",
        phoneticUS: resBing["phonetic_US"],
        phoneticUK: resBing["phonetic_UK"],
        audioUS: resBing["audio_US"],
        audioUK: resBing["audio_UK"],
        trans: resBing.translation,
        variants: resBing.variant,
        colls: resBing.coll,
        synonyms: resBing.synonym,
        antonyms: resBing.antonym,
        bilinguals: resBing.bilingual,
        ees: resBing.ee,
        // sentences: resBing.sentence,
      });
    } catch (err) {
      logger.error(
        `[resBing解析错误] ${err.message} ${JSON.stringify(resBing)}`
      );
    }
  }
  if (resYoudao) {
    try {
      const trans = resYoudao.translation.map((item) => {
        const [pos, ...defs] = item.split(/\s+/);
        return {
          pos,
          def: defs.join(""),
        };
      });
      const variants = resYoudao.variant.map((item) => {
        const [pos, ...defs] = item.split(/\s+/);
        return {
          pos,
          def: defs.join(""),
        };
      });
      data.push({
        bot: "youdao",
        botName: "有道词典",
        phoneticUS: resYoudao["phonetic_US"],
        phoneticUK: resYoudao["phonetic_UK"],
        trans,
        variants,
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
const translate = async (q, tl = "zh", excGoogle = false) => {
  const promiseGoogle = google.translate(q, tl === "en" ? "en" : "zh_CN");
  const promiseBing = bing.translate(q, tl === "en" ? "en" : "zh-Hans");
  const promiseYoudao = youdao.translate(q);
  let resGoogle, resBing, resYoudao;
  if (excGoogle) {
    [resBing, resYoudao] = await Promise.all([promiseBing, promiseYoudao]);
  } else {
    [resGoogle, resBing, resYoudao] = await Promise.all([
      promiseGoogle,
      promiseBing,
      promiseYoudao,
    ]);
  }
  const data = [];
  if (resGoogle) {
    try {
      data.push({
        bot: "google",
        botName: "谷歌翻译",
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
        bot: "bing",
        botName: "微软翻译",
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
        bot: "youdao",
        botName: "有道翻译",
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
