import { ISong } from './Song.interface'
import { SongModel } from './Song.model'

import * as debug from 'debug'
let serverDebugger = debug('ts-express:server')

export class Song {
  
  private document: ISong
  constructor(doc: ISong) {
    this.document = doc
  }

  static findById(id: string): Promise<ISong> {
    return new Promise<ISong>((resolve, reject) => {
      SongModel.findById(id)
        .exec()
        .then(res => resolve(res))
        .catch(err => {
          console.log(err)
          resolve(null)
        })
    })
  }

  static save(obj): Promise<ISong> {
    return new Promise<ISong>((resolve, reject) => {
      obj._album = obj.album
      obj._singer = obj.singer
      new SongModel(obj)
        .save()
        .then(savedSong => resolve(savedSong))
        .catch(err => console.log(err))
    })
  }

  public remove(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      SongModel
        .remove({
          _id: this.document._id
        })
        .exec()
        .then(() => {
          serverDebugger(`delete song ${this.document.name} (${this.document._id}) success`)
          return resolve(true)
        })
        .catch((err) => {
          serverDebugger('delete song error: ', err)
          return resolve(false)
        })
      
    })
  }
}