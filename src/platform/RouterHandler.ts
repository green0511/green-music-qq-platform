import { ISearcher, Album, Song, Singer, IAlbum, ISong, ISinger } from './interfaces'
import { Request, Response, NextFunction } from 'express'
export class RouterHandler {
  
  constructor(private searcher: ISearcher) {}
  
  // 根据关键词搜索歌曲或者专辑
  search(req: Request, res: Response, next: NextFunction) {
    let { type, keyword, page, length } = req.query
    let typeMap = {
      'song': 0,
      'album': 8
    }
    this.searcher.keyword(page, length, keyword, type)
      .then(data => {
        res.json({data})
      })
  }
  
  // 搜索相似歌手
  similarSinger(req: Request, res: Response, next: NextFunction) {
    let { sid } = req.params
    let { page, length } = req.query
    this.searcher.similarSinger(page, length, sid)
      .then(data => {
        return res.json({data})
      })
  }
  
  // 获取歌手的所有歌曲
  getSingerAllSongs(req: Request, res: Response, next: NextFunction) {
    let { sid } = req.params
    let { page, length, order } = req.query
    this.searcher.songsBySinger(page, length, sid, order)
      .then(data => res.json({data}))
  }
  
  // 获取歌手的所有专辑
  getSingerAllAlbums(req: Request, res: Response, next: NextFunction) {
    let { sid } = req.params
    let { page, length, order } = req.query
    this.searcher.albumsBySinger(page, length, sid, order)
      .then(data => {
        return res.json({data})
      })
  }
  
  // 获取一张专辑的详情
  async getAlbumInfo(req: Request, res: Response, next: NextFunction) {
    let { aid } = req.params
    let data = await Album.findById(aid)
    if (!data) {
      let searchAlbum = await this.searcher.album(aid)
      if (!searchAlbum) {
        return res.json({data: null})
      }
      let savedAlbum = await Album.save(searchAlbum)
      this.saveAllSongs(savedAlbum.songs, savedAlbum)
      this.saveSinger(savedAlbum.singer)
      data = savedAlbum
    }
    return res.json({data})
  }  
  
  // 获取一个歌手的详情
  async getSingerInfo(req: Request, res: Response, next: NextFunction) {
    let { sid } = req.params
    let localSinger = await Singer.findById(sid)
    if (localSinger) {
      return res.json({data: localSinger})
    }
    let searchSinger = await this.searcher.singer(sid)
    let savedSinger = await Singer.save(searchSinger)
    return res.json({data: savedSinger})
  }
  // 获取音乐详情
  async getSongInfo(req: Request, res: Response, next: NextFunction) {
    console.log('=======')
    let { mid } = req.params
    console.log('mid: ', mid)
    let localSong = await Song.findById(mid)
    console.log('local song: ', localSong)
    if (localSong) {
      return res.json({data: localSong})
    }
    // 搜索歌曲
    let searchSong = await this.searcher.song(mid)
    console.log('searchSong: ', searchSong)
    // 搜索专辑
    let albumId = searchSong.album._id
    let localAlbum = await Album.findById(albumId)
    console.log('localAlbum: ', localAlbum)

    if (!localAlbum) {
      let searchAlbum = await this.searcher.album(albumId)
      console.log('searchAlbum: ', searchAlbum)
      localAlbum = await Album.save(searchAlbum)
      console.log('localAlbum: ', localAlbum)
    }
    searchSong.album = localAlbum

    // 搜索歌手
    let singers = searchSong.singer
    console.log('singers: ', singers)
    let promises = singers.map(singer => {
      return new Promise<ISinger>(async (resolve, reject) => {
        let localSinger = await Singer.findById(singer._id)
        console.log('localSinger: ', localSinger)
        if (localSinger) {
          resolve(localSinger)
        }
        let searchSinger = await this.searcher.singer(singer._id)
        console.log('searchSinger: ', searchSinger)
        let savedSinger = await Singer.save(searchSinger)
        console.log('savedSinegr: ', savedSinger)
        resolve(savedSinger)
      })
    })

    Promise.all(promises)
      .then(async singers => {
        console.log('promise all: ', singers)
        searchSong.singer = singers
        let savedSong = await Song.save(searchSong)
        console.log('savedSong: ', savedSong)
        let result = await Song.findById(mid)
        console.log('result: ', result)
        this.saveAllSongs(localAlbum.songs, localAlbum)
        return res.json({data: result})
      })

  }

  saveAllSongs(songs: Array<ISong>, album: IAlbum) {
    songs.forEach(async song => {
      let foundSong = await this.searcher.song(song._id)
      foundSong.album = album
      Song.save(foundSong)
    })
  }

  async saveSinger(singer: ISinger) {
    let foundSinger = await this.searcher.singer(singer._id)
    Singer.save(foundSinger)
  }
}