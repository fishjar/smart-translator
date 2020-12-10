import service from "../service";

/**
 * Bing词典
 * @param {*} ctx
 * @param {*} next
 */
const dict = async (ctx, next) => {
  let { q } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.bing.dict({ word: q });
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
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
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.bing.translate({ q, tl });
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

export default {
  dict,
  translate,
};
