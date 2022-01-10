import qs from "querystring";
import FormData from "form-data";
import { URLSearchParams } from "url";
import rq from "./request";
import utils from "../utils";

const getDeeplID = utils.deeplID();

/**
 * 请求示例
 */
const fetchTest = () => {
  return rq("https://api.github.com", {
    headers: {
      "User-Agent": "Request-Promise",
    },
  });
};

/**
 * 谷歌翻译
 * @param {*} q
 * @param {*} tl
 */
const googleTranslate = (q, tl = "zh-CN") => {
  // 参数	说明
  // client	必要参数，填写 gtx 即可
  // dt	必要参数，填写 t 即可
  // dj	必要参数，填写 1 即可
  // ie	必要参数，填写 UTF-8 即可
  // sl	转换前的语言设置，auto为自动识别
  // tl	转换后的语言设置，值为语言的简称（例：中文简体为zh_CN）
  // q	要转换的文字
  const qsStr = qs.stringify({
    client: "gtx",
    dt: "t",
    dj: 1,
    ie: "UTF-8",
    sl: "auto",
    q,
    tl,
  });
  return rq(`https://translate.google.cn/translate_a/single?${qsStr}`);
};

/**
 * DEEPL分句
 * @param {*} q
 */
const deeplSplit = (q) => {
  return rq("https://www2.deepl.com/jsonrpc", {
    method: "POST",
    headers: {
      authority: "www2.deepl.com",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      "content-type": "application/json",
      accept: "*/*",
      origin: "https://www.deepl.com",
      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: "https://www.deepl.com/zh/translator",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
      // cookie:
      //   "__cfduid=db5b63fa4369a506cf9a69494308358451607563344; LMTBID=v2|2e9e8bfc-b5b1-46d1-ae14-51c63be103a2|0a0a26b7fae56e332a747c4201d129e8; privacySettings=%7B%22v%22%3A%221%22%2C%22t%22%3A1607558400%2C%22m%22%3A%22LAX%22%2C%22consent%22%3A%5B%22NECESSARY%22%2C%22PERFORMANCE%22%2C%22COMFORT%22%5D%7D; LMTBID=v2|a5b4647a-38ab-4780-8ac1-5fea6f2e8219|6636900d0780758b1a95db855c22a859",
    },
    body: JSON.stringify({
      id: getDeeplID(),
      jsonrpc: "2.0",
      method: "LMT_split_into_sentences",
      params: {
        texts: [q],
        lang: {
          lang_user_selected: "auto",
          user_preferred_langs: [],
        },
      },
    }),
  });
};

/**
 * DEEPL翻译
 * @param {*} q
 * @param {*} tl
 */
const deeplTranslate = (q, tl = "ZH") => {
  return rq("https://www2.deepl.com/jsonrpc", {
    method: "POST",
    headers: {
      authority: "www2.deepl.com",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      "content-type": "application/json",
      accept: "*/*",
      origin: "https://www.deepl.com",
      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: "https://www.deepl.com/zh/translator",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
      cookie:
        "__cfduid=db5b63fa4369a506cf9a69494308358451607563344; LMTBID=v2|2e9e8bfc-b5b1-46d1-ae14-51c63be103a2|0a0a26b7fae56e332a747c4201d129e8; privacySettings=%7B%22v%22%3A%221%22%2C%22t%22%3A1607558400%2C%22m%22%3A%22LAX%22%2C%22consent%22%3A%5B%22NECESSARY%22%2C%22PERFORMANCE%22%2C%22COMFORT%22%5D%7D; LMTBID=v2|a5b4647a-38ab-4780-8ac1-5fea6f2e8219|6636900d0780758b1a95db855c22a859",
    },
    body: JSON.stringify({
      id: getDeeplID(),
      jsonrpc: "2.0",
      method: "LMT_handle_jobs",
      params: {
        jobs: [
          {
            kind: "default",
            raw_en_sentence: q,
            raw_en_context_before: [],
            raw_en_context_after: [],
            preferred_num_beams: 4,
            quality: "fast",
          },
        ],
        lang: {
          user_preferred_langs: ["DE", "ZH", "EN"],
          source_lang_user_selected: "auto",
          target_lang: tl,
        },
        priority: -1,
        commonJobParams: { formality: null },
        timestamp: Date.now(),
      },
    }),
  });
};

