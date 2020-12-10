import service from "../service";

/**
 * 有道翻译
 * @param {*} ctx
 * @param {*} next
 */
const translate = async (ctx, next) => {
  // tl="AUTO"
  let { q, tl } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.youdao.translate({ q, tl });
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

/**
 * 有道词典
 * @param {*} ctx
 * @param {*} next
 */
const dict = async (ctx, next) => {
  let { q } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.youdao.dict({ q });
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

export default {
  translate,
  dict,
};
