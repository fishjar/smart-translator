# Smart Translator

集成了多种翻译词典的后端翻译服务

## 支持翻译

- 词典
  - Bing 词典
  - 有道词典
- 翻译
  - 谷歌翻译
  - Bing 翻译
  - 有道翻译
  - DEEPL（待开发）

## 翻译系列自用项目

- 后端翻译服务（smart-translator）： https://github.com/fishjar/smart-translator
- 谷歌浏览器翻译插件（mihuan-translate）： https://github.com/fishjar/mihuan-translate
- VSCODE 翻译插件（vscode-translate）： https://github.com/fishjar/vscode-translate
- 命令行翻译（gotrans）： https://github.com/fishjar/go-translate

## 使用指引

```sh
# 创建并进入目录
mkdir smart-translator && cd "$_"

# 克隆项目
git clone https://github.com/fishjar/smart-translator.git .

# 安装依赖
yarn

# 更新依赖
yarn upgrade-interactive  --latest

# 开发
yarn dev

# 编译（清空dist文件夹+转码+压缩）
yarn build

# 启动编译后代码
yarn start

# 简易部署
sudo docker-compose up -d
```

## 返回示例

### 自动翻译

```sh
curl --location --request GET 'http://127.0.0.1:4000/smart/auto?q=query'
```

```json
{
  "q": "query",
  "sl": "en",
  "tl": "zh",
  "from": "dict",
  "res": [
    {
      "bot": "bing",
      "botName": "微软词典",
      "phoneticUS": "['kwɪri]",
      "phoneticUK": "['kwɪəri]",
      "audioUS": "https://dictionary.blob.core.chinacloudapi.cn/media/audio/tom/c3/59/C3597DD9CF6B0941D30975C6B947FF52.mp3",
      "audioUK": "https://dictionary.blob.core.chinacloudapi.cn/media/audio/george/c3/59/C3597DD9CF6B0941D30975C6B947FF52.mp3",
      "trans": [
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
      "variants": [
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
      ],
      "colls": [
        {
          "pos": "v.+n.",
          "def": ["answer query", "raise query"]
        }
      ],
      "synonyms": [
        {
          "pos": "v.",
          "def": ["question", "cast doubt on", "doubt", "suspect", "inquire"]
        },
        {
          "pos": "n.",
          "def": [
            "inquiry",
            "request",
            "interrogation",
            "uncertainty",
            "reservation"
          ]
        }
      ],
      "antonyms": [
        {
          "pos": "v.",
          "def": ["trust", "answer"]
        },
        {
          "pos": "n.",
          "def": ["certainty"]
        }
      ],
      "bilinguals": [
        {
          "pos": "n.",
          "def": [
            {
              "gra": "",
              "comple": "",
              "bil": "疑问；询问",
              "val": "a question, especially one asking for information or expressing a doubt about sth"
            },
            {
              "gra": "",
              "comple": "",
              "bil": "问号",
              "val": "a question mark to show that sth has not been finished or decided"
            }
          ]
        },
        {
          "pos": "v.",
          "def": [
            {
              "gra": "",
              "comple": "~ sth~ what, whether, etc.…",
              "bil": "怀疑；表示疑虑",
              "val": "to express doubt about whether sth is correct or not"
            },
            {
              "gra": "",
              "comple": "+ speech",
              "bil": "询问",
              "val": "to ask a question"
            }
          ]
        }
      ],
      "ees": [
        {
          "pos": "n.",
          "def": [
            "a request for information",
            "a doubt or criticism",
            "a question that you ask because you want information or because you are not certain about something"
          ]
        },
        {
          "pos": "v.",
          "def": [
            "to express doubts about, or objections to, something",
            "to ask something as a question",
            "inquire"
          ]
        }
      ]
    },
    {
      "bot": "youdao",
      "botName": "有道词典",
      "phoneticUS": "[ˈkwɪri]",
      "phoneticUK": "[ˈkwɪəri]",
      "trans": [
        {
          "pos": "n.",
          "def": "疑问，质问；疑问号；[计]查询"
        },
        {
          "pos": "vt.",
          "def": "询问；对……表示疑问"
        },
        {
          "pos": "vi.",
          "def": "询问；表示怀疑"
        }
      ],
      "variants": [
        {
          "pos": "复数",
          "def": "queries"
        },
        {
          "pos": "过去式",
          "def": "queried"
        },
        {
          "pos": "过去分词",
          "def": "queried"
        },
        {
          "pos": "现在分词",
          "def": "querying"
        },
        {
          "pos": "第三人称单数",
          "def": "queries"
        }
      ]
    }
  ]
}
```

```sh
curl --location --request GET 'http://127.0.0.1:4000/smart/translate?q=Filecoin%20is%20a%20peer-to-peer%20network%20that%20stores%20files%20on%20the%20internet,%20with%20built-in%20economic%20incentives%20to%20ensure%20files%20are%20stored%20reliably%20over%20time.%0A%0AAvailable%20storage%20and%20pricing%20is%20not%20controlled%20by%20any%20single%20company.%20Instead,%20Filecoin%20facilitates%20open%20markets%20for%20storing%20and%20retrieving%20files%20that%20anyone%20can%20participate%20in.'
```

