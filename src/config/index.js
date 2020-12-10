import path from "path";
import developmentConfig from "./config.development";
import testConfig from "./config.test";
import productionConfig from "./config.production";

// 运行环境
const NODE_ENV = process.env.NODE_ENV || "development";

// 默认配置
const defaultConfig = {
  NODE_ENV,
  APP_ROOT: path.resolve(__dirname, "../"), // 项目所在根目录
  APP_PORT: process.env.APP_PORT || "4000", // 运行端口
  LOG_LEVEL: "debug", // 最低日志级别
};

// 运行环境配置
const configMap = {
  development: developmentConfig, // 开发环境配置
  test: testConfig, // 测试环境配置
  production: productionConfig, // 生产环境配置
};

// 合并配置
const config = { ...defaultConfig, ...configMap[NODE_ENV] };

export default config;
