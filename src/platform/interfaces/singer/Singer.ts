import { ISinger } from './Singer.interface'
import { SingerModel } from './Singer.model'

export class Singer {
  document: ISinger
  constructor(doc: ISinger) {
    this.document = doc
  }

  static save(obj): Promise<ISinger> {
    return new Promise<ISinger>((resolve, reject) => {
      console.log('obj to be saved ====', obj)
      new SingerModel(obj)
        .save()
        .then(savedSinger => resolve(savedSinger))
        .catch(err => {
          console.log(err)
        })
    })
  }

  static findById(id: string) {
    return new Promise<ISinger>((resolve, reject) => {
      SingerModel.findById(id)
        .exec()
        .then(foundSinger => resolve(foundSinger))
        .catch(err => {
          console.log(err)
        })
    })
  }
}
