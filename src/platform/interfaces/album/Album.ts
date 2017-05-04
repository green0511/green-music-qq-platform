import { IAlbum } from './Album.interface'
import { AlbumModel } from './Album.model'
export class Album {
  document: IAlbum
  constructor(doc: IAlbum) {
    this.document = doc
  }

  static save(obj): Promise<IAlbum> {
    return new Promise<IAlbum>((resolve, reject) => {
      obj._album = obj.album
      obj._singer = obj.singer
      console.log('obj to be saved ====', obj)
      new AlbumModel(obj)
        .save()
        .then(savedAlbum => resolve(savedAlbum))
    })
  }

  static findById(id: string) {
    return new Promise<IAlbum>((resolve, reject) => {
      AlbumModel.findById(id)
        .exec()
        .then(foundAlbum => resolve(foundAlbum))
        .catch(err => {
          console.log(err)
        })
    })
  }
}
