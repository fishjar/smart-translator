import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import AbortController from "abort-controller";
import logger from "../utils/logger";

// cookie暂时无用
const fetch = fetchCookie(nodeFetch);

/**
 * request封装
 */
export default async (url, options, resType = "json") => {
  console.log("---------->");
  console.log(url);
  console.log(options);
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);
  let result = null;
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      method: "GET",
      ...options,
    });
    console.log("<----------");
    console.log(res.ok);
    console.log(res.status);
    console.log(res.statusText);
    console.log(res.headers.raw());
    console.log(res.headers.get("content-type"));
    if (!res.ok) {
      throw new Error(`[${res.status}]${res.statusText}`);
    }
    // res.status >= 200 && res.status < 300
    switch (resType) {
      case "json":
        result = await res.json();
        console.log(result);
        break;
      case "text":
        result = await res.text();
        break;
      case "buffer":
        result = await res.buffer();
        break;
      default:
        throw new Error(`不支持的返回格式${resType}`);
    }
  } catch (err) {
    if (err.name === "AbortError") {
      logger.error(
        `[request请求超时] ${JSON.stringify({
          url,
          message: err.message,
        })}`
      );
    } else {
      logger.error(
        `[request请求错误] ${JSON.stringify({
          url,
          message: err.message,
        })}`
      );
    }
  } finally {
    clearTimeout(timeout);
  }
  return result;
};
