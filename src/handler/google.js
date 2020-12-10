import service from "../service";

/**
 * 谷歌翻译
 * @param {*} ctx
 * @param {*} next
 */
const translate = async (ctx, next) => {
  // tl="zh_CN","en"
  let { q, tl } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.google.translate({ q, tl });
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

export default {
  translate,
};
