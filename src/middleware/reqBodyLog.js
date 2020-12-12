import logger from "../utils/logger";

export default () =>
  async function reqBodyLog(ctx, next) {
    // 记录request信息
    logger.info(
      `[请求信息] ${JSON.stringify({
        method: ctx.method,
        href: ctx.href,
        ip: ctx.ip,
        headers: ctx.headers,
      })}`
    );

    // 记录请求的body信息
    // logger.info(
    //   `[请求的body信息] ${JSON.stringify({
    //     body: ctx.request.body,
    //   })}`
    // );

    await next();

    // 记录response信息
    logger.debug(
      `[返回信息] ${JSON.stringify({
        body: ctx.body,
      })}`
    );
  };
