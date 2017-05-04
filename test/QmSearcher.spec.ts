import { QmSearcher } from '../src/QmSearcher'

import { expect } from 'chai'

describe('测试 qq music 的搜索模块', () => {
  let qmSearcher: QmSearcher = new QmSearcher()
  // 搜索关键词
  let eason = '陈奕迅'
  // 该歌手在 qq 音乐平台的 id
  let easonSingerId = '003Nz2So3XXYek'
  // 歌曲 '好久不见' 在 qq 音乐平台的 id
  let songId = '004M3yRr3kOfnS'
  // 专辑 '认了吧' 的 id
  let albumId = '003yQidc3s7P65'
  describe('按关键字搜索音乐： qmSearcher.keyword', () => {
    it('应当返回一个数组', () => {
      return qmSearcher.keyword(0, 10, eason, 'song')
        .then(data => {
          expect(data).to.be.instanceOf(Array)
        })
    })

    it('应当返回与 length 参数相同的数组', () => {
      let length = 3
      return qmSearcher.keyword(0, length, eason, 'song')
        .then(data => {
          expect(data).to.has.length(length)
        })
    })

    it('当类型为 song 时，数组的每一个元素都应当有 songmid 属性', () => {
      let length = 5
      return qmSearcher.keyword(0, length, eason, 'song')
        .then(data => {
          let sum = 0
          data.forEach(item => item.songmid && sum++)
          expect(sum).to.equals(length)
        })
    })

    it('当类型为 album 时，数组的每一个元素都应当有 albumID 属性', () => {
      let length = 5
      return qmSearcher.keyword(0, length, eason, 'album')
        .then(data => {
          let sum = 0
          data.forEach(item => item.albumID && sum++)
          expect(sum).to.equals(length)
        })
    })
  })

  describe('搜索相似歌手： qmSearch.similarSinger', () => {
    it('应当返回指定长度的数组', () => {
      let length = 5
      return qmSearcher.similarSinger(0, length, easonSingerId)
        .then(data => {
          expect(data).to.has.lengthOf(length)
        })
    })

    it('数组的每一个元素都应当有 mid 属性', () => {
      let length = 5
      return qmSearcher.similarSinger(0, length, easonSingerId)
        .then(data => {
          let sum = 0
          data.forEach(item => item.mid && sum++)
          expect(sum).to.equals(length)
        })
    })
  })

  describe('按歌曲 id 获取音乐详情: qmSearch.song', () => {
    it('应当拥有 name 属性', () => {
      return qmSearcher.song(songId)
        .then(song => {
          expect(song).to.has.property('name')
        })
    })
  })

  describe('按歌手 id 获取其专辑: qmSearch.albumsBySinger', () => {
    it('应当拥有 name 属性', () => {
      return qmSearcher.albumsBySinger(0, 5, easonSingerId, 'time')
        .then(albums => {
          expect(albums).to.has.property('length')
        })
    })
  })
})