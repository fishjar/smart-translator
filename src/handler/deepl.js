import service from "../service";

/**
 * DEEPL翻译
 * @param {*} ctx
 * @param {*} next
 */
const translate = async (ctx, next) => {
  // tl="zh_CN","en"
  let { q, tl } = ctx.query;
  q = q && q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.deepl.translate(q, tl);
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

/**
 * DEEPL分句
 * @param {*} ctx
 * @param {*} next
 */
const splitInto = async (ctx, next) => {
  // tl="zh_CN","en"
  let { q, tl } = ctx.query;
  q = q && q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.deepl.splitInto(q, tl);
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

export default {
  translate,
  splitInto,
};
