import app from "./app";
import config from "./config";

const { APP_PORT } = config;

(async () => {
  try {
    // 启动服务
    app.listen(APP_PORT);
    console.log(`\n>>> app run at port: ${APP_PORT} <<<\n`);
  } catch (err) {
    console.log(err);
    console.log("\n程序启动出错\n");
  }
})();
