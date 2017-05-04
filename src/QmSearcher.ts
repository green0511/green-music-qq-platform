import { ISearcher, ISinger, ISong, IAlbum } from './platform'

import { xml2json } from 'xml-js'
import axios from 'axios'
import * as JSONP from 'node-jsonp'
import * as debug from 'debug'
let serverDebugger = debug('ts-express:server')

type SimilarSingerType = {
  id: number,
  name: string
  mid: string
  pic: string
}

export class QmSearcher implements ISearcher {
  
  keyword(page: number, length: number, key: string, type: 'song'): Promise<Array<ISong>>
  keyword(page: number, length: number, key: string, type: 'album'): Promise<Array<IAlbum>>
  keyword(page: number, length: number, key: string, type: any): Promise<Array<any>> {
    serverDebugger('function call: QmSearcher.keyword()')
    serverDebugger(`searching ${type} with ${key}`)
    let typeMap = {
      'song': 0,
      'album': 8
    }
    // type: 
    // 0 => 单曲
    // 8 => 专辑
    return new Promise((resolve, reject) => {
      axios.get('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', {
        params: {
          w: key,
          p: page,
          n: length,
          t: typeMap[type],
          format:'json'
        }
      }).then(response => {
        serverDebugger(`searching keyword result: `, response.data)
        let data = response.data.data
        if (type == 'song') {
          let list = data && data.song && data.song.list
          if (!list || !list.length) {
            return resolve(null)
          }
          let result: Array<ISong> = list.map(metaSong => {
            return <ISong> {
              _id: metaSong.songmid,
              name: metaSong.songname,
              interval: metaSong.interval,
              public_time: new Date(metaSong.pubtime * 1000),
              album: {
                _id: metaSong.albummid,
                name: metaSong.albumname
              }
            }
          })
          resolve(result)
        }

        if (type == 'album') {
         let list = data && data.album && data.album.list
         if (!list || !list.length) {
           return resolve(null)
         }
         let result: Array<IAlbum> = list.map(item => {
           return <IAlbum> {
             _id: item.albumMID,
             name: item.albumName,
             public_date: new Date(item.publicTime),
             count: item.song_count,
             singer: {
               _id: item.singerMID,
               name: item.singerName
             }
           }
         })
         return resolve(result)
        }

        resolve(null)
      })
    })
  }

  singer(sid): Promise<ISinger> {
    return new Promise<ISinger>((resolve, reject) => {
      axios.get('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_singer_desc.fcg', {
        headers: {
          Referer: 'https://c.y.qq.com/xhr_proxy_utf8.html'
        },
        params: {
          singermid: sid,
          utf8: 1,
          outCharset: 'utf-8',
          format: 'xml'
        }
      }).then(response => {
        let xml = response.data
        let parsed = JSON.parse(xml2json(xml, {compact: true})).result.data.info
        console.log('===== parsed ========')
        console.log(parsed)
        let desc = parsed.desc._cdata
        let items = parsed.basic.item
        console.log('===== items ========')
        console.log(items)
        let name = ''
        let name_en = ''
        let name_nick = ''
        let country = ''
        items.forEach(item => {
          if (item.key._cdata == '中文名') {
            name = item.value._cdata
          } else if (item.key._cdata == '外文名') {
            name_en = item.value._cdata
          } else if (item.key._cdata == '别名') {
            name_nick = item.value._cdata
          } else if (item.key._cdata == '国籍') {
            country = item.value._cdata
          }
        });
        let singer: ISinger = <ISinger> {
          _id: sid,
          desc,
          name,
          name_en,
          name_nick,
          country
        }
        resolve(singer)
      })
    })
  }
  
