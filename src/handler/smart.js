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
  let { q, tl } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");
  const res = await service.smart.translate(q, tl);
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;
  await next();
};

/**
 * 自动翻译/字典
 * @param {*} ctx
 * @param {*} next
 */
const auto = async (ctx, next) => {
  // sl: "en","zh"
  let { q } = ctx.query;
  q = q.trim();
  ctx.assert(q, 400, "参数q不能为空");

  const lang = await service.baidu.langDetect(q);
  ctx.assert(lang, 500, "语言自动识别失败");

  const sl = lang.lan || "zh";
  const isWord = !q.includes(" ");

  if (sl === "en" && isWord) {
    // 单个英文单词
    const tl = "zh";
    const res = await service.smart.dict(q, tl);
    ctx.assert(res, 500, "未获取到数据");
    ctx.body = { q, sl, tl, isWord, res };
  } else {
    // 句子或中文
    const tl = sl === "zh" ? "en" : "zh";
    const res = await service.smart.translate(q, tl);
    ctx.assert(res, 500, "未获取到数据");
    ctx.body = { q, sl, tl, isWord, res };
  }

  await next();
};

export default {
  dict,
  translate,
  auto,
};
