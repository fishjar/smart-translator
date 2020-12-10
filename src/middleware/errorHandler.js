import logger from "../utils/logger";

export default () =>
  async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 记录错误信息
      logger.error(
        `[全局错误] ${JSON.stringify({
          auth: ctx.state.user,
          err: err.toJSON ? err.toJSON() : err,
        })}`
      );

      ctx.status = err.statusCode || 500;
      ctx.body = { message: err.message || "服务器错误" };
      // ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err };
    }
  };
