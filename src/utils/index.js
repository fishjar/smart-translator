import crypto from "crypto";

/**
 * 工具函数示例
 */
const foo = () => {
  return "bar";
};

const md5 = (text) => crypto.createHash("md5").update(text).digest("hex");

const youdaoSign = (text, userAgent) => {
  const ts = Date.now().toString();
  const salt = ts + parseInt(10 * Math.random(), 10);
  return {
    ts,
    bv: md5(userAgent),
    salt,
    sign: md5("fanyideskweb" + text + salt + "Tbh5E8=q6U3EXe+&L[4c@"),
  };
};

export default {
  foo,
  md5,
  youdaoSign,
};
