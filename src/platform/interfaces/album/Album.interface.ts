import { Schema, connection, Document } from 'mongoose'
import { ISong } from '../song'
import { ISinger } from '../singer'
export interface IAlbum extends Document {
  _id: string
  // 专辑名称
  name: string
  // 歌曲列表
  songs?: Array<ISong>
  // 发表时间
  public_date?: Date
  // 唱片公司
  company?: string
  // 歌曲数量
  count?: number
  // 专辑简介
  desc?: string
  // 歌手
  singer: ISinger
}

let example = {
  "data": {
    "aDate": "2011-11-11",
    "color": 14737632,
    "company": "环球唱片",
    "company_new": {
      "brief": "",
      "headPic": "http://y.gtimg.cn/music/common/upload/t_company_picture/37155.jpg",
      "id": 35,
      "is_show": 1,
      "name": "环球唱片"
    },
    "cur_song_num": 13,
    "desc": "各样情绪皆美 只待你一一认识\n陈奕迅游走各种角色 说唱人性不同面\n《？》一张等你开发的国语专辑\n11月11日 随你寻找答案\n\n人生历练越多，脑里问号亦增多。面对百般人性的问题，你会作出怎样的答案？陈奕迅最新国语专辑《？》，带入不同的角色，游走说唱人生不同面。《张氏情歌 / 哎呀咿呀》的声嘶力竭情感泛滥；《看穿 / 神奇化妆师》以旁观者角度分析诸君面孔，都令你我从新探讨人性，研究各色情绪。不是要分辨黑白推翻丑美，却是要领略喜恶贪嗔痴的、人类独有的复杂情感机能。而每一个问号套入每一首歌里，都变成一样的情绪研讨题目。\n\n这次国语专辑，找来华语乐坛顶尖音乐人合作，包括方大同、蓝又时、陈焕仁、陈小霞、叶广权、Edward Chan、Charles Lee、小克、周国贤、Goro、唐奕聪、梁荣骏、曾纪诺、黄丹仪、岑宁儿、John Laudon、姚谦、何秉舜、Adrian Fu、刘志远、 Jim Lee、姚若龙、Keith Chan等制作。9首国语作品、加上2首广东歌及1首英文歌，交织成令人回味的《？》。这个问号也包含着Eason对人生的态度，无时无刻都要考量一下身边的生态，带着好奇心去理解种种事物，总会想到、学到更多。\n\n陈奕迅全新国语专辑《？》，等待你倾听人性的故事，答案如何？让陈奕迅带你一起开发。",
    "genre": "Pop 流行",
    "id": 87048,
    "lan": "国语",
    "list": [
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 1,
        "cdIdx": 0,
        "interval": 272,
        "isonly": 0,
        "label": "5764607523042623489",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 48500,
          "tryend": 89430,
          "trysize": 655777
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 4366316,
        "size320": 10940321,
        "size5_1": 0,
        "sizeape": 30168047,
        "sizeflac": 30320415,
        "sizeogg": 5788163,
        "songid": 1021078,
        "songmid": "00184ejM4XouuN",
        "songname": "孤独患者",
        "songorig": "孤独患者",
        "songtype": 0,
        "strMediaMid": "00184ejM4XouuN",
        "stream": 4,
        "switch": 603959,
        "type": 0,
        "vid": ""
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 2,
        "cdIdx": 0,
        "interval": 252,
        "isonly": 0,
        "label": "4611686153727246337",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 4047413,
        "size320": 10113807,
        "size5_1": 0,
        "sizeape": 27218139,
        "sizeflac": 27132812,
        "sizeogg": 5364243,
        "songid": 1025920,
        "songmid": "002ifrBg2d8O86",
        "songname": "哎呀咿呀",
        "songorig": "哎呀咿呀",
        "songtype": 0,
        "strMediaMid": "002ifrBg2d8O86",
        "stream": 8,
        "switch": 603959,
        "type": 0,
        "vid": ""
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 3,
        "cdIdx": 0,
        "interval": 222,
        "isonly": 0,
        "label": "4611686018435776513",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 3568723,
        "size320": 8921526,
        "size5_1": 0,
        "sizeape": 21635400,
        "sizeflac": 21757282,
        "sizeogg": 4497544,
        "songid": 1005344,
        "songmid": "003MpQfl4NsHTC",
        "songname": "看穿",
        "songorig": "看穿",
        "songtype": 0,
        "strMediaMid": "003FGA382VwZfq",
        "stream": 4,
        "switch": 603959,
        "type": 0,
        "vid": "a0090y2hVAk"
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 4,
        "cdIdx": 0,
        "interval": 286,
        "isonly": 0,
        "label": "5764607523042623489",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 4587294,
        "size320": 11467947,
        "size5_1": 0,
        "sizeape": 31698562,
        "sizeflac": 31709405,
        "sizeogg": 6033815,
        "songid": 1025918,
        "songmid": "000bsqVZ2rdpuk",
        "songname": "吟游诗人",
        "songorig": "吟游诗人",
        "songtype": 0,
        "strMediaMid": "004WpphP4NcK7U",
        "stream": 8,
        "switch": 603959,
        "type": 0,
        "vid": ""
      },
      {
        "albumdesc": "《哎呀咿呀》粤语版",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 5,
        "cdIdx": 0,
        "interval": 246,
        "isonly": 0,
        "label": "4611686153727246338",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 3949070,
        "size320": 9872388,
        "size5_1": 0,
        "sizeape": 26253950,
        "sizeflac": 26358395,
        "sizeogg": 5028457,
        "songid": 943349,
        "songmid": "002kQ0Kj0Nqcff",
        "songname": "张氏情歌",
        "songorig": "张氏情歌",
        "songtype": 0,
        "strMediaMid": "003tB5u00WqY5h",
        "stream": 2,
        "switch": 603959,
        "type": 0,
        "vid": "s0013fsx41m"
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 6,
        "cdIdx": 0,
        "interval": 198,
        "isonly": 0,
        "label": "4611686153727246337",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 3177527,
        "size320": 7943516,
        "size5_1": 0,
        "sizeape": 15449399,
        "sizeflac": 15539486,
        "sizeogg": 3876509,
        "songid": 1021075,
        "songmid": "002KShBl2pwWoD",
        "songname": "Baby Song",
        "songorig": "Baby Song",
        "songtype": 0,
        "strMediaMid": "0009oY8T4SiMBC",
        "stream": 4,
        "switch": 603959,
        "type": 0,
        "vid": "q0010QKzBe5"
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 7,
        "cdIdx": 0,
        "interval": 319,
        "isonly": 0,
        "label": "4611686153727246337",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 5114881,
        "size320": 12783521,
        "size5_1": 0,
        "sizeape": 36481706,
        "sizeflac": 36861735,
        "sizeogg": 7425177,
        "songid": 1025919,
        "songmid": "002QEObi2IeYq9",
        "songname": "听一千遍后",
        "songorig": "听一千遍后",
        "songtype": 0,
        "strMediaMid": "002QEObi2IeYq9",
        "stream": 8,
        "switch": 603959,
        "type": 0,
        "vid": ""
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 8,
        "cdIdx": 0,
        "interval": 240,
        "isonly": 0,
        "label": "4611686153723052033",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 71401,
          "tryend": 117116,
          "trysize": 732681
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 3845830,
        "size320": 9614040,
        "size5_1": 0,
        "sizeape": 26198824,
        "sizeflac": 26380808,
        "sizeogg": 5189666,
        "songid": 104362682,
        "songmid": "001dOQx60k8FhC",
        "songname": "内疚",
        "songorig": "内疚",
        "songtype": 0,
        "strMediaMid": "001dOQx60k8FhC",
        "stream": 8,
        "switch": 603959,
        "type": 0,
        "vid": "k0090OSAaO0"
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 9,
        "cdIdx": 0,
        "interval": 353,
        "isonly": 0,
        "label": "4611686018431582209",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 5653509,
        "size320": 14133483,
        "size5_1": 0,
        "sizeape": 38340365,
        "sizeflac": 38529128,
        "sizeogg": 7736757,
        "songid": 1025470,
        "songmid": "001tiYlS25GCeS",
        "songname": "还要不要走",
        "songorig": "还要不要走",
        "songtype": 0,
        "strMediaMid": "000FuhSI0osx8i",
        "stream": 4,
        "switch": 603959,
        "type": 0,
        "vid": ""
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 10,
        "cdIdx": 0,
        "interval": 257,
        "isonly": 0,
        "label": "4611686018435776513",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 4121265,
        "size320": 10302882,
        "size5_1": 0,
        "sizeape": 30102200,
        "sizeflac": 30088313,
        "sizeogg": 5781723,
        "songid": 1023386,
        "songmid": "00230iSl1e4dVG",
        "songname": "积木",
        "songorig": "积木",
        "songtype": 0,
        "strMediaMid": "0016fqiS34dowZ",
        "stream": 4,
        "switch": 603959,
        "type": 0,
        "vid": "9NswS2fLAIl"
      },
      {
        "albumdesc": "《看穿》粤语版",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 11,
        "cdIdx": 0,
        "interval": 224,
        "isonly": 0,
        "label": "4611686018431582210",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 31,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 3593092,
        "size320": 8950836,
        "size5_1": 0,
        "sizeape": 22629822,
        "sizeflac": 22788967,
        "sizeogg": 4725485,
        "songid": 1021720,
        "songmid": "0000VEJa01ABzv",
        "songname": "神奇化妆师",
        "songorig": "神奇化妆师",
        "songtype": 0,
        "strMediaMid": "0000VEJa01ABzv",
        "stream": 4,
        "switch": 603959,
        "type": 0,
        "vid": "c0090fgk8xg"
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 12,
        "cdIdx": 0,
        "interval": 261,
        "isonly": 0,
        "label": "4611686018431582224",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 7,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 4179377,
        "size320": 10448138,
        "size5_1": 0,
        "sizeape": 0,
        "sizeflac": 0,
        "sizeogg": 5860399,
        "songid": 1025922,
        "songmid": "001stIbK2UncSJ",
        "songname": "Muffin Man",
        "songorig": "Muffin Man",
        "songtype": 0,
        "strMediaMid": "001fUceS3aMpmv",
        "stream": 8,
        "switch": 603959,
        "type": 0,
        "vid": ""
      },
      {
        "albumdesc": "",
        "albumid": 87048,
        "albummid": "003YQ8lP3NBXKl",
        "albumname": "?",
        "alertid": 11,
        "belongCD": 13,
        "cdIdx": 0,
        "interval": 262,
        "isonly": 0,
        "label": "4611686153723052033",
        "msgid": 0,
        "pay": {
          "payalbum": 0,
          "payalbumprice": 0,
          "paydownload": 0,
          "payinfo": 0,
          "payplay": 0,
          "paytrackmouth": 0,
          "paytrackprice": 0,
          "timefree": 0
        },
        "preview": {
          "trybegin": 0,
          "tryend": 0,
          "trysize": 0
        },
        "rate": 1,
        "singer": [
          {
            "id": 143,
            "mid": "003Nz2So3XXYek",
            "name": "陈奕迅"
          }
        ],
        "size128": 4200804,
        "size320": 0,
        "size5_1": 0,
        "sizeape": 0,
        "sizeflac": 0,
        "sizeogg": 0,
        "songid": 1025921,
        "songmid": "0021i6DI1w9hjk",
        "songname": "那些让你死去活来的女孩",
        "songorig": "那些让你死去活来的女孩",
        "songtype": 0,
        "strMediaMid": "0021i6DI1w9hjk",
        "stream": 8,
        "switch": 603927,
        "type": 0,
        "vid": ""
      }
    ],
    "mid": "003YQ8lP3NBXKl",
    "name": "?",
    "singerid": 143,
    "singermblog": null,
    "singermid": "003Nz2So3XXYek",
    "singername": "陈奕迅",
    "song_begin": 0,
    "total": 13,
    "total_song_num": 13
  }
}