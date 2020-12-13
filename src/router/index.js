import Router from "koa-router";
import handler from "../handler";

const router = new Router();

router
  .get("/google/translate", handler.google.translate)
  .get("/google/auto", handler.google.auto)
  .get("/deepl/translate", handler.deepl.translate)
  .get("/deepl/splitinto", handler.deepl.splitInto)
  .get("/baidu/langdetect", handler.baidu.langDetect)
  .get("/bing/dict", handler.bing.dict)
  .get("/bing/dictf", handler.bing.dictf)
  .get("/bing/translate", handler.bing.translate)
  .get("/youdao/translate", handler.youdao.translate)
  .get("/youdao/dict", handler.youdao.dict)
  .get("/smart/dict", handler.smart.dict)
  .get("/smart/translate", handler.smart.translate)
  .get("/smart/auto", handler.smart.auto)
  .get("/test/fetch", handler.test.fetch);

export default router;
