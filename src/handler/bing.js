import service from "../service";

/**
 * Bing词典
 * @param {*} ctx
 * @param {*} next
 */
const dict = async (ctx, next) => {
  let { q } = ctx.query;
  q = q && q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.bing.dict(q);
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

/**
 * Bing词典
 * @param {*} ctx
 * @param {*} next
 */
const dictf = async (ctx, next) => {
  let { q } = ctx.query;
  q = q && q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.bing.dict(q);
  ctx.assert(res, 500, "未获取到数据");
  const data = {
    bot: "bing",
    botName: "微软词典",
    searchWord: res["search_word"],
    resultWord: res["result_word"],
    phoneticUS: res["phonetic_US"],
    phoneticUK: res["phonetic_UK"],
    audioUS: res["audio_US"],
    audioUK: res["audio_UK"],
    trans: res.translation,
    variants: res.variant,
    colls: res.coll,
    synonyms: res.synonym,
    antonyms: res.antonym,
    bilinguals: res.bilingual,
    ees: res.ee,
    sentences: res.sentence,
  };
  ctx.body = data;
  await next();
};

/**
 * Bing翻译
 * @param {*} ctx
 * @param {*} next
 */
const translate = async (ctx, next) => {
  // tl="zh-Hans","en"
  let { q, tl } = ctx.query;
  q = q && q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.bing.translate(q, tl);
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

export default {
  dict,
  dictf,
  translate,
};
