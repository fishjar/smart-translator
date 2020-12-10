import cheerio from "cheerio";
import api from "../api";

/**
 * 有道翻译
 * @param {*} param0
 */
const translate = ({ q, tl = "AUTO" }) => {
  return api.youdaoTranslate({ q, tl });
};

const dict = async ({ q }) => {
  const html = await api.youdaoDict({ q });
  const $ = cheerio.load(html);

  const phonetic_UK = $("#ec > h2 > div > span:nth-child(1) > span").text();
  const phonetic_US = $("#ec > h2 > div > span:nth-child(2) > span").text();

  const $translate = $("#ec > ul");

  return {
    phonetic_UK,
    phonetic_US,
  };
};

export default {
  translate,
  dict,
};
