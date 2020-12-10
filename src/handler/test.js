import api from "../api";

/**
 * 测试请求网络数据
 * @param {*} ctx
 * @param {*} next
 */
const fetch = async (ctx, next) => {
  const res = await api.fetchTest();
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;

  await next();
};

export default {
  fetch,
};
