import cheerio from "cheerio";
import api from "../api";

/**
 * 有道翻译
 * @param {*} param0
 */
const translate = ({ q, tl = "AUTO" }) => {
  return api.youdaoTranslate({ q, tl });
};

const dict = async ({ q, tl = "cn" }) => {
  const html = await api.youdaoDict({ q });
  const $ = cheerio.load(html);

  let phonetic_UK = "";
  let phonetic_US = "";
  let translation = [];
  let variant = [];

  if (tl === "cn") {
    phonetic_UK = $("#ec > h2 > div > span:nth-child(1) > span").text();
    phonetic_US = $("#ec > h2 > div > span:nth-child(2) > span").text();

    const $translation = $("#ec > ul");
    if ($translation) {
      $translation.children().each((_, elem) => {
        translation.push($(elem).text().trim());
      });
    }

    const $variant = $("#ec > div");
    if ($variant) {
      $variant.children().each((_, elem) => {
        variant.push($(elem).text().trim());
      });
    }
  } else if (tl === "en") {
    const $translation = $("#ce > ul");
    if ($translation) {
      $translation.children().each((_, elem) => {
        translation.push($(elem).text().trim());
      });
    }
  }

  return {
    phonetic_UK,
    phonetic_US,
    translation,
    variant,
  };
};

export default {
  translate,
  dict,
};
