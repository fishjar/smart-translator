# Smart Translator

## 支持翻译

- 词典
  - Bing 词典
  - 有道词典
- 翻译
  - 谷歌翻译
  - Bing 翻译
  - 有道翻译
  - DEEPL（待开发）

## 返回示例

### 谷歌翻译

```sh
curl --location --request GET 'http://127.0.0.1:4000/google/translate?q=query'
```

```json
{
  "sentences": [
    {
      "trans": "询问",
      "orig": "query",
      "backend": 3,
      "model_specification": [{}],
      "translation_engine_debug_info": [
        {
          "model_tracking": {
            "checkpoint_md5": "b3ad15e7a0073e77814019b341d18493",
            "launch_doc": "en_zh_2019q3.md"
          }
        }
      ]
    }
  ],
  "src": "en",
  "confidence": 0.9609375,
  "spell": {},
  "ld_result": {
    "srclangs": ["en"],
    "srclangs_confidences": [0.9609375],
    "extended_srclangs": ["en"]
  }
}
```

```sh
curl --location --request GET 'http://127.0.0.1:4000/google/translate?q=%E4%B8%AD%E5%9B%BD&tl=en'
```

```json
{
  "sentences": [
    {
      "trans": "China",
      "orig": "中国",
      "backend": 2
    }
  ],
  "src": "zh-CN",
  "confidence": 0.98307294,
  "spell": {},
  "ld_result": {
    "srclangs": ["zh-CN"],
    "srclangs_confidences": [0.98307294],
    "extended_srclangs": ["zh-CN"]
  }
}
```

```sh
curl --location --request GET 'http://127.0.0.1:4000/google/translate?q=The%20above%20example%20creates%20a%20multisig%20wallet%20with%20three%20signers%20but%20only%20requires%20two%20approvals%20for%20a%20transaction%20to%20be%20executed.'
```

```json
{
  "sentences": [
    {
      "trans": "上面的示例创建了一个带有三个签名者的多重签名钱包，但是只需要两个批准就可以执行交易。",
      "orig": "The above example creates a multisig wallet with three signers but only requires two approvals for a transaction to be executed.",
      "backend": 3,
      "model_specification": [{}],
      "translation_engine_debug_info": [
        {
          "model_tracking": {
            "checkpoint_md5": "b3ad15e7a0073e77814019b341d18493",
            "launch_doc": "en_zh_2019q3.md"
          }
        }
      ]
    }
  ],
  "src": "en",
  "confidence": 1,
  "spell": {},
  "ld_result": {
    "srclangs": ["en"],
    "srclangs_confidences": [1],
    "extended_srclangs": ["en"]
  }
}
```

### 百度语言识别

```sh
curl --location --request GET 'http://127.0.0.1:4000/baidu/langdetect?q=query'
```

```json
{
  "error": 0,
  "msg": "success",
  "lan": "en"
}
```

```sh
curl --location --request GET 'http://127.0.0.1:4000/baidu/langdetect?q=%E4%B8%AD%E5%9B%BD'
```

```json
{
  "error": 0,
  "msg": "success",
  "lan": "zh"
}
```

### Bing 词典

```sh
curl --location --request GET 'http://127.0.0.1:4000/bing/dict?q=query'
```

```json
{
  "word": "query",
  "search_word": "query",
  "result_word": "query",
  "tip": "",
  "phonetic_US": "['kwɪri]",
  "phonetic_UK": "['kwɪəri]",
  "audio_US": "https://dictionary.blob.core.chinacloudapi.cn/media/audio/tom/c3/59/C3597DD9CF6B0941D30975C6B947FF52.mp3",
  "audio_UK": "https://dictionary.blob.core.chinacloudapi.cn/media/audio/george/c3/59/C3597DD9CF6B0941D30975C6B947FF52.mp3",
  "translation": [
    {
      "pos": "n.",
      "def": "询问；疑问；问号"
    },
    {
      "pos": "v.",
      "def": "询问；怀疑；表示疑虑"
    },
    {
      "pos": "Web",
      "def": "查询；质问；问题"
    }
  ],
  "variant": [
    {
      "pos": "Plural Form",
      "def": "queries"
    },
    {
      "pos": "Past Participle",
      "def": "queried"
    },
    {
      "pos": "Present Participle",
      "def": "querying"
    }
  ]
}
```

### Bing 翻译

```sh
curl --location --request GET 'http://127.0.0.1:4000/bing/translate?q=The%20above%20example%20creates%20a%20multisig%20wallet%20with%20three%20signers%20but%20only%20requires%20two%20approvals%20for%20a%20transaction%20to%20be%20executed.'
```

```json
[
  {
    "detectedLanguage": {
      "language": "en",
      "score": 1
    },
    "translations": [
      {
        "text": "上述示例创建一个带三个签名者的多西格钱包，但只需执行两个审批。",
        "transliteration": {
          "text": "shàng shù shì lì chuàng jiàn yí gè dài sān gè qiān míng zhě de duō xī gé qián bāo ， dàn zhǐ xū zhí xíng liǎng gè shěn pī。",
          "script": "Latn"
        },
        "to": "zh-Hans",
        "sentLen": {
          "srcSentLen": [128],
          "transSentLen": [31]
        }
      }
    ]
  }
]
```

### 有道词典

```sh
curl --location --request GET 'http://127.0.0.1:4000/youdao/dict?q=query'
```

```json
{
  "phonetic_UK": "[ˈkwɪəri]",
  "phonetic_US": "[ˈkwɪri]",
  "translation": [
    "n. 疑问，质问；疑问号 ；[计] 查询",
    "vt. 询问；对……表示疑问",
    "vi. 询问；表示怀疑"
  ],
  "variant": [
    "复数 queries",
    "过去式 queried",
    "过去分词 queried",
    "现在分词 querying",
    "第三人称单数 queries"
  ]
}
```

### 有道翻译

```sh
curl --location --request GET 'http://127.0.0.1:4000/youdao/translate?q=The%20above%20example%20creates%20a%20multisig%20wallet%20with%20three%20signers%20but%20only%20requires%20two%20approvals%20for%20a%20transaction%20to%20be%20executed.'
```

```json
{
  "translateResult": [
    [
      {
        "tgt": "上面的示例创建了一个具有三个签署人的multisig钱包，但是执行一个事务只需要两个批准。",
        "src": "The above example creates a multisig wallet with three signers but only requires two approvals for a transaction to be executed."
      }
    ]
  ],
  "errorCode": 0,
  "type": "en2zh-CHS"
}
```

## 使用指引

```sh
# 创建并进入目录
mkdir smart-translator && cd "$_"

# 克隆项目
git clone https://github.com/fishjar/smart-translator.git .

# 安装依赖
yarn

# 开发
yarn dev

# 编译（清空dist文件夹+转码+压缩）
yarn build

# 启动编译后代码
yarn start

# 简易部署
sudo docker-compose up -d
```
