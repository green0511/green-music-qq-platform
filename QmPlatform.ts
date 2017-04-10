import { IQmAlbum, IQmSinger, IQmSong } from './QmTypes'
import { IPlatform, ISearch, IFilter, IAlbum, ISinger, ISong } from './interfaces'
import axios from 'axios'
import * as JSONP from 'node-jsonp'
import * as debug from 'debug'
let serverDebugger = debug('ts-express:server')

export class QmSearch implements ISearch<IQmSong, IQmAlbum, IQmSinger> {
  keyword(page: number, length: number, key: string, type: 'song' | 'album') {
    serverDebugger('function call: QmSearch.keyword()')
    let typeMap = {
      'song': 0,
      'album': 8
    }
    // type: 
    // 0 => 单曲
    // 8 => 专辑
    serverDebugger(`searching ${type} with ${key}`)
    return new Promise<IQmSong | IQmAlbum> ((resolve, reject) => {
      JSONP('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', {
        w: key,
        p: page,
        n: length,
        t: typeMap[type],
        format:'jsonp'
      }, 'jsonpCallback', data => {
        serverDebugger('search result: ', data)
        // TODO
        if (type == "song") {
          resolve(<Array<IQmSong>>data.data.song.list)
        } else if (type == "album") {
          resolve(<Array<IQmAlbum>>data.data.album.list)
        }
      })
    })
  }

  similarSinger(sid: string, page: number, length: number) {
    serverDebugger('function call: QmSearch.similarSinger()')
    serverDebugger('searching similar singer(sid): ', sid)
    return new Promise<Array<IQmSinger>>((resolve, reject) => {
      JSONP('https://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg', {
        singer_mid: sid,
        format:'jsonp',
        start: (page - 1) * length,
        num: length
      }, 'jsonpCallback', data => {
        serverDebugger('search similar singer result: ', data)
        // 数据不是标准格式 如：
        // "id": 10,
        // "name": "陈绮贞",
        // "mid": "003kBi0c1ckZB4",
        // "pic": "http://imgcache.qq.com/music/photo/mid_singer_150/B/4/003kBi0c1ckZB4.jpg"
        resolve(data.singers.items)
      })
    })
  }

  song(mid: string) {
    serverDebugger('function call: getSongInfo()')
    serverDebugger('searching song(mid): ', mid)
    return new Promise<IQmSong>((resolve, reject) => {
      JSONP('https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg', {
        songmid: mid,
        format:'jsonp'
      }, 'callback', songInfoData => {
        serverDebugger('search song result: ', songInfoData)
        resolve(songInfoData.data && songInfoData.data[0])
      })
    })
  }

  albumsBySinger(sid: string, page: number, length: number, order: string) {
    serverDebugger('function call: getSingerAllAlbums()')
    serverDebugger('searching singer(sid): ', sid)
    return new Promise<Array<IQmAlbum>> ((resolve, reject)=> {
      JSONP('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg', {
        singermid: sid,
        format:'jsonp',
        bigin: (page - 1) * length,
        num: length,
        order
      }, 'jsonpCallback', songInfoData => {
        serverDebugger('getSingerAllAlbums result: ', songInfoData)
        resolve(songInfoData)
      })
    })
  }

  album(aid: string): Promise<IQmAlbum> {
    serverDebugger('function call: getAlbumInfo()')
    serverDebugger('searching album(aid): ', aid)
    return new Promise<IQmAlbum>((resolve, reject) => {
      JSONP('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
        albummid: aid,
        format:'jsonp'
      }, 'jsonpCallback', albumInfoData => {
        serverDebugger('search album result: ', albumInfoData)
        resolve(albumInfoData)
      })
    })
  }
}

export class QmPlatform implements IPlatform<IQmSong, IQmAlbum, IQmSinger>{

  // GET {name}.linhao.me/singer/:sid
  getSinger(sid): ISinger {
    return 
  }

  search: ISearch<IQmSong, IQmAlbum, IQmSinger> = new QmSearch()

  filter: IFilter<IQmSong, IQmAlbum, IQmSinger>

  addSong(sid): Promise<ISong> {
    this.search.song(sid)
      .then(searchResult => {
        let song = this.filter.getSong(searchResult)
      })
    return 
  }
}

