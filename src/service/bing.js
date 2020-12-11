import cheerio from "cheerio";
import api from "../api";

/**
 * Bing词典
 * @param {*} param0
 */
const dict = async ({ word }) => {
  const html = await api.bingDict({ q: word });
  const $ = cheerio.load(html);

  const search_word = $("#sb_form_q").val();
  const result_word = $(".qdef h1").text();
  const tip = $(".in_tip").text() || $(".no_results").text();

  if (!result_word) {
    const mean = [];
    $(".content>.dym_area").each((_, elem) => {
      const pos = $(elem).children(".df_wb_a").text();
      const def = [];
      $(elem)
        .find(".df_wb_c")
        .each((_, elem) => {
          const dymp = $(elem).children("a").text();
          const text = $(elem).children("div").text();
          def.push({
            dymp,
            text,
          });
        });
      mean.push({
        pos,
        def,
      });
    });

    return {
      word,
      search_word,
      result_word,
      tip,
      mean,
    };
  }

  let phonetic_US;
  let phonetic_UK;
  let audio_US;
  let audio_UK;

  const $phonetic_US = $(".qdef>.hd_area .hd_prUS");
  const $phonetic_UK = $(".qdef>.hd_area .hd_pr");

  if ($phonetic_US.length > 0 && $phonetic_UK.length > 0) {
    const $audio_US = $phonetic_US.next().children(".bigaud");
    const $audio_UK = $phonetic_UK.next().children(".bigaud");

    phonetic_US = $phonetic_US.text().split(" ")[1].trim();
    phonetic_UK = $phonetic_UK.text().split(" ")[1].trim();

    audio_US = $audio_US
      .attr("onclick")
      .split(",")
      .find((str) => str.startsWith(`'https`))
      .slice(1, -1);
    audio_UK = $audio_UK
      .attr("onclick")
      .split(",")
      .find((str) => str.startsWith(`'https`))
      .slice(1, -1);
  }

  const translation = [];
  const $translation = $("div.qdef > ul");
  if ($translation) {
    $translation.children("li").each((_, elem) => {
      const pos = $(elem).find(".pos").text();
      const def = $(elem).find(".def").text();
      translation.push({
        pos,
        def,
      });
    });
  }

  const variant = [];
  const $variant = $(".qdef>.hd_div1 .hd_if");
  if ($variant) {
    $variant.children("span").each((_, elem) => {
      const pos = $(elem).text().replace("：", "");
      const def = $(elem).next("a").text();
      variant.push({
        pos,
        def,
      });
    });
  }

  const coll = [];
  const $coll = $("#colid");
  if ($coll) {
    $coll.children().each((_, elem) => {
      const pos = $(elem).children().first().text();
      const def = $(elem).children().last().text().split(",");
      coll.push({
        pos,
        def,
      });
    });
  }

  const synonym = [];
  const $synonym = $("#synoid");
  if ($synonym) {
    $synonym.children().each((_, elem) => {
      const pos = $(elem).children().first().text();
      const def = $(elem).children().last().text().split(",");
      synonym.push({
        pos,
        def,
      });
    });
  }

  const antonym = [];
  const $antonym = $("#antoid");
  if ($antonym) {
    $antonym.children().each((_, elem) => {
      const pos = $(elem).children().first().text();
      const def = $(elem).children().last().text().split(",");
      antonym.push({
        pos,
        def,
      });
    });
  }

  const bilingual = [];
  const $bilingual = $("#authid");
  if ($bilingual) {
    $bilingual.find(".each_seg").each((_, elem) => {
      const pos = $(elem).find(".pos_lin>.pos").text();
      const def = [];
      $(elem)
        .find(".de_seg .se_lis .de_co")
        .each((_, elem) => {
          const gra = $(elem).find(".au_def>.gra").text();
          const comple = $(elem).find(".sen_com>.comple").text();
          const bil = $(elem).find(".def_pa>.bil").text();
          const val = $(elem).find(".def_pa>.val").text();
          def.push({
            gra,
            comple,
            bil,
            val,
          });
        });
      bilingual.push({
        pos,
        def,
      });
    });
  }

  const ee = [];
  const $ee = $("#homoid");
  if ($ee) {
    $ee.find(".def_row").each((_, elem) => {
      const pos = $(elem).find(".pos").text();
      const def = $(elem)
        .find(".def_fl .de_li1 .df_cr_w")
        .map((_, elem) => $(elem).text())
        .get();
      ee.push({
        pos,
        def,
      });
    });
  }

  const sentence = [];
  const $sentence = $("#sentenceSeg");
  if ($sentence) {
    $sentence.children(".se_li").each((_, elem) => {
      const sen_en = $(elem).find(".sen_en").text();
      const sen_cn = $(elem).find(".sen_cn").text();
      sentence.push({
        sen_en,
        sen_cn,
      });
    });
  }

  // const filterKeys = [
  //   "coll",
  //   "synonym",
  //   "antonym",
  //   "bilingual",
  //   "ee",
  //   "sentence",
  // ];

  return {
    word, //原始词
    search_word, //查询词
    result_word, //结果词
    tip, //提示
    phonetic_US, //音标
    phonetic_UK, //音标
    audio_US, //读音
    audio_UK, //读音
    translation, //翻译
    variant, // 相关词
    // coll, //搭配
    // synonym, //同义词
    // antonym, //反义词
    // bilingual, //英汉双解
    // ee, //英英
    // sentence, //例句
  };
};

/**
 * Bing翻译
 * @param {*} param0
 */
const translate = ({ q, tl = "zh-Hans" }) => {
  return api.bingTranslate({ q, tl });
};

export default {
  dict,
  translate,
};
