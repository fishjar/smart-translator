import service from "../service";

/**
 * 百度语言识别
 * @param {*} ctx
 * @param {*} next
 */
const langDetect = async (ctx, next) => {
  let { q } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.baidu.langDetect(q);
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

export default {
  langDetect,
};
