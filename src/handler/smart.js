import service from "../service";

/**
 * 词典
 * @param {*} ctx
 * @param {*} next
 */
const dict = async (ctx, next) => {
  let { q, tl } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.smart.dict(q, tl);
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

/**
 * 翻译
 * @param {*} ctx
 * @param {*} next
 */
const translate = async (ctx, next) => {
  // tl="zh-Hans","en"
  let { q, tl } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.smart.translate(q, tl);
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

export default {
  dict,
  translate,
};