  similarSinger(page: number, length: number, sid: string): Promise<Array<ISinger>> {
    serverDebugger('function call: QmSearcher.similarSinger()')
    serverDebugger('searching similar singer by sid: ', sid)
    return new Promise<Array<ISinger>>((resolve, reject) => {
      axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg', {
        params: {
          singer_mid: sid,
          format:'jsonp',
          start: (page - 1) * length,
          num: length
        }
      }).then(response => {
        let data = response.data
        serverDebugger('search similar singer result: ', data)
        let list = data && data.singers && data.singers.items
        if (!list || !list.length) {
          return resolve(null)
        }
        let result: Array<ISinger> = list.map(item => {
          return <ISinger> {
            _id: item.mid,
            name: item.name
          }
        })
        serverDebugger('parsed similar singer result: ', result)
        resolve(result)
      }) 
      .catch(err => {
        console.log(err)
        resolve(null)
      })
    })
  }
  
  song(sid): Promise<ISong> {
    serverDebugger('function call: getSongInfo()')
    serverDebugger('searching song(mid): ', sid)
    return new Promise<ISong>((resolve, reject) => {
      axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg', {
        params: {
          songmid: sid,
          format:'json'
        }
      }).then(response => {
        let data = response.data
        serverDebugger('search song result: ', data)
        let song = data && data.data && data.data[0]
        if (!song) {
          return resolve(null)
        }
        let result: ISong = <ISong> {
          _id: song.mid,
          url: song.url,
          name: song.name,
          interval: song.interval,
          public_time: new Date(song.time_public),
          album: {
            _id: song.album.mid,
            name: song.album.name
          },
          singer: song.singer.map(item => {
            return <ISinger> {
              _id: item.mid,
              name: item.name
            } 
          })
        }
        return resolve(result)
      })
      .catch(err => {
        console.log(err)
        resolve(null)
      })
    })
  }

  songsBySinger(page: number, length: number, sid: string, order: string = 'listen'): Promise<Array<ISong>> {
    serverDebugger('function call: getSingerAllSongs()')
    serverDebugger('searching song(mid): ', sid)
    return new Promise<Array<ISong>>((resolve, reject) => {
      axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
        params: {
          singermid: sid,
          format:'jsonp',
          begin: (page - 1) * length,
          num: length,
          order
        }
      }).then(response => {
        let data = response.data.data
        serverDebugger('getSingerAllSongs result: ', data)
        let list: Array<any> = data && data.list
        if (!list || !list.length) {
          return resolve(null)
        }
        let result: Array<ISong> = list.map(item => {
          let { musicData } = item
          return <ISong> {
            _id: musicData.songmid,
            name: musicData.songname,
            interval: musicData.interval,
            public_time: new Date(item.Fupload_time),
            album: {
              _id: musicData.albummid,
              name: musicData.albumname
            }
          }
        })
        resolve(result)
      })
    })
  }
  
  album(aid: string): Promise<IAlbum> {
    serverDebugger('function call: getAlbumInfo()')
    serverDebugger('searching album(aid): ', aid)
    return new Promise<IAlbum>(async (resolve, reject) => {
      let params = {
        albummid: aid,
        format:'json'
      }
      let response = await axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', { params })
      let albumInfoData = response.data
      serverDebugger('API return result: ', albumInfoData)
      if (albumInfoData.code !== 0 || !albumInfoData.data) {
        return resolve(null)
      }
      let origin = albumInfoData.data
      let result: IAlbum = <IAlbum>{
        _id: origin.mid,
        name: origin.name,
        songs: origin.list.map(item => ({_id: item.songmid, name: item.songname})),
        public_date: origin.aDate,
        desc: origin.desc,
        company: origin.company,
        singer: {
          _id: origin.singermid,
          name: origin.singername
        }
      }
      serverDebugger('search album result: ', result)
      resolve(result)
    })
  }

  albumsBySinger(page: number, length: number, sid: string, order: string = 'time'): Promise<Array<IAlbum>> {
    serverDebugger('function call: getSingerAllAlbums()')
    serverDebugger('searching singer(sid): ', sid)
    return new Promise<Array<IAlbum>> ((resolve, reject)=> {
      axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg', {
        params: {
          singermid: sid,
          format:'json',
          begin: (page - 1) * length,
          num: length,
          order
        }
      }).then(response => {
        let data = response.data
        serverDebugger('getSingerAllAlbums result: ', data)
        let list: Array<any> = data && data.data && data.data.list
        if (!list || !list.length) {
          return resolve(null)
        }
        let result: Array<IAlbum> = list.map(item => {
          return <IAlbum> {
            _id: item.albumMID,
            name: item.albumName,
            public_date: new Date(item.pubTime),
            company: item.company,
            desc: item.desc,
            singer: {
              _id: item.singerMID,
              name: item.singerName
            }
          }
        })
        resolve(result)
      })
    })
  }
}