```json
[
  {
    "bot": "google",
    "botName": "谷歌翻译",
    "trans": [
      "Filecoin是一个点对点网络，可将文件存储在Internet上，并具有内置的经济诱因，可确保随着时间的推移可靠地存储文件。\n\n",
      "可用的存储空间和价格不受任何一家公司的控制。",
      "相反，Filecoin促进了开放市场的存储和检索任何人都可以参与的文件。"
    ]
  },
  {
    "bot": "bing",
    "botName": "微软翻译",
    "trans": [
      "Filecoin 是一个点对点网络，可将文件存储在 Internet 上，具有内置的经济激励措施，可确保文件随着时间的推移可靠地存储。",
      "可用存储和定价不受任何单个公司控制。相反，Filecoin 有助于打开市场，用于存储和检索任何人都可以参与的文件。"
    ]
  },
  {
    "bot": "youdao",
    "botName": "有道翻译",
    "trans": [
      "Filecoin是在互联网上存储文件的对等网络，具有内置的经济激励机制，以确保文件长期可靠地存储。",
      "可用的存储和定价不受任何一家公司的控制。"
    ]
  }
]
```

### 谷歌翻译

```sh
curl --location --request GET 'http://127.0.0.1:4000/google/auto?q=guide'
```

```json
{
  "q": "guide",
  "sl": "en",
  "tl": "zh",
  "trans": "指南",
  "isWord": true
}
```

```sh
curl --location --request GET 'http://127.0.0.1:4000/google/auto?q=%E6%8C%87%E5%8D%97'
```

```json
{
  "q": "指南",
  "sl": "zh",
  "tl": "en",
  "trans": "guide",
  "isWord": false
}
```

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
  ],
  "coll": [
    {
      "pos": "v.+n.",
      "def": ["answer query", "raise query"]
    }
  ],
  "synonym": [
    {
      "pos": "v.",
      "def": ["question", "cast doubt on", "doubt", "suspect", "inquire"]
    },
    {
      "pos": "n.",
      "def": [
        "inquiry",
        "request",
        "interrogation",
        "uncertainty",
        "reservation"
      ]
    }
  ],
  "antonym": [
    {
      "pos": "v.",
      "def": ["trust", "answer"]
    },
    {
      "pos": "n.",
      "def": ["certainty"]
    }
  ],
  "bilingual": [
    {
      "pos": "n.",
      "def": [
        {
          "gra": "",
          "comple": "",
          "bil": "疑问；询问",
          "val": "a question, especially one asking for information or expressing a doubt about sth"
        },
        {
          "gra": "",
          "comple": "",
          "bil": "问号",
          "val": "a question mark to show that sth has not been finished or decided"
        }
      ]
    },
    {
      "pos": "v.",
      "def": [
        {
          "gra": "",
          "comple": "~ sth~ what, whether, etc.…",
          "bil": "怀疑；表示疑虑",
          "val": "to express doubt about whether sth is correct or not"
        },
        {
          "gra": "",
          "comple": "+ speech",
          "bil": "询问",
          "val": "to ask a question"
        }
      ]
    }
  ],
  "ee": [
    {
      "pos": "n.",
      "def": [
        "a request for information",
        "a doubt or criticism",
        "a question that you ask because you want information or because you are not certain about something"
      ]
    },
    {
      "pos": "v.",
      "def": [
        "to express doubts about, or objections to, something",
        "to ask something as a question",
        "inquire"
      ]
    }
  ],
  "sentence": [
    {
      "sen_en": "But since the temp tables had not been defined and realized in IWA, Informix handled the second query as a normal query.",
      "sen_cn": "但是，由于在IWA中无法定义和实现临时表，所以Informix像处理普通查询一样处理第二次查询。"
    },
    {
      "sen_en": "One of the earliest activities of the Query working group was to draw up a formal statement of requirements for an XML query language.",
      "sen_cn": "Query工作组的早期活动之一就是起草XML查询语言需求的正式声明。"
    },
    {
      "sen_en": "Clients can connect to it and query certain status or runtime information; at the moment only configuration items seem to be available.",
      "sen_cn": "客户端连接到系统中，查询特定状态或运行时信息；目前似乎只能获取配置项。"
    },
    {
      "sen_en": "It is possible to call any method in the context of a query expression.",
      "sen_cn": "可以在查询运算式的内容中呼叫任何方法。"
    },
    {
      "sen_en": "Within the body of a subquery, it is often necessary to refer to the value of a column in the active row of the main query.",
      "sen_cn": "在子查询的正文中，通常需要引用主查询的活动行中的列的值。"
    },
    {
      "sen_en": "To query the database, a user or application can connect to any server instance to which the database is attached.",
      "sen_cn": "若要查询数据库，用户或应用程序可以连接到任意一个附加有数据库的服务器实例。"
    },
    {
      "sen_en": "Click OK in the form of a query and you've indicated that you are prepared to pay for a database operation.",
      "sen_cn": "点击查询表单的OK按钮，表示你确定准备为GAE的数据库操作而付费。"
    },
    {
      "sen_en": "One of my tests used a query to select records into a temp table and then a second query to further refine the results from the temp tables.",
      "sen_cn": "我的一个测试中使用了一个查询，该查询将一些记录挑选出来放入一个临时表中，然后另一个查询将进一步筛选临时表中的结果。"
    },
    {
      "sen_en": "If you do this, you will not be able to limit the data sources to which data mining model users can query.",
      "sen_cn": "如果执行此操作，将无法限制数据挖掘模型用户可以查询的数据源。"
    },
    {
      "sen_en": "Typically, REST forms a request by beginning with a service entry URL and then appending search parameters in the form of a query string.",
      "sen_cn": "REST通常从服务入口URL开始形成一次请求，然后以查询字符串的形式追加搜索参数。"
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