/**
 * 百度语言识别
 * @param {*} q
 */
const baiduLangDetect = (q) => {
  const form = new FormData();
  form.append("query", q);
  return rq("https://fanyi.baidu.com/langdetect", {
    method: "POST",
    headers: form.getHeaders(),
    body: form,
  });
};

/**
 * Bing翻译
 * @param {*} q
 * @param {*} tl "zh-Hans","en"
 */
const bingTranslate = (q, tl = "zh-Hans") => {
  const params = new URLSearchParams();
  params.append("fromLang", "auto-detect");
  params.append("text", q);
  params.append("to", tl);
  return rq("https://cn.bing.com/ttranslatev3", {
    method: "POST",
    headers: {
      authority: "cn.bing.com",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
    },
    body: params,
  });
};

/**
 * Bing词典
 * @param {*} q
 */
const bingDict = (q) => {
  const qsStr = qs.stringify({ q });
  return rq(
    `https://cn.bing.com/dict/search?${qsStr}`,
    {
      headers: {
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "accept-language": "en-US,en;q=0.9",
        "cookie": "MUID=3E35C995521769E033AFC67753D7683D; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=B3CDC3B4632D40A5A945AE2753C16854&dmnchg=1; _EDGE_V=1; _RwBf=ilt=1&ihpd=1&ispd=0&rc=0&rb=0&gb=0&rg=0&pc=0&mtu=0&rbb=0&g=0&cid=&v=1&l=2021-12-17T08:00:00.0000000Z&lft=00010101&aof=0&o=2&p=&c=&t=0&s=0001-01-01T00:00:00.0000000+00:00&ts=2021-12-17T09:25:42.8902893+00:00&rwred=0; _SS=SID=227E58D1D47C6B250B3D5733D5BC6AED&R=0&RB=0&GB=0&RG=0&RP=0; _EDGE_S=F=1&SID=107B2326583D60212019323659E46159&mkt=zh-cn; ENSEARCH=BENVER=0; _HPVN=CS=eyJQbiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMS0xMi0xN1QwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6MTF9; SUID=M; MUIDB=3E35C995521769E033AFC67753D7683D; SRCHUSR=DOB=20210218&T=1641797232000&TPC=1641797232000; ipv6=hit=1641800834158&t=4; SuspenBar=CLOSE=1; SRCHHPGUSR=SRCHLANG=en&BRW=M&BRH=T&CW=1272&CH=1328&SW=2560&SH=1440&DPR=1&UTC=480&DM=0&WTS=63777394032&HV=1641800029&BZA=0",
      },
    },
    "text"
  );
};

/**
 * 有道翻译
 * @param {*} q
 * @param {*} tl
 */
const youdaoTranslate = (q, tl = "AUTO") => {
  const userAgent =
    "5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36";
  const s = utils.youdaoSign(q, userAgent);
  const params = new URLSearchParams();
  params.append("i", q);
  params.append("from", "AUTO");
  params.append("to", tl);
  params.append("smartresult", "dict");
  params.append("client", "fanyideskweb");
  params.append("salt", s.salt);
  params.append("sign", s.sign);
  params.append("lts", s.ts);
  params.append("bv", s.bv);
  params.append("doctype", "json");
  params.append("version", "2.1");
  params.append("keyfrom", "fanyi.web");
  params.append("action", "FY_BY_CLICKBUTTION");
  return rq(
    `http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule`,
    {
      method: "POST",
      headers: {
        "User-Agent": userAgent,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "http://fanyi.youdao.com",
        Referer: "http://fanyi.youdao.com/",
        Cookie: "OUTFOX_SEARCH_USER_ID=823260787@119.147.183.50;",
      },
      body: params,
    }
  );
};

/**
 * 有道词典
 * @param {*} q
 */
const youdaoDict = (q) => {
  return rq(
    `https://m.youdao.com/dict?le=eng&q=${encodeURI(q)}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
      },
    },
    "text"
  );
};

export default {
  fetchTest,
  googleTranslate,
  bingTranslate,
  deeplTranslate,
  deeplSplit,
  baiduLangDetect,
  bingDict,
  youdaoTranslate,
  youdaoDict,
};
